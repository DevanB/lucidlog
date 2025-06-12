Table of Contents:

- Introduction
- Goals
- Target Audience
- Release Criteria
- Features
- User Stories
- Context and Scope
  - Out of Scope
  - Constraints
- Appendix A: Future Considerations & Roadmap Notes

## 1. Introduction

This product requirements document covers the public dream dictionary feature, designed as an openly accessible, browsable collection of dream-related terms, their meanings, and related terms.

---

## 2. Goals

1. Provide a reliable dream dictionary at `/dictionary` and `/dictionary/[term]` routes.
2. Ensure it is public-facing, grouped alphabetically, has client-side filtering (to act as search), and has a sub-navigation for each letter.
3. Enable internal admin users to manage terms via a basic UI.

---

## 3. Target Audience

1. Casual visitors seeking meaning of dreams.
2. Users journaling and needing a reference.
3. Search-engine-indexable audience.

---

## 4. Release Criteria

The pubilc-facing dream dictionary is considered ready for release when:

1. Dictionary accessible at `/dictionary`.
2. Alphabetical grouping on `/dictionary` page.
3. Client-side filtering/search functionality on `/dictionary` page.
4. `/dictionary` page has a sub-navigation for each letter (A–Z).
5. Each dream dictionary terms has SEO-friendly `/dictionary/[term]` page.
6. Structured data embedded via LD+JSON for SEO on both `/dictionary` and `/dictionary/[term]` pages.
7. Administrators can create, edit, and delete dictionary terms via a separate admin panel.

---

## 5. Features

### Feature: Public Dictionary Page

- **Description:** `/dictionary` route lists terms grouped by their starting character (A–Z), dynamically pulled from DB.
- **Priority:** High
- **User Stories:** US-DD-001, US-DD-002, US-DD-003, US-DD-004

### Feature: Dictionary Term Page

- **Description:** `/dictionary/[term]` displays name, definition, and related terms.
- **Priority:** High
- **User Stories:** US-DD-005

#### Functional Notes

- Terms stored in DB with fields: name, definition, related_terms[].

---

## 6. User Stories

### US-DD-001

- **User Type:** Visitor
- **Action:** View dictionary grouped by A–Z.
- **Benefit:** Easily browse and find relevant dream terms.
- **Acceptance Criteria:**
  - Page groups terms under alphabetical headings.
  - Terms dynamically loaded from database.
  - Each term links to its detail page.
  - Page is SEO-optimized (title/meta/LD+JSON).

### US-DD-002

- **User Type:** Visitor
- **Action:** Search for term.
- **Benefit:** Find specific dream term easily.
- **Acceptance Criteria:**
  - User searches for term within box at top of page.
  - Search works by using client-side filtering on all terms.
  - User selects result and is taken to specific term page.

### US-DD-003

- **User Type:** Visitor
- **Action:** Navigate to specific group.
- **Benefit:** Easily jump to terms by specific character.
- **Acceptance Criteria:**
  - User uses sub-navigation of A-Z links.
  - Groups with terms are displayed by are disabled links.
  - User selects letter and page scrolls to specific grouping.

### US-DD-004

- **User Type:** Visitor
- **Action:** Copies link to specific group
- **Benefit:** Easily copy a link that takes user to specific group
- **Acceptance Criteria:**
  - User sees a "#" icon next to group heading.
  - Link in heading is to the specific group selected.

### US-DD-005

- **User Type:** Visitor
- **Action:** View specific term page.
- **Benefit:** Read concise dream definitions.
- **Acceptance Criteria:**
  - Page displays name, definition, and related terms.
  - Page is SEO-optimized (title/meta/LD+JSON).

---

## 7. Context and Scope

### Out of Scope

1. Dictionary editing UI (admin panel handled separately)
2. AI-generated definitions
3. Tags, categories, term nesting

### Constraints

1. No AI involvement.
2. Flat term structure (no hierarchy or advanced taxonomy).

---

## Appendix A: SEO Structured Data (LD+JSON)

For `/dictionary` page:

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "LucidLog Dream Dictionary",
  "description": "An A-Z collection of dream-related terms and their meanings."
}
```

For `/dictionary/[term]` pages:

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "[term]",
  "description": "[description]",
  "inDefinedTermSet": "https://lucidlog.com/dictionary"
}
```
