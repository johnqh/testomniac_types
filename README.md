# @sudobility/testomniac_types

Shared TypeScript type definitions and response helpers for the Testomniac AI-powered automated UI testing platform.

## Installation

```bash
bun add @sudobility/testomniac_types
```

## Usage

```typescript
import {
  History,
  HistoryCreateRequest,
  successResponse,
  errorResponse,
} from "@sudobility/testomniac_types";

const request: HistoryCreateRequest = { datetime: new Date(), value: 42 };
const response = successResponse({ id: "abc", ...request });
```

## Types

| Type | Description |
|------|-------------|
| `History` | Core entity: `id`, `user_id`, `datetime`, `value`, timestamps |
| `HistoryCreateRequest` | `{ datetime, value }` |
| `HistoryUpdateRequest` | `{ datetime?, value? }` |
| `HistoryTotalResponse` | `{ total }` |

### Response Helpers

- `successResponse<T>(data)` -- wrap data in `BaseResponse<T>`
- `errorResponse(error)` -- create error response

### Re-exports from @sudobility/types

`ApiResponse`, `BaseResponse`, `NetworkClient`, `Optional`

## Development

```bash
bun run build        # Dual CJS + ESM build
bun test             # Run tests
bun run verify       # All checks + build
```

## Related Packages

- `testomniac_client` -- API client SDK
- `testomniac_lib` -- Business logic with Zustand stores
- `testomniac_api` -- Backend API server
- `testomniac_app` -- Web app
- `testomniac_app_rn` -- React Native app
- `testomniac_extension` -- Chrome extension

## License

BUSL-1.1
