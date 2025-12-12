interface ConvertButtonProps {
  onClick: () => void;
  disabled: boolean;
  isConverting: boolean;
}

export const ConvertButton = ({ onClick, disabled, isConverting }: ConvertButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 px-6 rounded-xl font-semibold text-lg
        transition-all duration-300 transform
        ${disabled
          ? 'glass opacity-50 cursor-not-allowed'
          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20'
        }
      `}
    >
      {isConverting ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Converting...
        </span>
      ) : (
        'Convert to Markdown'
      )}
    </button>
  );
};
