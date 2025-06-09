Table of Contents:

- Introduction
- Goals
- Target Audience
- Release Criteria
- Features
- User Stories
- Context and Scope
  - Out of Scope
  - Assumptions
  - Constraints
  - Dependencies
- Appendix A: Future Considerations & Roadmap Notes

## 1. Introduction

This document outlines the requirements for **LucidLog**, a digital dream journaling platform. LucidLog allows users to record their dreams, revisit past entries, discover patterns over time, and explore potential interpretations using a built-in dream dictionary.

The core problem LucidLog addresses is the **ephemeral nature of dreams**: while dreams are a common and fascinating human experience, they are often forgotten quickly and rarely reflected upon. LucidLog provides a structured space to capture these experiences and gain insights from them.

Unlike traditional journaling apps, LucidLog integrates a **semantic dream dictionary** and aims to offer **AI-assisted insights** in future iterations, helping users connect dots, observe recurring themes, and learn from their subconscious experiences.

---

## 2. Goals

1. **Collect 100+ unique dream entries from at least 30 real users** within 60 days of launch to validate product engagement.
2. **Launch AI-powered dream interpretation MVP**, and gather feedback to achieve **>75% "usefulness" rating** by the third product iteration.
3. **10% of signed-up users log 2+ dreams per week** by week 4 post-onboarding.
4. **Publish 50+ well-indexed dream symbols** in the dream dictionary by end of Month 3 to support organic traffic and user engagement.

---

## 3. Target Audience

Target personas:

### Persona 1: "Emily the Curious Sleeper"

- **Demographics:** 33, female, office manager, Columbus, OH
- **Goals:** Reflect on and understand occasional vivid dreams
- **Pain Points:** Lacks tools to explore or record dreams conveniently
- **Scenario:** Uses LucidLog after a strange dream to quickly record and learn from it

### Persona 2: "Sophie the Soul Seeker"

- **Demographics:** 32, female, yoga instructor, Austin, TX
- **Goals:** Explore spiritual meaning and symbolism in her dreams
- **Pain Points:** Lacks a journal that integrates spiritual insight or metaphysical interpretation
- **Scenario:** Journals daily, checks dream dictionary for recurring symbols

### Persona 3: "Marcus the Mind Hacker"

- **Demographics:** 26, male, startup founder, Brooklyn, NY
- **Goals:** Track and optimize lucid dreaming techniques
- **Pain Points:** Existing tools don't support self-experimentation or pattern tracking
- **Scenario:** Logs dreams weekly, looks for trends, explores quantified habits

### Persona 4: "Dr. Lin the Clinical Explorer"

- **Demographics:** 45, female, psychologist, San Francisco
- **Goals:** Understand links between dreams and mental health
- **Pain Points:** Lacks structured tools for dream data collection in clinical settings
- **Scenario:** Uses LucidLog in studies involving trauma and recovery

---

## 4. Release Criteria

LucidLog v1 is considered ready for public release when:

1. Users can securely create an account, log in, and write dream entries
2. A public dream dictionary is searchable and includes at least 10 live symbols
3. Dreams are saved and viewable historically with edit/delete functionality
4. Users see total dreams logged and time since last entry on a personal dashboard
5. At least 5 non-admin users log 2+ dreams
6. Site meets Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1) on desktop and mobile (4G+)
7. A marketing site is live with pages: Home, Features, Pricing, FAQ, Terms of Use, Privacy Policy, Contact

---

## 5. Features

### Core Features

1. **Dream Entry Editor**

   - Markdown-enabled editor with fields: title, content, date
   - No support for images or advanced formatting

2. **Dream History Viewer**

   - Timeline/list view of previous dream entries
   - No search or filtering in v1

3. **Public Dream Dictionary**

   - SEO-optimized `/dictionary` index and `/dictionary/[term]` pages
   - Accessible slideover dictionary in-app (requires login)

4. **User Dashboard**

   - Displays entry count and time since last log
   - Includes "Add New Dream" CTA

5. **Authentication & Account Management**

   - Managed by Clerk; email login, onboarding, password reset

6. **Marketing Website**

   - Pages: Home, Features, Pricing, FAQ, Terms, Privacy, Contact

### Post-Launch Feature Backlog

1. Public/private dream entries
2. Dream search and filtering
3. Tags & mood tracking
4. Dream reminders and streaks
5. AI summaries and interpretations
6. AI chatbot for dream interaction
7. Dream pattern analysis
8. Data export (CSV, JSON, PDF)
9. Sharing/public profile functionality
10. About page and additional landing pages

---

## 6. User Stories

### US-001

- **User Type:** Emily the Curious Sleeper
- **Action:** Create a dream entry
- **Benefit:** Record vivid dreams
- **Acceptance:** Title, content, and date fields; basic Markdown; no image upload

### US-002

- **User Type:** Marcus the Mind Hacker
- **Action:** View past dreams
- **Benefit:** Analyze dream patterns
- **Acceptance:** List view in reverse chronological order; clickable detail view

### US-003

- **User Type:** Sophie the Soul Seeker
- **Action:** Look up a dream symbol
- **Benefit:** Explore meanings
- **Acceptance:** Public dictionary access; in-app slideover view (requires login)

### US-004

- **User Type:** Emily the Curious Sleeper
- **Action:** View dashboard
- **Benefit:** Track journaling consistency
- **Acceptance:** Entry count, last log date, "Add New Dream" CTA

### US-005

- **User Type:** Any Persona
- **Action:** Sign up and log in
- **Benefit:** Begin journaling securely
- **Acceptance:** Email signup, verification, onboarding, logout

### US-006

- **User Type:** Guest Visitor
- **Action:** Explore marketing site
- **Benefit:** Understand LucidLog before registering
- **Acceptance:** Homepage with features, pricing, FAQ, CTA

### US-007

- **User Type:** Sophie the Soul Seeker
- **Action:** Review legal and support pages
- **Benefit:** Trust and clarity before sign-up
- **Acceptance:** Access to FAQ, Privacy Policy, and Terms pages

---

## 7. Context and Scope

### Out of Scope

1. AI features (summaries, chatbot, interpretations)
2. Public or shareable dream entries
3. Search/filter functionality in dream history
4. Tags, moods, or analytics beyond basics
5. Reminder systems and streak tracking
6. Dream export functionality
7. Full Markdown support (e.g., images)
8. About page and separate landing pages

### Assumptions

1. Web-first (not mobile native)
2. Non-technical users unfamiliar with Markdown
3. Journaling behavior is irregular
4. AI is a post-launch feature
5. Dictionary may be a key traffic source
6. Privacy and trust are critical
7. Cohesive design across site and app

### Constraints

1. Clerk for authentication and billing
2. Basic Markdown only (no images)
3. Core Web Vitals thresholds required
4. Private entries only
5. No AI or search features in v1
6. SEO focus limited to dictionary

### Dependencies

- **Clerk** – auth & billing
- **Custom Markdown Editor** – journaling
- **Internal DB** – dream & dictionary data (via Supabase/Convex/Neon + Prisma/Drizzle)
- **Vercel** – hosting
- **PostHog** – analytics + error tracking
- **Resend** – emails
- **Hover** – DNS/domain
- **Crisp** – chat
- **Linear** – issue tracking

---

## Appendix A: Future Considerations & Roadmap Notes

### Post-Launch Features

(See Section 5: Feature Backlog)

### Persona-Specific Features for Future Stories

- **Emily** – Reminders, sharing
- **Sophie** – Interpretations, symbolism, sharing
- **Marcus** – Patterns, analytics, gamification
- **Dr. Lin** – Export tools, clinical dashboard, data anonymization

### Deferred/Removed Items

- Waitlist functionality
- Public/private toggling
- Search and filter in v1
- Image support in editor
- In-app dictionary without login
- About page on homepage
