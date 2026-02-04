# Doc to Markdown - Private, Offline Document Converter for AI

<p align="center">
  <img src="public/logo.svg" alt="Doc to Markdown Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Convert Word & PDF documents to LLM-ready Markdown - 100% Private, No Data Upload</strong>
</p>

<p align="center">
  A privacy-first web application that converts Word documents (.docx) and PDFs to clean Markdown format entirely in your browser. Perfect for preparing documents for local AI/LLMs like Ollama, LM Studio, or GPT4All - without ever uploading your sensitive data to the cloud.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Privacy-100%25%20Offline-green" alt="100% Offline">
  <img src="https://img.shields.io/badge/No%20Data-Uploaded-blue" alt="No Data Uploaded">
  <img src="https://img.shields.io/badge/Works-Offline-orange" alt="Works Offline">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
  <a href="https://www.adappt.ai"><img src="https://img.shields.io/badge/Built%20by-Adappt%20AI-purple" alt="Built by Adappt AI"></a>
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

## Quick Start (No Installation Required)

### Try it Online

**[Launch Doc to Markdown](https://nowayja.github.io/word-to-markdown/)** - Use it right now in your browser!

> Even the online version processes everything locally - your documents never leave your device.

### Download for Offline Use

**[Download word-to-markdown.zip](https://github.com/NoWayJA/word-to-markdown/raw/main/standalone/word-to-markdown.zip)**

1. Click the download link above
2. Extract the ZIP file
3. Double-click `word-to-markdown.html` to open it in your browser
4. Works completely offline - no internet required!

---

## Why Privacy Matters

When working with AI and LLMs, you often need to convert documents containing sensitive information - business reports, legal documents, personal notes, medical records, or confidential research. Most online converters upload your files to their servers, creating privacy and security risks.

**Doc to Markdown is different:**

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
- **Word & PDF Support** - Convert both `.docx` Word documents and PDF files
- **No Server Required** - Works as a standalone HTML file you can double-click
- **Drag & Drop Interface** - Simply drag your document or click to browse
- **Copy to Clipboard** - Instantly copy the converted markdown with one click
- **Markdown Preview** - Expandable preview area to review your converted content
- **Three Image Handling Modes**:
  - **Separate Images** (Recommended) - Clean markdown with images in a folder
  - **Base64 Embedded** - Single file with embedded images
  - **Text Only** - Lightweight output without images
- **ZIP Bundle Output** - Download everything in a ready-to-use package
- **Dark Glassmorphic UI** - Modern, beautiful interface
- **Optimized for Local LLMs** - Clean markdown output perfect for Ollama, LM Studio, GPT4All, and other local AI tools

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

The app will be available at `http://localhost:5173`

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
2. **Upload your document** - Drag and drop a `.docx` or `.pdf` file, or click to browse
3. **Choose image handling** - Select how you want images to be processed
4. **Convert** - Click "Convert to Markdown"
5. **Preview & Copy** - Expand the preview to review, or click "Copy" to copy to clipboard
6. **Download** - Get your ZIP bundle with markdown and images

### Using with Ollama

1. Convert your document and click "Copy" to copy the markdown
2. Paste directly into Ollama's chat interface
3. Or extract the downloaded ZIP and open the markdown file
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
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF document parsing
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
│   │   ├── converter.ts      # Word to Markdown conversion
│   │   ├── pdfConverter.ts   # PDF to Markdown conversion
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

- Word: Only `.docx` files are supported (not `.doc`)
- PDF: Text extraction works best on text-based PDFs (scanned documents may have limited results)
- Maximum file size: 200MB
- Complex formatting may not convert perfectly
- Track changes and comments are not preserved

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

See the [Development Setup](#development-setup) section above for instructions on setting up your local environment.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Adappt AI](https://www.adappt.ai) for sponsoring and building this tool
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) for excellent Word document parsing
- [Mozilla PDF.js](https://mozilla.github.io/pdf.js/) for robust PDF parsing
- [Ollama](https://ollama.ai/) for making local LLMs accessible
- All our [contributors](https://github.com/NoWayJA/word-to-markdown/graphs/contributors)

## GitHub Topics

If you're the repository owner, add these topics to improve discoverability:

`privacy` `offline` `local-llm` `ollama` `document-converter` `markdown` `word-to-markdown` `pdf-to-markdown` `docx` `pdf` `ai-privacy` `client-side` `no-upload` `gpt4all` `lm-studio` `private-ai` `data-privacy`

## Related Searches

This tool is useful for people searching for:
- Private Word to Markdown converter
- Private PDF to Markdown converter
- Offline document converter for AI
- Convert Word to Markdown without uploading
- Convert PDF to Markdown without uploading
- Local LLM document preparation
- Privacy-focused document converter
- Ollama document converter
- Client-side docx to markdown
- Client-side PDF to markdown
- No-upload file converter
- Secure document conversion for AI
- GDPR compliant document converter
- Air-gapped document processing

---

<p align="center">
  Made with care for the privacy-conscious open source community
</p>

<p align="center">
  This project sponsored by <a href="https://www.adappt.ai"><strong>Adappt AI</strong></a>
</p>
