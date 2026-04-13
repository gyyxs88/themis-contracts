import type {
  ManagedAgentIdleRecoveryAction,
  ManagedAgentPlatformAgentDetailView,
  ManagedAgentPlatformAgentListView,
  ManagedAgentPlatformApproveSpawnSuggestionResult,
  ManagedAgentPlatformCollaborationDashboardResult as SharedCollaborationDashboardResult,
  ManagedAgentPlatformCreateAgentResult,
  ManagedAgentPlatformExecutionBoundaryView,
  ManagedAgentPlatformGovernanceOverview,
  ManagedAgentPlatformIdleRecoverySuggestionsView,
  ManagedAgentPlatformOwnerView,
  ManagedAgentPlatformSpawnPolicyRecord,
  ManagedAgentPlatformSpawnSuggestionDecisionResult,
  ManagedAgentPlatformSpawnSuggestionsView,
  ManagedAgentPlatformWaitingQueueResult as SharedWaitingQueueResult,
} from "./managed-agent-platform-shared.js";
import type { ManagedAgentPlatformOwnerPayload } from "./managed-agent-platform-worker.js";

export interface ManagedAgentPlatformAgentCreateInput {
  departmentRole: string;
  displayName?: string;
  mission?: string;
  organizationId?: string;
  supervisorAgentId?: string;
}

export interface ManagedAgentPlatformAgentCreatePayload extends ManagedAgentPlatformOwnerPayload {
  agent: ManagedAgentPlatformAgentCreateInput;
}

export interface ManagedAgentPlatformAgentDetailInput {
  agentId: string;
}

export interface ManagedAgentPlatformAgentDetailPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformAgentDetailInput {}

export interface ManagedAgentPlatformAgentExecutionBoundaryUpdateInput {
  agentId: string;
  workspacePolicy?: {
    canonicalWorkspacePath?: string | null;
    additionalWorkspacePaths?: string[];
  };
  runtimeProfile?: {
    provider?: string | null;
    model?: string | null;
  };
}

export interface ManagedAgentPlatformAgentExecutionBoundaryUpdatePayload extends ManagedAgentPlatformOwnerPayload {
  agentId: string;
  boundary: {
    workspacePolicy?: ManagedAgentPlatformAgentExecutionBoundaryUpdateInput["workspacePolicy"];
    runtimeProfile?: ManagedAgentPlatformAgentExecutionBoundaryUpdateInput["runtimeProfile"];
  };
}

export interface ManagedAgentPlatformAgentSpawnPolicyUpdateInput {
  enabled: boolean;
  maxAgentsPerRole?: number | null;
}

export interface ManagedAgentPlatformAgentSpawnPolicyUpdatePayload extends ManagedAgentPlatformOwnerPayload {
  policy: ManagedAgentPlatformAgentSpawnPolicyUpdateInput;
}

export interface ManagedAgentPlatformAgentSpawnApproveInput {
  suggestionId: string;
  displayName?: string;
  mission?: string;
}

export interface ManagedAgentPlatformAgentSpawnApprovePayload extends ManagedAgentPlatformOwnerPayload {
  agent: ManagedAgentPlatformAgentSpawnApproveInput;
}

export interface ManagedAgentPlatformAgentSpawnSuggestionActionInput {
  suggestionId: string;
  note?: string;
}

export interface ManagedAgentPlatformAgentSpawnSuggestionActionPayload extends ManagedAgentPlatformOwnerPayload {
  suggestion: ManagedAgentPlatformAgentSpawnSuggestionActionInput;
}

export interface ManagedAgentPlatformAgentSpawnSuggestionRestoreInput {
  suggestionId: string;
}

export interface ManagedAgentPlatformAgentSpawnSuggestionRestorePayload extends ManagedAgentPlatformOwnerPayload {
  suggestion: ManagedAgentPlatformAgentSpawnSuggestionRestoreInput;
}

export interface ManagedAgentPlatformAgentIdleApproveInput {
  suggestionId: string;
  action?: ManagedAgentIdleRecoveryAction;
}

export interface ManagedAgentPlatformAgentIdleApprovePayload extends ManagedAgentPlatformOwnerPayload {
  suggestion: ManagedAgentPlatformAgentIdleApproveInput;
}

export interface ManagedAgentPlatformAgentLifecycleInput {
  agentId: string;
}

export interface ManagedAgentPlatformAgentLifecyclePayload
  extends ManagedAgentPlatformOwnerPayload, Pick<ManagedAgentPlatformAgentLifecycleInput, "agentId"> {}

export interface ManagedAgentPlatformGovernanceFiltersInput {
  organizationId?: string;
  managerAgentId?: string;
  attentionLevels?: string[];
  waitingFor?: "human" | "agent";
  staleOnly?: boolean;
  failedOnly?: boolean;
  attentionOnly?: boolean;
  limit?: number;
}

export interface ManagedAgentPlatformGovernanceFiltersPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformGovernanceFiltersInput {}

export interface ManagedAgentPlatformWaitingQueueListPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformGovernanceFiltersInput {}

export interface ManagedAgentPlatformCollaborationDashboardPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformGovernanceFiltersInput {}

export type ManagedAgentPlatformAgentListResult = ManagedAgentPlatformAgentListView;
export type ManagedAgentPlatformAgentCreateResult = ManagedAgentPlatformCreateAgentResult;
export type ManagedAgentPlatformAgentExecutionBoundaryUpdateResult = ManagedAgentPlatformExecutionBoundaryView;
export interface ManagedAgentPlatformAgentSpawnPolicyUpdateResult {
  policy: ManagedAgentPlatformSpawnPolicyRecord;
}
export type ManagedAgentPlatformAgentSpawnApproveResult = ManagedAgentPlatformApproveSpawnSuggestionResult;
export type ManagedAgentPlatformAgentSpawnSuggestionActionResult = ManagedAgentPlatformSpawnSuggestionDecisionResult;
export interface ManagedAgentPlatformAgentSpawnSuggestionRestoreResult {
  auditLog: ManagedAgentPlatformSpawnSuggestionDecisionResult["auditLog"];
}
export interface ManagedAgentPlatformAgentIdleApproveResult {
  organization: ManagedAgentPlatformOwnerView["organization"];
  agent: ManagedAgentPlatformOwnerView["agent"];
}
export type ManagedAgentPlatformAgentLifecycleResult = ManagedAgentPlatformOwnerView;
export type ManagedAgentPlatformAgentSpawnSuggestionsResult = ManagedAgentPlatformSpawnSuggestionsView;
export type ManagedAgentPlatformAgentIdleRecoverySuggestionsResult = ManagedAgentPlatformIdleRecoverySuggestionsView;
export type ManagedAgentPlatformWaitingQueueResult = SharedWaitingQueueResult;
export type ManagedAgentPlatformGovernanceOverviewResult = ManagedAgentPlatformGovernanceOverview;
export type ManagedAgentPlatformCollaborationDashboardResult = SharedCollaborationDashboardResult;

export interface ManagedAgentPlatformAgentDetailResult {
  organization: ManagedAgentPlatformAgentDetailView["organization"];
  principal: ManagedAgentPlatformAgentDetailView["principal"];
  agent: ManagedAgentPlatformAgentDetailView["agent"];
  workspacePolicy: ManagedAgentPlatformAgentDetailView["workspacePolicy"];
  runtimeProfile: ManagedAgentPlatformAgentDetailView["runtimeProfile"];
  authAccounts: ManagedAgentPlatformAgentDetailView["authAccounts"];
  thirdPartyProviders: ManagedAgentPlatformAgentDetailView["thirdPartyProviders"];
}
