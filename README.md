# Word to Markdown - Private, Offline Document Converter for AI

<p align="center">
  <img src="public/logo.svg" alt="Word to Markdown Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Convert Word documents to LLM-ready Markdown - 100% Private, No Data Upload</strong>
</p>

<p align="center">
  A privacy-first web application that converts Word documents (.docx) to clean Markdown format entirely in your browser. Perfect for preparing documents for local AI/LLMs like Ollama, LM Studio, or GPT4All - without ever uploading your sensitive data to the cloud.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Privacy-100%25%20Offline-green" alt="100% Offline">
  <img src="https://img.shields.io/badge/No%20Data-Uploaded-blue" alt="No Data Uploaded">
  <img src="https://img.shields.io/badge/Works-Offline-orange" alt="Works Offline">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
</p>

<p align="center">
  <a href="#why-privacy-matters">Why Privacy?</a> •
  <a href="#features">Features</a> •
  <a href="#quick-start-no-installation-required">Quick Start</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Why Privacy Matters

When working with AI and LLMs, you often need to convert documents containing sensitive information - business reports, legal documents, personal notes, medical records, or confidential research. Most online converters upload your files to their servers, creating privacy and security risks.

**Word to Markdown is different:**

- **Zero data transmission** - Your documents never leave your device
- **No server, no cloud** - Everything runs locally in your browser
- **Works completely offline** - No internet connection required after loading
- **No accounts or tracking** - No sign-ups, no analytics, no cookies
- **Open source** - Audit the code yourself to verify privacy claims

This makes it ideal for:
- Converting confidential business documents for AI analysis
- Preparing sensitive legal or medical documents for local LLMs
- Processing proprietary research papers offline
- Anyone who values data privacy when using AI tools

## Features

- **100% Private & Offline** - All processing happens locally in your browser, no data ever uploaded
- **No Server Required** - Works as a standalone HTML file you can double-click
- **Drag & Drop Interface** - Simply drag your Word document or click to browse
- **Three Image Handling Modes**:
  - **Separate Images** (Recommended) - Clean markdown with images in a folder
  - **Base64 Embedded** - Single file with embedded images
  - **Text Only** - Lightweight output without images
- **ZIP Bundle Output** - Download everything in a ready-to-use package
- **Dark Glassmorphic UI** - Modern, beautiful interface
- **Optimized for Local LLMs** - Clean markdown output perfect for Ollama, LM Studio, GPT4All, and other local AI tools

## Demo

![Word to Markdown Screenshot](docs/screenshot.png)

## Quick Start (No Installation Required)

The easiest way to use Word to Markdown is with the standalone HTML file - no server or installation needed!

1. Download `standalone/word-to-markdown.html` from this repository
2. Double-click the file to open it in your browser
3. Start converting your Word documents

That's it! The standalone version works completely offline and runs entirely in your browser.

## Development Setup

If you want to modify the code or run the development server:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/yourusername/word-to-markdown.git
cd word-to-markdown

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build Commands

```bash
# Build for production (outputs to dist/)
npm run build

# Build standalone HTML file (outputs to standalone/)
npm run build:standalone

# Preview the production build
npm run preview

# Run linter
npm run lint
```

## Usage

### Converting a Document

1. **Open the app** - Double-click `standalone/word-to-markdown.html` (or run `npm run dev` for development)
2. **Upload your document** - Drag and drop a `.docx` file or click to browse
3. **Choose image handling** - Select how you want images to be processed
4. **Convert** - Click "Convert to Markdown"
5. **Download** - Get your ZIP bundle with markdown and images

### Using with Ollama

1. Extract the downloaded ZIP file
2. Open the markdown file in your text editor
3. Copy the content into Ollama's chat interface
4. Your document is ready for AI analysis!

### Image Handling Options

| Mode | Description | Best For |
|------|-------------|----------|
| **Separate Images** | Images saved in a folder, markdown references them | Most LLMs, clean output |
| **Base64 Embedded** | Images encoded directly in markdown | Single-file convenience |
| **Text Only** | Images replaced with placeholders | Text-only LLMs, smallest size |

## Tech Stack

- **[React 19](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Mammoth.js](https://github.com/mwilliamson/mammoth.js)** - Word document parsing
- **[JSZip](https://stuk.github.io/jszip/)** - ZIP file generation
- **[Turndown](https://github.com/mixmark-io/turndown)** - HTML to Markdown conversion

## Project Structure

```
word-to-markdown/
├── standalone/           # Standalone build (double-click to run)
│   └── word-to-markdown.html
├── src/
│   ├── components/       # React components
│   │   ├── Logo.tsx
│   │   ├── DropZone.tsx
│   │   ├── ImageOptions.tsx
│   │   ├── ConvertButton.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── DownloadSection.tsx
│   ├── utils/            # Utility functions
│   │   ├── converter.ts  # Word to Markdown conversion
│   │   └── zipGenerator.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── App.tsx           # Main application
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires a modern browser with File API support.

## Limitations

- Only `.docx` files are supported (not `.doc`)
- Maximum file size: 200MB
- Complex formatting may not convert perfectly
- Track changes and comments are not preserved

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

See the [Development Setup](#development-setup) section above for instructions on setting up your local environment.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) for excellent Word document parsing
- [Ollama](https://ollama.ai/) for making local LLMs accessible
- All our [contributors](https://github.com/yourusername/word-to-markdown/graphs/contributors)

## GitHub Topics

If you're the repository owner, add these topics to improve discoverability:

`privacy` `offline` `local-llm` `ollama` `document-converter` `markdown` `word-to-markdown` `docx` `ai-privacy` `client-side` `no-upload` `gpt4all` `lm-studio` `private-ai` `data-privacy`

## Related Searches

This tool is useful for people searching for:
- Private Word to Markdown converter
- Offline document converter for AI
- Convert Word to Markdown without uploading
- Local LLM document preparation
- Privacy-focused document converter
- Ollama document converter
- Client-side docx to markdown
- No-upload file converter
- Secure document conversion for AI
- GDPR compliant document converter
- Air-gapped document processing

---

<p align="center">
  Made with ❤️ for the privacy-conscious open source community
</p>
