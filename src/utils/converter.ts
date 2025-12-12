import mammoth from 'mammoth';
import TurndownService from 'turndown';
import { ConversionOptions, ConversionResult, ImageFile } from '../types';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

turndownService.addRule('tables', {
  filter: 'table',
  replacement: function (content) {
    return '\n\n' + content + '\n\n';
  },
});

/**
 * Converts a Word document (.docx) to Markdown format
 * @param file - The Word document file to convert
 * @param options - Conversion options including image handling mode
 * @returns Promise containing markdown content, extracted images, and filename
 */
export async function convertWordToMarkdown(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const images: ImageFile[] = [];
  let imageCounter = 0;

  const result = await mammoth.convertToHtml(
    { arrayBuffer },
    {
      convertImage: mammoth.images.imgElement(function (image) {
        // Use readAsArrayBuffer for browser compatibility
        return image
          .readAsArrayBuffer()
          .then(function (buffer: ArrayBuffer) {
            const imageBlob = new Blob([buffer], {
              type: image.contentType || 'image/png',
            });

            const extension = image.contentType?.split('/')[1] || 'png';
            const imageName = `image${imageCounter++}.${extension}`;

            images.push({
              name: imageName,
              data: imageBlob,
            });

            if (options.imageMode === 'separate') {
              return { src: `./images/${imageName}` };
            } else if (options.imageMode === 'base64') {
              return blobToBase64(imageBlob).then(function (base64) {
                return { src: base64 };
              });
            } else {
              return { src: '' };
            }
          })
          .catch(function () {
            // If image extraction fails, continue without the image
            return { src: '' };
          });
      }),
      ignoreEmptyParagraphs: true,
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Code'] => pre:fresh",
      ],
    }
  );

  let markdown = turndownService.turndown(result.value);

  if (options.imageMode === 'text-only') {
    markdown = markdown.replace(/!\[.*?\]\(.*?\)/g, '[Image]');
  }

  markdown = cleanMarkdown(markdown);
  const filename = file.name.replace(/\.[^/.]+$/, '');

  return {
    markdown,
    images: options.imageMode === 'separate' ? images : [],
    filename,
  };
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
