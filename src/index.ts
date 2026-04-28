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
  RightSidebar: 'rightSidebar',
  SearchBar: 'searchBar',
  UserMenu: 'userMenu',
  CookieBanner: 'cookieBanner',
  ChatWidget: 'chatWidget',
  SocialLinks: 'socialLinks',
  SkipNav: 'skipNav',
  LanguageSwitcher: 'languageSwitcher',
  AnnouncementBar: 'announcementBar',
  BackToTop: 'backToTop',
} as const;
export type HtmlComponentType =
  (typeof HtmlComponentType)[keyof typeof HtmlComponentType];

export const UiPatternType = {
  Card: 'card',
  Table: 'table',
  Form: 'form',
  Modal: 'modal',
  Toast: 'toast',
  Alert: 'alert',
  Tabs: 'tabs',
  Accordion: 'accordion',
  Carousel: 'carousel',
  Dropdown: 'dropdown',
  Pagination: 'pagination',
  Skeleton: 'skeleton',
  EmptyState: 'emptyState',
  ErrorMessage: 'errorMessage',
  ProgressBar: 'progressBar',
  Tooltip: 'tooltip',
  Badge: 'badge',
  Avatar: 'avatar',
  Tag: 'tag',
  Stepper: 'stepper',
} as const;
export type UiPatternType = (typeof UiPatternType)[keyof typeof UiPatternType];

export interface UiPattern {
  type: UiPatternType;
  selector: string;
  count: number;
}

// =============================================================================
// Element Identity — persistent element identification across scans
// =============================================================================

export const LocatorStrategy = {
  TestId: 'test-id',
  RoleName: 'role-name',
  Label: 'label',
  Placeholder: 'placeholder',
  Text: 'text',
  AltText: 'alt-text',
  Css: 'css',
} as const;
export type LocatorStrategy =
  (typeof LocatorStrategy)[keyof typeof LocatorStrategy];

export interface ElementLocator {
  strategy: LocatorStrategy;
  value: string;
  priority: number;
}

export interface ElementIdentity {
  role: string;
  computedName: string;
  tagName: string;
  labelText?: string;
  groupName?: string;
  placeholder?: string;
  altText?: string;
  testId?: string;
  inputType?: string;
  nthInGroup?: number;
  formContext?: string;
  headingContext?: string;
  landmarkAncestor?: string;
  playwrightLocator: string;
  playwrightScopeChain?: string;
  isUniqueOnPage: boolean;
  cssSelector: string;
  locators: ElementLocator[];
}

const IMPLICIT_ROLES: Record<string, string> = {
  BUTTON: 'button',
  A: 'link',
  SELECT: 'combobox',
  TEXTAREA: 'textbox',
  IMG: 'img',
  H1: 'heading',
  H2: 'heading',
  H3: 'heading',
  H4: 'heading',
  H5: 'heading',
  H6: 'heading',
  FIELDSET: 'group',
  NAV: 'navigation',
  MAIN: 'main',
  ASIDE: 'complementary',
  HEADER: 'banner',
  FOOTER: 'contentinfo',
  TABLE: 'table',
  FORM: 'form',
  UL: 'list',
  OL: 'list',
  LI: 'listitem',
};

const INPUT_TYPE_ROLES: Record<string, string> = {
  checkbox: 'checkbox',
  radio: 'radio',
  number: 'spinbutton',
  range: 'slider',
};

export function resolvePlaywrightRole(
  tagName: string,
  inputType?: string,
  ariaRole?: string
): string {
  if (ariaRole) return ariaRole;
  const tag = tagName.toUpperCase();
  if (tag === 'INPUT') {
    const type = (inputType || 'text').toLowerCase();
    return INPUT_TYPE_ROLES[type] || 'textbox';
  }
  return IMPLICIT_ROLES[tag] || 'generic';
}

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
  fixedBodyHash?: string;
  reusableElementsHash?: string;
  patternsHash?: string;
}

export interface DecomposedPageHashes {
  fixedBodyHash: string;
  reusableElementsHash: string;
  patternsHash: string;
}

export interface PatternInstance {
  type: UiPatternType;
  selector: string;
  outerHtml: string;
  hash: string;
}

export interface NetworkLogEntry {
  method: string;
  url: string;
  status: number;
  contentType: string;
}

// =============================================================================
// Playwright Action Enum (user interactions only)
// =============================================================================

export const PlaywrightAction = {
  // Navigation
  Goto: 'goto',
  GoBack: 'goBack',
  GoForward: 'goForward',
  Reload: 'reload',

  // Element interactions
  Click: 'click',
  DoubleClick: 'dblclick',
  Fill: 'fill',
  Clear: 'clear',
  Type: 'type',
  Press: 'press',
  SelectOption: 'selectOption',
  Check: 'check',
  Uncheck: 'uncheck',
  Hover: 'hover',
  Focus: 'focus',
  ScrollIntoView: 'scrollIntoView',
  UploadFile: 'uploadFile',

  // Page utilities
  Screenshot: 'screenshot',
  WaitForLoadState: 'waitForLoadState',
  WaitForURL: 'waitForURL',
  WaitForTimeout: 'waitForTimeout',
} as const;
export type PlaywrightAction =
  (typeof PlaywrightAction)[keyof typeof PlaywrightAction];

// =============================================================================
// Expectation Type Enum
// =============================================================================

export const ExpectationType = {
  // Visual / Element Content
  ElementVisible: 'element_visible',
  ElementHidden: 'element_hidden',
  ElementExists: 'element_exists',
  ElementNotExists: 'element_not_exists',
  ElementCount: 'element_count',
  TextContent: 'text_content',
  TextContains: 'text_contains',
  TextMatches: 'text_matches',
  TextOnPage: 'text_on_page',
  TextNotOnPage: 'text_not_on_page',
  InputValue: 'input_value',
  AttributeEquals: 'attribute_equals',
  AttributeContains: 'attribute_contains',
  HasClass: 'has_class',
  NotHasClass: 'not_has_class',

  // Element State
  ElementEnabled: 'element_enabled',
  ElementDisabled: 'element_disabled',
  ElementFocused: 'element_focused',
  ElementChecked: 'element_checked',
  ElementUnchecked: 'element_unchecked',
  ElementEditable: 'element_editable',
  ElementReadonly: 'element_readonly',

  // Page-level
  UrlEquals: 'url_equals',
  UrlContains: 'url_contains',
  UrlMatches: 'url_matches',
  UrlChanged: 'url_changed',
  UrlUnchanged: 'url_unchanged',
  TitleEquals: 'title_equals',
  TitleContains: 'title_contains',
  PageLoaded: 'page_loaded',

  // Console
  NoConsoleErrors: 'no_console_errors',
  NoConsoleWarnings: 'no_console_warnings',
  ConsoleContains: 'console_contains',
  ConsoleNotContains: 'console_not_contains',

  // Network
  NoNetworkErrors: 'no_network_errors',
  NoServerErrors: 'no_server_errors',
  NetworkRequestMade: 'network_request_made',
  NetworkResponseStatus: 'network_response_status',
  NetworkResponseContains: 'network_response_contains',
  NoPendingRequests: 'no_pending_requests',

  // Accessibility
  NoAriaViolations: 'no_aria_violations',
  ElementHasRole: 'element_has_role',
  ElementHasLabel: 'element_has_label',

  // Performance
  LoadTimeWithin: 'load_time_within',
  NoLayoutShift: 'no_layout_shift',

  // Form-specific
  ValidationMessageVisible: 'validation_message_visible',
  ValidationMessageHidden: 'validation_message_hidden',
  FormSubmittedSuccessfully: 'form_submitted_successfully',
  ErrorStateVisible: 'error_state_visible',
  ErrorStateCleared: 'error_state_cleared',

  // Navigation
  RedirectedTo: 'redirected_to',
  HistoryLengthChanged: 'history_length_changed',

  // Storage
  CookieExists: 'cookie_exists',
  CookieNotExists: 'cookie_not_exists',
  CookieValue: 'cookie_value',
  LocalStorageValue: 'local_storage_value',
  SessionStorageValue: 'session_storage_value',

  // Security
  NoMixedContent: 'no_mixed_content',
  SensitiveDataNotInUrl: 'sensitive_data_not_in_url',

  // Visual Regression
  ScreenshotMatch: 'screenshot_match',
} as const;
export type ExpectationType =
  (typeof ExpectationType)[keyof typeof ExpectationType];

export const ExpectationSeverity = {
  MustPass: 'must_pass',
  ShouldPass: 'should_pass',
  Info: 'info',
} as const;
export type ExpectationSeverity =
  (typeof ExpectationSeverity)[keyof typeof ExpectationSeverity];

// =============================================================================
// Expectation
// =============================================================================

export interface Expectation {
  expectationType: ExpectationType;
  elementIdentityId?: number;
  expectedValue?: string;
  attributeName?: string;
  severity: ExpectationSeverity;
  description: string;
  playwrightCode: string;
}

// =============================================================================
// Test Action (user interactions only)
// =============================================================================

export interface TestAction {
  actionType: PlaywrightAction;
  pageStateId?: number;
  elementIdentityId?: number;
  containerType?: HtmlComponentType;
  containerElementIdentityId?: number;
  value?: string;
  url?: string;
  playwrightCode: string;
  description: string;
}

/** @deprecated Use TestAction with PlaywrightAction enum instead */
export interface LegacyTestAction {
  action: string;
  url?: string;
  selector?: string;
  value?: string;
  pattern?: string;
  label?: string;
  direction?: string;
  amount?: number;
}

// =============================================================================
// Test Step
// =============================================================================

export interface TestStep {
  action: TestAction;
  expectations: Expectation[];
  description: string;
  continueOnFailure: boolean;
}

// =============================================================================
// Test Case
// =============================================================================

export interface TestCase {
  name: string;
  type: TestType;
  sizeClass: SizeClass;
  suite_tags: string[];
  priority: string;
  page_id?: number;
  persona_id?: number;
  use_case_id?: number;
  startingPageStateId: number;
  startingUrl: string;
  steps: TestStep[];
  globalExpectations: Expectation[];
  estimatedDurationMs?: number;
}

// =============================================================================
// Test Suite
// =============================================================================

export interface TestSuite {
  name: string;
  description: string;
  startingPageStateId: number;
  startingUrl: string;
  sizeClass: SizeClass;
  testCases: TestCase[];
  dependencyTestCaseId?: number;
  personaIds?: number[];
  reusableHtmlElementId?: number;
  reusableHtmlElementType?: HtmlComponentType;
  patternType?: UiPatternType;
  priority: string;
  suite_tags: string[];
  estimatedDurationMs?: number;
}

/** @deprecated Use TestCase with steps and expectations */
export interface LegacyTestCase {
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
  fixedBodyHtmlElementId?: number;
}

export interface PageStateResponse {
  id: number;
  pageId: number;
  sizeClass: string;
  htmlHash: string | null;
  normalizedHtmlHash: string | null;
  textHash: string | null;
  actionableHash: string | null;
  fixedBodyHash: string | null;
  reusableElementsHash: string | null;
  patternsHash: string | null;
  screenshotPath: string | null;
  rawHtmlPath: string | null;
  contentText: string | null;
  bodyHtmlElementId: number | null;
  contentHtmlElementId: number | null;
  fixedBodyHtmlElementId: number | null;
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
  // Joined from action definition (included by /next endpoint)
  type: string | null;
  targetUrl: string | null;
  startingPageStateId: number | null;
  actionableItemId: number | null;
  htmlElementId: number | null;
  inputValue: string | null;
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

// --- Test Suites ---

export interface InsertTestSuiteRequest {
  appId: number;
  testSuite: TestSuite;
}

export interface TestSuiteResponse {
  id: number;
  appId: number;
  name: string;
  description: string;
  startingPageStateId: number;
  startingUrl: string;
  sizeClass: string;
  testCasesJson: unknown;
  dependencyTestCaseId: number | null;
  personaIdsJson: unknown;
  reusableHtmlElementId: number | null;
  reusableHtmlElementType: string | null;
  patternType: string | null;
  priority: string;
  suiteTags: string[];
  estimatedDurationMs: number | null;
  createdAt: string | null;
}

// --- Test Cases (app-level, persistent) ---

export interface InsertTestCaseRequest {
  appId: number;
  testCase: TestCase;
}

/** @deprecated Use InsertTestCaseRequest with new TestCase */
export interface LegacyInsertTestCaseRequest {
  appId: number;
  testCase: LegacyTestCase;
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
  startingPageStateId: number | null;
  startingUrl: string | null;
  stepsJson: unknown;
  globalExpectationsJson: unknown;
  estimatedDurationMs: number | null;
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

// --- Element Identities ---

export interface CreateElementIdentityRequest {
  appId: number;
  scanId: number;
  role: string;
  computedName: string;
  tagName: string;
  labelText?: string;
  groupName?: string;
  placeholder?: string;
  altText?: string;
  testId?: string;
  inputType?: string;
  nthInGroup?: number;
  formContext?: string;
  headingContext?: string;
  landmarkAncestor?: string;
  playwrightLocator: string;
  playwrightScopeChain?: string;
  isUniqueOnPage: boolean;
  cssSelector: string;
  locators: ElementLocator[];
}

export interface UpdateElementIdentityRequest {
  lastSeenScanId: number;
  playwrightLocator?: string;
  playwrightScopeChain?: string;
  isUniqueOnPage?: boolean;
  cssSelector?: string;
  locators?: ElementLocator[];
}

export interface ElementIdentityResponse {
  id: number;
  appId: number;
  role: string;
  computedName: string | null;
  tagName: string;
  labelText: string | null;
  groupName: string | null;
  placeholder: string | null;
  altText: string | null;
  testId: string | null;
  inputType: string | null;
  nthInGroup: number | null;
  formContext: string | null;
  headingContext: string | null;
  landmarkAncestor: string | null;
  playwrightLocator: string;
  playwrightScopeChain: string | null;
  isUniqueOnPage: boolean;
  cssSelector: string;
  locators: ElementLocator[];
  firstSeenScanId: number;
  lastSeenScanId: number;
  timesSeen: number;
  createdAt: string | null;
  updatedAt: string | null;
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

// --- Page State Patterns ---

export interface InsertPageStatePatternsRequest {
  pageStateId: number;
  patterns: UiPattern[];
}

export interface PageStatePatternResponse {
  id: number;
  pageStateId: number;
  patternType: string;
  selector: string;
  count: number;
  createdAt: string | null;
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
