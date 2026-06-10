# @sudobility/testomniac_types

Shared TypeScript type definitions for the Testomniac testing platform ecosystem.

Foundation layer -- all other Testomniac projects depend on this package.

## Installation

```bash
bun add @sudobility/testomniac_types
```

Peer dependency:

```bash
bun add @sudobility/types
```

## Usage

```ts
import {
  TestInteraction,
  TestRun,
  TestRunFinding,
  TestRunStatus,
  PlaywrightAction,
  successResponse,
  errorResponse,
  isSuccessResponse,
  isErrorResponse,
  resolvePlaywrightRole,
} from '@sudobility/testomniac_types';

// Wrap API responses
const ok = successResponse({ items: [] }); // { success: true, data: { items: [] } }
const err = errorResponse('Not found');    // { success: false, error: "Not found" }

// Type-check responses
if (isSuccessResponse(response)) {
  console.log(response.data);
}

// Map HTML tags to ARIA roles
const role = resolvePlaywrightRole('button'); // "button"
```

## Key Type Categories

### Enums & Constants

- `PlaywrightAction` -- click, fill, check, select, hover, press, navigate, etc.
- `LocatorStrategy` -- role, text, label, placeholder, testId, css, xpath
- `ExpectationType` -- 60+ assertion types (page_loaded, no_console_errors, form_submitted_successfully, etc.)
- `TestRunStatus` -- pending, running, completed, failed, etc.
- `TestType` -- render, interaction, navigation, form, e2e, etc.
- `PatternType` -- Card, Modal, Accordion, Carousel, Tab, etc.
- `ScaffoldType` -- header, footer, sidebar, navigation, main-content
- `Screen` -- predefined desktop and mobile screen definitions

### Domain Entities

- `TestAction`, `TestStep`, `TestInteraction`, `TestSurface`, `TestSurfaceBundle`
- `TestRun`, `TestSurfaceRun`, `TestElementRun`, `TestRunFinding`
- `ElementIdentity`, `ElementLocator` -- persistent element identification
- `Page`, `PageState`, `PageVisit`, `Scaffold`, `UiPattern`
- `Persona`, `UseCase`, `InputValue`
- `TestScenario`, `TestEnvironment`, `Product`, `Runner`

### API Contracts

100+ request/response types following a consistent pattern:

- `<Entity>Response` -- API response envelope for an entity
- `<Entity>CreateRequest` -- payload for creating an entity
- `<Entity>UpdateRequest` -- payload for updating an entity

### Response Helpers

- `successResponse<T>(data)` -- wraps data in `BaseResponse<T>` with `success: true`
- `errorResponse(error)` -- wraps error string in `BaseResponse<never>` with `success: false`
- `isSuccessResponse(response)` -- type guard for success responses
- `isErrorResponse(response)` -- type guard for error responses

### Utility Functions

- `resolvePlaywrightRole(tagName)` -- maps HTML tags to ARIA roles

### Re-exports from @sudobility/types

`ApiResponse`, `BaseResponse`, `NetworkClient`, `Optional`, entity types, and enums.

## Development

```bash
bun run build          # Build ESM output (tsc → dist/)
bun run dev            # Watch mode
bun test               # Run Vitest tests (100+ test cases)
bun run typecheck      # TypeScript check
bun run lint           # Run ESLint
bun run verify         # All checks + build (use before commit)
```

## Architecture

```
@sudobility/testomniac_types (this package)
    ^
testomniac_api             -- Backend API server
testomniac_client          -- API client SDK with TanStack Query hooks
testomniac_lib             -- Business logic library
testomniac_app             -- React web application
testomniac_app_rn          -- React Native mobile app
testomniac_runner_service  -- Shared execution library
testomniac_runner          -- Server-side polling worker
testomniac_extension       -- Chrome extension
```

## Related Packages

- **testomniac_api** -- Backend API server (Hono + PostgreSQL); imports types for request/response validation
- **testomniac_client** -- API client SDK with TanStack Query hooks; imports types for API contracts
- **testomniac_lib** -- Business logic library; imports types transitively via testomniac_client
- **testomniac_app** -- Web application (React + Vite); imports types transitively
- **testomniac_app_rn** -- React Native mobile app; imports types transitively
- **testomniac_runner_service** -- Shared execution library; imports types for domain models
- **testomniac_runner** -- Server-side polling worker; imports types via runner_service
- **testomniac_extension** -- Chrome extension; imports types via runner_service

## License

BUSL-1.1
