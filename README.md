# 🚀 Oneliner

**Privacy-first developer tools for code minification, Base64 encoding, and JWT inspection.**

A comprehensive web-based toolkit designed for developers who value **privacy and data security**. All operations are performed entirely in your browser—no servers, no tracking, no data collection. Your code and tokens never leave your device.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://taufiksoleh.github.io/oneliner/)
[![CI Pipeline](https://github.com/taufiksoleh/oneliner/actions/workflows/ci.yml/badge.svg)](https://github.com/taufiksoleh/oneliner/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🔒 Privacy & Security First

**100% Client-Side Processing** – Every operation happens locally in your browser. Your code, tokens, and data are never transmitted to any server.

**No Analytics, No Tracking** – We don't collect, store, or transmit any of your data. Ever.

**Offline Support** – Full Progressive Web App (PWA) support means you can install and use Oneliner completely offline.

**Open Source** – Inspect the code yourself. Complete transparency in how your data is handled.

## ✨ Features

### Code Minification & Beautification
- **HTML, CSS, JavaScript & JSON** – Minify to reduce file size or beautify to improve readability
- **Smart Minification** – Preserves functionality while removing unnecessary whitespace and comments
- **Real-time Statistics** – See exactly how much space you saved with percentage calculations
- **Two-way Processing** – Switch between minified and beautified code instantly

### Base64 Encoder/Decoder
- **Text Encoding** – Convert text to Base64 and back, with full UTF-8 support
- **Image Processing** – Encode images to Base64 data URLs or decode Base64 strings to images
- **File Upload** – Drag & drop or browse to upload files
- **Image Preview** – Visual preview of decoded images
- **Size Information** – Real-time display of Base64 string size

### JWT Encoder/Decoder 🔐
- **Token Inspection** – Safely decode JWT tokens to view header, payload, and signature
- **Token Information** – Display algorithm, issuer, subject, audience, and expiration details
- **Expiration Status** – Human-readable expiration messages (e.g., "Expires in 2 days", "Expired 3 hours ago")
- **Token Creation** – Generate unsigned JWT tokens for testing and development
- **Validation** – Real-time validation with clear error messages
- **Privacy Guaranteed** – All JWT operations are performed locally, tokens never leave your browser

### User Experience
- **Dark Mode** – Eye-friendly dark theme with persistent settings
- **Copy to Clipboard** – One-click copying for all outputs
- **File Download** – Save processed results directly to your device
- **Keyboard Shortcuts** – Efficient workflows with Ctrl/Cmd+Enter (process) and Ctrl/Cmd+K (clear)
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices
- **PWA Support** – Install as a standalone app on any device

## 🎯 Try it Out

**Live Demo:** [https://taufiksoleh.github.io/oneliner/](https://taufiksoleh.github.io/oneliner/)

The interface features tabs for each tool type. Simply:
1. Select your tool (HTML, CSS, JS, JSON, Base64, or JWT)
2. Paste your code or token
3. Click the appropriate button (Minify, Beautify, Encode, Decode)
4. Copy or download your results

All processing happens instantly in your browser.

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + Enter` → Process (Minify/Beautify/Encode/Decode)
- `Ctrl/Cmd + K` → Clear all fields

## 🛠️ Running Locally

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/taufiksoleh/oneliner.git
cd oneliner

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
# Generate static site
npm run generate

# Preview production build
npm run preview
```

## 🚀 Deploy Your Own

This repository uses GitHub Actions for automatic deployment to GitHub Pages.

### Fork and Deploy

1. Fork this repository
2. Go to Settings → Pages in your forked repository
3. Set source to "GitHub Actions"
4. Push to the main branch
5. Your site will be automatically deployed

### Other Hosting Options

Since Oneliner is a static site, you can deploy to:
- **Netlify** – Connect your repo and deploy automatically
- **Vercel** – Import project and deploy with zero config
- **Cloudflare Pages** – Fast global CDN deployment
- **Any Static Host** – Upload the `dist` folder from `npm run generate`

## 🔧 Technical Details

### Tech Stack
- **Nuxt.js 3** – Modern Vue.js framework with SSR/SSG support
- **Vue.js 3** – Composition API for reactive components
- **Pinia** – State management with TypeScript support
- **TypeScript** – Type safety throughout the codebase
- **Vitest** – Fast unit testing with 30+ tests
- **PWA** – Service worker for offline functionality

### Architecture
- **Client-Side Only** – No backend, no API calls, no data transmission
- **Modern ES Modules** – Tree-shaking for optimal bundle size
- **Responsive CSS** – Mobile-first design with CSS variables for theming
- **Web Crypto API** – For JWT signature validation (when implemented)

### Security Features
- **No External Dependencies for Core Logic** – Minification and encoding use browser-native APIs
- **Content Security Policy Ready** – No inline scripts in production
- **XSS Protection** – Proper sanitization and validation
- **Subresource Integrity** – Verified external resources

## 📋 Use Cases

### For Developers
- **Debug JWT Tokens** – Inspect authentication tokens from APIs without exposing them to third-party services
- **Optimize Production Code** – Minify HTML/CSS/JS before deployment
- **Base64 Encoding** – Convert images to data URLs for email templates or inline embedding
- **Token Testing** – Create test JWT tokens for development environments
- **Code Beautification** – Make minified code readable for debugging

### For Security-Conscious Users
- **Private Token Inspection** – Decode sensitive JWT tokens without sending them to external services
- **Offline Work** – Process sensitive data without internet connection
- **No Data Leakage** – Guaranteed local processing with no telemetry

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- jwt.test.ts

# Watch mode
npm run test:watch
```

Current test coverage includes:
- JWT encoding/decoding (30 tests)
- Base64 operations (9 tests)
- Minification logic (multiple test files)

## 🤝 Contributing

Contributions are welcome! We have a comprehensive CI/CD pipeline to ensure code quality.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests
4. Ensure all checks pass locally:
   ```bash
   npm run test              # Run unit tests
   npx vue-tsc --noEmit     # Type checking
   npm run generate         # Build application
   ```
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### CI/CD Pipeline

All pull requests must pass our automated quality checks:

- ✅ **Unit Tests** - All Vitest tests must pass
- ✅ **Type Checking** - TypeScript validation with vue-tsc
- ✅ **Build Verification** - Application must build successfully
- ✅ **E2E Tests** - Playwright tests (when applicable)
- ✅ **Quality Gate** - All checks must pass before merge

The CI pipeline runs automatically on every pull request. See [Branch Protection Guide](.github/BRANCH_PROTECTION.md) for details.

### Development Guidelines

1. **Privacy First** – No external API calls for core features
2. **Write Tests** – Add tests for new features and bug fixes
3. **Type Safety** – Use TypeScript with proper type definitions
4. **Code Style** – Follow existing patterns (Composition API, TypeScript)
5. **Documentation** – Update docs for user-facing changes
6. **Commit Messages** – Use [Conventional Commits](https://www.conventionalcommits.org/)

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

MIT License - Use it however you want, commercially or personally.

## 🙏 Acknowledgments

Built with privacy and developer experience in mind. Special thanks to the open-source community for inspiration and tools.

---

**Remember:** Your data stays on your device. Always. 🔒
