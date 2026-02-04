export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="18" height="24" rx="2" fill="url(#grad1)" opacity="0.9"/>
        <rect x="26" y="16" width="18" height="24" rx="2" fill="url(#grad2)" opacity="0.9"/>

        <path d="M8 14 L18 14 M8 18 L18 18 M8 22 L14 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>

        <path d="M30 22 L40 22 M30 26 L40 26 M30 30 L36 30 M30 34 L40 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>

        <circle cx="24" cy="24" r="6" fill="rgba(96, 165, 250, 0.3)"/>
        <path d="M21 24 L24 27 L27 21" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

        <defs>
          <linearGradient id="grad1" x1="4" y1="8" x2="22" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
          <linearGradient id="grad2" x1="26" y1="16" x2="44" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4"/>
            <stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>

      <div className="text-left">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Doc to Markdown
        </h1>
        <p className="text-xs text-gray-400">For Local LLMs</p>
      </div>
    </div>
  );
};
