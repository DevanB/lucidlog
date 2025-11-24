# Task Breakdown: Developer Tooling Setup

## Overview
Total Tasks: 6 Task Groups
This specification configures comprehensive developer tooling including static analysis (Larastan), code formatting (Pint), PHP upgrades (Rector), Laravel-specific checks (Ultracite), debugging tools (Telescope, DebugBar), pre-commit hooks (Lefthook), and CI/CD pipeline enhancements.

## Task List

### Configuration Files & Dependencies

#### Task Group 1: Core Tooling Installation and Configuration
**Dependencies:** None

- [x] 1.0 Install and configure static analysis and code quality tools
  - [x] 1.1 Install PHP tooling dependencies
    - Run `composer require --dev larastan/larastan --no-interaction`
    - Run `composer require --dev rector/rector --no-interaction`
    - Verify Laravel Pint is already installed (check composer.json require-dev)
  - [ ] 1.1b Install Ultracite for frontend linting
    - Run `npx ultracite@latest init` to install and configure
    - Verify biome.json configuration is created with React and TypeScript presets
    - Confirm @biomejs/biome is added to package.json devDependencies
  - [x] 1.2 Create Larastan configuration file
    - Create `phpstan.neon.dist` at project root
    - Configure level 5 static analysis
    - Set memory limit to 2G
    - Configure error format as `table`
    - Exclude paths: vendor/, node_modules/, bootstrap/cache/, storage/, public/build/
    - Reference: Use standard Larastan/PHPStan configuration patterns
  - [x] 1.3 Create Rector configuration file
    - Create `rector.php` at project root
    - Enable PHP 8.4 rule set using `SetList::PHP_84`
    - Enable Laravel 12 rule set using `LaravelSetList::LARAVEL_120`
    - Exclude same paths as Larastan (vendor/, node_modules/, storage/, bootstrap/cache/, public/build/)
    - Configure to skip generated files (Wayfinder actions, IDE helper files)
  - [x] 1.4 Configure Pint code formatting
    - Check if `pint.json` exists at project root
    - If not present, create `pint.json` with Laravel preset
    - Use Laravel preset as baseline style
    - Ensure configuration aligns with existing project conventions
  - [x] 1.5 Update Composer scripts for tooling commands
    - Add `"analyse": "vendor/bin/phpstan analyse"` to composer.json scripts section
    - Add `"refactor": "vendor/bin/rector process"` to composer.json scripts section
    - Add `"refactor:check": "vendor/bin/rector process --dry-run"` to composer.json scripts section
    - Add `"format": "vendor/bin/pint"` to composer.json scripts section
    - Add `"format:check": "vendor/bin/pint --test"` to composer.json scripts section
  - [x] 1.6 Create baseline files for legacy code
    - Run `vendor/bin/phpstan analyse --generate-baseline` to create `.phpstan-baseline.neon`
    - Add `.phpstan-baseline.neon` to version control
    - Document baseline purpose in comments

**Acceptance Criteria:**
- All PHP dev dependencies successfully installed via Composer
- `phpstan.neon.dist` exists with level 5 configuration and proper exclusions
- `rector.php` exists with PHP 8.4 and Laravel 12 rule sets
- `pint.json` exists (or Laravel preset is confirmed as default)
- Composer scripts added for analyse, refactor, refactor:check, format, format:check
- Baseline file generated for existing codebase

### Debugging Tools Configuration

#### Task Group 2: Laravel Telescope and DebugBar Setup
**Dependencies:** Task Group 1

- [x] 2.0 Install and configure debugging tools for local/staging environments
  - [x] 2.1 Install Laravel Telescope
    - Run `composer require --dev laravel/telescope --no-interaction`
    - Run `php artisan telescope:install --no-interaction`
    - Run `php artisan migrate --no-interaction` to create Telescope tables
  - [x] 2.2 Configure Telescope for environment-based enabling
    - Edit `config/telescope.php` to check `env('TELESCOPE_ENABLED', false)`
    - Set enabled condition: `'enabled' => env('TELESCOPE_ENABLED', false) && in_array(env('APP_ENV'), ['local', 'staging'])`
    - Configure storage driver (default to database)
    - Review and adjust watchers configuration as needed
  - [x] 2.3 Register Telescope service provider conditionally
    - Edit `bootstrap/providers.php`
    - Add conditional registration: only register `TelescopeServiceProvider` when `APP_ENV` is `local` or `staging`
    - Ensure provider is not loaded in production
  - [x] 2.4 Add Telescope route protection
    - Create authorization gate in `app/Providers/TelescopeServiceProvider.php` or `bootstrap/app.php`
    - Require authentication for `/telescope` route when in staging environment
    - Allow unrestricted access in local environment
  - [x] 2.5 Install Laravel DebugBar
    - Run `composer require --dev barryvdh/laravel-debugbar --no-interaction`
    - Run `php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider" --no-interaction`
  - [x] 2.6 Configure DebugBar for environment-based enabling
    - Edit `config/debugbar.php`
    - Set enabled condition: `'enabled' => env('DEBUGBAR_ENABLED', false) && env('APP_DEBUG') === true && env('APP_ENV') !== 'production'`
    - Verify service provider auto-discovery works correctly
  - [x] 2.7 Update environment example file
    - Add `TELESCOPE_ENABLED=true` to `.env.example` with comment "# Local/Staging only"
    - Add `DEBUGBAR_ENABLED=true` to `.env.example` with comment "# Local/Staging only"

**Acceptance Criteria:**
- Telescope successfully installed with migrations run
- Telescope accessible at `/telescope` route in local environment
- Telescope protected by authentication in staging environment
- Telescope disabled in production environment
- DebugBar successfully installed and configured
- DebugBar visible in local environment when APP_DEBUG=true
- DebugBar disabled in production environment
- Environment variables documented in `.env.example`

### Pre-Commit Hook Management

#### Task Group 3: Lefthook Pre-Commit Hook Configuration
**Dependencies:** Task Group 1

- [x] 3.0 Configure Lefthook for automated pre-commit checks
  - [x] 3.1 Create Mise configuration for Lefthook installation
    - Create `mise.toml` at project root (or edit if exists)
    - Add Lefthook tool definition with version pinning (e.g., version = "latest" or specific version)
    - Configure Mise to install Lefthook as a system tool
    - Document Mise installation requirement in README or setup docs
  - [x] 3.2 Create Lefthook configuration file
    - Create `lefthook.yml` at project root
    - Configure pre-commit hook with staged files pattern: `{staged_files}`
    - Set fail-fast behavior (stop on first error)
  - [x] 3.3 Configure Pint formatting check in Lefthook
    - Add Pint command: `vendor/bin/pint {staged_files}` (auto-fix mode)
    - Run only on staged PHP files using glob pattern filter
    - Set as first check in execution order
  - [x] 3.4 Configure TypeScript type checking in Lefthook
    - Add TypeScript command: `npm run types` for staged TS/TSX files
    - Use glob pattern to filter staged TypeScript/React files
    - Set as second check in execution order
  - [x] 3.5 Configure Larastan static analysis in Lefthook
    - Add Larastan command: `vendor/bin/phpstan analyse --memory-limit=2G {staged_files}`
    - Run only on staged PHP files using glob pattern filter
    - Set as third check in execution order
  - [x] 3.6 Configure Rector PHP upgrade check in Lefthook
    - Add Rector command: `vendor/bin/rector process --dry-run=false {staged_files}` (auto-fix mode)
    - Run only on staged PHP files using glob pattern filter
    - Set as fourth check in execution order
  - [ ] 3.2b Configure Ultracite frontend linting in Lefthook
    - Add Ultracite command: `npx @biomejs/biome check --write {staged_files}`
    - Run only on staged JavaScript/TypeScript files using glob pattern filter: `*.{js,jsx,ts,tsx}`
    - Set as second check in execution order (after Pint, before TypeScript types)
  - [x] 3.8 Configure emergency bypass support
    - Ensure Lefthook respects `--no-verify` flag for emergency commits
    - Document bypass usage in commit failure messages
  - [x] 3.9 Update Composer setup script
    - Add `lefthook install` command to existing `composer run setup` script
    - Ensure hooks are installed automatically during project setup

**Acceptance Criteria:**
- `mise.toml` exists with Lefthook tool definition
- `lefthook.yml` exists with pre-commit configuration
- Pre-commit hook runs all 5 tools in correct order: Pint, Ultracite, TypeScript, Larastan, Rector
- Hooks run only on staged files (not entire codebase)
- Hooks fail fast on first error
- `--no-verify` flag allows bypassing hooks
- `composer run setup` installs Lefthook hooks automatically

### CI/CD Pipeline Enhancement

#### Task Group 4: GitHub Actions Workflow Updates
**Dependencies:** Task Group 1

- [x] 4.0 Update CI/CD workflows for comprehensive code quality checks
  - [x] 4.1 Read existing GitHub Actions workflows
    - Read `.github/workflows/tests.yml` to understand existing structure
    - Read `.github/workflows/lint.yml` to understand existing structure
    - Note PHP version (8.4), Node version (22), and caching patterns
  - [x] 4.2 Update tests.yml workflow with static analysis steps
    - Add Larastan step after Composer dependency installation
    - Command: `vendor/bin/phpstan analyse --memory-limit=2G`
    - Add Rector check step after Larastan
    - Command: `vendor/bin/rector process --dry-run` (check-only, fails on violations)
    - Keep existing Pest test execution steps unchanged
    - Configure steps to fail fast (stop pipeline on first failure)
    - Ensure Composer vendor/ caching is in place
  - [x] 4.3 Update lint.yml workflow for formatting verification
    - Change Pint step from auto-fix to verification mode
    - Command: `vendor/bin/pint --test` (fails on formatting violations)
    - Add TypeScript type checking step
    - Command: `npm run types` after NPM dependency installation
    - Keep existing ESLint and Prettier steps if present
    - Ensure NPM node_modules/ caching is in place
  - [x] 4.4 Configure dependency caching optimization
    - Verify Composer cache uses `~/.composer/cache` or vendor/ directory
    - Verify NPM cache uses `~/.npm` or node_modules/ directory
    - Add cache keys based on lock files (composer.lock, package-lock.json)
  - [x] 4.5 Test CI/CD workflows locally (optional)
    - Use `act` tool or GitHub Actions local runner if available
    - Verify all steps execute correctly
    - Check for proper error messages on failures

**Acceptance Criteria:**
- `tests.yml` includes Larastan and Rector check steps
- `lint.yml` runs Pint in test mode and TypeScript type checking
- Both workflows fail fast on first error
- Dependency caching properly configured for speed
- Existing Pest test execution remains unchanged
- Workflows trigger on correct branches (develop, main) and pull requests

### Testing & Verification

#### Task Group 5: Tooling Validation and Testing
**Dependencies:** Task Groups 1-4

- [x] 5.0 Validate all tooling configurations and integrations
  - [x] 5.1 Test Larastan static analysis
    - Run `composer run analyse` manually on local environment
    - Verify it analyzes entire PHP codebase at level 5
    - Check that exclusion paths are respected (vendor/, node_modules/, etc.)
    - Confirm memory limit (2G) prevents out-of-memory errors
    - Verify baseline file prevents legacy code from failing checks
  - [x] 5.2 Test Rector PHP upgrade checks
    - Run `composer run refactor:check` manually on local environment
    - Verify it detects PHP 8.4 and Laravel 12 upgrade opportunities
    - Check that exclusion paths are respected
    - Verify auto-fix mode: run `composer run refactor` to apply changes
    - Test that generated files (Wayfinder, IDE helpers) are skipped
  - [x] 5.3 Test Pint code formatting
    - Run `composer run format` manually on local environment
    - Verify it formats PHP files according to Laravel preset
    - Run `composer run format:check` to verify formatted code passes
    - Check that formatting is consistent across codebase
  - [ ] 5.4 Test Ultracite frontend linting
    - Run `npx @biomejs/biome check` manually on local environment
    - Verify it detects JavaScript/TypeScript/React code quality issues
    - Run `npx @biomejs/biome check --write` to apply auto-fixes
    - Check that it properly formats and lints frontend files
  - [x] 5.5 Test TypeScript type checking
    - Run `npm run types` manually on local environment
    - Verify it checks all TypeScript/React files
    - Check that generated type definition files are excluded
    - Confirm no type errors in existing codebase
  - [x] 5.6 Test pre-commit hooks end-to-end
    - Install Lefthook: run `lefthook install` or `composer run setup`
    - Make intentional formatting violation in a PHP file
    - Stage the file and attempt commit
    - Verify Pint auto-fixes the formatting issue
    - Make intentional type error in a TypeScript file
    - Stage the file and attempt commit
    - Verify pre-commit hook fails and blocks commit
    - Test `git commit --no-verify` bypass works
  - [x] 5.7 Test debugging tools in local environment
    - Set `TELESCOPE_ENABLED=true` and `APP_ENV=local` in `.env`
    - Start development server and visit `/telescope`
    - Verify Telescope dashboard loads and shows data
    - Set `DEBUGBAR_ENABLED=true` and `APP_DEBUG=true` in `.env`
    - Visit any application page
    - Verify DebugBar appears at bottom of page with debug information
  - [x] 5.8 Verify environment-based tool disabling
    - Set `APP_ENV=production` in `.env`
    - Verify Telescope is not accessible at `/telescope` route
    - Verify DebugBar does not appear on any pages
    - Confirm service providers are not registered in production

**Acceptance Criteria:**
- All Composer scripts execute successfully (analyse, refactor, refactor:check, format, format:check)
- Larastan analyzes codebase at level 5 with proper exclusions
- Rector detects PHP 8.4 and Laravel 12 upgrade opportunities
- Pint formats code according to Laravel preset
- Ultracite detects Laravel-specific issues
- TypeScript type checking passes on existing codebase
- Pre-commit hooks block commits on violations
- Pre-commit hooks auto-fix formatting issues
- `--no-verify` bypass works for emergency commits
- Telescope accessible in local/staging, protected in staging, disabled in production
- DebugBar visible in local when APP_DEBUG=true, disabled in production

### Documentation & Final Testing

#### Task Group 6: CI/CD Validation and Documentation
**Dependencies:** Task Groups 1-5

- [x] 6.0 Validate CI/CD pipeline and document setup
  - [x] 6.1 Trigger CI/CD pipeline test
    - Create a test branch from current work
    - Push changes to remote repository
    - Create pull request to trigger CI/CD workflows
    - Monitor `.github/workflows/tests.yml` execution
    - Monitor `.github/workflows/lint.yml` execution
  - [x] 6.2 Verify CI/CD static analysis steps
    - Check that Larastan runs on full codebase in CI/CD
    - Verify Rector check-only mode runs and reports violations
    - Confirm Pint test mode verifies formatting
    - Verify TypeScript type checking runs in CI/CD
    - Check that existing Pest tests still execute correctly
  - [x] 6.3 Verify CI/CD failure behavior
    - Introduce intentional formatting violation and push
    - Verify CI/CD fails fast and provides clear error message
    - Revert violation and verify CI/CD passes
    - Test with intentional type error
    - Verify CI/CD fails and provides clear TypeScript error
  - [x] 6.4 Verify CI/CD caching performance
    - Check GitHub Actions logs for cache hit/miss
    - Verify Composer dependencies are cached
    - Verify NPM dependencies are cached
    - Note execution time improvements from caching
  - [x] 6.5 Document developer workflow and setup
    - Update project README or create CONTRIBUTING.md
    - Document Mise installation requirement: `curl https://mise.jdx.dev/install.sh | sh` or similar
    - Document first-time setup: `composer run setup` installs Lefthook hooks
    - Document pre-commit hook usage and bypass option (`git commit --no-verify`)
    - Document Composer script commands: `composer run analyse`, `composer run refactor`, etc.
    - Document debugging tools: how to enable Telescope and DebugBar locally
  - [x] 6.6 Document exclusion patterns
    - Create or update `.gitignore` if needed for tool-specific files
    - Document why certain paths are excluded (vendor/, node_modules/, generated files)
    - List all exclusion patterns consistently across tool configs
  - [x] 6.7 Create troubleshooting guide
    - Document common pre-commit hook issues and solutions
    - Document how to regenerate baseline file: `vendor/bin/phpstan analyse --generate-baseline`
    - Document CI/CD debugging: how to read logs and identify failures
    - Document emergency bypass scenarios: when `--no-verify` is appropriate
    - Document how to disable specific hooks temporarily if needed

**Acceptance Criteria:**
- CI/CD pipelines execute successfully on pull requests
- Larastan, Rector, Pint test mode, and TypeScript checking run in CI/CD
- CI/CD fails fast with clear error messages on violations
- Dependency caching improves pipeline execution time
- Developer setup documentation complete and clear
- README or CONTRIBUTING.md documents all Composer scripts
- Troubleshooting guide covers common issues
- Exclusion patterns documented and consistent across tools

## Execution Order

Recommended implementation sequence:
1. Configuration Files & Dependencies (Task Group 1)
2. Debugging Tools Configuration (Task Group 2)
3. Pre-Commit Hook Management (Task Group 3)
4. CI/CD Pipeline Enhancement (Task Group 4)
5. Testing & Verification (Task Group 5)
6. Documentation & Final Testing (Task Group 6)

## Important Notes

**Test Coverage Approach:**
- This feature primarily involves configuration and tooling setup rather than application code
- Validation is performed through manual testing and CI/CD pipeline execution
- No traditional unit/feature tests are written for configuration files
- Testing focuses on verifying each tool runs correctly and integrates properly

**Pre-commit Hook Philosophy:**
- Staged files only for speed (pre-commit)
- Full codebase analysis in CI/CD for comprehensive quality checks
- Auto-fix mode in pre-commit (Pint, Rector) to minimize developer friction
- Check-only mode in CI/CD to prevent unexpected code changes

**Environment-Based Tool Enabling:**
- Telescope and DebugBar are dev dependencies (`--dev` flag)
- Enabled only when `APP_ENV` is `local` or `staging`
- Production environment should never load these tools
- Use environment variables for explicit control: `TELESCOPE_ENABLED`, `DEBUGBAR_ENABLED`

**Exclusion Pattern Consistency:**
- Apply same exclusion patterns across all tools: vendor/, node_modules/, storage/, bootstrap/cache/, public/build/
- Skip generated files: Wayfinder actions, IDE helpers, Vite manifest, compiled assets
- Maintain baseline file (`.phpstan-baseline.neon`) for legacy code that doesn't meet current standards

**CI/CD Integration Strategy:**
- Extend existing workflows rather than creating new ones
- Maintain existing branch triggers and pull request workflows
- Use same PHP (8.4) and Node (22) versions across all tools
- Leverage existing caching patterns for dependencies
- Fail fast to provide rapid feedback on violations
