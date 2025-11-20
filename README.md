# Oneliner

A web-based tool for code minification/beautification and Base64 encoding/decoding. Built to help developers optimize their code and work with Base64 data quickly without installing anything.

## What it does

### Code Minification & Beautification

Oneliner strips out unnecessary whitespace, comments, and formatting from your code to reduce file size, or beautifies it for better readability. You can paste code directly, drag and drop files, or upload them. The tool shows you how much space you saved and lets you download or copy the results.

Works with:
- HTML (preserves content in pre, textarea, script tags)
- CSS (removes comments, optimizes spacing)
- JavaScript (basic minification while keeping functionality intact)
- JSON (validates and compresses)

### Base64 Encoding & Decoding

Encode and decode Base64 data for both text and images:
- **Text**: Convert any text to Base64 or decode Base64 back to readable text (supports UTF-8 and special characters)
- **Images**: Upload images (JPG, PNG, GIF, etc.) to convert to Base64 data URLs, or paste Base64 strings to preview and download images
- Drag and drop support for images
- Real-time image preview
- Shows Base64 size and image type statistics

## Try it out

**Live version:** https://taufiksoleh.github.io/oneliner/

The interface has tabs for each tool (HTML, CSS, JavaScript, JSON, and Base64). Just paste your code or upload files, hit the action button, and you're done. Features include:
- Dark mode support with persistent settings
- Drag and drop file upload
- One-click copy to clipboard
- File download for processed output
- Real-time statistics and file size comparison
- Offline PWA support (works without internet)

## Keyboard shortcuts

- `Ctrl/Cmd + Enter` → Minify/Beautify current tab (not applicable for Base64 tab)
- `Ctrl/Cmd + K` → Clear all fields in current tab

## Running locally

No build tools, no npm, no setup. Just open `index.html` in your browser.

## Deploy your own

This repo uses GitHub Actions to deploy automatically. If you fork it:

1. Enable GitHub Pages in your repo settings
2. Set source to "GitHub Actions"
3. Push to main branch and it deploys

That's it.

## Technical stuff

Built with vanilla JavaScript, no frameworks or dependencies. The whole thing is a single HTML file with embedded CSS and JS. Responsive layout works on mobile too.

## License

MIT. Use it however you want.
