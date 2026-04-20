// Re-export common types from @sudobility/types
export type {
  ApiResponse,
  BaseResponse,
  NetworkClient,
  Optional,
} from '@sudobility/types';
import type { BaseResponse } from '@sudobility/types';

// Re-export entity types from @sudobility/types
export type {
  Entity,
  EntityWithRole,
  EntityMember,
  EntityInvitation,
  EntityPermissions,
  CreateEntityRequest,
  UpdateEntityRequest,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
} from '@sudobility/types';

export { EntityType, EntityRole, InvitationStatus } from '@sudobility/types';

// =============================================================================
// Type Aliases
// =============================================================================

/**
 * ISO 8601 formatted datetime string.
 *
 * @example "2025-01-15T10:30:00.000Z"
 */
export type ISODateString = string & { readonly __brand: 'ISODateString' };

// =============================================================================
// User
// =============================================================================

/**
 * User account information.
 *
 * @example
 * ```typescript
 * const user: User = {
 *   firebase_uid: 'uid123',
 *   email: 'user@example.com',
 *   display_name: 'John Doe',
 *   created_at: '2025-01-15T10:30:00.000Z',
 *   updated_at: '2025-01-15T10:30:00.000Z',
 * };
 * ```
 */
export interface User {
  /** Firebase Authentication UID */
  firebase_uid: string;
  /** User email address, nullable */
  email: string | null;
  /** User display name, nullable */
  display_name: string | null;
  /** ISO 8601 timestamp of account creation, nullable */
  created_at: string | null;
  /** ISO 8601 timestamp of last update, nullable */
  updated_at: string | null;
}

// =============================================================================
// Response Helpers
// =============================================================================

/**
 * Constructs a successful API response.
 *
 * Creates a {@link BaseResponse} with `success: true`, the provided data payload,
 * and a timestamp set to the current time in ISO 8601 format.
 *
 * @typeParam T - The type of the response payload
 * @param data - The response payload (can be any type, including `undefined` or `null`)
 * @returns A {@link BaseResponse} with `success: true` and `data` property set
 *
 * @example
 * ```typescript
 * // Successful single record
 * const response1 = successResponse({ id: '123', name: 'test' });
 *
 * // Array of records
 * const response2 = successResponse([
 *   { id: '1', value: 100 },
 *   { id: '2', value: 200 },
 * ]);
 *
 * // Null or undefined data (valid, though potentially unusual)
 * const response3 = successResponse(null);
 * ```
 *
 * @internal
 * Timestamp is always included in the response envelope and formatted as ISO 8601.
 */
export function successResponse<T>(data: T): BaseResponse<T> {
  return { success: true, data, timestamp: new Date().toISOString() };
}

/**
 * Constructs an error API response.
 *
 * Creates a {@link BaseResponse} with `success: false`, the provided error message,
 * and a timestamp set to the current time in ISO 8601 format.
 *
 * **Note:** This function accepts empty strings as valid error messages. While this
 * is allowed by the runtime and type system, it is generally recommended to provide
 * meaningful, non-empty error descriptions for better debugging and client-side handling.
 *
 * @param error - A descriptive error message (may be empty, though not recommended)
 * @returns A {@link BaseResponse} with `success: false` and `error` property set
 *
 * @example
 * ```typescript
 * // Standard error
 * const response1 = errorResponse('User not found');
 *
 * // Error with context
 * const response2 = errorResponse('Invalid datetime format: expected ISO 8601');
 *
 * // Empty string (allowed but not recommended)
 * const response3 = errorResponse('');
 * ```
 *
 * @internal
 * Timestamp is always included in the response envelope and formatted as ISO 8601.
 */
export function errorResponse(error: string): BaseResponse<never> {
  return { success: false, error, timestamp: new Date().toISOString() };
}

// =============================================================================
// Scanner Enums
// =============================================================================

export const SizeClass = {
  Desktop: 'desktop',
  Mobile: 'mobile',
} as const;
export type SizeClass = (typeof SizeClass)[keyof typeof SizeClass];

export const ActionType = {
  Navigate: 'navigate',
  Mouseover: 'mouseover',
  Click: 'click',
  Fill: 'fill',
  Select: 'select',
  Check: 'check',
  Toggle: 'toggle',
  CheckEmail: 'check_email',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export const ActionStatus = {
  Open: 'open',
  Completed: 'completed',
} as const;
export type ActionStatus = (typeof ActionStatus)[keyof typeof ActionStatus];

export const IssueType = {
  DeadClick: 'dead_click',
  ErrorOnPage: 'error_on_page',
  ConsoleError: 'console_error',
  NetworkError: 'network_error',
  EmailNotReceived: 'email_not_received',
} as const;
export type IssueType = (typeof IssueType)[keyof typeof IssueType];

export const TestType = {
  Render: 'render',
  Interaction: 'interaction',
  Form: 'form',
  FormNegative: 'form_negative',
  Password: 'password',
  Navigation: 'navigation',
  E2E: 'e2e',
} as const;
export type TestType = (typeof TestType)[keyof typeof TestType];

// =============================================================================
// Screen Definitions
// =============================================================================

export interface Screen {
  name: string;
  width: number;
  height: number;
}

export const DESKTOP_SCREENS: Screen[] = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1536x864', width: 1536, height: 864 },
];

export const MOBILE_SCREENS: Screen[] = [
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
  { name: '414x896', width: 414, height: 896 },
];

// =============================================================================
// Scanner Data Types
// =============================================================================

export interface ActionableItem {
  stableKey: string;
  selector: string;
  tagName: string;
  role?: string;
  inputType?: string;
  actionKind: 'click' | 'fill' | 'toggle' | 'select' | 'navigate';
  accessibleName?: string;
  textContent?: string;
  href?: string;
  disabled: boolean;
  visible: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  attributes: Record<string, unknown>;
}

export interface FormField {
  selector: string;
  name: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FormInfo {
  selector: string;
  action: string;
  method: string;
  fields: FormField[];
  submitSelector?: string;
  fieldCount: number;
}

export interface PageHashes {
  htmlHash: string;
  normalizedHtmlHash: string;
  textHash: string;
  actionableHash: string;
}

export interface NetworkLogEntry {
  method: string;
  url: string;
  status: number;
  contentType: string;
}

export interface TestAction {
  action: string;
  url?: string;
  selector?: string;
  value?: string;
  pattern?: string;
  label?: string;
  direction?: string;
  amount?: number;
}

export interface TestCase {
  name: string;
  type: TestType;
  sizeClass: SizeClass;
  suite_tags: string[];
  page_id?: number;
  persona_id?: number;
  use_case_id?: number;
  priority: string;
  actions: TestAction[];
}

export interface Credentials {
  email?: string;
  username?: string;
  password: string;
  twoFactorCode?: string;
}

// =============================================================================
// Type Guards
// =============================================================================

// =============================================================================
// Scanner API Contract Types
// =============================================================================

export interface CreateScanRequest {
  url: string;
  email?: string;
  sizeClass?: 'desktop' | 'mobile';
  credentials?: {
    username?: string;
    email?: string;
    password: string;
    twoFactorCode?: string;
  };
  reportEmail?: string;
  plugins?: string[];
}

export interface CreateScanResponse {
  status:
    | 'pending'
    | 'duplicate_owned'
    | 'duplicate_unclaimed'
    | 'validation_error';
  runId?: number;
  projectId?: number;
  message?: string;
  streamPath?: string;
  suggestedNextStep?: 'watch_progress' | 'contact_owner' | 'claim_project';
}

export interface RunStreamEvent {
  runId: number;
  type:
    | 'run_started'
    | 'phase_changed'
    | 'page_discovered'
    | 'page_state_created'
    | 'action_completed'
    | 'issue_detected'
    | 'run_completed'
    | 'run_failed';
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface ProjectSummaryResponse {
  id: number;
  name: string;
  entityId: string;
}

export interface RunDetailResponse {
  id: number;
  status: string;
  phase: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

// =============================================================================
// Scanner API Request/Response Types
// =============================================================================

// --- Runs ---

export interface PendingRunResponse {
  id: number;
  appId: number;
  sizeClass: string;
  status: string;
}

export interface UpdateRunPhaseRequest {
  phase: string;
}

export interface UpdateRunStatsRequest {
  pagesFound?: number;
  pageStatesFound?: number;
  actionsCompleted?: number;
}

export interface UpdatePhaseDurationRequest {
  field: string;
  durationMs: number;
}

export interface CompleteRunRequest {
  aiSummary?: string;
  totalDurationMs?: number;
}

// --- Pages ---

export interface FindOrCreatePageRequest {
  appId: number;
  url: string;
}

export interface PageResponse {
  id: number;
  appId: number;
  url: string;
  routeKey: string | null;
  requiresLogin: boolean | null;
  createdAt: string | null;
}

// --- Page States ---

export interface FindPageStateRequest {
  pageId: number;
  sizeClass: string;
  hashes: PageHashes;
}

export interface CreatePageStateRequest {
  pageId: number;
  sizeClass: string;
  hashes: PageHashes;
  screenshotPath?: string;
  rawHtmlPath?: string;
  contentText?: string;
}

export interface PageStateResponse {
  id: number;
  pageId: number;
  sizeClass: string;
  htmlHash: string | null;
  normalizedHtmlHash: string | null;
  textHash: string | null;
  actionableHash: string | null;
  createdByActionId: number | null;
  screenshotPath: string | null;
  rawHtmlPath: string | null;
  contentText: string | null;
  capturedAt: string | null;
}

// --- Actionable Items ---

export interface InsertActionableItemsRequest {
  pageStateId: number;
  items: ActionableItem[];
}

export interface ActionableItemResponse {
  id: number;
  pageStateId: number;
  stableKey: string | null;
  selector: string | null;
  tagName: string | null;
  role: string | null;
  actionKind: string | null;
  accessibleName: string | null;
  disabled: boolean | null;
  visible: boolean | null;
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
  attributesJson: unknown;
}

// --- Actions ---

export interface CreateActionRequest {
  runId: number;
  type: string;
  actionableItemId?: number;
  startingPageStateId?: number;
  targetPageId?: number;
  sizeClass: string;
  personaId?: number;
  useCaseId?: number;
  inputValue?: string;
}

export interface CompleteActionRequest {
  targetPageId?: number;
  targetPageStateId?: number;
  durationMs?: number;
  consoleLog?: string;
  networkLog?: string;
  screenshotBefore?: string;
  screenshotAfter?: string;
}

export interface ActionResponse {
  id: number;
  runId: number;
  type: string;
  actionableItemId: number | null;
  startingPageStateId: number | null;
  targetPageId: number | null;
  targetPageStateId: number | null;
  personaId: number | null;
  useCaseId: number | null;
  inputValue: string | null;
  status: string;
  sizeClass: string;
  durationMs: number | null;
  screenshotBefore: string | null;
  screenshotAfter: string | null;
  consoleLog: string | null;
  networkLog: string | null;
  startedAt: string | null;
  executedAt: string | null;
}

// --- Personas / Use Cases / Input Values ---

export interface CreatePersonaRequest {
  appId: number;
  name: string;
  description: string;
}

export interface PersonaResponse {
  id: number;
  appId: number;
  name: string;
  description: string | null;
  createdAt: string | null;
}

export interface CreateUseCaseRequest {
  personaId: number;
  name: string;
  description: string;
}

export interface UseCaseResponse {
  id: number;
  personaId: number;
  name: string;
  description: string | null;
  createdAt: string | null;
}

export interface CreateInputValueRequest {
  useCaseId: number;
  fieldSelector: string;
  fieldName: string;
  value: string;
}

export interface InputValueResponse {
  id: number;
  useCaseId: number;
  fieldSelector: string;
  fieldName: string | null;
  value: string;
  createdAt: string | null;
}

// --- Forms ---

export interface InsertFormRequest {
  pageStateId: number;
  form: FormInfo;
  formType?: string;
}

export interface FormResponse {
  id: number;
  pageStateId: number;
  selector: string;
  action: string | null;
  method: string | null;
  submitSelector: string | null;
  fieldCount: number | null;
  formType: string | null;
  fieldsJson: unknown;
  createdAt: string | null;
}

// --- Test Cases ---

export interface InsertTestCaseRequest {
  runId: number;
  testCase: TestCase;
}

export interface TestCaseResponse {
  id: number;
  runId: number;
  name: string;
  testType: string;
  sizeClass: string;
  suiteTags: string[];
  pageId: number | null;
  personaId: number | null;
  useCaseId: number | null;
  priority: string;
  actionsJson: unknown;
  generatedAt: string | null;
}

// --- Test Runs ---

export interface CreateTestRunRequest {
  testCaseId: number;
  runId: number;
  screen: string;
}

export interface CompleteTestRunRequest {
  status: string;
  durationMs: number;
  errorMessage?: string;
  screenshotPath?: string;
  consoleLog?: string;
  networkLog?: string;
}

export interface TestRunResponse {
  id: number;
  testCaseId: number;
  runId: number;
  screen: string;
  status: string;
  durationMs: number | null;
  errorMessage: string | null;
  screenshotPath: string | null;
  consoleLog: string | null;
  networkLog: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

// --- Issues ---

export interface CreateIssueRequest {
  runId: number;
  actionId?: number;
  testCaseId?: number;
  testRunId?: number;
  type: string;
  description: string;
  reproductionSteps: unknown[];
  consoleLog?: string;
  networkLog?: string;
  screenshotPath?: string;
  pageId?: number;
  pageStateId?: number;
}

export interface IssueResponse {
  id: number;
  runId: number;
  actionId: number | null;
  testCaseId: number | null;
  testRunId: number | null;
  type: string;
  description: string;
  reproductionSteps: unknown;
  consoleLog: string | null;
  networkLog: string | null;
  screenshotPath: string | null;
  pageId: number | null;
  pageStateId: number | null;
  createdAt: string | null;
}

// --- AI Usage ---

export interface RecordAiUsageRequest {
  runId: number;
  phase: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  purpose?: string;
}

// --- Report Emails ---

export interface CreateReportEmailRequest {
  runId: number;
  userEmail: string;
  deepLinkToken: string;
}

// --- Components ---

export interface SaveComponentRequest {
  appId: number;
  sizeClass: string;
  component: {
    name: string;
    selector: string;
    hash: string;
    canonicalPageStateId: number;
    instances: Array<{
      pageStateId: number;
      isIdentical: boolean;
      hash: string;
    }>;
  };
}

// --- Apps ---

export interface AppResponse {
  id: number;
  projectId: number;
  name: string;
  baseUrl: string | null;
  normalizedBaseUrl: string;
  createdAt: string | null;
}

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Type guard to narrow a {@link BaseResponse} to a successful response.
 *
 * Checks if a response has `success: true`, allowing TypeScript to narrow
 * the type to access the `data` property safely.
 *
 * @typeParam T - The expected type of the response data
 * @param response - The response to check
 * @returns `true` if the response is successful, `false` otherwise
 *
 * @example
 * ```typescript
 * async function fetchHistory(): Promise<BaseResponse<History[]>> {
 *   const response = await client.get('/history');
 *   if (isSuccessResponse<History[]>(response)) {
 *     // TypeScript now knows response.data is History[]
 *     const histories = response.data;
 *     return histories;
 *   }
 *   console.error('Failed:', response.error);
 * }
 * ```
 */
export function isSuccessResponse<T>(
  response: BaseResponse<T>
): response is BaseResponse<T> & { success: true; data: T } {
  return response.success === true;
}

/**
 * Type guard to narrow a {@link BaseResponse} to an error response.
 *
 * Checks if a response has `success: false`, allowing TypeScript to narrow
 * the type to access the `error` property safely.
 *
 * @param response - The response to check
 * @returns `true` if the response is an error, `false` otherwise
 *
 * @example
 * ```typescript
 * async function updateHistory(id: string, value: number): Promise<void> {
 *   const response = await client.patch(`/history/${id}`, { value });
 *   if (isErrorResponse(response)) {
 *     // TypeScript now knows response.error is string
 *     throw new Error(response.error);
 *   }
 *   // Success case
 * }
 * ```
 */
export function isErrorResponse(
  response: BaseResponse<unknown>
): response is BaseResponse<never> & { success: false; error: string } {
  return response.success === false;
}
