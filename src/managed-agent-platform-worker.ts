import type {
  ManagedAgentNodeStatus,
  ManagedAgentPlatformExecutionLeaseRecord,
  ManagedAgentPlatformExecutionBoundaryView,
  ManagedAgentPlatformNodeDetailResult,
  ManagedAgentPlatformNodeExecutionLeaseContext,
  ManagedAgentPlatformNodeLeaseRecoveryAction,
  ManagedAgentPlatformNodeLeaseRecoveryResult,
  ManagedAgentPlatformNodeLeaseRecoverySummary,
  ManagedAgentPlatformNodeLeaseSummary,
  ManagedAgentPlatformNodeMutationResult,
  ManagedAgentPlatformNodeRecord,
  ManagedAgentPlatformOrganizationRecord,
  ManagedAgentPlatformReclaimedLeaseContext,
  ManagedAgentPlatformWorkerAssignedRun,
  ManagedAgentPlatformWorkerCompletionPayload,
  ManagedAgentPlatformWorkerRunMutationResult as SharedWorkerRunMutationResult,
  ManagedAgentWorkerRunStatus as SharedWorkerRunStatus,
  ManagedAgentPlatformWorkerWaitingActionPayload as SharedWorkerWaitingActionPayload,
} from "./managed-agent-platform-shared.js";

export interface ManagedAgentPlatformOwnerPayload {
  ownerPrincipalId: string;
}

export interface ManagedAgentPlatformWorkerNodeRegistrationInput {
  nodeId?: string;
  organizationId?: string;
  displayName: string;
  slotCapacity: number;
  slotAvailable?: number;
  labels?: string[];
  workspaceCapabilities?: string[];
  credentialCapabilities?: string[];
  providerCapabilities?: string[];
  heartbeatTtlSeconds?: number;
}

export interface ManagedAgentPlatformWorkerNodeHeartbeatInput {
  nodeId: string;
  status?: ManagedAgentNodeStatus;
  slotAvailable?: number;
  labels?: string[];
  workspaceCapabilities?: string[];
  credentialCapabilities?: string[];
  providerCapabilities?: string[];
  heartbeatTtlSeconds?: number;
}

export interface ManagedAgentPlatformWorkerNodeListInput {
  organizationId?: string;
}

export interface ManagedAgentPlatformWorkerNodeDetailInput {
  nodeId: string;
}

export interface ManagedAgentPlatformWorkerNodeLeaseReclaimInput extends ManagedAgentPlatformWorkerNodeDetailInput {
  failureCode?: string;
  failureMessage?: string;
}

export interface ManagedAgentPlatformWorkerPullInput {
  nodeId: string;
}

export type ManagedAgentPlatformWorkerWaitingActionPayload = SharedWorkerWaitingActionPayload;
export type ManagedAgentPlatformWorkerCompletionResult = ManagedAgentPlatformWorkerCompletionPayload;
export type ManagedAgentPlatformWorkerRunStatus = SharedWorkerRunStatus;

export interface ManagedAgentPlatformWorkerRunStatusInput extends ManagedAgentPlatformWorkerPullInput {
  runId: string;
  leaseToken: string;
  status: ManagedAgentPlatformWorkerRunStatus;
  failureCode?: string;
  failureMessage?: string;
  waitingAction?: ManagedAgentPlatformWorkerWaitingActionPayload;
}

export interface ManagedAgentPlatformWorkerRunCompleteInput extends ManagedAgentPlatformWorkerPullInput {
  runId: string;
  leaseToken: string;
  result?: ManagedAgentPlatformWorkerCompletionResult;
}

export interface ManagedAgentPlatformNodeRegisterPayload extends ManagedAgentPlatformOwnerPayload {
  node: ManagedAgentPlatformWorkerNodeRegistrationInput;
}

export interface ManagedAgentPlatformNodeHeartbeatPayload extends ManagedAgentPlatformOwnerPayload {
  node: ManagedAgentPlatformWorkerNodeHeartbeatInput;
}

export interface ManagedAgentPlatformNodeListPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkerNodeListInput {}

export interface ManagedAgentPlatformNodeDetailPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkerNodeDetailInput {}

export interface ManagedAgentPlatformNodeReclaimPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkerNodeLeaseReclaimInput {}

export interface ManagedAgentPlatformWorkerPullPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkerPullInput {}

export interface ManagedAgentPlatformWorkerRunStatusPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkerRunStatusInput {}

export interface ManagedAgentPlatformWorkerRunCompletePayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkerRunCompleteInput {}

export type ManagedAgentPlatformWorkerOrganizationRecord = ManagedAgentPlatformOrganizationRecord;
export type ManagedAgentPlatformWorkerNodeRecord = ManagedAgentPlatformNodeRecord;
export type ManagedAgentPlatformWorkerNodeLeaseSummary = ManagedAgentPlatformNodeLeaseSummary;
export type ManagedAgentPlatformWorkerExecutionLeaseRecord = ManagedAgentPlatformExecutionLeaseRecord;
export type ManagedAgentPlatformWorkerNodeExecutionLeaseContext = ManagedAgentPlatformNodeExecutionLeaseContext;
export type ManagedAgentPlatformWorkerNodeLeaseRecoveryAction = ManagedAgentPlatformNodeLeaseRecoveryAction;
export type ManagedAgentPlatformWorkerReclaimedLeaseContext = ManagedAgentPlatformReclaimedLeaseContext;
export type ManagedAgentPlatformWorkerNodeLeaseRecoverySummary = ManagedAgentPlatformNodeLeaseRecoverySummary;
export type ManagedAgentPlatformWorkerNodeMutationResult = ManagedAgentPlatformNodeMutationResult;
export type ManagedAgentPlatformWorkerNodeDetailResult = ManagedAgentPlatformNodeDetailResult;
export type ManagedAgentPlatformWorkerNodeLeaseRecoveryResult = ManagedAgentPlatformNodeLeaseRecoveryResult;
export type ManagedAgentPlatformWorkerAssignedRunResult = ManagedAgentPlatformWorkerAssignedRun;
export type ManagedAgentPlatformWorkerRunMutationResult = SharedWorkerRunMutationResult;

export interface ManagedAgentPlatformWorkerProbeResult {
  nodeCount: number;
}
