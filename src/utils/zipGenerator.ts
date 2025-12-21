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

  return await zip.generateAsync({ type: 'blob' });
}

function isChromiumBasedBrowser(): boolean {
  const ua = navigator.userAgent || '';
  const isFirefox = /Firefox\//i.test(ua);
  const isSafari =
    /Safari\//i.test(ua) && !/Chrome\/|Chromium\/|Edg\/|OPR\//i.test(ua);
  const isChromiumUa = /Chrome\/|Chromium\/|Edg\/|OPR\//i.test(ua);
  return isChromiumUa && !isFirefox && !isSafari;
}

async function saveZipViaPicker(blob: Blob, filename: string): Promise<void> {
  const handle = await (window as any).showSaveFilePicker({
    suggestedName: `${filename}.zip`,
    types: [
      {
        description: 'ZIP archive',
        accept: { 'application/zip': ['.zip'] },
      },
    ],
  });
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
}

/**
 * Attempts to save using the File System Access API on Chromium.
 * Returns:
 *  - true  => handled (saved or user canceled)
 *  - false => caller should fall back to download
 */
export async function saveZipFile(
  blob: Blob,
  filename: string
): Promise<boolean> {
  const canUsePicker =
    typeof window !== 'undefined' &&
    isChromiumBasedBrowser() &&
    typeof (window as any).showSaveFilePicker === 'function' &&
    window.isSecureContext;

  if (!canUsePicker) return false;

  try {
    await saveZipViaPicker(blob, filename);
    return true;
  } catch (err: any) {
    // User canceled the dialog: do not fall back to automatic download
    if (err?.name === 'AbortError') return true;
    // Any other failure: allow fallback to automatic download
    return false;
  }
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

/**
 * Convenience wrapper: prefer picker on Chromium, else download
 */
export async function saveOrDownloadZipFile(
  blob: Blob,
  filename: string
): Promise<void> {
  const handled = await saveZipFile(blob, filename);
  if (!handled) downloadZipFile(blob, filename);
}
