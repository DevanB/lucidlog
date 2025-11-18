# LucidLog Tech Stack

This document outlines the complete technology stack for LucidLog, including rationale for each choice and how components work together.

---

## Backend Stack

### PHP 8.4.14

**Purpose:** Core programming language for server-side logic

**Rationale:**

- Latest stable PHP version with performance improvements and modern language features
- Constructor property promotion, named arguments, and union types improve code readability
- JIT compiler provides significant performance gains for computational tasks
- Strong type system reduces runtime errors and improves IDE support
- Excellent ecosystem for web applications with mature tooling

### Laravel 12

**Purpose:** Primary application framework

**Rationale:**

- Industry-leading PHP framework with comprehensive feature set for rapid development
- Eloquent ORM simplifies database interactions with clean, expressive syntax
- Built-in authentication, authorization, validation, and queue systems
- Modern file structure (since v11) reduces boilerplate and improves maintainability
- Extensive documentation and large community support
- Native Inertia.js support for seamless SPA integration
- Excellent testing capabilities with Pest integration
- Migration system enables version-controlled database schema changes

**Key Features Used:**

- Eloquent relationships for User-Dream-Symbol associations
- Form Request validation for all user inputs
- Queue system for future email notifications and AI processing
- Job scheduling for reminder systems
- Database migrations and seeders for reproducible environments

### Laravel Fortify v1

**Purpose:** Headless authentication backend

**Rationale:**

- Provides complete authentication logic without imposing UI constraints
- Perfect pairing with Inertia.js for custom frontend auth experiences
- Handles registration, login, password reset, email verification out-of-the-box
- Two-factor authentication ready for future premium features
- Fully customizable through service provider and action classes
- Eliminates need to write repetitive authentication code from scratch

**Features Enabled:**

- User registration with email verification
- Login with "remember me" functionality
- Password reset via email
- Profile information updates (future)
- Password updates (future)

### Inertia.js v2 (Server-Side)

**Purpose:** Server-side adapter for SPA architecture

**Rationale:**

- Bridges Laravel and React without needing separate API layer
- Maintains traditional server-side routing while delivering SPA experience
- Shares data from controllers directly to React components as props
- Preserves scroll position and component state during navigation
- Form helper with error handling integrates perfectly with Laravel validation
- Eliminates API versioning complexity for internal application

**Key Benefits:**

- No need for REST API boilerplate (auth tokens, CORS, serialization)
- Server-side rendering potential for improved SEO on marketing pages
- Automatic CSRF protection through Laravel
- Reduced complexity compared to separate frontend/backend codebases

---

## Frontend Stack

### React 19

**Purpose:** UI component library and rendering engine

**Rationale:**

- Latest version with improved performance and concurrent rendering features
- Mature ecosystem with extensive component libraries and tooling
- Component-based architecture encourages reusability and maintainability
- Strong TypeScript support (used with Wayfinder) for type safety
- Hooks API provides clean state management without class components
- Large talent pool and community resources
- Server Components readiness for future SSR optimization

**Usage:**

- Functional components with hooks throughout application
- Controlled form inputs with Inertia.js form helpers
- Custom hooks for shared logic (useDebounce for search, useDreamStats)
- Context API for theme and user preferences

### Inertia.js v2 (Client-Side)

**Purpose:** Client-side SPA framework

**Rationale:**

- Seamless integration with React and Laravel backend
- `<Link>` component for instant navigation without full-page reloads
- `<Form>` component with built-in error handling and loading states
- Prefetching for improved perceived performance
- Deferred props for progressive data loading (useful for dashboard stats)
- Polling support for real-time features (future AI processing status)
- Preserves scroll position and component state during navigation

**Key Features:**

- Manual visits with `router.visit()` for programmatic navigation
- Form helpers with processing states and error management
- Layout persistence across page changes
- Flash message handling from Laravel sessions

### Tailwind CSS v4

**Purpose:** Utility-first CSS framework

**Rationale:**

- Rapid UI development with composable utility classes
- Consistent design system through configuration without custom CSS
- Purges unused styles for minimal production bundle size
- Responsive design utilities eliminate media query boilerplate
- Dark mode support through `dark:` variant classes
- v4 CSS-first configuration simplifies theme customization
- Excellent IDE support with IntelliSense

**Configuration:**

- Custom color palette aligned with dream/nighttime theme
- Extended spacing and typography scales for comfortable reading
- Dark mode as default with light mode toggle
- Custom animations for smooth transitions

### shadcn/ui

**Purpose:** Accessible, customizable React component library

**Rationale:**

- Copy-paste component approach means full ownership and customization
- Built on Radix UI primitives for accessibility compliance
- Tailwind CSS integration eliminates style conflicts
- Includes complex components (Dialog, Dropdown, Accordion) without reinventing
- No runtime dependency bloat - only copy what's needed
- Consistent styling and behavior across application

**Components Used:**

- Button, Input, Textarea for forms
- Dialog/Modal for create/edit dream flows
- Dropdown Menu for user navigation
- Accordion for FAQ page
- Card components for dream entries and dictionary symbols
- Toast notifications for success/error messages

---

## Development Tools

### Laravel Wayfinder v0

**Purpose:** Type-safe route generation for frontend

**Rationale:**

- Generates TypeScript functions for Laravel routes and controllers
- Eliminates magic strings in frontend route references
- Autocomplete and type checking for route parameters
- Automatic route updates when backend routes change
- Seamless Inertia.js form integration with `.form()` helper
- Tree-shakable imports reduce bundle size

**Usage:**

```typescript
import { store, update } from '@/actions/App/Http/Controllers/DreamController'
<Form {...store.form()}>...</Form>
```

### Laravel Pint v1

**Purpose:** Opinionated PHP code formatter

**Rationale:**

- Zero-configuration code style enforcement
- Based on PHP-CS-Fixer with Laravel conventions
- Automatic code formatting in pre-commit hooks
- Eliminates style debates and manual formatting
- `--dirty` flag formats only changed files for speed

### Larastan (PHPStan for Laravel)

**Purpose:** Static analysis and type checking for PHP

**Rationale:**

- Catches type errors and bugs before runtime
- Laravel-specific rules understand Eloquent, facades, and magic methods
- Enforces strict typing and prevents null pointer exceptions
- Integrates with IDE for real-time feedback
- Configurable strictness levels (0-9) for gradual adoption
- Prevents common Laravel pitfalls and anti-patterns
- Essential complement to Pint for code quality

### Rector

**Purpose:** Automated PHP refactoring and upgrades

**Rationale:**

- Automated code modernization and refactoring
- Upgrades PHP and Laravel versions automatically
- Applies best practices and design patterns
- Fixes code smells and deprecated syntax
- Reduces manual refactoring effort
- Ensures codebase stays modern and maintainable

### Laravel Herd

**Purpose:** Native local development environment for macOS

**Rationale:**

- Native macOS app with zero Docker overhead for faster performance
- Automatic PHP version switching per project
- Built-in database management (MySQL, PostgreSQL)
- Instant setup without Docker configuration
- Low resource usage compared to containerized solutions
- Perfect for rapid local development on Mac

### Laravel MCP v0

**Purpose:** AI-assisted development tools

**Rationale:**

- Provides AI context about Laravel-specific patterns
- Speeds up boilerplate generation (models, migrations, controllers)
- Suggests Laravel best practices during development
- Integrated with Claude and other LLM tools

---

## Testing Stack

### Pest v4

**Purpose:** Primary testing framework

**Rationale:**

- Elegant, expressive syntax reduces test boilerplate
- Built on PHPUnit but with modern, readable API
- Parallel test execution for faster CI/CD pipelines
- Browser testing capabilities for end-to-end Inertia.js flows
- Dataset feature simplifies parameterized testing
- Type coverage analysis ensures proper type hints
- Expectation API more intuitive than PHPUnit assertions

**Test Types:**

- Feature tests for HTTP endpoints and Inertia responses
- Unit tests for business logic and helpers
- Browser tests for authentication flows and dream CRUD operations

### PHPUnit v12

**Purpose:** Underlying test runner for Pest

**Rationale:**

- Industry-standard PHP testing framework
- Robust assertion library and mocking capabilities
- Excellent IDE integration for running individual tests
- Required foundation for Pest framework

---

## Database

### PostgreSQL (Recommended)

**Purpose:** Primary relational database

**Rationale:**

- Full-text search capabilities crucial for dream and dictionary search
- JSONB column type useful for flexible dream metadata (tags, mood)
- Superior handling of concurrent writes (important for multi-user journaling)
- Excellent indexing options for performance optimization
- Open-source with strong community support
- Scalability for future growth without migration

**Schema Design:**

- `users` table with email, password, verification status
- `dreams` table with user_id FK, title, content (text/Markdown), date
- `dream_symbols` table with name, slug, interpretation, SEO metadata
- Indexes on user_id, created_at, search vectors for full-text search

### Redis (Optional, Recommended for Production)

**Purpose:** Caching and session storage

**Rationale:**

- Dramatically improves performance for dictionary pages (high read, low write)
- Session storage reduces database load
- Queue backend for background jobs (emails, AI processing)
- Rate limiting for API endpoints (future)

---

## Build Tools & Linters

### Vite

**Purpose:** Frontend build tool and development server

**Rationale:**

- Lightning-fast HMR (Hot Module Replacement) during development
- Optimized production builds with code splitting
- Native ESM support eliminates unnecessary transpilation
- Laravel Vite plugin simplifies asset management
- Wayfinder Vite plugin auto-generates route types

### Ultracite

**Purpose:** All-in-one TypeScript/JavaScript linter and formatter

**Rationale:**

- Unified linting and formatting tool replacing ESLint + Prettier
- Zero configuration with sensible defaults
- Faster than separate ESLint/Prettier setup
- Built-in TypeScript support with type-aware rules
- React-specific rules prevent common mistakes
- Automatic formatting for JS, TS, JSX, TSX
- Pre-commit hook ensures consistent formatting
- Eliminates ESLint/Prettier configuration conflicts

### Lefthook

**Purpose:** Fast Git hooks manager

**Rationale:**

- Blazing-fast Git hooks written in Go
- Runs linters and tests in parallel for speed
- Language-agnostic configuration (YAML)
- Supports PHP (Pint, Larastan, Rector) and TypeScript (Ultracite) checks
- Easy team onboarding with single install command
- Lightweight alternative to Husky without Node.js dependency

---

## Deployment & Infrastructure

### Laravel Cloud

**Purpose:** Managed hosting and deployment platform

**Rationale:**

- Official Laravel hosting solution built for Laravel applications
- Automatic deployments with zero-downtime releases
- Integrated CDN and SSL certificate management
- Built-in database management and backups
- Scheduled job runner and queue worker management
- Optimized for Laravel performance out-of-the-box
- Simplified infrastructure without separate server provisioning
- Automatic scaling and performance optimization

---

## Monitoring & Observability

### Laravel Telescope

**Purpose:** Debug assistant and application insights

**Rationale:**

- Real-time monitoring of requests, queries, jobs, exceptions
- Identify N+1 query problems before production
- Debug mail sending and queue jobs
- Performance profiling for slow routes
- Request/response inspection for debugging
- Database query analysis and optimization

### Laravel DebugBar

**Purpose:** Development debugging toolbar

**Rationale:**

- In-page debugging toolbar for quick insights
- View queries, timeline, memory usage at a glance
- Complements Telescope for immediate feedback during development
- No navigation away from current page
- Lightweight and unobtrusive during development

### Sentry (Production)

**Purpose:** Error tracking and performance monitoring

**Rationale:**

- Real-time error alerts with stack traces
- User impact tracking (how many users affected)
- Performance monitoring for slow database queries
- Release tracking correlates errors with deployments
- Laravel integration captures contextualized errors

### Laravel Nightwatch

**Purpose:** Queue monitoring and management

**Rationale:**

- Modern queue monitoring dashboard built for Laravel Cloud
- Real-time queue metrics and job tracking
- Job failure alerting and retry management
- Essential for email notifications and future AI processing jobs
- Beautiful, intuitive UI for queue insights
- Integrated with Laravel Cloud infrastructure

---

## Future Considerations

### AI/ML Integration

- **OpenAI API** for GPT-4 dream interpretation and pattern detection
- **Pinecone/Weaviate** for vector database storing dream embeddings
- **LangChain** for prompt orchestration and RAG (Retrieval-Augmented Generation)

### Mobile Development

- **React Native** for code sharing with web app

---

## Summary

The LucidLog tech stack is optimized for:

1. **Rapid Development:** Laravel + Inertia + React eliminates API boilerplate
2. **Type Safety:** Wayfinder + TypeScript + Larastan catch errors at compile time
3. **Performance:** PostgreSQL full-text search, Redis caching, Vite bundling
4. **Code Quality:** Pint, Larastan, Rector, Ultracite enforce consistent style and catch bugs early
5. **Scalability:** Laravel Cloud infrastructure supports future AI features and mobile apps
6. **Developer Experience:** Herd for native performance, Telescope + DebugBar for debugging, Pest for enjoyable testing, Lefthook for fast pre-commit checks
7. **Production Ready:** Laravel Cloud + Nightwatch provide managed infrastructure and queue monitoring

This stack balances modern best practices with pragmatic choices for a small-to-medium application that can scale as LucidLog grows, leveraging the official Laravel ecosystem for seamless integration.
