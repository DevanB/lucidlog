## Coding style best practices

- **Consistent Naming Conventions**: Establish and follow naming conventions for variables, functions, classes, and files across the codebase
- **Automated Formatting**: Maintain consistent code style (indenting, line breaks, etc.)
  - **PHP**: Use Laravel Pint for automatic formatting according to Laravel conventions
  - **TypeScript/JavaScript**: Use Ultracite for linting and formatting
  - Pre-commit hooks via Lefthook ensure code is formatted before commits
- **Static Analysis**: Run Larastan (PHPStan for Laravel) at level 5+ to catch type errors and bugs before runtime
- **Type Safety**:
  - Always use explicit return type declarations in PHP methods
  - Use proper type hints for method parameters
  - Leverage TypeScript for frontend type safety
  - Use Wayfinder for type-safe route references
- **Meaningful Names**: Choose descriptive names that reveal intent; avoid abbreviations and single-letter variables except in narrow contexts
- **Small, Focused Functions**: Keep functions small and focused on a single task for better readability and testability
- **Consistent Indentation**: Use consistent indentation (spaces or tabs) and configure your editor/linter to enforce it
- **Remove Dead Code**: Delete unused code, commented-out blocks, and imports rather than leaving them as clutter
- **Backward compatibility only when required:** Unless specifically instructed otherwise, assume you do not need to write additional code logic to handle backward compatibility.
- **DRY Principle**: Avoid duplication by extracting common logic into reusable functions or modules
- **Code Reviews**: Use CodeRabbit CLI for AI-powered code review insights before merging PRs
