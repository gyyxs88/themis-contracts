import assert from "node:assert/strict";
import test from "node:test";
import type {
  ManagedAgentPlatformWorkerNodeDetailResult,
  ManagedAgentPlatformWorkerNodeLeaseRecoveryResult,
  ManagedAgentPlatformWorkerRunMutationResult,
} from "./managed-agent-platform-worker.js";

test("worker 契约会固定 node detail 的 lease summary 与 execution lease 视图 shape", () => {
  const detail: ManagedAgentPlatformWorkerNodeDetailResult = {
    organization: {
      organizationId: "org-platform",
      ownerPrincipalId: "principal-owner",
      displayName: "Platform Team",
      slug: "platform-team",
      createdAt: "2026-04-14T10:00:00.000Z",
      updatedAt: "2026-04-14T10:00:00.000Z",
    },
    node: {
      nodeId: "node-a",
      organizationId: "org-platform",
      displayName: "Worker A",
      status: "online",
      slotCapacity: 2,
      slotAvailable: 1,
      createdAt: "2026-04-14T10:00:00.000Z",
      updatedAt: "2026-04-14T10:00:00.000Z",
    },
    leaseSummary: {
      totalCount: 1,
      activeCount: 1,
      expiredCount: 0,
      releasedCount: 0,
      revokedCount: 0,
    },
    activeExecutionLeases: [{
      lease: {
        leaseId: "lease-a",
        runId: "run-a",
        nodeId: "node-a",
        workItemId: "work-item-a",
        targetAgentId: "agent-a",
        status: "active",
        createdAt: "2026-04-14T10:01:00.000Z",
        updatedAt: "2026-04-14T10:01:00.000Z",
      },
      run: {
        runId: "run-a",
        organizationId: "org-platform",
        workItemId: "work-item-a",
        nodeId: "node-a",
        status: "running",
        createdAt: "2026-04-14T10:01:00.000Z",
        updatedAt: "2026-04-14T10:01:00.000Z",
      },
      workItem: {
        workItemId: "work-item-a",
        organizationId: "org-platform",
        targetAgentId: "agent-a",
        sourceType: "human",
        goal: "finish task",
        status: "running",
        priority: "normal",
        createdAt: "2026-04-14T10:01:00.000Z",
        updatedAt: "2026-04-14T10:01:00.000Z",
      },
      targetAgent: {
        agentId: "agent-a",
        organizationId: "org-platform",
        displayName: "Agent A",
        departmentRole: "Platform",
        status: "active",
        createdAt: "2026-04-14T10:01:00.000Z",
        updatedAt: "2026-04-14T10:01:00.000Z",
      },
    }],
    recentExecutionLeases: [],
  };

  assert.equal(detail.leaseSummary.activeCount, 1);
  assert.equal(detail.activeExecutionLeases[0]?.lease.nodeId, "node-a");
  assert.equal(detail.activeExecutionLeases[0]?.targetAgent?.agentId, "agent-a");
});

test("worker 契约会固定 node reclaim 的 summary 与 reclaimed lease shape", () => {
  const result: ManagedAgentPlatformWorkerNodeLeaseRecoveryResult = {
    organization: {
      organizationId: "org-platform",
      ownerPrincipalId: "principal-owner",
      displayName: "Platform Team",
      slug: "platform-team",
      createdAt: "2026-04-14T10:00:00.000Z",
      updatedAt: "2026-04-14T10:00:00.000Z",
    },
    node: {
      nodeId: "node-a",
      organizationId: "org-platform",
      displayName: "Worker A",
      status: "offline",
      slotCapacity: 2,
      slotAvailable: 0,
      createdAt: "2026-04-14T10:00:00.000Z",
      updatedAt: "2026-04-14T10:02:00.000Z",
    },
    summary: {
      activeLeaseCount: 1,
      reclaimedRunCount: 1,
      requeuedWorkItemCount: 1,
    },
    reclaimedLeases: [{
      lease: {
        leaseId: "lease-a",
        runId: "run-a",
        nodeId: "node-a",
        workItemId: "work-item-a",
        targetAgentId: "agent-a",
        status: "revoked",
        createdAt: "2026-04-14T10:01:00.000Z",
        updatedAt: "2026-04-14T10:02:00.000Z",
      },
      run: {
        runId: "run-a",
        organizationId: "org-platform",
        workItemId: "work-item-a",
        nodeId: "node-a",
        status: "failed",
        createdAt: "2026-04-14T10:01:00.000Z",
        updatedAt: "2026-04-14T10:02:00.000Z",
      },
      workItem: {
        workItemId: "work-item-a",
        organizationId: "org-platform",
        targetAgentId: "agent-a",
        sourceType: "human",
        goal: "finish task",
        status: "queued",
        priority: "normal",
        createdAt: "2026-04-14T10:01:00.000Z",
        updatedAt: "2026-04-14T10:02:00.000Z",
      },
      recoveryAction: "requeued",
    }],
  };

  assert.equal(result.summary.reclaimedRunCount, 1);
  assert.equal(result.reclaimedLeases[0]?.recoveryAction, "requeued");
  assert.equal(result.reclaimedLeases[0]?.workItem?.status, "queued");
});

test("worker 契约会固定 run update / complete 的 mutation result shape", () => {
  const result: ManagedAgentPlatformWorkerRunMutationResult = {
    organization: {
      organizationId: "org-platform",
      ownerPrincipalId: "principal-owner",
      displayName: "Platform Team",
      slug: "platform-team",
      createdAt: "2026-04-14T10:00:00.000Z",
      updatedAt: "2026-04-14T10:00:00.000Z",
    },
    node: {
      nodeId: "node-a",
      organizationId: "org-platform",
      displayName: "Worker A",
      status: "online",
      slotCapacity: 2,
      slotAvailable: 1,
      createdAt: "2026-04-14T10:00:00.000Z",
      updatedAt: "2026-04-14T10:02:00.000Z",
    },
    targetAgent: {
      agentId: "agent-a",
      organizationId: "org-platform",
      displayName: "Agent A",
      departmentRole: "Platform",
      status: "active",
      createdAt: "2026-04-14T10:01:00.000Z",
      updatedAt: "2026-04-14T10:01:00.000Z",
    },
    workItem: {
      workItemId: "work-item-a",
      organizationId: "org-platform",
      targetAgentId: "agent-a",
      sourceType: "human",
      goal: "finish task",
      status: "completed",
      priority: "normal",
      createdAt: "2026-04-14T10:01:00.000Z",
      updatedAt: "2026-04-14T10:03:00.000Z",
    },
    run: {
      runId: "run-a",
      organizationId: "org-platform",
      workItemId: "work-item-a",
      nodeId: "node-a",
      status: "completed",
      createdAt: "2026-04-14T10:01:00.000Z",
      updatedAt: "2026-04-14T10:03:00.000Z",
    },
    executionLease: {
      leaseId: "lease-a",
      runId: "run-a",
      nodeId: "node-a",
      workItemId: "work-item-a",
      targetAgentId: "agent-a",
      leaseToken: "lease-token-a",
      status: "released",
      createdAt: "2026-04-14T10:01:00.000Z",
      updatedAt: "2026-04-14T10:03:00.000Z",
    },
  };

  assert.equal(result.run.status, "completed");
  assert.equal(result.workItem.status, "completed");
  assert.equal(result.executionLease.status, "released");
});
