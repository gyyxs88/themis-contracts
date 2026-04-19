import type {
  ManagedAgentMeetingDiscussionMode,
  ManagedAgentMeetingEntryMode,
  ManagedAgentPlatformMeetingArtifactRefRecord,
  ManagedAgentPlatformMeetingMessageRecord,
  ManagedAgentPlatformMeetingParticipantRecord,
  ManagedAgentPlatformMeetingResolutionRecord,
  ManagedAgentPlatformMeetingRoomRecord,
  ManagedAgentPlatformMeetingRoundRecord,
} from "./managed-agent-platform-shared.js";
import type { ManagedAgentPlatformOwnerPayload } from "./managed-agent-platform-worker.js";

export const MANAGED_AGENT_MEETING_ROOM_STATUSES = ["open", "closing", "closed", "terminated"] as const;
export const MANAGED_AGENT_MEETING_ROUND_STATUSES = ["queued", "running", "completed", "failed"] as const;

export interface ManagedAgentPlatformMeetingRoomCreateInput {
  title: string;
  goal: string;
  discussionMode?: ManagedAgentMeetingDiscussionMode;
  operatorPrincipalId: string;
  organizationId: string;
  participants?: Array<{
    agentId: string;
    entryMode?: ManagedAgentMeetingEntryMode;
    selectedArtifactRefs?: Array<{
      refType: ManagedAgentPlatformMeetingArtifactRefRecord["refType"];
      refId: string;
      snapshotJson?: unknown;
    }>;
  }>;
}

export interface ManagedAgentPlatformMeetingRoomMessageCreateInput {
  roomId: string;
  content: string;
  operatorPrincipalId: string;
  audience?: ManagedAgentPlatformMeetingMessageRecord["audience"];
  targetParticipantIds?: string[];
}

export interface ManagedAgentPlatformMeetingRoomAppendReplyInput {
  roomId: string;
  roundId: string;
  participantId: string;
  content: string;
}

export interface ManagedAgentPlatformMeetingRoomAppendFailureInput {
  roomId: string;
  roundId: string;
  participantId: string;
  failureMessage: string;
}

export interface ManagedAgentPlatformMeetingRoomCreateResolutionInput {
  roomId: string;
  sourceMessageIds: string[];
  title: string;
  summary: string;
}

export interface ManagedAgentPlatformMeetingRoomPromoteResolutionInput {
  roomId: string;
  resolutionId: string;
  targetAgentId: string;
  dispatchReason?: string;
  goal?: string;
}

export interface ManagedAgentPlatformMeetingRoomCloseInput {
  roomId: string;
  closingSummary: string;
}

export interface ManagedAgentPlatformMeetingRoomTerminateInput {
  roomId: string;
  operatorPrincipalId: string;
  terminationReason: string;
}

export interface ManagedAgentPlatformMeetingRoomListPayload extends ManagedAgentPlatformOwnerPayload {
  status?: ManagedAgentPlatformMeetingRoomRecord["status"];
}

export interface ManagedAgentPlatformMeetingRoomCreatePayload extends ManagedAgentPlatformOwnerPayload {
  room: ManagedAgentPlatformMeetingRoomCreateInput;
}

export interface ManagedAgentPlatformMeetingRoomDetailPayload extends ManagedAgentPlatformOwnerPayload {
  roomId: string;
}

export interface ManagedAgentPlatformMeetingRoomParticipantsAddPayload extends ManagedAgentPlatformOwnerPayload {
  roomId: string;
  participants: ManagedAgentPlatformMeetingRoomCreateInput["participants"];
}

export interface ManagedAgentPlatformMeetingRoomMessageCreatePayload extends ManagedAgentPlatformOwnerPayload {
  message: ManagedAgentPlatformMeetingRoomMessageCreateInput;
}

export interface ManagedAgentPlatformMeetingRoomAppendReplyPayload extends ManagedAgentPlatformOwnerPayload {
  reply: ManagedAgentPlatformMeetingRoomAppendReplyInput;
}

export interface ManagedAgentPlatformMeetingRoomAppendFailurePayload extends ManagedAgentPlatformOwnerPayload {
  failure: ManagedAgentPlatformMeetingRoomAppendFailureInput;
}

export interface ManagedAgentPlatformMeetingRoomCreateResolutionPayload extends ManagedAgentPlatformOwnerPayload {
  resolution: ManagedAgentPlatformMeetingRoomCreateResolutionInput;
}

export interface ManagedAgentPlatformMeetingRoomPromoteResolutionPayload extends ManagedAgentPlatformOwnerPayload {
  resolution: ManagedAgentPlatformMeetingRoomPromoteResolutionInput;
}

export interface ManagedAgentPlatformMeetingRoomClosePayload extends ManagedAgentPlatformOwnerPayload {
  room: ManagedAgentPlatformMeetingRoomCloseInput;
}

export interface ManagedAgentPlatformMeetingRoomTerminatePayload extends ManagedAgentPlatformOwnerPayload {
  termination: ManagedAgentPlatformMeetingRoomTerminateInput;
}

export interface ManagedAgentPlatformMeetingRoomDetailResult {
  room: ManagedAgentPlatformMeetingRoomRecord;
  participants: ManagedAgentPlatformMeetingParticipantRecord[];
  rounds: ManagedAgentPlatformMeetingRoundRecord[];
  messages: ManagedAgentPlatformMeetingMessageRecord[];
  resolutions: ManagedAgentPlatformMeetingResolutionRecord[];
  artifactRefs: ManagedAgentPlatformMeetingArtifactRefRecord[];
}

export interface ManagedAgentPlatformMeetingRoomListResult {
  rooms: ManagedAgentPlatformMeetingRoomRecord[];
}

export type ManagedAgentPlatformMeetingRoomCreateResult = ManagedAgentPlatformMeetingRoomDetailResult;
export type ManagedAgentPlatformMeetingRoomParticipantsAddResult = ManagedAgentPlatformMeetingRoomDetailResult;
export type ManagedAgentPlatformMeetingRoomCreateResolutionResult = ManagedAgentPlatformMeetingRoomDetailResult;
export type ManagedAgentPlatformMeetingRoomPromoteResolutionResult = ManagedAgentPlatformMeetingRoomDetailResult;
export type ManagedAgentPlatformMeetingRoomCloseResult = ManagedAgentPlatformMeetingRoomDetailResult;
export type ManagedAgentPlatformMeetingRoomTerminateResult = ManagedAgentPlatformMeetingRoomDetailResult;

export interface ManagedAgentPlatformMeetingRoomMessageCreateResult {
  room: ManagedAgentPlatformMeetingRoomRecord;
  message: ManagedAgentPlatformMeetingMessageRecord;
  round: ManagedAgentPlatformMeetingRoundRecord;
  targetParticipants: ManagedAgentPlatformMeetingParticipantRecord[];
}

export interface ManagedAgentPlatformMeetingRoomAppendReplyResult {
  room: ManagedAgentPlatformMeetingRoomRecord;
  round: ManagedAgentPlatformMeetingRoundRecord;
  message: ManagedAgentPlatformMeetingMessageRecord;
}

export interface ManagedAgentPlatformMeetingRoomStreamEventBase {
  roomId: string;
}

export type ManagedAgentPlatformMeetingRoomStreamEvent =
  | ({ event: "room.message.created" } & ManagedAgentPlatformMeetingRoomStreamEventBase & {
      messageId: string;
      roundId: string;
    })
  | ({ event: "room.round.queued" } & ManagedAgentPlatformMeetingRoomStreamEventBase & {
      roundId: string;
    })
  | ({ event: "room.round.started" } & ManagedAgentPlatformMeetingRoomStreamEventBase & {
      roundId: string;
      participantAgentId: string;
    })
  | ({ event: "room.agent.reply" } & ManagedAgentPlatformMeetingRoomStreamEventBase & {
      roundId: string;
      participantAgentId: string;
      messageId: string;
      content: string;
      audience: ManagedAgentPlatformMeetingMessageRecord["audience"];
    })
  | ({ event: "room.agent.failed" } & ManagedAgentPlatformMeetingRoomStreamEventBase & {
      roundId: string;
      participantAgentId: string;
      failureMessage: string;
    })
  | ({ event: "room.round.completed" } & ManagedAgentPlatformMeetingRoomStreamEventBase & {
      roundId: string;
      participantAgentId: string;
    });

export function buildManagedAgentMeetingRoomStreamEvent<
  T extends ManagedAgentPlatformMeetingRoomStreamEvent["event"],
>(
  event: T,
  payload: Omit<Extract<ManagedAgentPlatformMeetingRoomStreamEvent, { event: T }>, "event">,
): Extract<ManagedAgentPlatformMeetingRoomStreamEvent, { event: T }> {
  return {
    event,
    ...payload,
  } as Extract<ManagedAgentPlatformMeetingRoomStreamEvent, { event: T }>;
}
