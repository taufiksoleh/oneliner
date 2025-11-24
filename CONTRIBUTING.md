# Contributing to Oneliner

First off, thank you for considering contributing to Oneliner! It's people like you that make Oneliner such a great tool.

## 🔒 Privacy-First Principle

Before contributing, please understand our core principle: **All operations must be performed client-side**. We do not send data to external servers, use analytics, or track users in any way.

When contributing:
- ❌ Do not add external API calls for core features
- ❌ Do not introduce analytics or tracking
- ❌ Do not add unnecessary dependencies
- ✅ Keep all processing in the browser
- ✅ Maintain offline functionality
- ✅ Prioritize privacy and security

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/oneliner.git
   cd oneliner
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Workflow

### Making Changes

1. **Write your code**
   - Follow the existing code style
   - Use TypeScript for type safety
   - Write meaningful commit messages

2. **Add tests**
   - Write unit tests for new features
   - Ensure existing tests still pass
   - Aim for good test coverage

3. **Test locally**
   ```bash
   # Run unit tests
   npm run test

   # Type checking
   npx vue-tsc --noEmit

   # Build
   npm run generate

   # E2E tests (if applicable)
   npm run test:e2e
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Use [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Fill in all relevant sections
   - Link related issues
   - Wait for CI checks to pass

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-reviewed your own code
- [ ] Commented code where necessary
- [ ] Updated documentation if needed
- [ ] Added tests for new features
- [ ] All tests pass locally
- [ ] No new warnings or errors
- [ ] Privacy-first principles maintained

### PR Requirements

Your PR must pass all CI checks:
- ✅ Unit tests
- ✅ Type checking
- ✅ Build verification
- ✅ E2E tests (if applicable)

See [Branch Protection Guide](.github/BRANCH_PROTECTION.md) for details.

## 🧪 Testing Guidelines

### Unit Tests

Write unit tests for:
- Utility functions
- Business logic
- Encoding/decoding operations
- Validation logic

Example:
```typescript
import { describe, it, expect } from 'vitest'
import { yourFunction } from '~/utils/your-util'

describe('Your Feature', () => {
  it('should handle normal case', () => {
    const result = yourFunction('input')
    expect(result).toBe('expected')
  })

  it('should handle edge cases', () => {
    expect(() => yourFunction('')).toThrow()
  })
})
```

### E2E Tests

Write E2E tests for:
- User workflows
- Critical features
- Integration between components

Example:
```typescript
import { test, expect } from '@playwright/test'

test('should encode JWT token', async ({ page }) => {
  await page.goto('/')
  await page.click('text=JWT')
  // ... rest of test
})
```

## 📝 Code Style

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use strict type checking

### Vue Components
- Use Composition API
- Use `<script setup>` syntax
- Follow Vue 3 best practices
- Keep components focused and small

### Naming Conventions
- Components: PascalCase (e.g., `JwtEditor.vue`)
- Files: kebab-case (e.g., `jwt-utils.ts`)
- Functions: camelCase (e.g., `decodeJwt`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_SIZE`)

### File Organization
```
├── components/       # Vue components
├── composables/      # Vue composables
├── pages/           # Nuxt pages
├── stores/          # Pinia stores
├── types/           # TypeScript types
├── utils/           # Utility functions
└── tests/           # Test files
    ├── unit/        # Unit tests
    └── e2e/         # E2E tests
```

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

- Check existing issues to avoid duplicates
- Verify the bug in the latest version
- Collect information about your environment

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Version: [e.g., 2.0.0]

**Additional context**
Any other relevant information.
```

## 💡 Suggesting Features

We love feature suggestions! Please:

1. **Check existing feature requests** to avoid duplicates
2. **Clearly describe the feature** and its benefits
3. **Explain the use case** - why is it needed?
4. **Consider privacy implications** - does it maintain our privacy-first approach?

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Who would benefit and how?

**Proposed Solution**
How should it work?

**Privacy Considerations**
How does this maintain our privacy-first approach?

**Alternatives Considered**
Other approaches you've thought about.
```

## 🏗️ Architecture Guidelines

### State Management
- Use Pinia for global state
- Keep state minimal and focused
- Use TypeScript for store types

### Utilities
- Write pure functions when possible
- Handle errors gracefully
- Document complex logic
- Add JSDoc comments

### Components
- Keep components small and focused
- Use composables for reusable logic
- Emit events rather than modify props
- Use TypeScript props and emits

## 📚 Documentation

When adding features:

1. **Update README.md** if user-facing
2. **Add JSDoc comments** for functions
3. **Update type definitions** if needed
4. **Add examples** where helpful

## 🔄 Review Process

1. **Automated Checks** - CI must pass
2. **Code Review** - Maintainer review
3. **Testing** - Manual testing if needed
4. **Merge** - Squash and merge to main

## 📞 Getting Help

- **Questions?** Open a discussion
- **Bugs?** Open an issue
- **Ideas?** Open a feature request

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes
- Project acknowledgments

---

Thank you for contributing to Oneliner! Your efforts help make privacy-focused development tools better for everyone. 🚀
