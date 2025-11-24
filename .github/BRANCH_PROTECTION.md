# Branch Protection Setup Guide

This document explains how to configure branch protection rules for the main branch to ensure code quality.

## Recommended Branch Protection Rules

### For `main` branch:

1. **Go to Repository Settings**
   - Navigate to `Settings` → `Branches`
   - Click "Add branch protection rule"
   - Enter branch name pattern: `main`

2. **Require Pull Request Reviews**
   - ✅ Require a pull request before merging
   - Require approvals: `1` (adjust based on team size)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (optional)

3. **Require Status Checks**
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - **Required status checks:**
     - `Unit Tests`
     - `Type Check`
     - `Build Application`
     - `Quality Gate`

4. **Additional Restrictions**
   - ✅ Require conversation resolution before merging
   - ✅ Require signed commits (recommended)
   - ✅ Require linear history (optional, keeps history clean)
   - ✅ Include administrators (applies rules to admins too)

5. **Force Push Protection**
   - ✅ Do not allow bypassing the above settings
   - ✅ Do not allow force pushes
   - ✅ Do not allow deletions

## CI/CD Pipeline

Our CI pipeline (`ci.yml`) automatically runs on all pull requests to `main` and `develop` branches:

### Quality Checks:
1. **Unit Tests** - Runs all Vitest unit tests
2. **Type Check** - Validates TypeScript types with vue-tsc
3. **Build** - Ensures the application builds successfully
4. **E2E Tests** - Runs Playwright end-to-end tests (optional)
5. **Coverage** - Generates and uploads test coverage reports

### Quality Gate:
All checks must pass before a PR can be merged. The quality gate job verifies:
- ✅ Unit tests passed
- ✅ Type checking passed
- ✅ Build succeeded

## Development Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write code following project standards
   - Add tests for new features
   - Update documentation

3. **Run Local Checks**
   ```bash
   # Run tests
   npm run test

   # Type check
   npx vue-tsc --noEmit

   # Build
   npm run generate
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push -u origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Fill out the PR template completely
   - Link related issues
   - Wait for CI checks to pass
   - Request review from team members

6. **Address Review Comments**
   - Make requested changes
   - Push new commits
   - CI will automatically re-run

7. **Merge**
   - Once approved and all checks pass
   - Use "Squash and merge" for clean history (recommended)

## Status Badge

Add this to your README to show CI status:

```markdown
[![CI Pipeline](https://github.com/taufiksoleh/oneliner/actions/workflows/ci.yml/badge.svg)](https://github.com/taufiksoleh/oneliner/actions/workflows/ci.yml)
```

## Troubleshooting

### CI Fails on Type Check
```bash
# Run locally to see errors
npx vue-tsc --noEmit
```

### Tests Fail
```bash
# Run tests with verbose output
npm run test -- --reporter=verbose

# Run specific test file
npm run test -- jwt.test.ts
```

### Build Fails
```bash
# Clean install and rebuild
rm -rf node_modules package-lock.json
npm install
npm run generate
```

## Privacy-First Principle

When reviewing PRs, ensure:
- No external API calls for core features
- All processing remains client-side
- No analytics or tracking added
- Dependencies are minimal and audited
- Security best practices followed

## Questions?

If you have questions about the CI/CD setup, please open an issue or contact the maintainers.
