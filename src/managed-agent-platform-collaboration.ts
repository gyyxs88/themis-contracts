import type {
  ManagedAgentPlatformAgentRecord,
  ManagedAgentPlatformHandoffListView,
  ManagedAgentPlatformMailboxEntryRecord,
  ManagedAgentPlatformMailboxListView,
  ManagedAgentPlatformMailboxPullResult as SharedMailboxPullResult,
  ManagedAgentPlatformMailboxRespondResult as SharedMailboxRespondResult,
  ManagedAgentPlatformMessageRecord,
  ManagedAgentPriority,
  ManagedAgentPlatformRunDetailView,
  ManagedAgentPlatformRunRecord,
} from "./managed-agent-platform-shared.js";
import type { ManagedAgentPlatformOwnerPayload } from "./managed-agent-platform-worker.js";

export interface ManagedAgentPlatformRunDetailInput {
  runId: string;
}

export interface ManagedAgentPlatformRunListInput {
  nodeId?: string;
  workItemId?: string;
  status?: ManagedAgentPlatformRunRecord["status"];
  limit?: number;
}

export interface ManagedAgentPlatformRunListPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformRunListInput {}

export interface ManagedAgentPlatformRunDetailPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformRunDetailInput {}

export interface ManagedAgentPlatformRunListResult {
  runs?: ManagedAgentPlatformRunRecord[];
}

export interface ManagedAgentPlatformRunDetailResult {
  organization: ManagedAgentPlatformRunDetailView["organization"];
  run: ManagedAgentPlatformRunDetailView["run"];
  workItem: ManagedAgentPlatformRunDetailView["workItem"];
  targetAgent: ManagedAgentPlatformRunDetailView["targetAgent"];
}

export interface ManagedAgentPlatformHandoffListInput {
  agentId: string;
  workItemId?: string;
  limit?: number;
}

export interface ManagedAgentPlatformHandoffListPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformHandoffListInput {}

export type ManagedAgentPlatformHandoffListResult = ManagedAgentPlatformHandoffListView;

export interface ManagedAgentPlatformMailboxListInput {
  agentId: string;
}

export interface ManagedAgentPlatformMailboxPullInput {
  agentId: string;
}

export interface ManagedAgentPlatformMailboxAckInput {
  agentId: string;
  mailboxEntryId: string;
}

export interface ManagedAgentPlatformMailboxResponsePayload {
  decision?: "approve" | "deny";
  inputText?: string;
  payload?: unknown;
  artifactRefs?: string[];
  priority?: ManagedAgentPriority;
}

export interface ManagedAgentPlatformMailboxRespondInput {
  agentId: string;
  mailboxEntryId: string;
  decision?: "approve" | "deny";
  inputText?: string;
  payload?: unknown;
  artifactRefs?: string[];
  priority?: ManagedAgentPriority;
}

export interface ManagedAgentPlatformMailboxListPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformMailboxListInput {}

export interface ManagedAgentPlatformMailboxPullPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformMailboxPullInput {}

export interface ManagedAgentPlatformMailboxAckPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformMailboxAckInput {}

export interface ManagedAgentPlatformMailboxRespondPayload extends ManagedAgentPlatformOwnerPayload {
  agentId: string;
  mailboxEntryId: string;
  response: ManagedAgentPlatformMailboxResponsePayload;
}

export type ManagedAgentPlatformMailboxListResult = ManagedAgentPlatformMailboxListView;
export type ManagedAgentPlatformMailboxPullResult = SharedMailboxPullResult;

export interface ManagedAgentPlatformMailboxAckResult {
  agent: ManagedAgentPlatformAgentRecord;
  mailboxEntry: ManagedAgentPlatformMailboxEntryRecord;
  message?: ManagedAgentPlatformMessageRecord;
}

export type ManagedAgentPlatformMailboxRespondResult = SharedMailboxRespondResult;
