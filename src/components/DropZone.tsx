import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const DropZone = ({ onFileSelect, disabled }: DropZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 200 * 1024 * 1024,
    disabled
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          glass glass-hover p-12 text-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-cyan-400 bg-cyan-400/10 scale-[1.02]' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4">
          <svg
            className={`w-16 h-16 transition-transform duration-300 ${isDragActive ? 'scale-110' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              className="text-cyan-400"
            />
          </svg>

          {isDragActive ? (
            <p className="text-lg text-cyan-400">Drop your document here</p>
          ) : (
            <>
              <div>
                <p className="text-lg mb-2">
                  <span className="text-cyan-400 font-semibold">Click to browse</span> or drag and drop
                </p>
                <p className="text-sm text-gray-400">Word (.docx) or PDF files up to 200MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-3 p-3 glass border-red-400/50">
          <p className="text-sm text-red-400">
            {fileRejections[0].errors[0].code === 'file-too-large'
              ? 'File is too large. Maximum size is 200MB.'
              : fileRejections[0].errors[0].code === 'file-invalid-type'
              ? 'Invalid file type. Please upload a .docx or .pdf file.'
              : 'Error uploading file. Please try again.'}
          </p>
        </div>
      )}
    </div>
  );
};
