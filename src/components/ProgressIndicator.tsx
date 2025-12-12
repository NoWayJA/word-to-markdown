import { ConversionStatus } from '../types';

interface ProgressIndicatorProps {
  status: ConversionStatus;
}

export const ProgressIndicator = ({ status }: ProgressIndicatorProps) => {
  if (status.status === 'idle') return null;

  return (
    <div className="w-full">
      {status.status === 'converting' && (
        <div className="glass p-4 border-cyan-400/50">
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-cyan-400" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Converting your document...</p>
              <p className="text-xs text-gray-400 mt-1">This may take a moment for large documents</p>
            </div>
          </div>
        </div>
      )}

      {status.status === 'success' && (
        <div className="glass p-4 border-green-400/50 bg-green-400/5">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-400">Conversion successful!</p>
              {status.message && (
                <p className="text-xs text-gray-400 mt-1">{status.message}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {status.status === 'error' && (
        <div className="glass p-4 border-red-400/50 bg-red-400/5">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-400">Conversion failed</p>
              <p className="text-xs text-gray-400 mt-1">
                {status.message || 'An error occurred during conversion. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
