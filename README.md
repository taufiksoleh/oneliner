# Oneliner

A web-based minifier for HTML, CSS, JavaScript, and JSON. Built to help developers optimize their code quickly without installing anything.

## What it does

Oneliner strips out unnecessary whitespace, comments, and formatting from your code to reduce file size. Pretty straightforward. You can paste code directly, drag and drop files, or upload them. The tool shows you how much space you saved and lets you download or copy the results.

Works with:
- HTML (preserves content in pre, textarea, script tags)
- CSS (removes comments, optimizes spacing)
- JavaScript (basic minification while keeping functionality intact)
- JSON (validates and compresses)

## Try it out

**Live version:** https://taufiksoleh.github.io/oneliner/

The interface has tabs for each file type. Just paste your code, hit minify, and you're done. There's also dark mode if you're into that.

## Keyboard shortcuts

- `Ctrl/Cmd + Enter` → Minify current tab
- `Ctrl/Cmd + K` → Clear everything

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
