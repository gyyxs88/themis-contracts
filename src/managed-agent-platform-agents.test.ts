import assert from "node:assert/strict";
import test from "node:test";
import type {
  ManagedAgentPlatformAgentDetailResult,
  ManagedAgentPlatformAgentExecutionBoundaryUpdateInput,
} from "./managed-agent-platform-agents.js";
import type { ManagedAgentPlatformWorkerAssignedRunResult } from "./managed-agent-platform-worker.js";

test("agent 契约会固定 detail 里的 employee dossier shape", () => {
  const detail: ManagedAgentPlatformAgentDetailResult = {
    organization: {
      organizationId: "org-platform",
      ownerPrincipalId: "principal-owner",
      displayName: "Platform Team",
      slug: "platform-team",
      createdAt: "2026-04-16T08:00:00.000Z",
      updatedAt: "2026-04-16T08:00:00.000Z",
    },
    principal: {
      principalId: "principal-agent-a",
      organizationId: "org-platform",
      displayName: "平台工程师",
      createdAt: "2026-04-16T08:00:00.000Z",
      updatedAt: "2026-04-16T08:00:00.000Z",
    },
    agent: {
      agentId: "agent-a",
      organizationId: "org-platform",
      principalId: "principal-agent-a",
      displayName: "平台工程师",
      departmentRole: "平台工程",
      mission: "负责平台 API 治理。",
      status: "active",
      agentCard: {
        employeeCode: "EMP-A",
        title: "平台工程",
        domainTags: ["平台"],
        skillTags: ["治理"],
        responsibilitySummary: "负责平台 API 治理。",
        allowedScopes: ["平台控制面"],
        forbiddenScopes: [],
        representativeProjects: ["平台控制面"],
        createdAt: "2026-04-16T08:00:00.000Z",
        updatedAt: "2026-04-16T08:00:00.000Z",
      },
      createdAt: "2026-04-16T08:00:00.000Z",
      updatedAt: "2026-04-16T08:00:00.000Z",
    },
    workspacePolicy: {
      agentId: "agent-a",
      canonicalWorkspacePath: "/srv/platform",
      additionalWorkspacePaths: [],
      createdAt: "2026-04-16T08:00:00.000Z",
      updatedAt: "2026-04-16T08:00:00.000Z",
    },
    runtimeProfile: {
      agentId: "agent-a",
      provider: "openai",
      model: "gpt-5.4-mini",
      reasoning: "high",
      createdAt: "2026-04-16T08:00:00.000Z",
      updatedAt: "2026-04-16T08:00:00.000Z",
    },
    authAccounts: [],
    thirdPartyProviders: [],
  };

  assert.equal(detail.agent.agentCard?.title, "平台工程");
  assert.equal(detail.agent.agentCard?.responsibilitySummary, "负责平台 API 治理。");
  assert.deepEqual(detail.agent.agentCard?.allowedScopes, ["平台控制面"]);
  assert.equal(detail.runtimeProfile.reasoning, "high");
});

test("agent runtime 契约只表达 secret 引用，不表达 secret 明文", () => {
  const boundaryInput: ManagedAgentPlatformAgentExecutionBoundaryUpdateInput = {
    agentId: "agent-a",
    runtimeProfile: {
      model: "gpt-5.5",
      secretEnvRefs: [{
        envName: "CLOUDFLARE_API_TOKEN",
        secretRef: "cloudflare-readonly-token",
        required: true,
      }],
    },
  };
  const assignedRun = {
    executionContract: {
      secretEnvRefs: boundaryInput.runtimeProfile?.secretEnvRefs,
    },
  } as ManagedAgentPlatformWorkerAssignedRunResult;

  assert.deepEqual(assignedRun.executionContract.secretEnvRefs, [{
    envName: "CLOUDFLARE_API_TOKEN",
    secretRef: "cloudflare-readonly-token",
    required: true,
  }]);
  assert.equal(
    Object.prototype.hasOwnProperty.call(assignedRun.executionContract.secretEnvRefs?.[0] ?? {}, "value"),
    false,
  );
});
