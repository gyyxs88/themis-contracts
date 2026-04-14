export type PlatformServiceRole = "gateway" | "worker";

export type ManagedAgentNodeStatus = "online" | "offline" | "draining";
export type ManagedAgentPriority = "low" | "normal" | "high" | "urgent";
export type ManagedAgentWaitingFor = "human" | "agent";
export type ManagedAgentWorkItemStatus =
  | "queued"
  | "planning"
  | "starting"
  | "running"
  | "waiting_human"
  | "waiting_agent"
  | "waiting_action"
  | "completed"
  | "failed"
  | "cancelled";
export type ManagedAgentLifecycleStatus = "active" | "paused" | "archived";
export type ManagedAgentMailboxStatus = "pending" | "acked" | "responded" | "closed";
export type ManagedAgentRunStatus =
  | "created"
  | "starting"
  | "running"
  | "waiting_action"
  | "interrupted"
  | "completed"
  | "failed"
  | "cancelled";
export type ManagedAgentExecutionLeaseStatus = "active" | "expired" | "released" | "revoked";
export type ManagedAgentWorkerRunStatus =
  | "starting"
  | "running"
  | "heartbeat"
  | "waiting_human"
  | "waiting_agent"
  | "failed"
  | "cancelled";
export type ProjectWorkspaceContinuityMode = "sticky" | "replicated";
export type ManagedAgentIdleRecoveryAction = "pause";

export interface TimestampedRecord {
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface ManagedAgentPlatformOrganizationRecord extends TimestampedRecord {
  organizationId: string;
  ownerPrincipalId: string;
  displayName: string;
  slug: string;
}

export interface ManagedAgentPlatformPrincipalRecord extends TimestampedRecord {
  principalId: string;
  organizationId: string;
  displayName: string;
}

export interface ManagedAgentPlatformAgentRecord extends TimestampedRecord {
  agentId: string;
  organizationId: string;
  principalId?: string;
  displayName: string;
  departmentRole: string;
  mission?: string;
  status: ManagedAgentLifecycleStatus;
  supervisorAgentId?: string | null;
}

export interface ManagedAgentPlatformWorkspacePolicyRecord extends TimestampedRecord {
  agentId: string;
  canonicalWorkspacePath?: string | null;
  additionalWorkspacePaths?: string[];
}

export interface ManagedAgentPlatformRuntimeProfileRecord extends TimestampedRecord {
  agentId: string;
  provider?: string | null;
  model?: string | null;
}

export interface ManagedAgentPlatformAuthAccountRecord extends TimestampedRecord {
  authAccountId: string;
  agentId: string;
  label: string;
}

export interface ManagedAgentPlatformThirdPartyProviderRecord extends TimestampedRecord {
  providerId: string;
  agentId: string;
  provider: string;
  label: string;
}

export interface ManagedAgentPlatformProjectWorkspaceBindingRecord extends TimestampedRecord {
  projectId: string;
  organizationId: string;
  displayName?: string;
  canonicalWorkspacePath?: string | null;
  preferredNodeId?: string | null;
  lastActiveWorkspacePath?: string | null;
  continuityMode: ProjectWorkspaceContinuityMode;
}

export interface ManagedAgentPlatformExecutionLeaseRecord extends TimestampedRecord {
  leaseId: string;
  runId: string;
  nodeId: string;
  workItemId: string;
  leaseToken?: string;
  targetAgentId?: string;
  status?: ManagedAgentExecutionLeaseStatus;
}

export interface ManagedAgentPlatformNodeLeaseSummary {
  totalCount: number;
  activeCount: number;
  expiredCount: number;
  releasedCount: number;
  revokedCount: number;
}

export interface ManagedAgentPlatformNodeRecord extends TimestampedRecord {
  nodeId: string;
  organizationId: string;
  displayName: string;
  status: ManagedAgentNodeStatus;
  slotCapacity: number;
  slotAvailable: number;
  labels?: string[];
  workspaceCapabilities?: string[];
  credentialCapabilities?: string[];
  providerCapabilities?: string[];
  heartbeatTtlSeconds?: number;
  lastHeartbeatAt?: string | null;
}

export interface ManagedAgentPlatformNodeMutationResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  node: ManagedAgentPlatformNodeRecord;
}

export interface ManagedAgentPlatformNodeDetailResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  node: ManagedAgentPlatformNodeRecord;
  leaseSummary: ManagedAgentPlatformNodeLeaseSummary;
  activeExecutionLeases: ManagedAgentPlatformNodeExecutionLeaseContext[];
  recentExecutionLeases: ManagedAgentPlatformNodeExecutionLeaseContext[];
}

export interface ManagedAgentPlatformNodeExecutionLeaseContext {
  lease: ManagedAgentPlatformExecutionLeaseRecord;
  run: ManagedAgentPlatformRunRecord | null;
  workItem: ManagedAgentPlatformWorkItemRecord | null;
  targetAgent: ManagedAgentPlatformAgentRecord | null;
}

export interface ManagedAgentPlatformNodeLeaseRecoverySummary {
  activeLeaseCount: number;
  reclaimedRunCount: number;
  requeuedWorkItemCount: number;
}

export type ManagedAgentPlatformNodeLeaseRecoveryAction = "reclaim" | "offline" | "drain";

export interface ManagedAgentPlatformReclaimedLeaseContext {
  lease: ManagedAgentPlatformExecutionLeaseRecord;
  run: ManagedAgentPlatformRunRecord | null;
  workItem: ManagedAgentPlatformWorkItemRecord | null;
  recoveryAction?: string;
}

export interface ManagedAgentPlatformNodeLeaseRecoveryResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  node: ManagedAgentPlatformNodeRecord;
  summary: ManagedAgentPlatformNodeLeaseRecoverySummary;
  reclaimedLeases: ManagedAgentPlatformReclaimedLeaseContext[];
}

export interface ManagedAgentPlatformWorkItemRecord extends TimestampedRecord {
  workItemId: string;
  organizationId: string;
  targetAgentId: string;
  sourceType: "human" | "agent" | "system";
  dispatchReason?: string;
  goal: string;
  status: ManagedAgentWorkItemStatus;
  priority: ManagedAgentPriority;
  projectId?: string | null;
  waitingFor?: ManagedAgentWaitingFor | null;
}

export interface ManagedAgentPlatformRunRecord extends TimestampedRecord {
  runId: string;
  organizationId: string;
  workItemId: string;
  nodeId?: string | null;
  status: ManagedAgentRunStatus;
}

export interface ManagedAgentPlatformMessageRecord extends TimestampedRecord {
  messageId: string;
  organizationId: string;
  mailboxEntryId?: string | null;
  direction?: "inbound" | "outbound";
}

export interface ManagedAgentPlatformMailboxEntryRecord extends TimestampedRecord {
  mailboxEntryId: string;
  organizationId: string;
  agentId: string;
  status: ManagedAgentMailboxStatus;
}

export interface ManagedAgentPlatformMailboxListView {
  agent: ManagedAgentPlatformAgentRecord;
  items: ManagedAgentPlatformMailboxEntryRecord[];
}

export interface ManagedAgentPlatformHandoffRecord extends TimestampedRecord {
  handoffId: string;
  fromAgentId?: string | null;
  toAgentId?: string | null;
  workItemId?: string | null;
  sourceMessageId?: string | null;
  sourceRunId?: string | null;
  summary?: string;
  blockers?: string[];
  recommendedNextActions?: string[];
  attachedArtifacts?: string[];
  payload?: unknown;
  fromAgentDisplayName?: string;
  toAgentDisplayName?: string;
  counterpartyDisplayName?: string;
}

export interface ManagedAgentPlatformTimelineEntry extends TimestampedRecord {
  entryId: string;
  kind: string;
  title?: string;
  summary: string;
  workItemId?: string | null;
  handoffId?: string | null;
  messageId?: string | null;
  counterpartyAgentId?: string | null;
  counterpartyDisplayName?: string;
}

export interface ManagedAgentPlatformHandoffListView {
  agent: ManagedAgentPlatformAgentRecord;
  handoffs: ManagedAgentPlatformHandoffRecord[];
  timeline: ManagedAgentPlatformTimelineEntry[];
}

export interface ManagedAgentPlatformMailboxPullResult {
  agent: ManagedAgentPlatformAgentRecord;
  mailboxEntry: ManagedAgentPlatformMailboxEntryRecord;
  message?: ManagedAgentPlatformMessageRecord;
}

export interface ManagedAgentPlatformMailboxRespondResult {
  agent: ManagedAgentPlatformAgentRecord;
  mailboxEntry: ManagedAgentPlatformMailboxEntryRecord;
  message?: ManagedAgentPlatformMessageRecord;
  workItem?: ManagedAgentPlatformWorkItemRecord;
}

export interface ManagedAgentPlatformWorkerWaitingActionPayload {
  actionType?: string;
  actionId?: string;
  prompt?: string;
  message?: string;
  choices?: unknown;
  inputSchema?: unknown;
  requestId?: string;
  taskId?: string;
}

export interface ManagedAgentPlatformWorkerCompletionPayload {
  summary: string;
  output?: unknown;
  touchedFiles?: string[];
  structuredOutput?: Record<string, unknown> | null;
  completedAt?: string;
}

export interface ManagedAgentPlatformWorkerRunMutationResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  node: ManagedAgentPlatformNodeRecord;
  targetAgent: ManagedAgentPlatformAgentRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  run: ManagedAgentPlatformRunRecord;
  executionLease: ManagedAgentPlatformExecutionLeaseRecord;
}

export interface ManagedAgentPlatformWorkerAssignedRun {
  organization: ManagedAgentPlatformOrganizationRecord;
  node: ManagedAgentPlatformNodeRecord;
  targetAgent: ManagedAgentPlatformAgentRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  run: ManagedAgentPlatformRunRecord;
  executionLease: ManagedAgentPlatformExecutionLeaseRecord;
  executionContract: {
    workspacePath?: string | null;
    credentialId?: string | null;
    provider?: string | null;
    model?: string | null;
    [key: string]: unknown;
  };
}

export interface ManagedAgentPlatformRunDetailView {
  organization: ManagedAgentPlatformOrganizationRecord;
  run: ManagedAgentPlatformRunRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  targetAgent: ManagedAgentPlatformAgentRecord;
}

export interface ManagedAgentPlatformWorkItemDetailView {
  organization: ManagedAgentPlatformOrganizationRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  targetAgent: ManagedAgentPlatformAgentRecord;
  runs?: ManagedAgentPlatformRunRecord[];
  parentWorkItem?: ManagedAgentPlatformWorkItemRecord | null;
  childWorkItems?: ManagedAgentPlatformWorkItemRecord[];
  latestHandoff?: ManagedAgentPlatformHandoffRecord | null;
}

export interface ManagedAgentPlatformDispatchWorkItemResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
}

export interface ManagedAgentPlatformCancelWorkItemResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  cancelledRunIds?: string[];
}

export interface ManagedAgentPlatformRespondToHumanWaitingWorkItemResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  message?: ManagedAgentPlatformMessageRecord | null;
}

export interface ManagedAgentPlatformEscalateWaitingAgentWorkItemToHumanResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  message?: ManagedAgentPlatformMessageRecord | null;
}

export interface ManagedAgentPlatformWaitingQueueSummary {
  total: number;
  waitingHuman: number;
  waitingAgent: number;
  attentionCount: number;
}

export interface ManagedAgentPlatformWaitingQueueResult {
  summary: ManagedAgentPlatformWaitingQueueSummary;
  items: ManagedAgentPlatformWorkItemRecord[];
}

export interface ManagedAgentPlatformGovernanceOverview {
  summary: ManagedAgentPlatformWaitingQueueSummary;
  managerHotspots?: Array<{
    managerAgentId: string;
    displayName?: string;
    itemCount: number;
  }>;
}

export interface ManagedAgentPlatformCollaborationDashboardResult {
  summary: ManagedAgentPlatformWaitingQueueSummary;
  parents: Array<{
    parentWorkItemId: string;
    displayName?: string;
    items: ManagedAgentPlatformWorkItemRecord[];
  }>;
}

export interface ManagedAgentPlatformSpawnSuggestionRecord extends TimestampedRecord {
  suggestionId: string;
  departmentRole: string;
  reason: string;
  mode?: "auto" | "manual";
}

export interface ManagedAgentPlatformSpawnSuggestionsView {
  suggestions: ManagedAgentPlatformSpawnSuggestionRecord[];
  policy?: ManagedAgentPlatformSpawnPolicyRecord | null;
  suppressed?: ManagedAgentPlatformSpawnSuggestionAuditRecord[];
}

export interface ManagedAgentPlatformIdleRecoverySuggestionRecord extends TimestampedRecord {
  suggestionId: string;
  agentId: string;
  action: ManagedAgentIdleRecoveryAction;
  reason: string;
}

export interface ManagedAgentPlatformIdleRecoverySuggestionsView {
  suggestions: ManagedAgentPlatformIdleRecoverySuggestionRecord[];
}

export interface ManagedAgentPlatformSpawnPolicyRecord extends TimestampedRecord {
  ownerPrincipalId: string;
  enabled: boolean;
  maxAgentsPerRole?: number | null;
}

export interface ManagedAgentPlatformSpawnSuggestionAuditRecord extends TimestampedRecord {
  auditLogId: string;
  suggestionId: string;
  decision: "approved" | "ignored" | "rejected" | "restored" | "blocked";
}

export interface ManagedAgentPlatformCreateAgentResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  principal: ManagedAgentPlatformPrincipalRecord;
  agent: ManagedAgentPlatformAgentRecord;
}

export interface ManagedAgentPlatformAgentListView {
  organizations: ManagedAgentPlatformOrganizationRecord[];
  agents: ManagedAgentPlatformAgentRecord[];
}

export interface ManagedAgentPlatformAgentDetailView {
  organization: ManagedAgentPlatformOrganizationRecord;
  principal: ManagedAgentPlatformPrincipalRecord;
  agent: ManagedAgentPlatformAgentRecord;
  workspacePolicy: ManagedAgentPlatformWorkspacePolicyRecord;
  runtimeProfile: ManagedAgentPlatformRuntimeProfileRecord;
  authAccounts: ManagedAgentPlatformAuthAccountRecord[];
  thirdPartyProviders: ManagedAgentPlatformThirdPartyProviderRecord[];
}

export interface ManagedAgentPlatformExecutionBoundaryView {
  agent: ManagedAgentPlatformAgentRecord;
  workspacePolicy: ManagedAgentPlatformWorkspacePolicyRecord;
  runtimeProfile: ManagedAgentPlatformRuntimeProfileRecord;
}

export interface ManagedAgentPlatformOwnerView {
  organization: ManagedAgentPlatformOrganizationRecord;
  agent: ManagedAgentPlatformAgentRecord;
}

export interface ManagedAgentPlatformApproveSpawnSuggestionResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  principal: ManagedAgentPlatformPrincipalRecord;
  agent: ManagedAgentPlatformAgentRecord;
  workItem?: ManagedAgentPlatformWorkItemRecord | null;
}

export interface ManagedAgentPlatformSpawnSuggestionDecisionResult {
  auditLog: ManagedAgentPlatformSpawnSuggestionAuditRecord;
}
