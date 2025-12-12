import JSZip from 'jszip';
import { ConversionResult } from '../types';

export async function generateZipBundle(result: ConversionResult): Promise<Blob> {
  const zip = new JSZip();

  zip.file(`${result.filename}.md`, result.markdown);

  if (result.images.length > 0) {
    const imagesFolder = zip.folder('images');
    if (imagesFolder) {
      for (const image of result.images) {
        imagesFolder.file(image.name, image.data);
      }
    }
  }

  const readmeContent = `# ${result.filename}

This package contains your converted document:

- **${result.filename}.md** - The main markdown file
${result.images.length > 0 ? '- **images/** - Folder containing all document images\n' : ''}

## How to use with Ollama

1. Extract this ZIP file to a folder
2. Open Ollama UI
3. Drag and drop the markdown file or paste its contents
4. Your document is now ready for AI analysis!

${result.images.length > 0 ? `## About Images

This document contains ${result.images.length} image(s). Most text-based LLMs will ignore the image references, which is perfect for analyzing the text content. If you're using a multimodal LLM, the images are available in the images/ folder.

` : ''}
---
Generated with Word to Markdown Converter
`;

  zip.file('README.txt', readmeContent);

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadZipFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
