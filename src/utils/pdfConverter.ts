import * as pdfjsLib from 'pdfjs-dist';
import { ConversionOptions, ConversionResult, ImageFile } from '../types';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
  fontName: string;
}

/**
 * Converts a PDF document to Markdown format
 * @param file - The PDF file to convert
 * @param options - Conversion options including image handling mode
 * @returns Promise containing markdown content, extracted images, and filename
 */
export async function convertPdfToMarkdown(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const images: ImageFile[] = [];
  let imageCounter = 0;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;

  let markdownContent = '';

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    // Extract text content
    const textContent = await page.getTextContent();
    const pageText = extractTextWithFormatting(textContent.items as TextItem[]);

    // Extract images if not in text-only mode
    if (options.imageMode !== 'text-only') {
      const pageImages = await extractImagesFromPage(page, imageCounter, options);
      images.push(...pageImages.images);
      imageCounter = pageImages.nextCounter;

      // Add image references to the page content
      if (pageImages.images.length > 0) {
        markdownContent += pageText;
        for (const img of pageImages.images) {
          if (options.imageMode === 'separate') {
            markdownContent += `\n\n![Image](./images/${img.name})\n`;
          } else if (options.imageMode === 'base64') {
            const base64 = await blobToBase64(img.data);
            markdownContent += `\n\n![Image](${base64})\n`;
          }
        }
      } else {
        markdownContent += pageText;
      }
    } else {
      markdownContent += pageText;
    }

    // Add page separator for multi-page documents
    if (pageNum < numPages) {
      markdownContent += '\n\n---\n\n';
    }
  }

  const markdown = cleanMarkdown(markdownContent);
  const filename = file.name.replace(/\.[^/.]+$/, '');

  return {
    markdown,
    images: options.imageMode === 'separate' ? images : [],
    filename,
  };
}

/**
 * Extracts text from PDF text items with basic formatting detection
 */
function extractTextWithFormatting(items: TextItem[]): string {
  if (items.length === 0) return '';

  let result = '';
  let lastY: number | null = null;
  let lastFontSize: number | null = null;
  let currentLine = '';

  // Sort items by vertical position (top to bottom) then horizontal (left to right)
  const sortedItems = [...items].sort((a, b) => {
    const yDiff = b.transform[5] - a.transform[5]; // Y is inverted in PDF
    if (Math.abs(yDiff) > 5) return yDiff;
    return a.transform[4] - b.transform[4]; // X position
  });

  for (const item of sortedItems) {
    const currentY = item.transform[5];
    const fontSize = Math.abs(item.transform[0]); // Approximate font size from transform

    // Detect new line
    if (lastY !== null && Math.abs(currentY - lastY) > 5) {
      // Finish current line
      if (currentLine.trim()) {
        // Detect headers based on font size
        if (lastFontSize !== null && lastFontSize > 16) {
          if (lastFontSize > 24) {
            result += `# ${currentLine.trim()}\n\n`;
          } else if (lastFontSize > 18) {
            result += `## ${currentLine.trim()}\n\n`;
          } else {
            result += `### ${currentLine.trim()}\n\n`;
          }
        } else {
          result += currentLine.trim() + '\n\n';
        }
      }
      currentLine = '';
    }

    // Add space between words on the same line
    if (currentLine && !currentLine.endsWith(' ') && !item.str.startsWith(' ')) {
      currentLine += ' ';
    }

    currentLine += item.str;
    lastY = currentY;
    lastFontSize = fontSize;
  }

  // Don't forget the last line
  if (currentLine.trim()) {
    if (lastFontSize !== null && lastFontSize > 16) {
      if (lastFontSize > 24) {
        result += `# ${currentLine.trim()}\n\n`;
      } else if (lastFontSize > 18) {
        result += `## ${currentLine.trim()}\n\n`;
      } else {
        result += `### ${currentLine.trim()}\n\n`;
      }
    } else {
      result += currentLine.trim() + '\n\n';
    }
  }

  return result;
}

/**
 * Extracts images from a PDF page by rendering to canvas
 */
async function extractImagesFromPage(
  page: pdfjsLib.PDFPageProxy,
  startCounter: number,
  options: ConversionOptions
): Promise<{ images: ImageFile[]; nextCounter: number }> {
  const images: ImageFile[] = [];
  let counter = startCounter;

  try {
    // Get the operators to find images
    const operatorList = await page.getOperatorList();

    // Check if page has images
    const hasImages = operatorList.fnArray.some(
      (fn) => fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject
    );

    if (hasImages && options.imageMode !== 'text-only') {
      // Render the page to extract images
      const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        }).promise;

        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to create blob from canvas'));
          }, 'image/png');
        });

        const imageName = `page${page.pageNumber}_image${counter++}.png`;
        images.push({
          name: imageName,
          data: blob,
        });
      }
    }
  } catch (error) {
    // Continue without images if extraction fails
    console.warn('Failed to extract images from page:', error);
  }

  return { images, nextCounter: counter };
}

/**
 * Cleans up markdown by removing excessive whitespace
 */
function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+|\s+$/g, '')
    .trim();
}

/**
 * Converts a Blob to a base64 data URL
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
