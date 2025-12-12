# Contributing to Word to Markdown

First off, thank you for considering contributing to Word to Markdown! It's people like you that make this tool better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our values of respect, inclusivity, and constructive collaboration.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide the Word document** (if possible and not confidential) that caused the issue
- **Describe the behavior you observed** and what you expected
- **Include screenshots** if applicable
- **Include your browser and OS version**

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **A clear and descriptive title**
- **A detailed description** of the proposed enhancement
- **Explain why this would be useful** to most users
- **List any alternatives** you've considered

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** and ensure the code works
4. **Run the linter**: `npm run lint`
5. **Test your changes** with various Word documents
6. **Commit your changes** with a clear commit message
7. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/word-to-markdown.git
cd word-to-markdown

# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/     # React UI components
├── utils/          # Core conversion logic
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
├── main.tsx        # Entry point
└── index.css       # Global styles and Tailwind
```

### Key Files

- `src/utils/converter.ts` - Word to Markdown conversion logic
- `src/utils/zipGenerator.ts` - ZIP bundle creation
- `src/components/DropZone.tsx` - File upload handling
- `src/components/ImageOptions.tsx` - Image mode selection

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types for function parameters and return values
- Avoid `any` type when possible

### React

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks or utility functions

### Styling

- Use Tailwind CSS for styling
- Follow the existing glassmorphic design pattern
- Ensure dark mode compatibility

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Write descriptive variable and function names

## Testing

Currently, manual testing is the primary method:

1. Test with various Word documents (simple text, images, tables, lists)
2. Test all three image handling modes
3. Verify the ZIP output is correct
4. Test in multiple browsers

Automated tests are a great area for contribution!

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 72 characters
- Reference issues and pull requests when relevant

Examples:
```
Add support for .doc files
Fix image extraction on Safari
Update dependencies to latest versions
Improve error handling for corrupted files
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
