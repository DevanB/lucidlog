# Developer Setup Quick Reference

This document provides a quick reference for developers setting up LucidLog locally and understanding tool configurations.

## Quick Setup

```bash
# 1. Install Mise (if not already installed)
curl https://mise.jdx.dev/install.sh | sh
eval "$(mise activate bash)"  # or zsh

# 2. Clone and setup project
git clone <repository-url>
cd lucidlog
composer run setup

# 3. Install development tools
mise install

# 4. Start development
composer run dev
```

## Tool Configurations Overview

### Larastan (Static Analysis)

**Configuration:** `phpstan.neon.dist`
- **Level:** 5
- **Memory Limit:** 2G
- **Error Format:** table
- **Baseline:** `phpstan-baseline.neon` (tracks legacy code exceptions)

**Run Commands:**
```bash
composer run analyse                              # Full codebase
vendor/bin/phpstan analyse --memory-limit=2G     # Direct command
vendor/bin/phpstan analyse app/Models/User.php   # Single file
vendor/bin/phpstan analyse --generate-baseline   # Regenerate baseline
```

### Rector (PHP Upgrades)

**Configuration:** `rector.php`
- **PHP Version:** 8.4
- **Laravel Version:** 12
- **Rule Sets:** SetList::PHP_84, LaravelSetList::LARAVEL_120

**Run Commands:**
```bash
composer run refactor          # Apply changes (auto-fix)
composer run refactor:check    # Check only (dry-run)
vendor/bin/rector process app/Models  # Specific directory
```

### Laravel Pint (Code Formatting)

**Configuration:** `pint.json`
- **Preset:** Laravel
- **Auto-fix:** Enabled in pre-commit
- **Check Mode:** Used in CI/CD

**Run Commands:**
```bash
composer run format            # Auto-fix entire codebase
composer run format:check      # Check only
vendor/bin/pint app/           # Specific directory
vendor/bin/pint --dirty        # Only changed files (git)
```

### TypeScript Type Checking

**Configuration:** `tsconfig.json`
- **Strict Mode:** Enabled
- **Path Aliases:** `@/` maps to `resources/js/`
- **Incremental:** Enabled for performance

**Run Commands:**
```bash
npm run types                  # Full type check
npx tsc --noEmit              # Direct command
```

### Lefthook (Pre-Commit Hooks)

**Configuration:** `lefthook.yml`
- **Trigger:** Pre-commit
- **Scope:** Staged files only
- **Fail Fast:** Stops on first error

**Hook Execution Order:**
1. Laravel Pint (auto-fixes formatting)
2. TypeScript Type Check
3. Larastan (static analysis)
4. Rector (auto-applies upgrades)

**Commands:**
```bash
lefthook install                        # Install hooks
lefthook uninstall                      # Remove hooks
lefthook run pre-commit --all-files     # Test all hooks
git commit --no-verify                  # Bypass hooks (emergency only)
```

### Mise (Tool Management)

**Configuration:** `mise.toml`
- **Tools:** Lefthook (latest)

**Commands:**
```bash
mise install           # Install all tools from mise.toml
mise list              # Show installed tools
mise current           # Show active versions
mise upgrade           # Upgrade tools
```

## Exclusion Patterns Reference

The following paths are excluded from all code quality tools to avoid analyzing third-party code, caches, and generated files.

### Standard Exclusions (All Tools)

| Path | Reason |
|------|--------|
| `vendor/` | Composer dependencies (third-party) |
| `node_modules/` | NPM dependencies (third-party) |
| `storage/` | Runtime storage, logs, caches |
| `bootstrap/cache/` | Framework cache files |
| `public/build/` | Compiled frontend assets |

### Tool-Specific Exclusions

#### Larastan (`phpstan.neon.dist`)
```neon
parameters:
  excludePaths:
    - vendor/
    - node_modules/
    - bootstrap/cache/
    - storage/
    - public/build/
```

#### Rector (`rector.php`)
```php
->withPaths([
    __DIR__ . '/app',
    __DIR__ . '/config',
    __DIR__ . '/database',
    __DIR__ . '/routes',
    __DIR__ . '/tests',
])
->withSkip([
    __DIR__ . '/vendor',
    __DIR__ . '/node_modules',
    __DIR__ . '/storage',
    __DIR__ . '/bootstrap/cache',
    __DIR__ . '/public/build',
    __DIR__ . '/resources/js/types/generated.d.ts',
    __DIR__ . '/resources/js/actions',
    __DIR__ . '/_ide_helper.php',
]);
```

#### TypeScript (`tsconfig.json`)
```json
{
  "exclude": [
    "node_modules",
    "vendor",
    "storage",
    "public",
    "resources/js/types/generated.d.ts"
  ]
}
```

#### Git (`.gitignore`)
```gitignore
# Dependencies
/vendor
/node_modules

# Build artifacts
/public/build
/public/hot
/bootstrap/ssr

# Generated files
/resources/js/actions
/resources/js/routes
/resources/js/wayfinder

# Tool caches
.phpunit.result.cache
/.phpstan-cache
/rector.cache
```

### Generated Files to Exclude

These files are auto-generated and should never be manually edited or analyzed:

| File Pattern | Tool | Purpose |
|-------------|------|---------|
| `resources/js/types/generated.d.ts` | Wayfinder | TypeScript route types |
| `resources/js/actions/**` | Wayfinder | Route action functions |
| `resources/js/routes/**` | Wayfinder | Route definitions |
| `_ide_helper.php` | Laravel IDE Helper | IDE autocomplete |
| `_ide_helper_models.php` | Laravel IDE Helper | Model autocomplete |
| `.phpstorm.meta.php` | Laravel IDE Helper | PHPStorm metadata |

## Environment Variables

### Development (.env)

```env
APP_NAME=LucidLog
APP_ENV=local
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://127.0.0.1:8000

# Database
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite

# Debugging Tools (local/staging only)
TELESCOPE_ENABLED=true
DEBUGBAR_ENABLED=true

# Cache (local development)
CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

# Mail (local development)
MAIL_MAILER=log
```

### Staging (.env)

```env
APP_ENV=staging
APP_DEBUG=false

# Debugging Tools (authenticated access)
TELESCOPE_ENABLED=true
DEBUGBAR_ENABLED=false

# Use production-like services
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### Production (.env)

```env
APP_ENV=production
APP_DEBUG=false

# Debugging Tools DISABLED
TELESCOPE_ENABLED=false
DEBUGBAR_ENABLED=false

# Production services
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

## File Structure

```
lucidlog/
├── app/                           # Application code
│   ├── Actions/Fortify/          # Authentication actions
│   ├── Http/Controllers/         # Controllers
│   ├── Models/                   # Eloquent models
│   └── Providers/                # Service providers
├── bootstrap/                     # Framework bootstrap
│   ├── app.php                   # Application bootstrap
│   ├── cache/                    # Framework cache (excluded)
│   └── providers.php             # Service provider list
├── config/                        # Configuration files
│   ├── app.php                   # Application config
│   ├── database.php              # Database config
│   ├── debugbar.php              # DebugBar config
│   └── telescope.php             # Telescope config
├── database/
│   ├── factories/                # Model factories
│   ├── migrations/               # Database migrations
│   └── seeders/                  # Database seeders
├── public/                        # Public assets
│   ├── build/                    # Compiled assets (excluded)
│   └── index.php                 # Entry point
├── resources/
│   ├── css/                      # Stylesheets
│   │   └── app.css              # Main stylesheet (Tailwind)
│   ├── js/                       # Frontend code
│   │   ├── actions/             # Wayfinder actions (generated, excluded)
│   │   ├── Components/          # React components
│   │   ├── Layouts/             # Page layouts
│   │   ├── Pages/               # Inertia pages
│   │   ├── routes/              # Wayfinder routes (generated, excluded)
│   │   ├── types/               # TypeScript types
│   │   │   └── generated.d.ts   # Generated types (excluded)
│   │   └── app.tsx              # Frontend entry point
│   └── views/                    # Blade views (if any)
├── routes/
│   ├── console.php               # Console routes
│   └── web.php                   # Web routes
├── storage/                       # Runtime storage (excluded)
│   ├── app/
│   ├── framework/
│   └── logs/
├── tests/
│   ├── Feature/                  # Feature tests
│   └── Unit/                     # Unit tests
├── vendor/                        # Composer dependencies (excluded)
├── .env                          # Environment config (not in git)
├── .env.example                  # Environment template
├── .gitignore                    # Git exclusions
├── composer.json                 # PHP dependencies
├── composer.lock                 # PHP dependency lock
├── lefthook.yml                  # Pre-commit hooks
├── mise.toml                     # Development tools
├── package.json                  # NPM dependencies
├── package-lock.json             # NPM dependency lock
├── phpstan.neon.dist             # Larastan config
├── phpstan-baseline.neon         # Larastan baseline
├── pint.json                     # Pint config
├── rector.php                    # Rector config
├── tsconfig.json                 # TypeScript config
└── vite.config.ts                # Vite config
```

## Composer Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | Start servers | Laravel + Vite dev servers |
| `setup` | Install & configure | First-time project setup |
| `analyse` | Run Larastan | Static analysis |
| `refactor` | Run Rector | Apply PHP/Laravel upgrades |
| `refactor:check` | Run Rector dry-run | Check upgrades without applying |
| `format` | Run Pint | Auto-fix code formatting |
| `format:check` | Run Pint test | Verify code formatting |

## NPM Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | Vite dev server | Hot module replacement |
| `build` | Vite build | Production build |
| `types` | TypeScript check | Type checking |
| `lint` | ESLint | JavaScript/TypeScript linting |
| `format` | Prettier | Auto-fix formatting |

## Common Workflows

### Starting Work on New Feature

```bash
# 1. Update main branch
git checkout develop
git pull

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Start development
composer run dev

# 4. Make changes and commit
# Pre-commit hooks run automatically
git add .
git commit -m "Add feature: description"

# 5. Push and create PR
git push -u origin feature/my-feature
```

### Fixing Pre-Commit Hook Failures

```bash
# Hooks auto-fix formatting issues
# If commit fails, review the changes made by hooks

# Check what changed
git diff

# Add the auto-fixed files
git add .

# Commit again
git commit -m "Your message"
```

### Running Full Quality Check Locally

```bash
# Before pushing, run all checks that CI/CD runs
composer run analyse        # Larastan
composer run refactor:check # Rector
composer run format:check   # Pint
npm run types               # TypeScript
php artisan test            # Pest

# If all pass, you're good to push
git push
```

### Regenerating Baseline for Legacy Code

```bash
# When adding new tools or upgrading analysis level
vendor/bin/phpstan analyse --generate-baseline

# Commit the updated baseline
git add phpstan-baseline.neon
git commit -m "Update PHPStan baseline"
```

### Updating Dependencies

```bash
# Update Composer dependencies
composer update

# Update NPM dependencies
npm update

# Commit lock files
git add composer.lock package-lock.json
git commit -m "Update dependencies"

# Run tests to ensure compatibility
php artisan test
```

## Performance Tips

### Speed Up Pre-Commit Hooks

- Commit smaller batches of files
- Use `git add -p` for selective staging
- Disable specific hooks temporarily if needed (edit `lefthook.yml`)

### Speed Up PHPStan

- Use result cache (enabled by default)
- Increase memory limit if needed
- Focus on specific directories when testing

### Speed Up Rector

- Process specific directories instead of entire codebase
- Use `--dry-run` to check before applying
- Run in CI/CD, not always locally

### Speed Up CI/CD

- Ensure caching is working (check workflow logs)
- Keep dependencies up to date
- Optimize test suite (parallel execution if available)

## Useful Aliases

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# Laravel aliases
alias sail='./vendor/bin/sail'
alias art='php artisan'
alias tinker='php artisan tinker'

# Testing
alias t='php artisan test'
alias tf='php artisan test --filter'

# Code quality
alias analyse='composer run analyse'
alias refactor='composer run refactor'
alias format='composer run format'

# Git aliases
alias gaa='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gco='git checkout'
alias gst='git status'
```

## IDE Configuration

### VS Code

Recommended extensions:
- `bmewburn.vscode-intelephense-client` (PHP IntelliSense)
- `MehediDracula.php-namespace-resolver` (PHP namespace)
- `bradlc.vscode-tailwindcss` (Tailwind CSS)
- `esbenp.prettier-vscode` (Prettier)
- `dbaeumer.vscode-eslint` (ESLint)

Settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[php]": {
    "editor.defaultFormatter": "junstyle.php-cs-fixer"
  }
}
```

### PHPStorm

Settings:
- Enable Laravel plugin
- Configure PHP CS Fixer to use Pint
- Enable TypeScript support
- Configure code style to match Laravel preset

## Additional Resources

- [CONTRIBUTING.md](CONTRIBUTING.md) - Detailed contribution guide
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues and solutions
- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

This is a living document. Keep it updated as the project evolves.
