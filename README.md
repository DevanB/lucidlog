# LucidLog

## Prerequisites
- Node.js (v23+ recommended)
- pnpm
- Turso CLI (`brew install tursodatabase/tap/turso`)

## Tech Stack
- Next.js
- Clerk
- Drizzle ORM
- Turso (libSQL)
- Vitest (with Testing Library)

## Getting Started

First, install dependencies and run the development server:

```bash
pnpm i && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Taskmaster Setup

Make sure you have Taskmaster installed globally (`npm i -g task-master-ai`).

Additionally, you will need a `.env` with various keys:

```
ANTHROPIC_API_KEY=      # Required: Format: sk-ant-api03-...
PERPLEXITY_API_KEY=     # Optional: Format: pplx-...
OPENAI_API_KEY=         # Optional, for OpenAI/OpenRouter models. Format: sk-proj-...
GOOGLE_API_KEY=         # Optional, for Google Gemini models.
MISTRAL_API_KEY=        # Optional, for Mistral AI models.
XAI_API_KEY=            # Optional, for xAI AI models.
AZURE_OPENAI_API_KEY=   # Optional, for Azure OpenAI models (requires endpoint in .taskmaster/config.json).
OLLAMA_API_KEY=         # Optional: For remote Ollama servers that require authentication.
```

And you will need the keys within the MCP/server file: https://github.com/eyaltoledano/claude-task-master?tab=readme-ov-file#option-1-mcp-recommended

## Database Setup

Make sure you have Turso installed via 

```sh
brew install tursodatabase/tap/turso
```

Once authenticated (`turso auth login`), these commands might be handy:

- `turso db show [db name]`
- `turso db shell [db name]`
- `turso db tokens create [db name]`

Your `.env` must also include:

```
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

## Development & Testing Workflow
- Local and test databases are managed with Turso CLI
- Migrations are handled by Drizzle Kit
- Tests are run with Vitest and are fully isolated from dev data

## Database & Testing Infrastructure Setup

### Environment Variables
- Copy `.env.example` to `.env` for development and `.env.test` for testing.
- Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` as appropriate.

## Local Development Database
1. In `.env`:
  ```
  TURSO_DATABASE_URL=http://127.0.0.1:8080
  TURSO_AUTH_TOKEN=
  ```

## Local Test Database
1. In `.env.test`:
  ```
  TURSO_DATABASE_URL=http://127.0.0.1:8081
  TURSO_AUTH_TOKEN=
  ```

## Running Migrations
- To apply migrations to the current DB (dev or test):
  ```sh
  pnpm db:migrate
  ```
- Migrations are run automatically before tests via the test script.

## Running Tests
- To run tests (spins up test DB, runs migrations, then tests):
```sh
pnpm test
```
- For the test UI:
```sh
pnpm test:ui
```