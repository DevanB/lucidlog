# LucidLog

A modern Laravel application built with React, TypeScript, and Inertia.js.

## Quick Start

```bash
# Install dependencies and set up the project
composer run setup

# Install development tools
mise install

# Start development servers
composer run dev
```

Visit `http://127.0.0.1:8000` to see the application.

## Tech Stack

- **Backend:** Laravel 12, PHP 8.4
- **Frontend:** React 19, TypeScript, Inertia.js v2
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **Testing:** Pest v4
- **Code Quality:** Larastan, Rector, Laravel Pint
- **Debugging:** Laravel Telescope, DebugBar

## Features

- Modern Laravel 12 application structure
- React 19 with TypeScript for type-safe frontend development
- Inertia.js v2 for seamless server-client communication
- Wayfinder for type-safe route generation
- Automated code quality checks with pre-commit hooks
- Comprehensive CI/CD pipeline
- Laravel Telescope for request monitoring
- DebugBar for debugging

## Development

### Prerequisites

- PHP 8.4+
- Composer 2.x
- Node.js 22.x+
- Mise (for development tools)

### Available Commands

```bash
# Development
composer run dev          # Start Laravel and Vite dev servers
composer run setup        # First-time project setup

# Code Quality
composer run analyse      # Run Larastan static analysis
composer run refactor     # Apply PHP 8.4 and Laravel 12 upgrades
composer run format       # Auto-fix code formatting
npm run types             # Check TypeScript types
npm run lint              # Lint frontend code

# Testing
php artisan test          # Run Pest test suite

# Build
npm run build             # Build frontend assets for production
```

## Code Quality

This project uses automated tools to maintain high code quality:

- **Larastan (Level 5):** Static analysis for type safety
- **Rector:** Automatic PHP 8.4 and Laravel 12 upgrades
- **Laravel Pint:** Code formatting with Laravel preset
- **TypeScript:** Type checking for frontend code
- **Pre-commit hooks:** Automatic checks before each commit
- **CI/CD:** Automated quality checks on every push

## Project Structure

```text
.
├── app/                    # Application code
│   ├── Actions/           # Fortify actions
│   ├── Http/              # Controllers, middleware
│   ├── Models/            # Eloquent models
│   └── Providers/         # Service providers
├── bootstrap/             # Framework bootstrap
├── config/                # Configuration files
├── database/              # Migrations, factories, seeders
├── public/                # Public assets
├── resources/             # Views, frontend code
│   ├── css/              # Stylesheets
│   └── js/               # React components
├── routes/                # Route definitions
├── storage/               # Runtime storage
├── tests/                 # Test suite
│   ├── Feature/          # Feature tests
│   └── Unit/             # Unit tests
└── vendor/                # Composer dependencies
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
APP_NAME=LucidLog
APP_ENV=local
APP_DEBUG=true

# Enable debugging tools (local/staging only)
TELESCOPE_ENABLED=true
DEBUGBAR_ENABLED=true

# Database
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

## Debugging Tools

### Laravel Telescope

Access at `http://127.0.0.1:8000/telescope`

Monitor:

- HTTP requests
- Database queries
- Exceptions
- Jobs and queues
- Cache operations
- Mail

### Laravel DebugBar

Automatically appears at the bottom of pages when enabled.

Shows:

- Request/response details
- Database queries with timing
- Memory usage
- Route information

## Testing

We use Pest v4 for testing with support for:

- Feature tests
- Unit tests
- Browser tests
- Visual regression tests

Run tests:

```bash
php artisan test                              # All tests
php artisan test --filter=testName           # Specific test
php artisan test tests/Feature/ExampleTest.php  # Specific file
```

## CI/CD

Our CI/CD pipeline runs on GitHub Actions:

- **Tests Workflow:** Larastan, Rector, Pest tests
- **Linter Workflow:** Pint, TypeScript, ESLint, Prettier

Triggers on:

- Push to `master`
- Pull requests to `master`

## Support

For questions or issues open an issue on GitHub
