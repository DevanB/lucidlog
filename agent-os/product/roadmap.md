# LucidLog Product Roadmap

This roadmap outlines the development phases for LucidLog, ordered by technical dependencies and the most direct path to achieving our mission of helping users capture and understand their dreams.

---

## MVP / Phase 1: Foundation & Core Experience

**Goal:** Launch a fully functional dream journaling platform with essential features for users to record, view, and explore their dreams.

0. [ ] **Developer Tooling Setup** — Configure comprehensive development environment including Laravel Pint for PHP formatting, Larastan (PHPStan for Laravel) for static analysis and type checking, Laravel DebugBar for in-page debugging, Laravel Telescope for application insights, Rector for automated PHP refactoring and upgrades, Ultracite for TypeScript/JavaScript linting and formatting (replacing ESLint and Prettier), CodeRabbit CLI for AI-powered code reviews, Lefthook for fast Git hooks management, and automated checks on commit (Pint, Larastan, Ultracite, type checking) and PR opened (full test suite, static analysis). Set up pre-commit hooks to run code quality checks and ensure consistent code style across the team. Configure Larastan at level 5+ for strong type safety. `M`

1. [ ] **User Authentication System** — Complete registration, login, email verification, and password reset flows using Laravel Fortify with Inertia.js forms and proper validation. `M`

2. [ ] **User Onboarding Flow** — Build multi-step onboarding experience shown to new users after account creation, introducing key features (dream journal, dictionary, dashboard), highlighting core functionality with interactive tooltips, and providing quick tour of the app interface with skip/progress indicators. `S`

3. [ ] **Dream Entry CRUD Operations** — Create, read, update, and delete dream entries with title, Markdown content, date fields, and proper user ownership validation. `M`

4. [ ] **Dream Journal List View** — Display paginated list of user's dream entries sorted by date with entry previews, edit/delete actions, and empty state for new users. `S`

5. [ ] **Dream Entry Detail View** — Full-page view of individual dream with rendered Markdown, metadata display, and navigation to edit/delete functions. `S`

6. [ ] **User Dashboard** — Landing page after login showing total dream count, last entry date, quick-add dream button, and motivational empty states. `S`

7. [ ] **Dream Dictionary Database Schema** — Create DreamSymbol model, migration, factory, and seeder with fields for symbol name, description, interpretation, SEO metadata, and slug. `S`

8. [ ] **Dream Dictionary Public Pages** — Build public-facing dictionary index with search functionality, individual symbol detail pages with SEO, and alphabetical/category browsing. `M`

9. [ ] **Marketing Website Pages** — Develop home page with value proposition, features page, pricing page (even if free), FAQ page with accordion UI, terms of service, privacy policy, and contact form. `L`

10. [ ] **Application Layout & Navigation** — Implement responsive navigation with authenticated/guest states, footer with links, mobile menu, and consistent styling using Tailwind v4 and shadcn/ui components. `M`

11. [ ] **Database Optimization & Indexing** — Add proper indexes on foreign keys, search fields (dream title/content, symbol names), timestamps, and implement eager loading to prevent N+1 queries. `S`

12. [ ] **Form Validation & Error Handling** — Create Form Request classes for all user inputs with client-side validation feedback, custom error messages, and proper Inertia error handling. `S`

13. [ ] **Initial Content Seeding** — Populate dream dictionary with 25-50 common dream symbols with quality interpretations and SEO-friendly descriptions. `M`

---

## Phase 2: Enhanced Discovery & Usability

**Goal:** Improve user experience with better search, filtering, analytics, and dictionary features that encourage daily use.

0. [ ] **Dream Search & Filtering** — Add full-text search across dream titles and content, filter by date range, and sort options (newest, oldest, title) with URL query parameter persistence. `M`

1. [ ] **Dream Statistics Dashboard** — Display visual analytics including dreams per month chart, most active days, average dreams per week, and longest streak counter. `M`

2. [ ] **Enhanced Dream Dictionary** — Add categories/tags to symbols, related symbols linking, advanced search with filters, and user-contributed symbol request system. `L`

3. [ ] **Dream Entry Templates** — Provide optional structured templates (what happened, emotions felt, notable symbols) to help users capture more detail consistently. `S`

4. [ ] **Markdown Editor Enhancement** — Upgrade to rich Markdown editor with toolbar, preview mode, symbol quick-insert from dictionary, and auto-save drafts. `M`

5. [ ] **User Profile Management** — Allow users to update email, password, display preferences (theme, timezone), and view account creation date with profile completion prompts. `S`

6. [ ] **Email Notifications** — Send optional morning reminder emails, weekly summary emails, and milestone celebration emails (10th dream, 30-day streak). `M`

7. [ ] **Performance Optimization** — Implement Redis caching for dictionary pages, optimize database queries with indexes, add Laravel Telescope for debugging, and ensure sub-2s page loads. `S`

---

## Phase 3: AI Interpretation & Advanced Features

**Goal:** Introduce AI-powered insights, advanced analytics, and export features that transform LucidLog from a journal into an interpretation engine.

0. [ ] **AI Dream Pattern Detection** — Integrate OpenAI API to identify recurring themes, symbols, and emotional patterns across user's dream history with weekly insight emails. `XL`

1. [ ] **AI Dream Interpretation Assistant** — Build conversational AI chatbot that answers questions about specific dreams, suggests interpretations based on dictionary and patterns, and learns user preferences. `XL`

2. [ ] **AI Summary Generation** — Automatically generate concise summaries of long dream entries with key symbols highlighted and emotional tone detection. `L`

3. [ ] **Tag System** — Allow users to create custom tags for dreams, tag-based filtering and grouping, popular tag suggestions, and tag-based analytics views. `M`

4. [ ] **Mood Tracking** — Add optional mood/emotion selection per dream entry, mood trend visualization over time, and correlation analysis between moods and dream themes. `M`

5. [ ] **Dream Export Functionality** — Enable export of all dreams to JSON, CSV, PDF, and Markdown formats with date range selection and formatting options. `M`

6. [ ] **Lucid Dream Tracking** — Add checkbox to mark lucid dreams, track lucidity rate over time, identify lucidity triggers from entry content, and provide lucid dreaming tips. `M`

7. [ ] **Reality Check Reminders** — Send random push notifications during the day prompting reality checks to improve lucid dreaming success rate. `S`

8. [ ] **Advanced Analytics Dashboard** — Display word clouds of most common terms, dream length trends, time-of-night patterns (if logged), and symbol frequency analysis. `L`

9. [ ] **API Development** — Build RESTful API with authentication for third-party integrations, mobile app support, and data import/export automation. `L`

---

## Future Considerations (Phase 4+)

**Ideas for continued product evolution beyond Phase 3:**

- **Optional Dream Sharing:** Allow users to publish select dreams anonymously or publicly with community commenting and interpretation suggestions
- **Dream Journal Communities:** Create themed groups where users can optionally share and discuss dreams with like-minded individuals
- **Mobile Applications:** Native iOS and Android apps with offline mode, voice-to-text dream recording, and push notification reminders
- **Sleep Integration:** Connect with wearable devices to correlate sleep stages, REM cycles, and dream recall quality
- **Therapist Portal:** HIPAA-compliant dashboard for mental health professionals to review client dreams (with explicit consent) and provide clinical interpretations
- **Dream Symbol Voting:** Community-driven symbol interpretation refinement with upvoting and alternative meaning suggestions
- **Advanced AI Models:** Fine-tuned dream interpretation models trained on LucidLog's growing dataset with user feedback loops
- **Multimedia Support:** Image uploads for dream sketches, audio recording for immediate post-waking capture, and video dream journals
- **Gamification:** Streak badges, dream diversity challenges, lucid dreaming achievement system, and social leaderboards
- **White-Label Solution:** B2B offering for sleep clinics, therapy practices, and research institutions

---

> **Notes**
>
> - Effort scale: `XS` = 1 day | `S` = 2-3 days | `M` = 1 week | `L` = 2 weeks | `XL` = 3+ weeks
> - Items are ordered by technical dependencies and product architecture priorities
> - Each item represents an end-to-end (frontend + backend) functional and testable feature
> - MVP/Phase 1 focuses on core journaling experience with complete authentication and dictionary foundation
> - Phase 2 enhances discoverability and encourages habit formation through better UX
> - Phase 3 introduces AI capabilities that differentiate LucidLog from traditional journaling apps
