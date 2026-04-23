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

export type ISODateString = string & { readonly __brand: 'ISODateString' };

// =============================================================================
// User
// =============================================================================

export interface User {
  firebase_uid: string;
  email: string | null;
  display_name: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// =============================================================================
// Response Helpers
// =============================================================================

export function successResponse<T>(data: T): BaseResponse<T> {
  return { success: true, data, timestamp: new Date().toISOString() };
}

export function errorResponse(error: string): BaseResponse<never> {
  return { success: false, error, timestamp: new Date().toISOString() };
}

// =============================================================================
// Enums
// =============================================================================

export const SizeClass = {
  Desktop: 'desktop',
  Mobile: 'mobile',
} as const;
export type SizeClass = (typeof SizeClass)[keyof typeof SizeClass];

export const ActionType = {
  Navigate: 'navigate',
  Hover: 'hover',
  Click: 'click',
  Fill: 'fill',
  Select: 'select',
  RadioSelect: 'radio_select',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export const ActionStatus = {
  Open: 'open',
  Completed: 'completed',
} as const;
export type ActionStatus = (typeof ActionStatus)[keyof typeof ActionStatus];

export const IssueSeverity = {
  Bug: 'bug',
  Warning: 'warning',
} as const;
export type IssueSeverity = (typeof IssueSeverity)[keyof typeof IssueSeverity];

export const IssueStatus = {
  Open: 'open',
  Rejected: 'rejected',
  Qa: 'qa',
  Closed: 'closed',
} as const;
export type IssueStatus = (typeof IssueStatus)[keyof typeof IssueStatus];

export const IssueRuleName = {
  BrokenLink: 'broken_link',
  DuplicateHeading: 'duplicate_heading',
  EmptyLink: 'empty_link',
  BrokenImage: 'broken_image',
  DuplicateId: 'duplicate_id',
  PlaceholderText: 'placeholder_text',
  ErrorPage: 'error_page',
  BlankPage: 'blank_page',
  BrokenMedia: 'broken_media',
  DeadClick: 'dead_click',
  ConsoleError: 'console_error',
  NetworkError: 'network_error',
} as const;
export type IssueRuleName = (typeof IssueRuleName)[keyof typeof IssueRuleName];

/** @deprecated Use IssueSeverity + IssueRuleName instead */
export const IssueType = {
  DeadClick: 'dead_click',
  ErrorOnPage: 'error_on_page',
  ConsoleError: 'console_error',
  NetworkError: 'network_error',
  EmailNotReceived: 'email_not_received',
} as const;
/** @deprecated */
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

export const HtmlComponentType = {
  TopMenu: 'topMenu',
  Footer: 'footer',
  Breadcrumb: 'breadcrumb',
  LeftMenu: 'leftMenu',
  HamburgerMenu: 'hamburgerMenu',
} as const;
export type HtmlComponentType =
  (typeof HtmlComponentType)[keyof typeof HtmlComponentType];

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
// Domain Data Types
// =============================================================================

/** An interactive element within an HTML component. No coordinates — position resolved at interaction time. */
export interface ActionableItem {
  stableKey: string;
  selector: string;
  tagName: string;
  role?: string;
  inputType?: string;
  actionKind: 'click' | 'fill' | 'select' | 'navigate' | 'radio_select';
  accessibleName?: string;
  textContent?: string;
  href?: string;
  disabled: boolean;
  visible: boolean;
  attributes: Record<string, unknown>;
  reusableHtmlElementId?: number;
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

/** Test case definition. Belongs to an app (persistent across scans). Actions linked via test_case_actions junction. */
export interface TestCase {
  name: string;
  type: TestType;
  sizeClass: SizeClass;
  suite_tags: string[];
  page_id?: number;
  persona_id?: number;
  use_case_id?: number;
  priority: string;
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
// API Contract Types
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
  scanId?: number;
  /** @deprecated Use scanId instead */
  runId?: number;
  projectId?: number;
  appId?: number;
  message?: string;
  streamPath?: string;
  suggestedNextStep?: 'watch_progress' | 'contact_owner' | 'claim_project';
}

export interface ScanStreamEvent {
  scanId: number;
  type:
    | 'scan_started'
    | 'phase_changed'
    | 'page_discovered'
    | 'page_state_created'
    | 'action_completed'
    | 'issue_detected'
    | 'stats_update'
    | 'scan_completed'
    | 'scan_failed';
  payload: Record<string, unknown>;
  createdAt: string;
}

/** @deprecated Use ScanStreamEvent instead */
export type RunStreamEvent = ScanStreamEvent;

export interface ProjectSummaryResponse {
  id: number;
  name: string;
  entityId: string;
}

export interface ScanDetailResponse {
  id: number;
  appId: number;
  status: string;
  phase: string | null;
  sizeClass: string;
  pagesFound: number | null;
  pageStatesFound: number | null;
  actionsCompleted: number | null;
  startedAt: string | null;
  endedAt: string | null;
}

/** @deprecated Use ScanDetailResponse instead */
export type RunDetailResponse = ScanDetailResponse;

// =============================================================================
// Scanner API Request/Response Types
// =============================================================================

// --- Scans (formerly Runs) ---

export interface PendingScanResponse {
  id: number;
  appId: number;
  sizeClass: string;
  status: string;
}

/** @deprecated Use PendingScanResponse instead */
export type PendingRunResponse = PendingScanResponse;

export interface UpdateScanPhaseRequest {
  phase: string;
}

/** @deprecated Use UpdateScanPhaseRequest */
export type UpdateRunPhaseRequest = UpdateScanPhaseRequest;

export interface UpdateScanStatsRequest {
  pagesFound?: number;
  pageStatesFound?: number;
  actionsCompleted?: number;
}

/** @deprecated Use UpdateScanStatsRequest */
export type UpdateRunStatsRequest = UpdateScanStatsRequest;

export interface UpdatePhaseDurationRequest {
  field: string;
  durationMs: number;
}

export interface CompleteScanRequest {
  aiSummary?: string;
  totalDurationMs?: number;
}

/** @deprecated Use CompleteScanRequest */
export type CompleteRunRequest = CompleteScanRequest;

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
  bodyHtmlElementId?: number;
  contentHtmlElementId?: number;
}

export interface PageStateResponse {
  id: number;
  pageId: number;
  sizeClass: string;
  htmlHash: string | null;
  normalizedHtmlHash: string | null;
  textHash: string | null;
  actionableHash: string | null;
  screenshotPath: string | null;
  rawHtmlPath: string | null;
  contentText: string | null;
  bodyHtmlElementId: number | null;
  contentHtmlElementId: number | null;
  capturedAt: string | null;
}

// --- Actionable Items (belong to HTML components) ---

export interface InsertActionableItemsRequest {
  htmlElementId: number;
  items: ActionableItem[];
}

export interface ActionableItemResponse {
  id: number;
  htmlElementId: number | null;
  stableKey: string | null;
  selector: string | null;
  tagName: string | null;
  role: string | null;
  actionKind: string | null;
  accessibleName: string | null;
  disabled: boolean | null;
  visible: boolean | null;
  attributesJson: unknown;
  reusableHtmlElementId: number | null;
}

// --- Action Definitions (app-level, persistent) ---

export interface CreateActionDefinitionRequest {
  appId: number;
  type: string;
  startingPageStateId?: number;
  targetUrl?: string;
  actionableItemId?: number;
  htmlElementId?: number;
  inputValue?: string;
}

export interface ActionDefinitionResponse {
  id: number;
  appId: number;
  type: string;
  startingPageStateId: number | null;
  targetUrl: string | null;
  actionableItemId: number | null;
  htmlElementId: number | null;
  inputValue: string | null;
  createdAt: string | null;
}

// --- Action Executions (scan-level) ---

export interface CreateActionExecutionRequest {
  scanId: number;
  actionId: number;
}

export interface CompleteActionExecutionRequest {
  targetPageStateId?: number;
  durationMs?: number;
  consoleLog?: string;
  networkLog?: string;
  screenshotBefore?: string;
  screenshotAfter?: string;
}

export interface ActionExecutionResponse {
  id: number;
  scanId: number;
  actionId: number;
  status: string;
  targetPageStateId: number | null;
  durationMs: number | null;
  screenshotBefore: string | null;
  screenshotAfter: string | null;
  consoleLog: string | null;
  networkLog: string | null;
  startedAt: string | null;
  executedAt: string | null;
}

// --- Legacy action types (deprecated — use ActionDefinition + ActionExecution) ---

/** @deprecated Use CreateActionDefinitionRequest */
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

/** @deprecated Use CompleteActionExecutionRequest */
export interface CompleteActionRequest {
  targetPageId?: number;
  targetPageStateId?: number;
  durationMs?: number;
  consoleLog?: string;
  networkLog?: string;
  screenshotBefore?: string;
  screenshotAfter?: string;
}

/** @deprecated Use ActionExecutionResponse */
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

// --- Test Cases (app-level, persistent) ---

export interface InsertTestCaseRequest {
  appId: number;
  testCase: TestCase;
}

export interface TestCaseResponse {
  id: number;
  appId: number;
  name: string;
  testType: string;
  sizeClass: string;
  suiteTags: string[];
  pageId: number | null;
  personaId: number | null;
  useCaseId: number | null;
  priority: string;
  generatedAt: string | null;
}

// --- Test Case Actions (junction, ordered) ---

export interface CreateTestCaseActionRequest {
  testCaseId: number;
  actionId: number;
  stepOrder: number;
}

export interface TestCaseActionResponse {
  id: number;
  testCaseId: number;
  actionId: number;
  stepOrder: number;
  createdAt: string | null;
}

// --- Test Runs ---

export interface CreateTestRunRequest {
  testCaseId: number;
  scanId: number;
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
  scanId: number;
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
  appId: number;
  scanId?: number;
  testCaseId?: number;
  testRunId?: number;
  severity: IssueSeverity;
  ruleName: string;
  title: string;
  description: string;
  steps?: string;
  expectedOutcome?: string;
  observedOutcome?: string;
  status?: IssueStatus;
  consoleLog?: string;
  networkLog?: string;
  screenshotPath?: string;
  pageId?: number;
  pageStateId?: number;
}

export interface IssueResponse {
  id: number;
  appId: number;
  scanId: number | null;
  testCaseId: number | null;
  testRunId: number | null;
  severity: string;
  ruleName: string;
  title: string;
  description: string;
  steps: string | null;
  expectedOutcome: string | null;
  observedOutcome: string | null;
  status: string;
  consoleLog: string | null;
  networkLog: string | null;
  screenshotPath: string | null;
  pageId: number | null;
  pageStateId: number | null;
  createdAt: string | null;
}

// --- Issue Dedup ---

export interface FindTestCaseByActionsRequest {
  appId: number;
  actionIds: number[];
}

export interface FindIssueByRuleRequest {
  testCaseId: number;
  ruleName: string;
}

// --- AI Usage ---

export interface RecordAiUsageRequest {
  scanId: number;
  phase: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  purpose?: string;
}

// --- Report Emails ---

export interface CreateReportEmailRequest {
  scanId: number;
  userEmail: string;
  deepLinkToken: string;
}

// --- Credentials ---

export interface CreateCredentialRequest {
  appId: number;
  username?: string;
  email?: string;
  password: string;
  twoFactorCode?: string;
}

export interface CredentialResponse {
  id: number;
  appId: number;
  username: string | null;
  email: string | null;
  password: string;
  twoFactorCode: string | null;
  createdAt: string | null;
}

// --- Html Elements ---

export interface HtmlElementResponse {
  id: number;
  html: string;
  hash: string;
  createdAt: string | null;
}

export interface CreateHtmlElementRequest {
  html: string;
  hash: string;
}

// --- Reusable Html Elements ---

export interface ReusableHtmlElementResponse {
  id: number;
  appId: number;
  type: HtmlComponentType;
  htmlElementId: number;
  htmlHash: string | null;
  createdAt: string | null;
}

export interface FindOrCreateReusableHtmlElementRequest {
  appId: number;
  type: HtmlComponentType;
  html: string;
  hash: string;
}

export interface LinkPageStateReusableElementsRequest {
  pageStateId: number;
  reusableHtmlElementIds: number[];
}

export interface PageStateReusableElementResponse {
  id: number;
  pageStateId: number;
  reusableHtmlElementId: number;
}

// --- Projects ---

export interface CreateProjectRequest {
  entityId: string;
  name: string;
  description?: string;
}

export interface ProjectResponse {
  id: number;
  entityId: string | null;
  name: string;
  description: string | null;
  createdAt: string | null;
}

// --- Apps ---

export interface CreateAppRequest {
  projectId: number;
  name: string;
  url: string;
}

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

export function isSuccessResponse<T>(
  response: BaseResponse<T>
): response is BaseResponse<T> & { success: true; data: T } {
  return response.success === true;
}

export function isErrorResponse(
  response: BaseResponse<unknown>
): response is BaseResponse<never> & { success: false; error: string } {
  return response.success === false;
}
