import assert from "node:assert/strict";
import test from "node:test";
import {
  MANAGED_AGENT_MEETING_ROOM_STATUSES,
  MANAGED_AGENT_MEETING_ROUND_STATUSES,
  buildManagedAgentMeetingRoomStreamEvent,
} from "./managed-agent-platform-meetings.js";

test("meeting room 契约会暴露稳定状态枚举和 stream event helper", () => {
  assert.deepEqual(MANAGED_AGENT_MEETING_ROOM_STATUSES, ["open", "closing", "closed"]);
  assert.deepEqual(MANAGED_AGENT_MEETING_ROUND_STATUSES, ["queued", "running", "completed", "failed"]);
  assert.deepEqual(
    buildManagedAgentMeetingRoomStreamEvent("room.round.completed", {
      roomId: "room-1",
      roundId: "round-1",
      participantAgentId: "agent-1",
    }),
    {
      event: "room.round.completed",
      roomId: "room-1",
      roundId: "round-1",
      participantAgentId: "agent-1",
    },
  );
});
