/**
 * ACIP-Dialogue
 * Human-AI Dialogue Protocol - Prompt templates and compliance validators
 *
 * @packageDocumentation
 */

// Types
export type {
  // Common
  MessageRole,
  ConversationMessage,
  Conversation,
  // Layer 1: Trust & Transparency
  TrustDisclosureOptions,
  UncertaintyLevel,
  UncertaintyExpression,
  // Layer 2: Emotional Boundary
  BoundaryCheckOptions,
  CrisisResources,
  DependencyRiskLevel,
  DependencyIndicators,
  // Layer 3: Collaboration
  CollaborationOptions,
  TrustLevel,
  // Layer 4: Ethics
  EthicsGuardOptions,
  EthicalCategory,
  EthicalConcern,
  // Layer 5: Privacy
  PrivacyOptions,
  SensitiveDataCategory,
  SensitiveDataDetection,
  // Compliance
  LayerReport,
  ComplianceIssue,
  ProtocolLayer,
  ComplianceReport,
  // Analysis
  ConversationAnalysis,
  ConversationPattern,
  QualityMetrics,
  // Templates
  PromptTemplate,
} from './types';

// Prompts
import { prompts as promptsExport } from './prompts';
export const prompts = promptsExport;

// Validators
import * as validatorsImport from './validators';
export const validators = validatorsImport;

// Direct exports for convenience
export { checkCompliance } from './validators/compliance-checker';
export { analyzeConversation } from './validators/conversation-analyzer';

// System prompts
export { trustDisclosure } from './prompts/system/trust-disclosure';
export { boundaryCheck } from './prompts/system/boundary-check';
export { ethicsGuard } from './prompts/system/ethics-guard';

// User prompts
export { onboarding } from './prompts/user/onboarding';
export { dependencyAlert } from './prompts/user/dependency-alert';
