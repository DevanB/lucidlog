# Spec Requirements: Developer Tooling Setup

## Initial Description

Configure comprehensive developer tooling including Laravel Pint, Larastan, Laravel DebugBar, Telescope, Rector, Ultracite, CodeRabbit CLI, Lefthook, and automated checks on commit and PRs.

This is Phase 1, item 0 from the roadmap.

## Requirements Discussion

### First Round Questions

**Q1: What Larastan level should we target?**
**Answer:** Level 5

**Q2: Should pre-commit hooks run on staged files only, or the entire codebase?**
**Answer:** Staged files only for pre-commit hooks. CI/CD should run on the full codebase.

**Q3: Which tools should run on pre-commit vs only in CI/CD?**
**Answer:**

- Pre-commit: Pint, Larastan, Ultracite, TypeScript type checking (staged files only)
- CI/CD: Full test suite (Pest including browser tests), Larastan (full codebase), Rector (check-only mode), formatting verification

**Q4: What Rector rule sets should we enable?**
**Answer:** PHP 8.4 and Laravel 12 rules

**Q5: Should Telescope and DebugBar be enabled only in local/staging, or also production?**
**Answer:** Local and staging only, not production

**Q6: How should Lefthook be installed?**
**Answer:** Project-level configuration (lefthook.yml) installed via Mise (mise.toml)

**Q7: When a pre-commit hook fails, should it block the commit?**
**Answer:** Yes, but allow --no-verify bypass for emergency situations

**Q8: Which files/directories should be excluded from checks?**
**Answer:** Standard Laravel and TypeScript exclusion patterns (vendor/, node_modules/, build/, generated files, etc.)

### Existing Code to Reference

**Similar Features Identified:**

- Current test suite setup in tests/ directory using Pest v4
- Existing Pint configuration (if present) in pint.json or project root
- Laravel Vite configuration in vite.config.js
- Existing CI/CD workflows in .github/workflows/

No similar existing features identified for reference beyond standard Laravel project structure.

### Follow-up Questions

**Follow-up 1:** Should Rector auto-fix issues during pre-commit hooks, or run in check-only mode like in CI/CD?
**Answer:** Auto-fix on pre-commit, check-only mode in CI/CD

**Follow-up 2:** Is CodeRabbit already configured in your repository, or do we need to set it up from scratch?
**Answer:** CodeRabbit is already configured, no additional work needed

**Follow-up 3:** For Rector in CI/CD, should it run in check-only mode (reports issues but doesn't modify code) or fail the build if violations are found?
**Answer:** Check-only mode that reports issues but doesn't modify code, and fails the build if violations are found

## Visual Assets

### Files Provided

No visual assets provided.

### Visual Insights

No visual assets to analyse.

## Requirements Summary

### Functional Requirements

**Static Analysis & Code Quality:**

- Larastan configured at level 5
- Run on staged files during pre-commit
- Run on full codebase during CI/CD
- Rector configured with PHP 8.4 and Laravel 12 rules
- Auto-fix mode during pre-commit hooks
- Check-only mode in CI/CD (reports issues, fails build on violations)
- Ultracite (Biome-based) integration for frontend linting and formatting

**Code Formatting:**

- Laravel Pint for PHP code formatting
- Run on staged files during pre-commit
- Verification during CI/CD (ensure code is properly formatted)
- TypeScript type checking on staged TypeScript/React files

**Pre-commit Hooks (Lefthook):**

- Installed via Mise (configured in mise.toml)
- Project-level configuration (lefthook.yml)
- Run on staged files only:
  - Pint (auto-fix PHP formatting)
  - Ultracite (auto-fix frontend linting/formatting)
  - TypeScript type checking
  - Larastan (static analysis)
  - Rector (auto-fix PHP upgrades)
- Block commits on failure
- Allow --no-verify bypass for emergencies

**CI/CD Pipeline (GitHub Actions):**

- Full Pest test suite including browser tests
- Larastan on full codebase
- Rector in check-only mode
- Code formatting verification
- Fail build on any violations

**Debugging Tools:**

- Laravel Telescope for local and staging environments
- Laravel DebugBar for local and staging environments
- Both disabled in production
- Environment-based configuration

**Code Review:**

- CodeRabbit already configured
- No additional setup required

**Exclusion Patterns:**

- vendor/ (Composer dependencies)
- node_modules/ (NPM dependencies)
- build/ and dist/ (build artifacts)
- public/build/ (compiled assets)
- storage/ (runtime files)
- bootstrap/cache/ (Laravel cache)
- .phpunit.result.cache
- Generated TypeScript definitions
- Vite manifest files
- Other standard Laravel/TypeScript generated files

### Reusability Opportunities

**Existing Test Infrastructure:**

- Leverage existing Pest v4 setup in tests/ directory
- Browser tests already configured
- Extend CI/CD to include static analysis tools

**Configuration Files:**

- Check for existing pint.json configuration
- Review current phpunit.xml or pest.xml setup
- Examine existing .github/workflows/ for CI/CD patterns

**Environment Configuration:**

- Use existing .env patterns for Telescope/DebugBar toggling
- Follow existing config/ file structure

### Scope Boundaries

**In Scope:**

- Installing and configuring all specified tools (Larastan, Pint, Rector, Ultracite/Biome, Telescope, DebugBar)
- Setting up Lefthook with Mise integration
- Configuring pre-commit hooks for staged file checking
- Establishing CI/CD pipeline with full codebase analysis
- Environment-based configuration for debugging tools
- Exclusion pattern configuration
- Documentation for developers on hook usage and bypass options
- Replacing ESLint/Prettier with Ultracite (Biome) for frontend linting

**Out of Scope:**

- CodeRabbit setup (already configured)
- Modifying existing test suite (tests work as-is)
- Custom Rector rules beyond PHP 8.4 and Laravel 12 sets
- IDE-specific integrations or plugins
- Fixing existing code violations (tools will identify them)
- Performance optimization of CI/CD pipeline (initial setup focus)

**Future Enhancements:**

- Custom Rector rules specific to project patterns
- Additional Larastan custom rules
- Performance profiling integration
- Security scanning tools
- Dependency vulnerability scanning
- Code coverage reporting thresholds

### Technical Considerations

**Tool Installation:**

- Composer for PHP tools (Larastan, Pint, Rector, Telescope, DebugBar)
- NPM for frontend tools (Ultracite/Biome, TypeScript tooling)
- Mise for Lefthook installation (system-level hook manager)
- GitHub Actions for CI/CD execution

**Integration Points:**

- Lefthook hooks into Git pre-commit lifecycle
- GitHub Actions triggers on pull requests and main branch pushes
- Telescope and DebugBar integrate with Laravel service providers
- Vite for TypeScript compilation and type checking
- Pest for test execution

**Configuration Files Required:**

- lefthook.yml (hook configuration)
- mise.toml (Mise tool installation)
- phpstan.neon or phpstan.neon.dist (Larastan configuration)
- rector.php (Rector rules and configuration)
- pint.json (code style rules, if customization needed)
- .github/workflows/\*.yml (CI/CD pipeline definition)
- config/telescope.php (environment-based enabling)
- config/debugbar.php (environment-based enabling)

**Environment Variables:**

- TELESCOPE_ENABLED (control Telescope per environment)
- DEBUGBAR_ENABLED (control DebugBar per environment)
- CI environment detection for pipeline-specific behavior

**Performance Considerations:**

- Pre-commit runs on staged files only for speed
- CI/CD runs comprehensive checks on full codebase
- Parallel execution where possible in CI/CD
- Caching strategies for Composer and NPM dependencies

**Error Handling:**

- Clear error messages when hooks fail
- Instructions for --no-verify bypass in emergency situations
- CI/CD logs accessible for debugging failures
- Non-blocking warnings vs blocking errors (where appropriate)

**Technology Stack Alignment:**

- PHP 8.4 compatibility for all PHP tools
- Laravel 12 specific configurations
- React 19 and TypeScript for frontend type checking
- Pest v4 for testing infrastructure
- Tailwind CSS v4 (no specific tooling needed)
- Inertia v2 (no specific tooling needed)

**Similar Code Patterns:**

- Follow existing test patterns in tests/Feature/ and tests/Unit/
- Match existing .github/workflows/ YAML structure if present
- Use consistent config/ file patterns for service provider registration
- Align with existing Composer scripts if any are defined
