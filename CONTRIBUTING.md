# Contributing to LucidLog

Thank you for your interest in contributing to LucidLog! This guide will help you set up your development environment and understand our workflow.

## Table of Contents

- [Prerequisites](#prerequisites)
- [First-Time Setup](#first-time-setup)
- [Developer Workflow](#developer-workflow)
- [Code Quality Tools](#code-quality-tools)
- [Pre-Commit Hooks](#pre-commit-hooks)
- [Debugging Tools](#debugging-tools)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.4** or higher
- **Composer 2.x**
- **Node.js 22.x** or higher
- **NPM** (comes with Node.js)
- **Mise** - For managing development tools like Lefthook

### Installing Mise

Mise is used to manage development tools consistently across the team. Install it using one of these methods:

```bash
# macOS/Linux (recommended)
curl https://mise.jdx.dev/install.sh | sh

# Or via Homebrew (macOS)
brew install mise

# Or via Cargo (Rust package manager)
cargo install mise
```

After installation, add Mise to your shell profile:

```bash
# For bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc

# For zsh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

# Reload your shell
source ~/.bashrc  # or source ~/.zshrc
```

## First-Time Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd lucidlog
```

2. **Install dependencies and set up the project**

```bash
composer run setup
```

This command will:

- Install Composer dependencies
- Install NPM dependencies
- Copy `.env.example` to `.env`
- Generate application key
- Run database migrations
- Seed the database
- Install Lefthook pre-commit hooks

3. **Install Mise tools**

```bash
mise install
```

This will install Lefthook and any other tools defined in `mise.toml`.

4. **Configure your environment**

Edit `.env` and set up your local configuration:

```env
APP_ENV=local
APP_DEBUG=true

# Enable debugging tools (local/staging only)
TELESCOPE_ENABLED=true
DEBUGBAR_ENABLED=true

# Database configuration
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

5. **Start the development server**

```bash
composer run dev
```

This will start the Laravel development server and Vite dev server for frontend assets.

## Developer Workflow

### Making Changes

1. Create a new branch from `develop`:

```bash
git checkout develop
git pull
git checkout -b feature/your-feature-name
```

2. Make your changes and commit regularly
3. Pre-commit hooks will automatically run on each commit
4. Push your branch and create a pull request

### Running the Development Environment

```bash
# Start Laravel and Vite dev servers
composer run dev

# Or run them separately:
php artisan serve    # Laravel on http://127.0.0.1:8000
npm run dev          # Vite dev server
```

## Code Quality Tools

We use several automated tools to ensure code quality and consistency:

### Available Composer Scripts

```bash
# Static Analysis - Check code for type errors and bugs
composer run analyse

# PHP Upgrades - Apply PHP 8.4 and Laravel 12 upgrades
composer run refactor

# PHP Upgrades (Check Only) - Preview upgrades without applying
composer run refactor:check

# Code Formatting - Auto-fix PHP code style
composer run format

# Code Formatting (Check Only) - Verify code style without fixing
composer run format:check
```

### Running Individual Tools

```bash
# Larastan - Static analysis at level 5
vendor/bin/phpstan analyse --memory-limit=2G

# Rector - PHP and Laravel upgrades
vendor/bin/rector process                # Apply changes
vendor/bin/rector process --dry-run      # Check only

# Laravel Pint - Code formatting (Laravel preset)
vendor/bin/pint                          # Auto-fix
vendor/bin/pint --test                   # Check only

# TypeScript Type Checking
npm run types

# Frontend Linting
npm run lint                             # Check
npm run format                           # Auto-fix
```

## Pre-Commit Hooks

Pre-commit hooks run automatically before each commit to catch issues early. They run only on staged files for speed.

### Hook Execution Order

When you commit, these checks run in order:

1. **Laravel Pint** - Auto-fixes code formatting
2. **TypeScript Types** - Checks TypeScript type errors
3. **Larastan** - Analyzes PHP code for type errors
4. **Rector** - Auto-applies PHP 8.4 and Laravel 12 upgrades

If any check fails, the commit is blocked and you'll see an error message.

### Bypassing Hooks (Emergency Only)

In emergency situations where you need to commit despite failing checks:

```bash
git commit --no-verify -m "Emergency fix: description"
```

**Note:** Only use `--no-verify` when absolutely necessary. CI/CD will still catch issues.

### Disabling Lefthook Temporarily

If you need to disable hooks temporarily:

```bash
# Uninstall hooks
lefthook uninstall

# Re-install when ready
lefthook install
```

## Debugging Tools

### Laravel Telescope

Telescope provides insight into requests, exceptions, database queries, jobs, and more.

**Accessing Telescope:**

1. Ensure `TELESCOPE_ENABLED=true` in your `.env`
2. Visit `http://127.0.0.1:8000/telescope`

**Features:**

- Request monitoring
- Exception tracking
- Database query inspection
- Job monitoring
- Cache operations
- Mail preview

**Environment Behavior:**

- **Local:** Accessible without authentication
- **Staging:** Requires authentication
- **Production:** Completely disabled

### Laravel DebugBar

DebugBar shows debug information at the bottom of each page.

**Enabling DebugBar:**

Set in your `.env`:

```env
APP_DEBUG=true
DEBUGBAR_ENABLED=true
```

**Features:**

- Request/response information
- Database queries with execution time
- Views and composers
- Route information
- Memory usage

**Environment Behavior:**

- **Local:** Visible when `APP_DEBUG=true`
- **Production:** Always disabled

## CI/CD Pipeline

Our CI/CD pipeline runs on every push and pull request to the `master` branch.

### Pipeline Stages

#### Tests Workflow (`tests.yml`)

1. Setup PHP 8.4 and Node 22
2. Install dependencies (with caching)
3. Build frontend assets
4. **Run Larastan** - Static analysis on entire codebase
5. **Run Rector** - Check for PHP 8.4 and Laravel 12 compliance
6. **Run Pest** - Execute test suite

#### Linter Workflow (`lint.yml`)

1. Setup PHP 8.4 and Node 22
2. Install dependencies (with caching)
3. **Run Pint (Test Mode)** - Verify code formatting
4. **Run TypeScript Type Checking** - Verify type safety
5. **Format Frontend** - Auto-fix Prettier formatting
6. **Lint Frontend** - Run ESLint

### Pipeline Behavior

- **Fail Fast:** Pipeline stops on first failure
- **Caching:** Composer and NPM dependencies are cached for speed
- **Check Mode:** Tools run in check-only mode (no auto-fixes)
- **Full Codebase:** All tools analyze the entire codebase, not just changed files

### Viewing Pipeline Results

1. Navigate to your pull request on GitHub
2. Click the "Checks" tab
3. View logs for each workflow step
4. Failed steps show detailed error messages

## Troubleshooting

### Pre-Commit Hook Issues

**Problem:** Hooks not running when I commit

**Solution:**

```bash
# Reinstall hooks
lefthook install

# Verify installation
lefthook run pre-commit --all-files
```

**Problem:** Pre-commit hook is too slow

**Solution:** Hooks only run on staged files. If you've staged many files, consider committing in smaller batches.

**Problem:** Pint fails with formatting errors

**Solution:**

```bash
# Auto-fix formatting issues
vendor/bin/pint

# Stage the formatted files
git add .

# Commit again
git commit -m "Your message"
```

### Static Analysis Issues

**Problem:** Larastan reports many errors in legacy code

**Solution:** We maintain a baseline file for legacy code. To regenerate it:

```bash
vendor/bin/phpstan analyse --generate-baseline
git add phpstan-baseline.neon
git commit -m "Update PHPStan baseline"
```

**Problem:** Larastan runs out of memory

**Solution:** The memory limit is set to 2G. If you need more:

```bash
vendor/bin/phpstan analyse --memory-limit=4G
```

### Rector Issues

**Problem:** Rector wants to change auto-generated files

**Solution:** Generated files should be excluded in `rector.php`. Check that these paths are excluded:

- `resources/js/types/generated.d.ts`
- Wayfinder action files
- IDE helper files

**Problem:** I want to preview Rector changes

**Solution:**

```bash
# Dry-run shows what would change
composer run refactor:check

# Apply changes
composer run refactor
```

### TypeScript Issues

**Problem:** Type errors in generated files

**Solution:** Generated type files are excluded from type checking. If you see errors in `resources/js/types/generated.d.ts`, regenerate them:

```bash
php artisan wayfinder:generate
```

### CI/CD Issues

**Problem:** CI/CD fails but pre-commit hook passed

**Solution:** Pre-commit hooks run on staged files only. CI/CD runs on the entire codebase. Run full checks locally:

```bash
# Run all tools on entire codebase
composer run analyse
composer run refactor:check
composer run format:check
npm run types
```

**Problem:** CI/CD caching not working

**Solution:** Check GitHub Actions logs for cache hit/miss messages. Cache keys are based on `composer.lock` and `package-lock.json`. If dependencies change, cache will miss (expected behavior).

**Problem:** How do I debug CI/CD failures?

**Solution:**

1. Click the failed workflow run on GitHub
2. Expand the failed step
3. Read the error message and stack trace
4. Reproduce locally using the same command
5. Fix the issue and push again

### Debugging Tools Issues

**Problem:** Telescope not loading at `/telescope`

**Solution:**

1. Check `TELESCOPE_ENABLED=true` in `.env`
2. Check `APP_ENV=local` (or `staging`)
3. Run migrations: `php artisan migrate`
4. Clear cache: `php artisan cache:clear`

**Problem:** DebugBar not showing

**Solution:**

1. Check `DEBUGBAR_ENABLED=true` in `.env`
2. Check `APP_DEBUG=true` in `.env`
3. Check `APP_ENV` is not `production`
4. Clear config cache: `php artisan config:clear`

### Emergency Bypass Scenarios

Use `git commit --no-verify` only in these situations:

1. **Critical Production Fix:** Hotfix needs to deploy immediately
2. **Broken Tool:** Pre-commit hook itself is broken
3. **Infrastructure Changes:** Changing tool configurations that would fail their own checks
4. **External Dependencies:** Third-party library causing false positives

**Always** create a follow-up task to fix the underlying issue properly.

## Exclusion Patterns

The following paths are excluded from all code quality tools:

### Standard Exclusions

- `vendor/` - Composer dependencies
- `node_modules/` - NPM dependencies
- `storage/` - Runtime storage files
- `bootstrap/cache/` - Framework cache
- `public/build/` - Compiled assets
- `.phpunit.result.cache` - Test cache

### Generated Files

- `resources/js/types/generated.d.ts` - TypeScript types from Wayfinder
- Wayfinder action files
- IDE helper files
- Vite manifest

### Why Exclude These?

- **Dependencies:** We don't control third-party code
- **Generated Files:** Auto-generated, will be overwritten
- **Cache Files:** Temporary runtime data
- **Build Artifacts:** Compiled output, not source code

## Getting Help

- **Documentation:** Check this guide first
- **GitHub Issues:** Report bugs and request features
- **Pull Request Reviews:** Ask questions in PR comments
- **Team Chat:** Reach out to the team for help

---

Happy coding! Thank you for contributing to LucidLog.
