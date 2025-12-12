interface DownloadSectionProps {
  onDownload: () => void;
  onReset: () => void;
  filename: string;
}

export const DownloadSection = ({ onDownload, onReset, filename }: DownloadSectionProps) => {
  return (
    <div className="w-full space-y-3">
      <button
        onClick={onDownload}
        className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/20"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download {filename}.zip
        </span>
      </button>

      <button
        onClick={onReset}
        className="w-full py-3 px-6 rounded-xl font-medium glass glass-hover transition-all duration-300"
      >
        Convert Another Document
      </button>
    </div>
  );
};
