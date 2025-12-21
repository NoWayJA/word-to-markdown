import { useState } from 'react';
import { Logo } from './components/Logo';
import { DropZone } from './components/DropZone';
import { ImageOptions } from './components/ImageOptions';
import { ConvertButton } from './components/ConvertButton';
import { ProgressIndicator } from './components/ProgressIndicator';
import { DownloadSection } from './components/DownloadSection';
import { convertWordToMarkdown } from './utils/converter';
import { generateZipBundle, saveOrDownloadZipFile } from './utils/zipGenerator';
import { ImageHandlingMode, ConversionStatus, ConversionResult } from './types';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageMode, setImageMode] = useState<ImageHandlingMode>('separate');
  const [status, setStatus] = useState<ConversionStatus>({ status: 'idle' });
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStatus({ status: 'idle' });
    setResult(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setStatus({ status: 'converting' });

    try {
      const conversionResult = await convertWordToMarkdown(selectedFile, { imageMode });
      setResult(conversionResult);
      setStatus({
        status: 'success',
        message: `Successfully converted "${selectedFile.name}". Your download is ready!`
      });
    } catch (error) {
      setStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  const handleDownload = async () => {
    if (!result) return;

    try {
      const zipBlob = await generateZipBundle(result);
      await saveOrDownloadZipFile(zipBlob, result.filename);
    } catch {
      setStatus({
        status: 'error',
        message: 'Failed to generate download. Please try again.',
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImageMode('separate');
    setStatus({ status: 'idle' });
    setResult(null);
  };

  const isConverting = status.status === 'converting';
  const isSuccess = status.status === 'success';

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <Logo />

        <div className="glass p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-300 mb-2">How to use with Ollama:</h2>
            <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
              <li>Upload your Word document (.docx)</li>
              <li>Choose how to handle images</li>
              <li>Download the ZIP file</li>
              <li>Extract and open the markdown in Ollama UI</li>
              <li>Your document is now ready for AI analysis!</li>
            </ol>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          <div className="space-y-6">
            <DropZone
              onFileSelect={handleFileSelect}
              disabled={isConverting}
            />

            {selectedFile && (
              <div className="glass p-4 border-cyan-400/50">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {!isConverting && !isSuccess && (
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {selectedFile && !isSuccess && (
              <>
                <ImageOptions
                  selectedMode={imageMode}
                  onModeChange={setImageMode}
                  disabled={isConverting}
                />

                <ConvertButton
                  onClick={handleConvert}
                  disabled={!selectedFile || isConverting}
                  isConverting={isConverting}
                />
              </>
            )}

            <ProgressIndicator status={status} />

            {isSuccess && result && (
              <DownloadSection
                onDownload={handleDownload}
                onReset={handleReset}
                filename={result.filename}
              />
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            All processing happens locally in your browser. No data is sent to external servers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
