# Specification: Developer Tooling Setup

## Goal
Configure comprehensive developer tooling including static analysis, code formatting, debugging tools, and automated quality checks to ensure code quality and consistency across local development, pre-commit hooks, and CI/CD pipelines.

## User Stories
- As a developer, I want automated code quality checks on commit so that issues are caught early before code review
- As a team member, I want consistent code formatting and static analysis in CI/CD so that all code meets quality standards before merging

## Specific Requirements

**Larastan Static Analysis Configuration**
- Install `larastan/larastan` via Composer as a dev dependency
- Configure at level 5 in `phpstan.neon.dist` file at project root
- Exclude standard paths: vendor/, node_modules/, bootstrap/cache/, storage/, public/build/
- Run on staged PHP files only during pre-commit hooks
- Run on entire PHP codebase during CI/CD pipeline
- Use `phpstan analyse --memory-limit=2G` for execution
- Configure error format as `table` for readability

**Rector PHP Upgrade Configuration**
- Install `rector/rector` via Composer as a dev dependency
- Create `rector.php` configuration file at project root
- Enable PHP 8.4 rule set using `SetList::PHP_84`
- Enable Laravel 12 rule set using `LaravelSetList::LARAVEL_120`
- Exclude same paths as Larastan (vendor/, node_modules/, storage/, bootstrap/cache/)
- Auto-fix mode on pre-commit: `rector process --dry-run=false`
- Check-only mode in CI/CD: `rector process --dry-run` that fails build on violations

**Ultracite Laravel-Specific Checks**
- Install `sinnbeck/laravel-ultracite` via Composer as a dev dependency
- Run `php artisan ultracite:check` on staged PHP files during pre-commit
- Configure to check for Laravel best practices and common anti-patterns
- Exclude standard Laravel paths (vendor/, storage/, bootstrap/cache/)

**Laravel Pint Code Formatting**
- Laravel Pint already installed in composer.json
- Create `pint.json` configuration file if custom rules needed, otherwise use Laravel preset
- Run `vendor/bin/pint` on staged PHP files during pre-commit (auto-fix)
- Run `vendor/bin/pint --test` in CI/CD to verify formatting (fails on violations)
- Use Laravel preset as baseline style

**TypeScript Type Checking**
- TypeScript already installed via package.json
- Run `npm run types` (tsc --noEmit) on pre-commit for staged TS/TSX files
- Run full type check in CI/CD pipeline
- Leverage existing `tsconfig.json` configuration

**Lefthook Pre-Commit Hook Management**
- Create `mise.toml` file to install Lefthook as a system tool
- Define Lefthook installation with version pinning in mise.toml
- Create `lefthook.yml` configuration at project root
- Configure pre-commit hook that runs on staged files only using `{staged_files}` pattern
- Execute in order: Pint (formatting), TypeScript types, Larastan (analysis), Rector (upgrades), Ultracite (Laravel checks)
- Each tool should fail fast (stop on first error)
- Support `--no-verify` flag for emergency bypasses
- Install hooks automatically with `lefthook install` in setup documentation

**Laravel Telescope Installation**
- Install `laravel/telescope` via Composer as a dev dependency
- Publish Telescope assets and migrations using `php artisan telescope:install`
- Configure in `config/telescope.php` to enable only when `APP_ENV` is `local` or `staging`
- Add `TELESCOPE_ENABLED=true` to `.env.example` with comment for local/staging only
- Register TelescopeServiceProvider conditionally in `bootstrap/providers.php`
- Add `/telescope` route protection to ensure staging requires authentication

**Laravel DebugBar Installation**
- Install `barryvdh/laravel-debugbar` via Composer as a dev dependency
- Publish DebugBar config using `php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"`
- Configure in `config/debugbar.php` to enable only when `APP_DEBUG=true` and `APP_ENV` is not `production`
- Add `DEBUGBAR_ENABLED=true` to `.env.example` for local/staging environments
- Ensure DebugBar service provider auto-discovery works correctly

**CI/CD Pipeline Enhancement**
- Update existing `.github/workflows/tests.yml` to include static analysis steps
- Add Larastan step after dependency installation: `vendor/bin/phpstan analyse`
- Add Rector check step: `vendor/bin/rector process --dry-run`
- Keep existing Pest test execution
- Update `.github/workflows/lint.yml` to verify formatting instead of auto-fixing
- Change Pint step from `vendor/bin/pint` to `vendor/bin/pint --test`
- Add TypeScript type checking: `npm run types`
- Configure steps to fail fast (stop pipeline on first failure)
- Add dependency caching for Composer (vendor/) and NPM (node_modules/)

**Composer Scripts Integration**
- Add `"analyse": "vendor/bin/phpstan analyse"` to composer.json scripts
- Add `"refactor": "vendor/bin/rector process"` to composer.json scripts
- Add `"refactor:check": "vendor/bin/rector process --dry-run"` to composer.json scripts
- Add `"format": "vendor/bin/pint"` to composer.json scripts
- Add `"format:check": "vendor/bin/pint --test"` to composer.json scripts
- Add setup step to install Lefthook hooks in existing `"setup"` script array

**Exclusion Pattern Configuration**
- Apply consistent exclusions across all tools: vendor/, node_modules/, storage/, bootstrap/cache/, public/build/, .phpunit.result.cache, dist/, build/
- Add `.phpstan-baseline.neon` to version control for legacy code baseline
- Configure Rector to skip generated files (Wayfinder actions, IDE helper files)
- Ensure TypeScript checks exclude `resources/js/types/generated.d.ts` and similar auto-generated types

## Existing Code to Leverage

**Existing CI/CD Workflows**
- tests.yml already has PHP 8.4 setup, Node 22, Composer/NPM caching patterns, and environment configuration
- lint.yml already runs Pint and frontend linting (ESLint/Prettier)
- Extend these workflows rather than creating new ones
- Maintain existing branch triggers (develop, main) and pull request workflows
- Use same PHP/Node versions (8.4, 22) across all new tools

**Existing Composer Setup**
- Laravel Pint v1.24 already installed in require-dev
- Pest v4 with Laravel plugin already configured
- Follow existing pattern of dev dependencies for new tools
- Leverage existing `composer install` optimizations (--no-interaction, --prefer-dist, --optimize-autoloader)

**Existing NPM Scripts**
- `npm run types` script already defined for TypeScript checking
- `npm run lint` and `npm run format` already configured for frontend
- Integrate these existing scripts into pre-commit and CI/CD flows
- No need to create new TypeScript tooling configurations

**Existing Test Infrastructure**
- Pest v4 test suite in tests/ directory already functional
- Browser testing configured and working
- CI/CD already executes full test suite
- No modifications needed to test execution, just add static analysis around it

**Existing Development Scripts**
- `composer run dev` script orchestrates local development environment
- Add Lefthook installation to existing `composer run setup` script
- Consider adding format/lint checks to development workflow documentation

## Out of Scope
- CodeRabbit configuration (already set up and functional)
- Custom Rector rules beyond PHP 8.4 and Laravel 12 preset rule sets
- IDE-specific plugin configurations or integrations
- Fixing existing code violations discovered by new tools (tools identify, developers fix)
- Performance optimization of CI/CD pipeline execution time
- Code coverage thresholds or reporting (existing tests remain as-is)
- Security vulnerability scanning tools (future consideration)
- Dependency audit tooling beyond Composer/NPM defaults
- Git hooks beyond pre-commit (pre-push, commit-msg, etc.)
- Modifying existing Pest test suite or browser test configurations
