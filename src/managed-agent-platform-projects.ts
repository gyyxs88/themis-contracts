import type {
  ManagedAgentPlatformProjectWorkspaceBindingRecord as SharedProjectWorkspaceBindingRecord,
} from "./managed-agent-platform-shared.js";
import type { ManagedAgentPlatformOwnerPayload } from "./managed-agent-platform-worker.js";

export interface ManagedAgentPlatformProjectWorkspaceBindingListInput {
  organizationId?: string;
}

export interface ManagedAgentPlatformProjectWorkspaceBindingDetailInput {
  projectId: string;
}

export interface ManagedAgentPlatformProjectWorkspaceBindingUpsertInput {
  projectId: string;
  organizationId: string;
  displayName?: string;
  canonicalWorkspacePath?: string | null;
  preferredNodeId?: string | null;
  lastActiveWorkspacePath?: string | null;
  continuityMode: SharedProjectWorkspaceBindingRecord["continuityMode"];
}

export interface ManagedAgentPlatformProjectWorkspaceBindingListPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformProjectWorkspaceBindingListInput {}

export interface ManagedAgentPlatformProjectWorkspaceBindingDetailPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformProjectWorkspaceBindingDetailInput {}

export interface ManagedAgentPlatformProjectWorkspaceBindingUpsertPayload extends ManagedAgentPlatformOwnerPayload {
  binding: ManagedAgentPlatformProjectWorkspaceBindingUpsertInput;
}

export type ManagedAgentPlatformProjectWorkspaceBindingRecord = SharedProjectWorkspaceBindingRecord;

export interface ManagedAgentPlatformProjectWorkspaceBindingListResult {
  bindings?: ManagedAgentPlatformProjectWorkspaceBindingRecord[];
}

export interface ManagedAgentPlatformProjectWorkspaceBindingDetailResult {
  binding?: ManagedAgentPlatformProjectWorkspaceBindingRecord | null;
}

export interface ManagedAgentPlatformProjectWorkspaceBindingUpsertResult {
  binding: ManagedAgentPlatformProjectWorkspaceBindingRecord;
}
