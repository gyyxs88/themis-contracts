export type PlatformServiceRole = "gateway" | "worker";

export type ManagedAgentNodeStatus = "online" | "offline" | "draining";
export type ManagedAgentPriority = "low" | "normal" | "high" | "urgent";
export type ManagedAgentWaitingFor = "human" | "agent";
export type ManagedAgentAttentionLevel = "normal" | "attention" | "urgent";
export type ManagedAgentWorkItemStatus =
  | "queued"
  | "planning"
  | "starting"
  | "running"
  | "waiting_human"
  | "waiting_agent"
  | "waiting_action"
  | "blocked"
  | "handoff_pending"
  | "completed"
  | "failed"
  | "cancelled";
export type ManagedAgentLifecycleStatus =
  | "provisioning"
  | "bootstrapping"
  | "active"
  | "paused"
  | "degraded"
  | "archived";
export type ManagedAgentMailboxStatus = "pending" | "leased" | "acked" | "responded" | "closed";
export type ManagedAgentReasoningLevel = "minimal" | "low" | "medium" | "high" | "xhigh";
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
export type ProjectWorkspaceContinuityMode = "sticky" | "replicated" | "portable";
export type ManagedAgentIdleRecoveryAction = "pause" | "archive";
export type ManagedAgentPlatformCompletionDetailLevel =
  | "metadata_only"
  | "deliverable_only"
  | "full_execution_snapshot";

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

export interface ManagedAgentPlatformAgentCardReportLine {
  supervisorPrincipalId?: string;
  supervisorAgentId?: string;
  supervisorDisplayName?: string;
}

export interface ManagedAgentPlatformAgentCardRecord {
  employeeCode: string;
  title: string;
  reportLine?: ManagedAgentPlatformAgentCardReportLine;
  domainTags: string[];
  skillTags: string[];
  responsibilitySummary: string;
  allowedScopes: string[];
  forbiddenScopes: string[];
  workStyle?: string;
  collaborationNotes?: string;
  representativeProjects: string[];
  currentFocus?: string;
  reviewSummary?: string;
  lastReviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManagedAgentPlatformAgentRecord extends TimestampedRecord {
  agentId: string;
  organizationId: string;
  principalId?: string;
  createdByPrincipalId?: string;
  supervisorPrincipalId?: string;
  displayName: string;
  slug?: string;
  departmentRole: string;
  mission?: string;
  status: ManagedAgentLifecycleStatus;
  supervisorAgentId?: string | null;
  autonomyLevel?: "supervised" | "bounded" | "autonomous";
  creationMode?: "manual" | "auto";
  exposurePolicy?: "gateway_only" | "admin_takeover_only" | "direct_human_exception";
  defaultWorkspacePolicyId?: string;
  defaultRuntimeProfileId?: string;
  bootstrapProfile?: unknown;
  bootstrappedAt?: string;
  agentCard?: ManagedAgentPlatformAgentCardRecord;
}

export interface ManagedAgentPlatformWorkspacePolicyRecord extends TimestampedRecord {
  agentId: string;
  policyId?: string;
  organizationId?: string;
  ownerAgentId?: string;
  displayName?: string;
  workspacePath?: string;
  additionalDirectories?: string[];
  allowNetworkAccess?: boolean;
  canonicalWorkspacePath?: string | null;
  additionalWorkspacePaths?: string[];
}

export interface ManagedAgentPlatformRuntimeProfileRecord extends TimestampedRecord {
  agentId: string;
  profileId?: string;
  organizationId?: string;
  ownerAgentId?: string;
  displayName?: string;
  provider?: string | null;
  model?: string | null;
  reasoning?: ManagedAgentReasoningLevel | null;
  memoryMode?: string | null;
  sandboxMode?: string | null;
  webSearchMode?: string | null;
  networkAccessEnabled?: boolean | null;
  approvalPolicy?: string | null;
  accessMode?: string | null;
  authAccountId?: string | null;
  thirdPartyProviderId?: string | null;
}

export interface ManagedAgentPlatformAuthAccountRecord extends TimestampedRecord {
  authAccountId: string;
  accountId?: string;
  agentId: string;
  label: string;
  codexHome?: string;
  isActive?: boolean;
}

export interface ManagedAgentPlatformThirdPartyProviderRecord extends TimestampedRecord {
  providerId: string;
  id?: string;
  agentId: string;
  provider: string;
  type?: string;
  name?: string;
  label: string;
  baseUrl?: string;
  model?: string;
  isEnabled?: boolean;
  apiKeyConfigured?: boolean;
  source?: string;
}

export interface ManagedAgentPlatformProjectWorkspaceBindingRecord extends TimestampedRecord {
  projectId: string;
  organizationId: string;
  displayName?: string;
  owningAgentId?: string;
  workspaceRootId?: string;
  workspacePolicyId?: string;
  canonicalWorkspacePath?: string | null;
  preferredNodeId?: string | null;
  preferredNodePool?: string;
  lastActiveNodeId?: string;
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
  leaseExpiresAt?: string;
  lastHeartbeatAt?: string;
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
  nodeIp?: string | null;
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
  preservedWaitingCount?: number;
  revokedLeaseOnlyCount?: number;
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
  sourcePrincipalId?: string;
  sourceAgentId?: string;
  parentWorkItemId?: string;
  dispatchReason?: string;
  goal: string;
  contextPacket?: unknown;
  waitingActionRequest?: unknown;
  latestHumanResponse?: unknown;
  status: ManagedAgentWorkItemStatus;
  priority: ManagedAgentPriority;
  projectId?: string | null;
  waitingFor?: ManagedAgentWaitingFor | null;
  workspacePolicySnapshot?: unknown;
  runtimeProfileSnapshot?: unknown;
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface ManagedAgentPlatformRunRecord extends TimestampedRecord {
  runId: string;
  organizationId: string;
  workItemId: string;
  targetAgentId?: string;
  schedulerId?: string;
  leaseToken?: string;
  leaseExpiresAt?: string;
  nodeId?: string | null;
  status: ManagedAgentRunStatus;
  startedAt?: string;
  lastHeartbeatAt?: string;
  completedAt?: string;
  failureCode?: string;
  failureMessage?: string;
}

export interface ManagedAgentPlatformMessageRecord extends TimestampedRecord {
  messageId: string;
  organizationId: string;
  fromAgentId?: string | null;
  toAgentId?: string | null;
  workItemId?: string | null;
  runId?: string | null;
  parentMessageId?: string | null;
  mailboxEntryId?: string | null;
  messageType?: string;
  payload?: unknown;
  artifactRefs?: string[];
  priority?: ManagedAgentPriority;
  requiresAck?: boolean;
  direction?: "inbound" | "outbound";
}

export interface ManagedAgentPlatformMailboxEntryRecord extends TimestampedRecord {
  mailboxEntryId: string;
  organizationId: string;
  ownerAgentId: string;
  agentId?: string;
  messageId?: string | null;
  workItemId?: string | null;
  priority?: ManagedAgentPriority;
  status: ManagedAgentMailboxStatus;
  requiresAck?: boolean;
  availableAt?: string;
  leaseToken?: string | null;
  leasedAt?: string | null;
  ackedAt?: string | null;
}

export interface ManagedAgentPlatformMailboxItem {
  entry: ManagedAgentPlatformMailboxEntryRecord;
  message: ManagedAgentPlatformMessageRecord;
}

export interface ManagedAgentPlatformMailboxListView {
  agent: ManagedAgentPlatformAgentRecord;
  items: ManagedAgentPlatformMailboxItem[];
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
  item: ManagedAgentPlatformMailboxItem | null;
}

export interface ManagedAgentPlatformMailboxRespondResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  agent: ManagedAgentPlatformAgentRecord;
  sourceMailboxEntry: ManagedAgentPlatformMailboxEntryRecord;
  sourceMessage: ManagedAgentPlatformMessageRecord;
  responseMessage: ManagedAgentPlatformMessageRecord;
  responseMailboxEntry: ManagedAgentPlatformMailboxEntryRecord;
  resumedWorkItem?: ManagedAgentPlatformWorkItemRecord;
  resumedRuns: ManagedAgentPlatformRunRecord[];
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
  touchedFiles?: string[] | undefined;
  structuredOutput?: Record<string, unknown> | null;
  completedAt?: string;
  detailLevel?: ManagedAgentPlatformCompletionDetailLevel;
  interpretationHint?: string;
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
    reasoning?: string | null;
    sandboxMode?: string | null;
    approvalPolicy?: string | null;
    networkAccessEnabled?: boolean | null;
    [key: string]: unknown;
  };
}

export interface ManagedAgentPlatformRunDetailView {
  organization: ManagedAgentPlatformOrganizationRecord;
  run: ManagedAgentPlatformRunRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  targetAgent: ManagedAgentPlatformAgentRecord;
  completionResult?: ManagedAgentPlatformWorkerCompletionPayload | null;
}

export interface ManagedAgentPlatformWorkItemDetailView {
  organization: ManagedAgentPlatformOrganizationRecord;
  workItem: ManagedAgentPlatformWorkItemRecord;
  targetAgent: ManagedAgentPlatformAgentRecord;
  sourceAgent?: ManagedAgentPlatformAgentRecord | null;
  sourcePrincipal?: ManagedAgentPlatformPrincipalRecord | null;
  messages?: ManagedAgentPlatformMessageRecord[];
  collaboration?: {
    parentWorkItem: ManagedAgentPlatformWorkItemRecord | null;
    parentTargetAgent: ManagedAgentPlatformAgentRecord | null;
    childSummary: {
      totalCount: number;
      openCount: number;
      waitingCount: number;
      completedCount: number;
      failedCount: number;
      cancelledCount: number;
    };
    childWorkItems: Array<{
      workItem: ManagedAgentPlatformWorkItemRecord;
      targetAgent: ManagedAgentPlatformAgentRecord | null;
      latestHandoff: ManagedAgentPlatformHandoffRecord | null;
    }>;
  };
  runs?: ManagedAgentPlatformRunRecord[];
  parentWorkItem?: ManagedAgentPlatformWorkItemRecord | null;
  childWorkItems?: ManagedAgentPlatformWorkItemRecord[];
  latestHandoff?: ManagedAgentPlatformHandoffRecord | null;
  latestCompletion?: ManagedAgentPlatformWorkerCompletionPayload | null;
}

export interface ManagedAgentPlatformDispatchWorkItemResult {
  organization: ManagedAgentPlatformOrganizationRecord;
  targetAgent: ManagedAgentPlatformAgentRecord;
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
  totalCount?: number;
  waitingHumanCount?: number;
  waitingAgentCount?: number;
  escalationCount?: number;
  urgentCount?: number;
  normalCount?: number;
  total?: number;
  waitingHuman?: number;
  waitingAgent?: number;
  attentionCount?: number;
}

export interface ManagedAgentPlatformWaitingQueueResult {
  summary: ManagedAgentPlatformWaitingQueueSummary;
  items: ManagedAgentPlatformWorkItemRecord[];
}

export interface ManagedAgentPlatformGovernanceOverview {
  urgentParentCount?: number;
  attentionParentCount?: number;
  waitingHumanCount?: number;
  waitingAgentCount?: number;
  staleParentCount?: number;
  failedChildCount?: number;
  managersNeedingAttentionCount?: number;
  managerHotspots?: Array<{
    managerAgent?: ManagedAgentPlatformAgentRecord;
    managerAgentId?: string;
    displayName?: string;
    itemCount?: number;
    openParentCount?: number;
    urgentParentCount?: number;
    attentionParentCount?: number;
    waitingCount?: number;
    staleParentCount?: number;
    failedChildCount?: number;
    latestActivityAt?: string;
  }>;
  summary?: ManagedAgentPlatformWaitingQueueSummary;
}

export interface ManagedAgentPlatformCollaborationDashboardResult {
  summary: ManagedAgentPlatformWaitingQueueSummary;
  items?: Array<{
    parentWorkItem: ManagedAgentPlatformWorkItemRecord;
    managerAgent: ManagedAgentPlatformAgentRecord;
    childSummary: {
      totalCount: number;
      openCount: number;
      waitingCount: number;
      completedCount: number;
      failedCount: number;
      cancelledCount: number;
    };
    waitingHumanChildCount: number;
    waitingAgentChildCount: number;
    failedChildCount: number;
    staleChildCount: number;
    managerStatus: ManagedAgentLifecycleStatus;
    latestHandoff: ManagedAgentPlatformHandoffRecord | null;
    latestWaitingMessage: ManagedAgentPlatformMessageRecord | null;
    latestWaitingWorkItemId?: string;
    latestWaitingTargetAgentId?: string;
    latestWaitingActionType?: string;
    latestGovernanceResponse: Record<string, unknown> | null;
    lastActivityAt: string;
    lastActivityKind: "handoff" | "waiting" | "governance" | "work_item";
    lastActivitySummary: string;
    attentionLevel: ManagedAgentAttentionLevel;
    attentionReasons: string[];
  }>;
  parents: Array<{
    parentWorkItemId: string;
    displayName?: string;
    items: ManagedAgentPlatformWorkItemRecord[];
  }>;
}

export interface ManagedAgentPlatformSpawnSuggestionRecord extends TimestampedRecord {
  suggestionId: string;
  organizationId?: string;
  departmentRole: string;
  displayName?: string;
  slug?: string;
  mission?: string;
  reason: string;
  rationale?: string;
  mode?: "auto" | "manual";
  supportingAgentId?: string;
  supportingAgentDisplayName?: string;
  suggestedSupervisorAgentId?: string;
  openWorkItemCount?: number;
  waitingWorkItemCount?: number;
  highPriorityWorkItemCount?: number;
  spawnPolicy?: unknown;
  guardrail?: unknown;
  auditFacts?: unknown;
}

export interface ManagedAgentPlatformSpawnSuggestionsView {
  suggestions: ManagedAgentPlatformSpawnSuggestionRecord[];
  spawnPolicies?: ManagedAgentPlatformSpawnPolicyRecord[];
  suppressedSuggestions?: ManagedAgentPlatformSpawnSuggestionAuditRecord[];
  recentAuditLogs?: ManagedAgentPlatformSpawnSuggestionAuditRecord[];
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
  recentAuditLogs?: ManagedAgentPlatformSpawnSuggestionAuditRecord[];
}

export interface ManagedAgentPlatformSpawnPolicyRecord extends TimestampedRecord {
  ownerPrincipalId: string;
  enabled: boolean;
  organizationId?: string;
  maxActiveAgents?: number;
  maxActiveAgentsPerRole?: number;
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

export type ManagedAgentMeetingRoomStatus = "open" | "closing" | "closed" | "terminated";
export type ManagedAgentMeetingDiscussionMode = "moderated" | "collaborative";
export type ManagedAgentMeetingParticipantKind = "themis" | "managed_agent";
export type ManagedAgentMeetingRoomRole = "host" | "participant";
export type ManagedAgentMeetingEntryMode = "blank" | "active_work_context" | "selected_context";
export type ManagedAgentMeetingRoundStatus = "queued" | "running" | "completed" | "failed";
export type ManagedAgentMeetingMessageAudience = "all_participants" | "themis_only" | "selected_participants";
export type ManagedAgentMeetingMessageKind = "message" | "status" | "summary" | "error";
export type ManagedAgentMeetingResolutionStatus = "draft" | "accepted" | "promoted";
export type ManagedAgentMeetingArtifactRefType =
  | "work_item"
  | "handoff"
  | "managed_agent_timeline"
  | "conversation_summary"
  | "document";

export interface ManagedAgentPlatformMeetingRoomRecord extends TimestampedRecord {
  roomId: string;
  ownerPrincipalId: string;
  organizationId: string;
  title: string;
  goal: string;
  status: ManagedAgentMeetingRoomStatus;
  discussionMode: ManagedAgentMeetingDiscussionMode;
  createdByOperatorPrincipalId: string;
  closedAt?: string | null;
  closingSummary?: string;
  terminatedAt?: string | null;
  terminatedByOperatorPrincipalId?: string | null;
  terminationReason?: string;
}

export interface ManagedAgentPlatformMeetingParticipantRecord extends TimestampedRecord {
  participantId: string;
  roomId: string;
  participantKind: ManagedAgentMeetingParticipantKind;
  principalId: string;
  agentId?: string | null;
  displayName: string;
  roomRole: ManagedAgentMeetingRoomRole;
  entryMode: ManagedAgentMeetingEntryMode;
  entryContextSnapshotJson?: unknown;
  roomSessionId?: string | null;
  joinedAt: string;
  leftAt?: string | null;
}

export interface ManagedAgentPlatformMeetingRoundRecord extends TimestampedRecord {
  roundId: string;
  roomId: string;
  triggerMessageId: string;
  status: ManagedAgentMeetingRoundStatus;
  targetParticipantIds: string[];
  respondedParticipantIds: string[];
  startedAt?: string | null;
  completedAt?: string | null;
  failureMessage?: string | null;
}

export interface ManagedAgentPlatformMeetingMessageRecord extends TimestampedRecord {
  messageId: string;
  roomId: string;
  roundId?: string | null;
  speakerType: "themis" | "managed_agent" | "system";
  speakerPrincipalId?: string | null;
  speakerAgentId?: string | null;
  operatorPrincipalId?: string | null;
  audience: ManagedAgentMeetingMessageAudience;
  visibleParticipantIds?: string[];
  content: string;
  messageKind: ManagedAgentMeetingMessageKind;
}

export interface ManagedAgentPlatformMeetingResolutionRecord extends TimestampedRecord {
  resolutionId: string;
  roomId: string;
  sourceMessageIds: string[];
  title: string;
  summary: string;
  status: ManagedAgentMeetingResolutionStatus;
  promotedWorkItemId?: string | null;
}

export interface ManagedAgentPlatformMeetingArtifactRefRecord extends TimestampedRecord {
  artifactRefId: string;
  roomId: string;
  participantId?: string | null;
  refType: ManagedAgentMeetingArtifactRefType;
  refId: string;
  snapshotJson?: unknown;
}
