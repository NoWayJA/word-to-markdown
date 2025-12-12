import { ImageHandlingMode } from '../types';

interface ImageOptionsProps {
  selectedMode: ImageHandlingMode;
  onModeChange: (mode: ImageHandlingMode) => void;
  disabled?: boolean;
}

export const ImageOptions = ({ selectedMode, onModeChange, disabled }: ImageOptionsProps) => {
  const options = [
    {
      id: 'separate' as ImageHandlingMode,
      title: 'Separate Images',
      badge: 'Recommended',
      description: 'Images saved in a folder, markdown references them',
      details: 'Best for most LLMs • Clean text • Optional image access',
      icon: '📁'
    },
    {
      id: 'base64' as ImageHandlingMode,
      title: 'Embedded Images',
      badge: null,
      description: 'Images encoded directly into the markdown file',
      details: 'Single file convenience • Larger file size • Good for multimodal LLMs',
      icon: '📦'
    },
    {
      id: 'text-only' as ImageHandlingMode,
      title: 'Text Descriptions',
      badge: null,
      description: 'Images replaced with [Image] placeholders',
      details: 'Smallest size • Perfect for text-only LLMs • Fastest processing',
      icon: '📝'
    }
  ];

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-gray-300">Image Handling</h3>
        <div className="group relative">
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="absolute left-0 top-6 w-64 p-3 glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-xs text-gray-300">
            Choose how images from your Word document should be handled in the output.
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onModeChange(option.id)}
            disabled={disabled}
            className={`
              w-full text-left p-4 rounded-xl transition-all duration-300
              ${selectedMode === option.id
                ? 'glass border-cyan-400 bg-cyan-400/10'
                : 'glass glass-hover'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{option.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white">{option.title}</h4>
                  {option.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">
                      {option.badge}
                    </span>
                  )}
                  {selectedMode === option.id && (
                    <svg className="w-5 h-5 ml-auto text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-1">{option.description}</p>
                <p className="text-xs text-gray-500">{option.details}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
