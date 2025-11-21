# CI/CD Testing Guide

This guide explains how to manually test the CI/CD pipeline for the Developer Tooling Setup feature.

## Overview

The CI/CD workflows have been configured with static analysis and code quality checks. Since I cannot push to GitHub directly, you'll need to manually test the workflows to ensure they work correctly.

## Pre-Testing Checklist

Before pushing to GitHub, verify locally that all tools are working:

```bash
# 1. Run Larastan static analysis
composer run analyse

# 2. Run Rector check
composer run refactor:check

# 3. Run Pint formatting check
composer run format:check

# 4. Run TypeScript type checking
npm run types

# 5. Run Pest tests
php artisan test
```

If any of these fail locally, fix the issues before pushing.

## Testing Workflow

### Step 1: Create Test Branch

```bash
# Create a test branch from current work
git checkout -b test/ci-cd-validation

# Ensure all changes are committed
git add .
git commit -m "chore: test CI/CD pipeline configuration"
```

### Step 2: Push to Remote

```bash
# Push the test branch to remote
git push -u origin test/ci-cd-validation
```

### Step 3: Create Pull Request

1. Go to your GitHub repository
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select:
   - Base: `develop` (or `main`)
   - Compare: `test/ci-cd-validation`
5. Click "Create pull request"
6. Add title: "Test: CI/CD Pipeline Validation"
7. Add description with testing checklist (see below)
8. Create the PR

### Pull Request Description Template

```markdown
## Purpose

Test CI/CD pipeline configuration with new static analysis and code quality tools.

## Changes

- Added Larastan static analysis to tests workflow
- Added Rector check to tests workflow
- Added TypeScript type checking to lint workflow
- Updated Pint to run in test mode in lint workflow
- Configured dependency caching
- Added pre-commit hooks with Lefthook
- Installed debugging tools (Telescope, DebugBar)

## Testing Checklist

### Tests Workflow (`tests.yml`)
- [ ] Workflow triggers on PR
- [ ] PHP 8.4 setup succeeds
- [ ] Node 22 setup succeeds
- [ ] Composer dependencies install with caching
- [ ] NPM dependencies install with caching
- [ ] Frontend assets build successfully
- [ ] Larastan runs and analyzes codebase
- [ ] Rector check runs in dry-run mode
- [ ] Pest test suite executes successfully
- [ ] All steps pass

### Linter Workflow (`lint.yml`)
- [ ] Workflow triggers on PR
- [ ] PHP 8.4 setup succeeds
- [ ] Node 22 setup succeeds
- [ ] Composer dependencies install with caching
- [ ] NPM dependencies install with caching
- [ ] Pint test mode verifies formatting
- [ ] TypeScript type checking passes
- [ ] Frontend formatting runs
- [ ] Frontend linting runs
- [ ] All steps pass

### Performance
- [ ] Check cache hit/miss in logs
- [ ] Note total workflow execution time
- [ ] Verify workflows complete in reasonable time (<10 minutes)
```

## Step 4: Monitor Workflow Execution

### Viewing Workflow Status

1. On the pull request page, you'll see status checks appear
2. Click "Details" next to each workflow to view logs
3. Watch for:
   - Green checkmarks (passing)
   - Red X marks (failing)
   - Yellow dots (in progress)

### Reviewing Logs

For each workflow:

1. Click "Details" to open the GitHub Actions run
2. Expand each step to see detailed output
3. Look for:
   - "Cache restored from key:" messages (caching working)
   - Tool output (Larastan, Rector, Pint results)
   - Any error messages or warnings
   - Total execution time

### Example: Checking Tests Workflow

```
1. Setup PHP ✓
2. Setup Node ✓
3. Cache Composer Dependencies ✓
   → Cache restored from key: Linux-composer-abc123
4. Install Node Dependencies ✓
5. Install Dependencies ✓
6. Build Assets ✓
7. Copy Environment File ✓
8. Generate Application Key ✓
9. Run Larastan Static Analysis ✓
   → [OK] No errors
10. Run Rector Check ✓
   → [OK] No changes needed
11. Tests ✓
   → PASS (125 tests, 256 assertions)
```

### Example: Checking Linter Workflow

```
1. Checkout ✓
2. Setup PHP ✓
3. Setup Node ✓
4. Cache Composer Dependencies ✓
   → Cache restored from key: Linux-composer-abc123
5. Install Dependencies ✓
6. Run Pint (Check Mode) ✓
   → [OK] All files formatted correctly
7. Run TypeScript Type Checking ✓
   → [OK] No type errors found
8. Format Frontend ✓
9. Lint Frontend ✓
```

## Step 5: Test Failure Scenarios

To ensure CI/CD properly catches issues, test failure behavior:

### Test 1: Formatting Violation

1. Create a new branch:
   ```bash
   git checkout -b test/formatting-failure
   ```

2. Introduce formatting violation in a PHP file:
   ```php
   // Add bad formatting to app/Models/User.php
   public function someMethod() {
       $array = array('old', 'syntax'); // Should be []
   return $array; // Bad indentation
   }
   ```

3. Push and create PR:
   ```bash
   git add app/Models/User.php
   git commit -m "Test: formatting violation"
   git push -u origin test/formatting-failure
   ```

4. Verify lint workflow fails with clear Pint error message

5. Fix the violation:
   ```bash
   vendor/bin/pint app/Models/User.php
   git add app/Models/User.php
   git commit -m "Fix: formatting"
   git push
   ```

6. Verify workflow passes after fix

### Test 2: Type Error

1. Create a new branch:
   ```bash
   git checkout -b test/type-error
   ```

2. Introduce type error in TypeScript:
   ```typescript
   // In resources/js/Pages/Dashboard.tsx
   const count: number = "string"; // Type error
   ```

3. Push and create PR:
   ```bash
   git add resources/js/Pages/Dashboard.tsx
   git commit -m "Test: type error"
   git push -u origin test/type-error
   ```

4. Verify lint workflow fails with TypeScript error

5. Fix the error and verify workflow passes

### Test 3: Static Analysis Error

1. Create a new branch:
   ```bash
   git checkout -b test/static-analysis-error
   ```

2. Introduce type error in PHP:
   ```php
   // In app/Models/User.php
   public function getBadProperty(): string
   {
       return $this->nonExistentProperty; // Should fail PHPStan
   }
   ```

3. Push and create PR

4. Verify tests workflow fails with Larastan error

5. Fix the error and verify workflow passes

## Step 6: Verify Caching Performance

### First Run (Cache Miss)

1. Create a fresh PR (new branch)
2. Check workflow logs for:
   ```
   Cache not found for input keys: Linux-composer-abc123
   ```
3. Note the total execution time

### Second Run (Cache Hit)

1. Push another commit to the same PR
2. Check workflow logs for:
   ```
   Cache restored from key: Linux-composer-abc123
   ```
3. Note the total execution time
4. Verify execution time is faster with cache hit

### Expected Results

- **First run (no cache):** 5-10 minutes
- **Subsequent runs (with cache):** 3-6 minutes
- **Cache size:** 50-100 MB for vendor + node_modules

## Step 7: Document Results

After testing, create a summary of results:

### CI/CD Validation Summary

```markdown
## Test Results

**Date:** [YYYY-MM-DD]
**Branch:** test/ci-cd-validation
**Pull Request:** #[PR number]

### Tests Workflow
- Status: ✅ PASS / ❌ FAIL
- Execution Time: [X minutes]
- Larastan: ✅ No errors
- Rector: ✅ No violations
- Pest Tests: ✅ All passing
- Cache: ✅ Working (hit on second run)

### Linter Workflow
- Status: ✅ PASS / ❌ FAIL
- Execution Time: [X minutes]
- Pint: ✅ Formatting correct
- TypeScript: ✅ No type errors
- ESLint: ✅ No linting errors
- Cache: ✅ Working (hit on second run)

### Failure Tests
- Formatting violation: ✅ Detected and failed build
- Type error: ✅ Detected and failed build
- Static analysis error: ✅ Detected and failed build

### Caching Performance
- First run (cache miss): [X minutes]
- Second run (cache hit): [Y minutes]
- Improvement: [Z%] faster

### Issues Found
[List any issues discovered during testing]

### Recommendations
[Any suggestions for improvement]
```

## Common Issues and Solutions

### Issue: Workflow Not Triggering

**Symptom:** PR created but no workflows run

**Solution:**
- Check workflow files are in `.github/workflows/`
- Verify branch names in workflow triggers match
- Check GitHub Actions are enabled in repository settings

### Issue: Cache Not Working

**Symptom:** Always says "Cache not found"

**Solution:**
- Check cache key uses correct file: `hashFiles('**/composer.lock')`
- Verify lock files are committed
- First run will always miss (expected)
- Second run should hit

### Issue: Tools Not Found

**Symptom:** `vendor/bin/phpstan: command not found`

**Solution:**
- Check Composer dependencies installed successfully
- Verify `composer install` step completed
- Check for Composer installation errors in logs

### Issue: Workflow Times Out

**Symptom:** Workflow runs longer than timeout limit

**Solution:**
- Check for infinite loops in code
- Verify test suite isn't hanging
- Increase timeout in workflow file:
  ```yaml
  jobs:
    ci:
      timeout-minutes: 30
  ```

### Issue: Environment Variables Missing

**Symptom:** Application errors in CI/CD

**Solution:**
- Check `.env.example` is copied to `.env` in workflow
- Verify `php artisan key:generate` runs
- Check required environment variables are set

## Post-Testing Cleanup

After successful testing:

1. **Merge the test PR:**
   ```bash
   # Via GitHub UI or command line
   gh pr merge test/ci-cd-validation --squash
   ```

2. **Delete test branches:**
   ```bash
   git checkout develop
   git pull
   git branch -d test/ci-cd-validation
   git branch -d test/formatting-failure
   git branch -d test/type-error
   git branch -d test/static-analysis-error
   ```

3. **Update team:**
   - Announce CI/CD enhancements are live
   - Share CONTRIBUTING.md with team
   - Remind team about pre-commit hooks

## Ongoing Monitoring

After deployment, monitor CI/CD health:

### Weekly Checks

- Review failed workflow runs
- Check average execution time
- Verify cache hit rate
- Monitor for flaky tests

### Monthly Review

- Update tool versions if needed
- Review baseline file growth
- Optimize slow steps
- Gather team feedback

## Success Criteria

✅ All workflows pass on pull requests
✅ Larastan analyzes codebase without errors (or only baseline errors)
✅ Rector check runs successfully
✅ Pint verifies formatting
✅ TypeScript type checking passes
✅ Pest test suite passes
✅ Caching reduces execution time by 30%+
✅ Workflows fail fast with clear error messages
✅ Team can bypass hooks with `--no-verify` in emergencies

## Next Steps

After successful CI/CD validation:

1. Monitor first few PRs from team members
2. Address any issues quickly
3. Update documentation based on real usage
4. Consider adding more checks (code coverage, security scans)
5. Optimize workflow performance as needed

---

**Remember:** CI/CD is a safety net, not a replacement for local testing. Developers should run tools locally before pushing to catch issues early.
