# Testomniac Types

Shared TypeScript type definitions for the Testomniac API ecosystem.

**npm**: `@sudobility/testomniac_types` (public)

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Runtime**: Bun
- **Package Manager**: Bun (do not use npm/yarn/pnpm for installing dependencies)
- **Build**: TypeScript compiler (ESM output)
- **Test**: Vitest

## Project Structure

```
src/
├── index.ts           # All types, interfaces, and response helpers (~2200 lines)
└── index.test.ts      # Tests (100+ test cases)
```

## Commands

```bash
bun run build          # Build ESM (tsc -p tsconfig.esm.json → dist/)
bun run dev            # Watch mode
bun test               # Run Vitest tests (src/index.test.ts)
bun run typecheck      # TypeScript check
bun run lint           # Run ESLint
bun run format         # Prettier format
bun run verify         # All checks + build (use before commit)
bun run prepublishOnly # Clean + verify (runs on publish)
```

## Key Types

### Enums & Constants

- `PlaywrightAction` — click, fill, check, select, hover, press, navigate, etc.
- `LocatorStrategy` — role, text, label, placeholder, testId, css, xpath
- `ExpectationType` — 60+ assertion types (page_loaded, no_console_errors, form_submitted_successfully, etc.)
- `PatternType` — Card, Modal, Accordion, Carousel, Tab, etc.
- `ScaffoldType` — header, footer, sidebar, navigation, main-content
- `Screen` — predefined desktop and mobile screen definitions

### Domain Entities

- `TestAction`, `TestStep`, `TestInteraction`, `TestSurface`, `TestSurfaceBundle`
- `TestRun`, `TestSurfaceRun`, `TestElementRun`, `TestRunFinding`
- `ElementIdentity`, `ElementLocator` — persistent element identification
- `Page`, `PageState`, `PageVisit`, `Scaffold`, `UiPattern`
- `Persona`, `UseCase`, `InputValue`
- `TestScenario`, `TestEnvironment`, `Product`, `Runner`

### Request/Response Types

100+ API contract types following the pattern: `<Entity>Response`, `<Entity>CreateRequest`, `<Entity>UpdateRequest`.

### Response Helpers

- `successResponse<T>(data)` — wraps data in `BaseResponse<T>` with `success: true`
- `errorResponse(error)` — wraps error string in `BaseResponse<never>` with `success: false`

### Utility Functions

- `resolvePlaywrightRole(tagName)` — maps HTML tags to ARIA roles

### Re-exports from @sudobility/types

`ApiResponse`, `BaseResponse`, `NetworkClient`, `Optional`, entity types, enums

## Peer Dependencies

- `@sudobility/types` — shared infrastructure types (`BaseResponse`, `NetworkClient`, etc.)

## Architecture

```
@sudobility/testomniac_types (this package)
    ^
testomniac_api
testomniac_client
testomniac_lib
testomniac_app
testomniac_runner_service
testomniac_runner
testomniac_extension
testomniac_api_mcp
testomniac_runner_mcp
```

Foundation layer — all other Testomniac projects depend on this package.

## Related Projects

- **testomniac_api** — Backend API server (Hono + PostgreSQL); imports types for request/response validation
- **testomniac_client** — API client SDK with TanStack Query hooks; imports types for API contracts
- **testomniac_lib** — Business logic library with Zustand stores; imports types transitively via testomniac_client
- **testomniac_app** — Web application (React + Vite); imports types transitively
- **testomniac_runner_service** — Shared execution library; imports types for domain models
- **testomniac_runner** — Server-side polling worker; imports types via runner_service
- **testomniac_extension** — Chrome extension; imports types via runner_service
- **testomniac_api_mcp** — MCP server for API endpoints
- **testomniac_runner_mcp** — MCP server for browser automation

## Coding Patterns

- Pure type definitions only — no runtime logic except `successResponse`, `errorResponse`, and `resolvePlaywrightRole` helper functions
- All public types and helpers are exported from a single `src/index.ts` barrel file
- Re-export base types from `@sudobility/types` so consumers only need to depend on this package
- Use `interface` for object shapes and `type` for unions/aliases
- Enums use `as const` objects with PascalCase keys: `export const EnumName = { Key: 'value' } as const`
- Type aliases from const: `export type EnumName = (typeof EnumName)[keyof typeof EnumName]`
- Deprecated items marked with `/** @deprecated Use X instead */` JSDoc comments
- Sections separated with `// ===` comment dividers

## Gotchas

- Changes here affect ALL consumer projects — always consider downstream impact
- Always run `bun run verify` before publishing to catch type errors, lint issues, and build failures
- The `BaseResponse<T>` wrapper is the standard API envelope — all API responses must conform to it
- Do not add runtime dependencies; this package should remain a lightweight type-only dependency (response helpers are the sole exception)
