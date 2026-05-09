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

export const DecompositionJobStatus = {
  Pending: 'pending',
  Done: 'done',
} as const;
export type DecompositionJobStatus =
  (typeof DecompositionJobStatus)[keyof typeof DecompositionJobStatus];

export const TestRunStatus = {
  Pending: 'pending',
  Planned: 'planned',
  Running: 'running',
  Completed: 'completed',
  Failed: 'failed',
} as const;
export type TestRunStatus = (typeof TestRunStatus)[keyof typeof TestRunStatus];

export const RecurrenceType = {
  OneTime: 'one_time',
  Weekday: 'weekday',
  Daily: 'daily',
  Weekly: 'weekly',
} as const;
export type RecurrenceType =
  (typeof RecurrenceType)[keyof typeof RecurrenceType];

export const FindingType = {
  Error: 'error',
  Warning: 'warning',
} as const;
export type FindingType = (typeof FindingType)[keyof typeof FindingType];

/** @deprecated Action/ActionExecution removed — use TestAction within TestElement */
export const ActionStatus = {
  Open: 'open',
  Completed: 'completed',
} as const;
/** @deprecated */
export type ActionStatus = (typeof ActionStatus)[keyof typeof ActionStatus];

/** @deprecated Issue removed — use TestRunFinding */
export const IssueSeverity = {
  Bug: 'bug',
  Warning: 'warning',
} as const;
/** @deprecated */
export type IssueSeverity = (typeof IssueSeverity)[keyof typeof IssueSeverity];

/** @deprecated Issue removed — use TestRunFinding */
export const IssueStatus = {
  Open: 'open',
  Rejected: 'rejected',
  Qa: 'qa',
  Closed: 'closed',
} as const;
/** @deprecated */
export type IssueStatus = (typeof IssueStatus)[keyof typeof IssueStatus];

/** @deprecated Issue removed — use TestRunFinding */
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
/** @deprecated */
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
  scaffoldId?: number;
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
  scaffoldsHash?: string;
  patternsHash?: string;
}

export interface DecomposedPageHashes {
  fixedBodyHash: string;
  scaffoldsHash: string;
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
// Test Action (embedded in TestStep — JSON within test element)
// =============================================================================

export interface TestAction {
  actionType: PlaywrightAction;
  pageStateId?: number;
  elementIdentityId?: number;
  containerType?: HtmlComponentType;
  containerElementIdentityId?: number;
  value?: string;
  path?: string;
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
// Test Element (domain object — used for generation)
// =============================================================================

export interface TestElement {
  title: string;
  type: TestType;
  sizeClass: SizeClass;
  surface_tags: string[];
  priority: number;
  page_id?: number;
  target_page_id?: number;
  persona_id?: number;
  use_case_id?: number;
  scaffoldId?: number;
  patternType?: UiPatternType;
  dependencyTestElementId?: number;
  startingPageStateId?: number;
  startingPath: string;
  steps: TestStep[];
  globalExpectations: Expectation[];
  estimatedDurationMs?: number;
  uid?: string;
}

// =============================================================================
// Test Surface (domain object — used for generation)
// =============================================================================

export interface TestSurface {
  title: string;
  description: string;
  startingPageStateId?: number;
  startingPath: string;
  sizeClass: SizeClass;
  dependencyTestElementId?: number;
  personaIds?: number[];
  scaffoldId?: number;
  scaffoldType?: HtmlComponentType;
  patternType?: UiPatternType;
  priority: number;
  surface_tags: string[];
  estimatedDurationMs?: number;
  decompositionJobId?: number;
  uid?: string;
}

/** @deprecated Use TestElement with steps and expectations */
export interface LegacyTestElement {
  name: string;
  type: TestType;
  sizeClass: SizeClass;
  surface_tags: string[];
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

export interface CreateDiscoveryRunRequest {
  url: string;
  productId?: number;
  testEnvironmentId?: number;
  sizeClass?: SizeClass;
  expertiseSlugs?: string[];
  createdByUserId?: string;
  ownedByUserId?: string;
  environmentLabel?: string;
  environmentKind?: EnvironmentKind;
  credentials?: {
    username?: string;
    email?: string;
    password: string;
    twoFactorCode?: string;
  };
  reportEmail?: string;
}

export interface CreateDiscoveryRunResponse {
  status:
    | 'pending'
    | 'duplicate_owned'
    | 'duplicate_unclaimed'
    | 'validation_error';
  testRunId?: number;
  productId?: number;
  runnerId?: number;
  testEnvironmentId?: number;
  message?: string;
  streamPath?: string;
  suggestedNextStep?: 'watch_progress' | 'contact_owner' | 'claim_product';
}

export interface TestRunStreamEvent {
  testRunId: number;
  rootTestRunId: number;
  type:
    | 'run_started'
    | 'page_discovered'
    | 'page_state_created'
    | 'stats_update'
    | 'decomposition_job_created'
    | 'decomposition_job_completed'
    | 'test_surface_created'
    | 'child_run_created'
    | 'child_run_completed'
    | 'finding_created'
    | 'run_completed'
    | 'run_failed';
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface ProductSummaryResponse {
  id: number;
  title: string;
  entityId: string;
}

/** @deprecated Use ProductSummaryResponse */
export type ProjectSummaryResponse = ProductSummaryResponse;

// =============================================================================
// Scanner API Request/Response Types
// =============================================================================

// --- Pages ---

export interface FindOrCreatePageRequest {
  runnerId: number;
  testEnvironmentId?: number;
  relativePath: string;
}

export interface DiscoveredPage {
  relativePath: string;
  sourcePagePath?: string;
  sourceLabel?: string;
  isPublic?: boolean;
}

export interface CreateDiscoveredPagesRequest {
  testEnvironmentId: number;
  pages: DiscoveredPage[];
}

export interface DiscoveredPageResponse {
  id: number;
  testEnvironmentId: number;
  relativePath: string;
  sourcePagePath: string | null;
  sourceLabel: string | null;
  isPublic: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CreatePageVisitRequest {
  testRunId: number;
  testEnvironmentId: number;
  relativePath: string;
  status: string;
  redirectPath?: string;
  requiresLogin?: boolean;
  errorMessage?: string;
}

export interface PageVisitResponse {
  id: number;
  testRunId: number;
  testEnvironmentId: number;
  relativePath: string;
  status: string;
  redirectPath: string | null;
  requiresLogin: boolean | null;
  errorMessage: string | null;
  createdAt: string | null;
}

export interface PageResponse {
  id: number;
  runnerId: number;
  testEnvironmentId: number | null;
  relativePath: string;
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
  createdByTestRunId?: number;
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
  scaffoldsHash: string | null;
  patternsHash: string | null;
  screenshotPath: string | null;
  rawHtmlPath: string | null;
  contentText: string | null;
  bodyHtmlElementId: number | null;
  contentHtmlElementId: number | null;
  fixedBodyHtmlElementId: number | null;
  createdByTestRunId: number | null;
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
  scaffoldId: number | null;
}

// --- Action Definitions (deprecated — removed) ---

/** @deprecated Action removed — use TestAction within TestElement */
export interface CreateActionDefinitionRequest {
  runnerId: number;
  type: string;
  startingPageStateId?: number;
  targetUrl?: string;
  actionableItemId?: number;
  htmlElementId?: number;
  inputValue?: string;
}

/** @deprecated Action removed */
export interface ActionDefinitionResponse {
  id: number;
  runnerId: number;
  type: string;
  startingPageStateId: number | null;
  targetUrl: string | null;
  actionableItemId: number | null;
  htmlElementId: number | null;
  inputValue: string | null;
  createdAt: string | null;
}

// --- Action Executions (deprecated — removed, replaced by TestRun) ---

/** @deprecated ActionExecution removed — use TestRun */
export interface CreateActionExecutionRequest {
  testRunId: number;
  actionId: number;
}

/** @deprecated */
export interface CompleteActionExecutionRequest {
  targetPageStateId?: number;
  durationMs?: number;
  consoleLog?: string;
  networkLog?: string;
  screenshotBefore?: string;
  screenshotAfter?: string;
}

/** @deprecated */
export interface ActionExecutionResponse {
  id: number;
  testRunId: number;
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
  type: string | null;
  targetUrl: string | null;
  startingPageStateId: number | null;
  actionableItemId: number | null;
  htmlElementId: number | null;
  inputValue: string | null;
}

// --- Legacy action types (deprecated) ---

/** @deprecated Use CreateActionDefinitionRequest */
export interface CreateActionRequest {
  testRunId: number;
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
  testRunId: number;
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
  productId: number;
  title: string;
  description: string;
}

export interface PersonaResponse {
  id: number;
  productId: number;
  title: string;
  description: string | null;
  createdAt: string | null;
}

export interface CreateUseCaseRequest {
  personaId: number;
  title: string;
  description: string;
}

export interface UseCaseResponse {
  id: number;
  personaId: number;
  title: string;
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

// --- AI Decomposition Jobs ---

export interface CreateDecompositionJobRequest {
  testRunId: number;
  pageStateId: number;
  personaId?: number;
}

export interface DecompositionJobResponse {
  id: number;
  testRunId: number;
  pageStateId: number;
  personaId: number | null;
  status: string;
  createdAt: string | null;
  completedAt: string | null;
}

// --- Expertise ---

export interface ExpertiseResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  createdAt: string | null;
}

export interface CreateExpertiseRequest {
  slug: string;
  title: string;
  description: string;
}

export interface ExpertiseRuleResponse {
  id: number;
  expertiseId: number;
  title: string;
  description: string;
  aiEndpointUrl: string | null;
  createdAt: string | null;
}

export interface CreateExpertiseRuleRequest {
  expertiseId: number;
  title: string;
  description: string;
  aiEndpointUrl?: string;
}

// --- Test Surfaces ---

export interface InsertTestSurfaceRequest {
  runnerId: number;
  testEnvironmentId?: number;
  testSurface: TestSurface;
}

export interface TestSurfaceResponse {
  id: number;
  runnerId: number;
  testEnvironmentId: number | null;
  decompositionJobId: number | null;
  title: string;
  description: string;
  startingPageStateId: number;
  startingPath: string;
  sizeClass: string;
  dependencyTestElementId: number | null;
  personaIdsJson: unknown;
  scaffoldId: number | null;
  scaffoldType: string | null;
  patternType: string | null;
  priority: number;
  surfaceTags: string[];
  estimatedDurationMs: number | null;
  uid: string | null;
  createdAt: string | null;
}

// --- Test Surface Bundles ---

export interface TestSurfaceBundleResponse {
  id: number;
  runnerId: number;
  title: string;
  description: string | null;
  uid: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CreateTestSurfaceBundleRequest {
  runnerId: number;
  title: string;
  description?: string;
  uid?: string;
}

export interface UpdateTestSurfaceBundleRequest {
  title?: string;
  description?: string;
}

export interface TestSurfaceBundleSurfaceLinkRequest {
  testSurfaceBundleId: number;
  testSurfaceId: number;
}

export interface TestSurfaceBundleSurfaceLinkResponse {
  id: number;
  testSurfaceBundleId: number;
  testSurfaceId: number;
}

// --- Test Elements (app-level, persistent) ---

export interface InsertTestElementRequest {
  runnerId: number;
  testSurfaceId: number;
  testEnvironmentId?: number;
  testElement: TestElement;
}

/** @deprecated Use InsertTestElementRequest with new TestElement */
export interface LegacyInsertTestElementRequest {
  runnerId: number;
  testElement: LegacyTestElement;
}

export interface TestElementResponse {
  id: number;
  runnerId: number;
  testEnvironmentId: number | null;
  testSurfaceId: number;
  title: string;
  testType: string;
  sizeClass: string;
  surfaceTags: string[];
  priority: number;
  scaffoldId: number | null;
  patternType: string | null;
  dependencyTestElementId: number | null;
  pageId: number | null;
  targetPageId: number | null;
  personaId: number | null;
  useCaseId: number | null;
  startingPageStateId: number | null;
  startingPath: string | null;
  stepsJson: unknown;
  globalExpectationsJson: unknown;
  estimatedDurationMs: number | null;
  uid: string | null;
  generatedAt: string | null;
}

// --- Test Actions (persisted, parent/child with TestElement) ---

export interface CreateTestActionRequest {
  testElementId: number;
  stepOrder: number;
  actionType: PlaywrightAction;
  pageStateId?: number;
  elementIdentityId?: number;
  containerType?: HtmlComponentType;
  containerElementIdentityId?: number;
  value?: string;
  path?: string;
  playwrightCode: string;
  description: string;
  expectations?: Expectation[];
  continueOnFailure?: boolean;
}

export interface TestActionResponse {
  id: number;
  testElementId: number;
  testEnvironmentId: number | null;
  stepOrder: number;
  actionType: string;
  pageStateId: number | null;
  elementIdentityId: number | null;
  containerType: string | null;
  containerElementIdentityId: number | null;
  value: string | null;
  path: string | null;
  playwrightCode: string;
  description: string;
  expectations: unknown;
  continueOnFailure: boolean;
}

// --- Test Element Actions (deprecated — replaced by TestAction parent/child) ---

/** @deprecated Use CreateTestActionRequest */
export interface CreateTestElementActionRequest {
  testElementId: number;
  actionId: number;
  stepOrder: number;
}

/** @deprecated */
export interface TestElementActionResponse {
  id: number;
  testElementId: number;
  actionId: number;
  stepOrder: number;
  createdAt: string | null;
}

// --- Test Element Runs ---

export interface CreateTestElementRunRequest {
  testElementId: number;
  testSurfaceRunId?: number;
}

export interface CompleteTestElementRunRequest {
  status: string;
  durationMs?: number;
  errorMessage?: string;
  expectedOutcome?: string;
  observedOutcome?: string;
  screenshotPath?: string;
  consoleLog?: string;
  networkLog?: string;
}

export interface TestElementRunResponse {
  id: number;
  testElementId: number;
  testSurfaceRunId: number | null;
  testEnvironmentId: number | null;
  status: string;
  durationMs: number | null;
  errorMessage: string | null;
  expectedOutcome: string | null;
  observedOutcome: string | null;
  screenshotPath: string | null;
  consoleLog: string | null;
  networkLog: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string | null;
}

// --- Test Surface Runs ---

export interface CreateTestSurfaceRunRequest {
  testSurfaceId: number;
  testSurfaceBundleRunId?: number;
}

export interface CompleteTestSurfaceRunRequest {
  status: string;
}

export interface TestSurfaceRunResponse {
  id: number;
  testSurfaceId: number;
  testSurfaceBundleRunId: number | null;
  testEnvironmentId: number | null;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string | null;
}

// --- Test Surface Bundle Runs ---

export interface CreateTestSurfaceBundleRunRequest {
  testSurfaceBundleId: number;
}

export interface CompleteTestSurfaceBundleRunRequest {
  status: string;
}

export interface TestSurfaceBundleRunResponse {
  id: number;
  testSurfaceBundleId: number;
  testEnvironmentId: number | null;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string | null;
}

// --- Test Runs ---

export interface CreateTestRunRequest {
  runnerId: number;
  testElementRunId?: number;
  testSurfaceRunId?: number;
  testSurfaceBundleRunId?: number;
  testEnvironmentId?: number;
  discovery?: boolean;
  expertiseSlugsJson?: string[];
  parentTestRunId?: number;
  rootTestRunId?: number;
  sizeClass: string;
  createdByUserId?: string;
  ownedByUserId?: string;
  runnerInstanceId?: string;
  runnerInstanceName?: string;
  scanUrl?: string;
}

export interface CompleteTestRunRequest {
  status: string;
  aiSummary?: string;
  totalDurationMs?: number;
  pagesFound?: number;
  pageStatesFound?: number;
  testRunsCompleted?: number;
}

export interface UpdateTestRunStatsRequest {
  pagesFound?: number;
  pageStatesFound?: number;
  testRunsCompleted?: number;
}

export interface TestRunResponse {
  id: number;
  runnerId: number;
  testElementRunId: number | null;
  testSurfaceRunId: number | null;
  testSurfaceBundleRunId: number | null;
  testEnvironmentId: number | null;
  discovery: boolean;
  expertiseSlugsJson: string[] | null;
  parentTestRunId: number | null;
  rootTestRunId: number | null;
  sizeClass: string;
  status: string;
  createdByUserId: string | null;
  ownedByUserId: string | null;
  runnerInstanceId: string | null;
  runnerInstanceName: string | null;
  scanUrl: string | null;
  pagesFound: number | null;
  pageStatesFound: number | null;
  testRunsCompleted: number | null;
  aiSummary: string | null;
  totalDurationMs: number | null;
  createdAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

// --- Test Run Findings (attached to Test Element Run) ---

export interface CreateTestRunFindingRequest {
  testElementRunId: number;
  expertiseRuleId?: number;
  type: FindingType;
  title: string;
  description: string;
}

export interface TestRunFindingResponse {
  id: number;
  testElementRunId: number;
  expertiseRuleId: number | null;
  type: string;
  title: string;
  description: string;
  createdAt: string | null;
}

// --- Issues (deprecated — replaced by TestRunFinding) ---

/** @deprecated Use CreateTestRunFindingRequest */
export interface CreateIssueRequest {
  runnerId: number;
  testRunId?: number;
  testElementId?: number;
  testElementRunId?: number;
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

/** @deprecated Use TestRunFindingResponse */
export interface IssueResponse {
  id: number;
  runnerId: number;
  testRunId: number | null;
  testElementId: number | null;
  testElementRunId: number | null;
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

// --- Issue Dedup (deprecated) ---

/** @deprecated */
export interface FindTestElementByActionsRequest {
  runnerId: number;
  actionIds: number[];
}

/** @deprecated */
export interface FindIssueByRuleRequest {
  testElementId: number;
  ruleName: string;
}

// --- AI Usage (deprecated — removed) ---

/** @deprecated AI Usage removed */
export interface RecordAiUsageRequest {
  testRunId: number;
  phase: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  purpose?: string;
}

// --- Report Emails ---

export interface CreateReportEmailRequest {
  rootTestRunId: number;
  userEmail: string;
  deepLinkToken: string;
}

export interface ReportEmailResponse {
  id: number;
  rootTestRunId: number;
  userEmail: string;
  deepLinkToken: string;
  sentAt: string | null;
}

// --- Test Credentials ---

export interface CreateTestCredentialRequest {
  productId: number;
  personaId?: number;
  signic: boolean;
  email?: string;
  password?: string;
  verificationCode?: string;
}

export interface TestCredentialResponse {
  id: number;
  productId: number;
  personaId: number | null;
  signic: boolean;
  email: string | null;
  password: string | null;
  verificationCode: string | null;
  createdAt: string | null;
}

/** @deprecated Use CreateTestCredentialRequest */
export type CreateCredentialRequest = CreateTestCredentialRequest;
/** @deprecated Use TestCredentialResponse */
export type CredentialResponse = TestCredentialResponse;

// --- Element Identities ---

export interface CreateElementIdentityRequest {
  runnerId: number;
  testRunId: number;
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
  lastSeenTestRunId: number;
  playwrightLocator?: string;
  playwrightScopeChain?: string;
  isUniqueOnPage?: boolean;
  cssSelector?: string;
  locators?: ElementLocator[];
}

export interface ElementIdentityResponse {
  id: number;
  runnerId: number;
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
  firstSeenTestRunId: number;
  lastSeenTestRunId: number;
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

// --- Scaffolds ---

export interface ScaffoldResponse {
  id: number;
  runnerId: number;
  type: HtmlComponentType;
  htmlElementId: number;
  htmlHash: string | null;
  createdAt: string | null;
}

export interface FindOrCreateScaffoldRequest {
  runnerId: number;
  type: HtmlComponentType;
  html: string;
  hash: string;
}

export interface LinkPageStateScaffoldsRequest {
  pageStateId: number;
  scaffoldIds: number[];
}

export interface PageStateScaffoldResponse {
  id: number;
  pageStateId: number;
  scaffoldId: number;
}

/** @deprecated Use ScaffoldResponse */
export type ReusableHtmlElementResponse = ScaffoldResponse;
/** @deprecated Use FindOrCreateScaffoldRequest */
export type FindOrCreateReusableHtmlElementRequest =
  FindOrCreateScaffoldRequest;
/** @deprecated Use LinkPageStateScaffoldsRequest */
export type LinkPageStateReusableElementsRequest =
  LinkPageStateScaffoldsRequest;
/** @deprecated Use PageStateScaffoldResponse */
export type PageStateReusableElementResponse = PageStateScaffoldResponse;

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

// --- Products ---

export interface CreateProductRequest {
  entityId: string;
  title: string;
  description?: string;
}

export interface ProductResponse {
  id: number;
  entityId: string | null;
  title: string;
  description: string | null;
  contactEmail: string | null;
  claimedByUserId: string | null;
  claimedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/** @deprecated Use CreateProductRequest */
export type CreateProjectRequest = CreateProductRequest;
/** @deprecated Use ProductResponse */
export type ProjectResponse = ProductResponse;

// --- Runners ---

export const RunnerType = {
  Worker: 'worker',
  Extension: 'extension',
} as const;
export type RunnerType = (typeof RunnerType)[keyof typeof RunnerType];

export interface CreateRunnerRequest {
  productId: number;
  title: string;
  type: RunnerType;
  ownerEntityId?: string;
}

export interface RunnerResponse {
  id: number;
  productId: number;
  title: string;
  type: string;
  ownerEntityId: string | null;
  createdAt: string | null;
}

/** @deprecated Use CreateRunnerRequest */
export type CreateAppRequest = CreateRunnerRequest;
/** @deprecated Use RunnerResponse */
export type AppResponse = RunnerResponse;

// --- Test Environments ---

export interface CreateTestEnvironmentRequest {
  productId: number;
  title: string;
  baseUrl: string;
  kind?: EnvironmentKind;
  label?: string;
  ownerUserId?: string;
  githubBranch?: string;
}

export interface UpdateTestEnvironmentRequest {
  title?: string;
  baseUrl?: string;
  kind?: EnvironmentKind;
  label?: string;
  ownerUserId?: string | null;
  githubBranch?: string | null;
}

export const EnvironmentKind = {
  Local: 'local',
  Shared: 'shared',
} as const;
export type EnvironmentKind =
  (typeof EnvironmentKind)[keyof typeof EnvironmentKind];

export interface TestEnvironmentResponse {
  id: number;
  productId: number;
  title: string;
  baseUrl: string;
  kind: EnvironmentKind;
  label: string;
  ownerUserId: string | null;
  githubBranch: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export const ResolvedEnvironmentMode = {
  LocalUserOwned: 'local_user_owned',
  SharedLabeled: 'shared_labeled',
} as const;
export type ResolvedEnvironmentMode =
  (typeof ResolvedEnvironmentMode)[keyof typeof ResolvedEnvironmentMode];

export interface ResolveEnvironmentRequest {
  productId: number;
  url: string;
  baseUrl: string;
  source: 'extension' | 'server';
  environmentLabel?: string;
}

export interface ResolveEnvironmentResponse {
  testEnvironmentId: number;
  kind: EnvironmentKind;
  label: string;
  ownerUserId: string | null;
  resolutionMode: ResolvedEnvironmentMode;
}

// --- Product Settings ---

export interface ProductSettingsResponse {
  id: number;
  productId: number;
  githubLink: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface UpdateProductSettingsRequest {
  githubLink?: string | null;
}

// --- API Keys ---

export interface CreateApiKeyRequest {
  productId: number;
  title: string;
}

export interface ApiKeyResponse {
  id: number;
  productId: number;
  title: string;
  apiKey: string;
  createdAt: string | null;
}

// --- Test Files ---

export interface CreateTestFileRequest {
  productId: number;
  title: string;
  filePath: string;
}

export interface TestFileResponse {
  id: number;
  productId: number;
  title: string;
  filePath: string;
  createdAt: string | null;
}

// --- Test Activities ---

export interface TestActivityResponse {
  id: number;
  productId: number;
  eventType: string;
  testRunId: number | null;
  testSurfaceId: number | null;
  createdAt: string | null;
}

// --- Test Schedules ---

export interface TestScheduleResponse {
  id: number;
  runnerId: number;
  title: string;
  testSurfaceId: number | null;
  testElementId: number | null;
  testSurfaceBundleId: number | null;
  discovery: boolean;
  recurrenceType: string;
  timeOfDay: string;
  dayOfWeek: number | null;
  timezone: string;
  enabled: boolean;
  sizeClass: string;
  createdByUserId: string;
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CreateTestScheduleRequest {
  runnerId: number;
  title: string;
  testSurfaceId?: number;
  testElementId?: number;
  testSurfaceBundleId?: number;
  discovery?: boolean;
  recurrenceType: RecurrenceType;
  timeOfDay: string;
  dayOfWeek?: number;
  timezone: string;
  sizeClass: SizeClass;
}

export interface UpdateTestScheduleRequest {
  title?: string;
  testSurfaceId?: number | null;
  testElementId?: number | null;
  testSurfaceBundleId?: number | null;
  discovery?: boolean;
  recurrenceType?: RecurrenceType;
  timeOfDay?: string;
  dayOfWeek?: number | null;
  timezone?: string;
  enabled?: boolean;
  sizeClass?: SizeClass;
}

// --- Test Scenarios ---

export interface CreateTestScenarioRequest {
  runnerId: number;
  title: string;
  startingPath: string;
  prompt: string;
  personaId?: number;
  sizeClass?: SizeClass;
}

export interface UpdateTestScenarioRequest {
  title?: string;
  startingPath?: string;
  prompt?: string;
  personaId?: number | null;
  sizeClass?: SizeClass;
}

export interface TestScenarioResponse {
  id: number;
  runnerId: number;
  title: string;
  startingPath: string;
  prompt: string;
  personaId: number | null;
  sizeClass: string;
  createdAt: string | null;
  updatedAt: string | null;
}

// --- Test Scenario Sequences ---

export interface CreateTestScenarioSequenceRequest {
  testScenarioId: number;
  testEnvironmentId: number;
}

export interface TestScenarioSequenceResponse {
  id: number;
  testScenarioId: number;
  testEnvironmentId: number;
  createdAt: string | null;
  updatedAt: string | null;
}

// --- Test Scenario Sequence Test Elements (many-to-many join with ordering) ---

export interface TestScenarioSequenceTestElementLinkRequest {
  testScenarioSequenceId: number;
  testElementId: number;
  stepOrder: number;
}

export interface TestScenarioSequenceTestElementLinkResponse {
  id: number;
  testScenarioSequenceId: number;
  testElementId: number;
  stepOrder: number;
}

// --- Test Scenario Sequence Runs ---

export interface CreateTestScenarioSequenceRunRequest {
  testScenarioSequenceId: number;
}

export interface CompleteTestScenarioSequenceRunRequest {
  status: string;
}

export interface TestScenarioSequenceRunResponse {
  id: number;
  testScenarioSequenceId: number;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
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
