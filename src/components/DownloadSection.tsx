import { useState } from 'react';

interface DownloadSectionProps {
  onDownload: () => void;
  onReset: () => void;
  filename: string;
  markdown: string;
}

export const DownloadSection = ({ onDownload, onReset, filename, markdown }: DownloadSectionProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = markdown;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Collapsible Preview Section */}
      <div className={`glass transition-all duration-300 ${isPreviewOpen ? 'border-cyan-400/50' : ''}`}>
        <button
          onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          className="w-full p-4 flex items-center justify-between text-left glass-hover rounded-2xl"
          aria-expanded={isPreviewOpen}
        >
          <span className="flex items-center gap-2 text-gray-300 font-medium">
            <svg
              className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isPreviewOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Preview Markdown
          </span>
          <span className="text-xs text-gray-500">
            {markdown.length.toLocaleString()} characters
          </span>
        </button>

        {isPreviewOpen && (
          <div className="px-4 pb-4">
            <div className="relative">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-cyan-400 transition-all duration-200 flex items-center gap-1.5 z-10"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
              <div className="max-h-72 overflow-y-auto bg-slate-900/50 rounded-lg p-4 pr-20">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">
                  {markdown}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Download and Copy Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onDownload}
          className="flex-1 py-4 px-6 rounded-xl font-semibold text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/20"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download {filename}.zip
          </span>
        </button>

        <button
          onClick={handleCopy}
          className="py-4 px-6 rounded-xl font-semibold text-lg glass glass-hover transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2"
        >
          {copied ? (
            <>
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-cyan-400">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full py-3 px-6 rounded-xl font-medium glass glass-hover transition-all duration-300"
      >
        Convert Another Document
      </button>
    </div>
  );
};
