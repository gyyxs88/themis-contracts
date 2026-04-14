import type { ManagedAgentPlatformOwnerPayload } from "./managed-agent-platform-worker.js";

export type ManagedAgentPlatformOncallSeverity = "error" | "warning" | "info";
export type ManagedAgentPlatformOncallRecommendationCategory = "worker_fleet" | "waiting_queue" | "runs" | "agents";

export interface ManagedAgentPlatformOncallSummaryInput {
  organizationId?: string;
  limit?: number;
}

export interface ManagedAgentPlatformOncallSummaryPayload
  extends ManagedAgentPlatformOwnerPayload, ManagedAgentPlatformOncallSummaryInput {}

export interface ManagedAgentPlatformOncallDiagnosis {
  id: string;
  severity: ManagedAgentPlatformOncallSeverity;
  title: string;
  summary: string;
}

export interface ManagedAgentPlatformOncallCounts {
  nodeTotal: number;
  nodeErrorCount: number;
  nodeWarningCount: number;
  waitingAttentionCount: number;
  waitingHumanCount: number;
  runWaitingActionCount: number;
  runFailedCount: number;
  pausedAgentCount: number;
}

export interface ManagedAgentPlatformOncallRecommendation {
  recommendationId: string;
  category: ManagedAgentPlatformOncallRecommendationCategory;
  severity: ManagedAgentPlatformOncallSeverity;
  title: string;
  summary: string;
  recommendedAction: string;
  subjectId?: string;
}

export interface ManagedAgentPlatformOncallSummaryResult {
  generatedAt: string;
  ownerPrincipalId: string;
  organizationId?: string | null;
  counts: ManagedAgentPlatformOncallCounts;
  primaryDiagnosis: ManagedAgentPlatformOncallDiagnosis;
  recommendedNextSteps: string[];
  recommendations: ManagedAgentPlatformOncallRecommendation[];
}
