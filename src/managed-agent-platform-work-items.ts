import type {
  ManagedAgentPlatformCancelWorkItemResult,
  ManagedAgentPlatformDispatchWorkItemResult,
  ManagedAgentPlatformEscalateWaitingAgentWorkItemToHumanResult,
  ManagedAgentPlatformRespondToHumanWaitingWorkItemResult,
  ManagedAgentPlatformWorkItemDetailView,
  ManagedAgentPlatformWorkItemRecord,
} from "./managed-agent-platform-shared.js";
import type { ManagedAgentPlatformOwnerPayload } from "./managed-agent-platform-worker.js";

export interface ManagedAgentPlatformWorkItemListInput {
  agentId?: string;
}

export interface ManagedAgentPlatformWorkItemDispatchInput {
  targetAgentId: string;
  sourceType: ManagedAgentPlatformWorkItemRecord["sourceType"];
  dispatchReason?: string;
  goal: string;
  priority?: ManagedAgentPlatformWorkItemRecord["priority"];
  projectId?: string | null;
}

export interface ManagedAgentPlatformWorkItemDetailInput {
  workItemId: string;
}

export interface ManagedAgentPlatformWorkItemRespondInput {
  workItemId: string;
  decision?: "approve" | "deny";
  inputText?: string;
  payload?: unknown;
  artifactRefs?: string[];
}

export interface ManagedAgentPlatformWorkItemEscalateInput {
  workItemId: string;
  inputText?: string;
}

export interface ManagedAgentPlatformWorkItemResponsePayload {
  decision?: "approve" | "deny";
  inputText?: string;
  payload?: unknown;
  artifactRefs?: string[];
}

export interface ManagedAgentPlatformWorkItemEscalationPayload {
  inputText?: string;
}

export interface ManagedAgentPlatformWorkItemListPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkItemListInput {}

export interface ManagedAgentPlatformWorkItemDispatchPayload extends ManagedAgentPlatformOwnerPayload {
  workItem: ManagedAgentPlatformWorkItemDispatchInput;
}

export interface ManagedAgentPlatformWorkItemDetailPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkItemDetailInput {}

export interface ManagedAgentPlatformWorkItemCancelPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformWorkItemDetailInput {}

export interface ManagedAgentPlatformWorkItemRespondPayload extends ManagedAgentPlatformOwnerPayload {
  workItemId: string;
  response: ManagedAgentPlatformWorkItemResponsePayload;
}

export interface ManagedAgentPlatformWorkItemEscalatePayload extends ManagedAgentPlatformOwnerPayload {
  workItemId: string;
  escalation?: ManagedAgentPlatformWorkItemEscalationPayload;
}

export interface ManagedAgentPlatformWorkItemListResult {
  workItems?: ManagedAgentPlatformWorkItemRecord[];
}

export type ManagedAgentPlatformWorkItemDetailResult = ManagedAgentPlatformWorkItemDetailView;
export type ManagedAgentPlatformWorkItemDispatchResult = ManagedAgentPlatformDispatchWorkItemResult;
export type ManagedAgentPlatformWorkItemCancelResult = ManagedAgentPlatformCancelWorkItemResult;
export type ManagedAgentPlatformWorkItemRespondResult = ManagedAgentPlatformRespondToHumanWaitingWorkItemResult;
export type ManagedAgentPlatformWorkItemEscalateResult =
  ManagedAgentPlatformEscalateWaitingAgentWorkItemToHumanResult;
