# Troubleshooting Guide

This guide covers common issues you might encounter when developing LucidLog and how to resolve them.

## Table of Contents

- [Pre-Commit Hooks](#pre-commit-hooks)
- [Static Analysis (Larastan)](#static-analysis-larastan)
- [PHP Upgrades (Rector)](#php-upgrades-rector)
- [Code Formatting (Pint)](#code-formatting-pint)
- [TypeScript Type Checking](#typescript-type-checking)
- [CI/CD Pipeline](#cicd-pipeline)
- [Debugging Tools](#debugging-tools)
- [Development Environment](#development-environment)
- [Emergency Procedures](#emergency-procedures)

---

## Pre-Commit Hooks

### Hooks Not Running

**Symptoms:**

- Commits succeed without any checks running
- No output from Lefthook

**Diagnosis:**

```bash
# Check if Lefthook is installed
lefthook version

# Check if hooks are installed
ls -la .git/hooks/
```

**Solutions:**

1. **Install Lefthook via Mise:**

    ```bash
    mise install
    ```

2. **Install Lefthook hooks:**

    ```bash
    lefthook install
    ```

3. **Verify installation:**

    ```bash
    lefthook run pre-commit --all-files
    ```

### Hooks Running Too Slowly

**Symptoms:**

- Pre-commit hooks take more than 30 seconds
- Commit process feels sluggish

**Diagnosis:**

```bash
# Run hooks manually to see timing
lefthook run pre-commit --all-files
```

**Solutions:**

1. **Commit smaller batches of files:**

    ```bash
    # Stage only specific files
    git add path/to/specific/file.php
    git commit -m "Your message"
    ```

2. **Check staged file count:**

    ```bash
    git diff --cached --name-only | wc -l
    ```

    If staging 50+ files, consider splitting into multiple commits.

3. **Temporarily disable specific hooks:**
   Edit `lefthook.yml` and comment out slower checks for local development.

### Hook Fails with "Command Not Found"

**Symptoms:**

- Error: `vendor/bin/pint: command not found`
- Error: `vendor/bin/phpstan: command not found`

**Diagnosis:**

```bash
# Check if Composer dependencies are installed
ls -la vendor/bin/

# Check Composer installation
composer --version
```

**Solutions:**

1. **Install Composer dependencies:**

    ```bash
    composer install
    ```

2. **Ensure vendor/bin is executable:**

    ```bash
    chmod +x vendor/bin/pint
    chmod +x vendor/bin/phpstan
    chmod +x vendor/bin/rector
    ```

### Hook Fails on Specific File Types

**Symptoms:**

- Hooks fail on non-PHP files
- TypeScript errors in PHP-only commits

**Solutions:**

Lefthook should only run tools on relevant file types. Check `lefthook.yml` glob patterns:

```yaml
pre-commit:
    commands:
        pint:
            glob: '*.php' # Only PHP files
        typescript:
            glob: '*.{ts,tsx}' # Only TypeScript files
```

---

## Static Analysis (Larastan)

### Memory Limit Exceeded

**Symptoms:**

```text
Fatal error: Allowed memory size of X bytes exhausted
```

**Solutions:**

1. **Increase memory limit:**

    ```bash
    vendor/bin/phpstan analyse --memory-limit=4G
    ```

2. **Update Composer script in `composer.json`:**

    ```json
    {
        "scripts": {
            "analyse": "vendor/bin/phpstan analyse --memory-limit=4G"
        }
    }
    ```

3. **Check PHP memory limit:**

    ```bash
    php -i | grep memory_limit
    ```

    If less than 2G, update `php.ini` or set via command:

    ```bash
    php -d memory_limit=4G vendor/bin/phpstan analyse
    ```

### Too Many Errors in Legacy Code

**Symptoms:**

- PHPStan reports hundreds of errors
- Errors in old code that works fine

**Solutions:**

1. **Regenerate baseline file:**

    ```bash
    vendor/bin/phpstan analyse --generate-baseline
    ```

    This creates `phpstan-baseline.neon` ignoring existing errors.

2. **Commit the baseline:**

    ```bash
    git add phpstan-baseline.neon
    git commit -m "Update PHPStan baseline"
    ```

3. **Fix errors incrementally:**
    - Fix new code to pass level 5
    - Gradually fix baseline errors
    - Regenerate baseline as you go

### False Positives

**Symptoms:**

- PHPStan reports errors that aren't real issues
- Laravel magic methods not recognized

**Solutions:**

1. **Check Larastan is installed** (not plain PHPStan):

    ```bash
    composer show larastan/larastan
    ```

2. **Add PHPDoc blocks for magic methods:**

    ```php
    /**
     * @property-read int $id
     * @property string $name
     */
    class User extends Model
    {
        // ...
    }
    ```

3. **Ignore specific errors in `phpstan.neon.dist`:**

    ```neon
    parameters:
      ignoreErrors:
        - '#Call to an undefined method#'
    ```

### Analysis Takes Too Long

**Symptoms:**

- PHPStan runs for several minutes
- CI/CD times out

**Solutions:**

1. **Clear result cache:**

    ```bash
    rm -rf .phpstan-cache
    vendor/bin/phpstan clear-result-cache
    ```

2. **Reduce analysis level temporarily:**
   In `phpstan.neon.dist`, change `level: 5` to `level: 4`.

3. **Exclude more paths:**
   Add to `phpstan.neon.dist`:

    ```neon
    parameters:
      paths:
        - app
      excludePaths:
        - app/Some/SlowDirectory
    ```

---

## PHP Upgrades (Rector)

### Rector Modifies Generated Files

**Symptoms:**

- Wayfinder action files change
- IDE helper files modified
- TypeScript type files affected

**Solutions:**

1. **Verify exclusions in `rector.php`:**

    ```php
    return RectorConfig::configure()
        ->withSkip([
            __DIR__ . '/resources/js/types/generated.d.ts',
            __DIR__ . '/resources/js/actions',
            __DIR__ . '/_ide_helper.php',
        ]);
    ```

2. **Add patterns for generated files:**

    ```php
    ->withSkip([
        '*/generated/*',
        '*/_ide_*.php',
        '*/actions/*',
    ])
    ```

### Too Many Changes Proposed

**Symptoms:**

- Rector wants to change 100+ files
- Changes seem too aggressive

**Solutions:**

1. **Preview changes first (dry-run):**

    ```bash
    composer run refactor:check
    ```

2. **Apply changes incrementally:**

    ```bash
    # Process specific directory
    vendor/bin/rector process app/Models

    # Process specific file
    vendor/bin/rector process app/Models/User.php
    ```

3. **Disable specific rules:**
   In `rector.php`:

    ```php
    ->withSkip([
        SpecificRectorRule::class,
    ])
    ```

### Rector Breaks Tests

**Symptoms:**

- After running Rector, tests fail
- Code doesn't work as expected

**Solutions:**

1. **Revert changes:**

    ```bash
    git checkout -- .
    ```

2. **Run tests before committing:**

    ```bash
    composer run refactor
    php artisan test
    ```

3. **Report issue if upgrade is incorrect:**
    - Note which Rector rule caused the issue
    - Check if it's a known issue in Rector repo
    - Add to skip list in `rector.php`

### Rector Not Finding Files

**Symptoms:**

```text
No files found to process
```

**Diagnosis:**

```bash
# Check paths configuration
cat rector.php | grep withPaths
```

**Solutions:**

1. **Verify paths in `rector.php`:**

    ```php
    ->withPaths([
        __DIR__ . '/app',
        __DIR__ . '/config',
        __DIR__ . '/database',
        __DIR__ . '/routes',
        __DIR__ . '/tests',
    ])
    ```

2. **Run with explicit path:**

    ```bash
    vendor/bin/rector process app/
    ```

---

## Code Formatting (Pint)

### Formatting Conflicts with Pre-Commit Hook

**Symptoms:**

- Pint fixes files but commit still fails
- Files keep getting reformatted

**Solutions:**

1. **Let Pint auto-fix, then re-add files:**

    ```bash
    # Pint will auto-fix during pre-commit
    git commit -m "Your message"

    # If files were changed, add them
    git add .
    git commit -m "Your message"
    ```

2. **Run Pint before staging:**

    ```bash
    vendor/bin/pint
    git add .
    git commit -m "Your message"
    ```

### Pint Changes Not Matching Team Style

**Symptoms:**

- Pint formatting looks different from existing code
- Team disagrees on style

**Solutions:**

1. **Verify Pint configuration:**
   Check `pint.json` uses Laravel preset:

    ```json
    {
        "preset": "laravel"
    }
    ```

2. **Update Pint configuration:**
   Add custom rules to `pint.json`:

    ```json
    {
        "preset": "laravel",
        "rules": {
            "array_syntax": {
                "syntax": "short"
            }
        }
    }
    ```

3. **Run Pint on entire codebase:**

    ```bash
    vendor/bin/pint
    git add .
    git commit -m "Apply consistent formatting"
    ```

### Pint Fails with Syntax Error

**Symptoms:**

```text
PHP Parse error: syntax error, unexpected token
```

**Diagnosis:**

```bash
# Check PHP version
php -v

# Verify PHP 8.4 is installed
```

**Solutions:**

1. **Fix syntax errors in code first:**
   The file has invalid PHP syntax that must be fixed manually.

2. **Check file encoding:**

    ```bash
    file path/to/file.php
    ```

    Should show UTF-8 encoding.

---

## TypeScript Type Checking

### Type Errors in Generated Files

**Symptoms:**

- Errors in `resources/js/types/generated.d.ts`
- Errors in Wayfinder action files

**Solutions:**

1. **Regenerate type definitions:**

    ```bash
    php artisan wayfinder:generate
    ```

2. **Verify TypeScript exclusions in `tsconfig.json`:**

    ```json
    {
        "exclude": [
            "node_modules",
            "resources/js/types/generated.d.ts",
            "resources/js/actions"
        ]
    }
    ```

### Module Resolution Errors

**Symptoms:**

```text
Cannot find module '@/components/Button'
```

**Diagnosis:**

```bash
# Check path aliases in tsconfig.json
cat tsconfig.json | grep paths
```

**Solutions:**

1. **Verify path aliases in `tsconfig.json`:**

    ```json
    {
        "compilerOptions": {
            "paths": {
                "@/*": ["./resources/js/*"]
            }
        }
    }
    ```

2. **Verify path aliases in `vite.config.ts`:**

    ```typescript
    resolve: {
      alias: {
        '@': '/resources/js',
      },
    }
    ```

### Type Checking Takes Too Long

**Symptoms:**

- `npm run types` runs for several minutes
- Pre-commit hook times out

**Solutions:**

1. **Use incremental compilation:**
   In `tsconfig.json`:

    ```json
    {
        "compilerOptions": {
            "incremental": true
        }
    }
    ```

2. **Exclude more files:**

    ```json
    {
        "exclude": ["node_modules", "vendor", "public", "storage"]
    }
    ```

---

## CI/CD Pipeline

### Pipeline Fails on Dependency Installation

**Symptoms:**

```bash
composer install failed
npm ci failed
```

**Diagnosis:**

- Check GitHub Actions logs
- Look for network errors or version conflicts

**Solutions:**

1. **Update lock files locally:**

    ```bash
    composer update
    npm update

    git add composer.lock package-lock.json
    git commit -m "Update lock files"
    git push
    ```

2. **Clear GitHub Actions cache:**
    - Go to repository Settings > Actions > Caches
    - Delete all caches
    - Re-run workflow

### Pipeline Times Out

**Symptoms:**

```bash
The job running on runner X has exceeded the maximum execution time
```

**Solutions:**

1. **Check for infinite loops or hanging processes:**
   Review recent code changes for potential issues.

2. **Increase timeout in workflow file:**
   In `.github/workflows/tests.yml`:

    ```yaml
    jobs:
        ci:
            timeout-minutes: 30 # Increase from default
    ```

3. **Optimize dependency installation:**
   Ensure caching is working properly.

### Pipeline Passes Locally, Fails in CI

**Symptoms:**

- All tools pass on local machine
- Same tools fail in CI/CD

**Common Causes:**

- Different PHP/Node versions
- Different dependencies (cache issue)
- Environment variables missing
- Different file paths

**Solutions:**

1. **Match CI environment locally:**

    ```bash
    # Check CI PHP version
    php -v

    # Check CI Node version
    node -v
    ```

2. **Clear all caches locally:**

    ```bash
    composer clear-cache
    npm cache clean --force
    php artisan cache:clear
    php artisan config:clear
    ```

3. **Run CI commands exactly:**

    ```bash
    # Copy commands from workflow file
    composer install --no-interaction --prefer-dist --optimize-autoloader
    vendor/bin/phpstan analyse --memory-limit=2G
    ```

### Cache Not Working

**Symptoms:**

- GitHub Actions always installs all dependencies
- No "Cache restored" message in logs

**Diagnosis:**
Check GitHub Actions logs for cache messages:

```bash
Cache restored from key: Linux-composer-abc123
```

**Solutions:**

1. **Verify cache configuration in workflow:**

    ```yaml
    - name: Cache Composer Dependencies
      uses: actions/cache@v3
      with:
          path: vendor
          key: ${{ runner.os }}-composer-${{ hashFiles('**/composer.lock') }}
          restore-keys: |
              ${{ runner.os }}-composer-
    ```

2. **Update lock files trigger new cache:**
   When `composer.lock` or `package-lock.json` change, cache will miss (expected).

3. **Clear old caches:**
   Repository Settings > Actions > Caches > Delete all

---

## Debugging Tools

### Telescope Not Loading

**Symptoms:**

- 404 error at `/telescope`
- Blank page at `/telescope`

**Diagnosis:**

```bash
# Check if Telescope is installed
composer show laravel/telescope

# Check migrations
php artisan migrate:status | grep telescope
```

**Solutions:**

1. **Run Telescope migrations:**

    ```bash
    php artisan migrate
    ```

2. **Verify environment variables in `.env`:**

    ```env
    TELESCOPE_ENABLED=true
    APP_ENV=local
    ```

3. **Clear caches:**

    ```bash
    php artisan config:clear
    php artisan cache:clear
    php artisan route:clear
    ```

4. **Check Telescope service provider:**
   In `bootstrap/providers.php`, ensure conditional registration:

    ```php
    return [
        // ...
        in_array(env('APP_ENV'), ['local', 'staging'])
            ? App\Providers\TelescopeServiceProvider::class
            : null,
    ];
    ```

### Telescope Shows No Data

**Symptoms:**

- Telescope loads but shows empty data
- No requests or queries logged

**Solutions:**

1. **Check Telescope watchers are enabled:**
   In `config/telescope.php`:

    ```php
    'watchers' => [
        Watchers\RequestWatcher::class => true,
        Watchers\QueryWatcher::class => true,
        // ...
    ],
    ```

2. **Generate some activity:**
    - Visit other pages in the application
    - Refresh Telescope dashboard

3. **Check database storage:**

    ```bash
    php artisan tinker
    >>> \Laravel\Telescope\EntryModel::count()
    ```

### DebugBar Not Visible

**Symptoms:**

- DebugBar doesn't appear at bottom of page
- No debug information shown

**Diagnosis:**

```bash
# Check if DebugBar is installed
composer show barryvdh/laravel-debugbar

# Check environment variables
cat .env | grep DEBUGBAR
cat .env | grep APP_DEBUG
```

**Solutions:**

1. **Verify environment variables:**

    ```env
    APP_DEBUG=true
    DEBUGBAR_ENABLED=true
    APP_ENV=local
    ```

2. **Clear configuration cache:**

    ```bash
    php artisan config:clear
    ```

3. **Check DebugBar configuration:**
   In `config/debugbar.php`:

    ```php
    'enabled' => env('DEBUGBAR_ENABLED', false)
                 && env('APP_DEBUG') === true
                 && env('APP_ENV') !== 'production',
    ```

4. **Verify it's not disabled for current route:**
   Some routes might explicitly disable DebugBar.

---

## Development Environment

### Assets Not Loading

**Symptoms:**

- CSS/JS not found (404)
- Vite error in console

**Solutions:**

1. **Start Vite dev server:**

    ```bash
    npm run dev
    ```

2. **Build assets for production:**

    ```bash
    npm run build
    ```

3. **Clear Vite manifest:**

    ```bash
    rm -rf public/build
    npm run build
    ```

### Database Connection Error

**Symptoms:**

```bash
SQLSTATE[HY000] [2002] Connection refused
```

**Solutions:**

1. **Check database configuration in `.env`:**

    ```env
    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/database.sqlite
    ```

2. **Create SQLite database:**

    ```bash
    touch database/database.sqlite
    php artisan migrate
    ```

3. **For MySQL/PostgreSQL, start database service:**

    ```bash
    # Docker
    docker-compose up -d

    # Laravel Sail
    ./vendor/bin/sail up -d
    ```

### Port Already in Use

**Symptoms:**

```bash
Address already in use (port 8000)
```

**Solutions:**

1. **Kill process using port:**

    ```bash
    # Find process
    lsof -i :8000

    # Kill process
    kill -9 <PID>
    ```

2. **Use different port:**

    ```bash
    php artisan serve --port=8001
    ```

---

## Emergency Procedures

### Bypass Pre-Commit Hooks

**When:** Critical hotfix needed immediately

**Command:**

```bash
git commit --no-verify -m "Emergency fix: description"
```

**Follow-up:**

- Create ticket to fix underlying issue
- Fix issue properly in next commit
- Run full quality checks manually

### Disable Lefthook Temporarily

**When:** Pre-commit hooks are broken

**Commands:**

```bash
# Disable
lefthook uninstall

# Re-enable later
lefthook install
```

### Regenerate PHPStan Baseline

**When:** Too many legacy errors blocking development

**Command:**

```bash
vendor/bin/phpstan analyse --generate-baseline
git add phpstan-baseline.neon
git commit -m "Update PHPStan baseline"
```

**Important:** Don't abuse baselines. Fix new code properly.

### Force Push to Fix CI/CD

**When:** CI/CD is stuck on broken commit

**Warning:** Coordinate with team first!

**Commands:**

```bash
# Fix the issue locally
git commit --amend

# Force push (use with caution)
git push --force-with-lease
```

### Clear All Caches

**When:** Weird behavior, nothing makes sense

**Commands:**

```bash
# Laravel caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Composer cache
composer clear-cache

# NPM cache
npm cache clean --force

# Tool caches
rm -rf .phpstan-cache
rm -rf .phpunit.result.cache

# Rebuild
composer install
npm install
npm run build
```

---

## Getting Additional Help

If you've tried the solutions above and still have issues:

1. **Search GitHub Issues:** Someone may have encountered the same problem
2. **Check Tool Documentation:**
    - [Larastan](https://github.com/larastan/larastan)
    - [Rector](https://github.com/rectorphp/rector)
    - [Laravel Pint](https://laravel.com/docs/11.x/pint)
    - [Lefthook](https://github.com/evilmartians/lefthook)
3. **Ask the Team:** Reach out in team chat with:
    - What you're trying to do
    - What error you're getting
    - What you've tried already
4. **Create an Issue:** Document the problem with reproduction steps

---

Remember: Most issues can be resolved by clearing caches and reinstalling dependencies. When in doubt, start there!
