export type ImageHandlingMode = 'separate' | 'base64' | 'text-only';

export interface ConversionOptions {
  imageMode: ImageHandlingMode;
}

export interface ConversionResult {
  markdown: string;
  images: ImageFile[];
  filename: string;
}

export interface ImageFile {
  name: string;
  data: Blob;
}

export interface ConversionStatus {
  status: 'idle' | 'converting' | 'success' | 'error';
  message?: string;
  progress?: number;
}
