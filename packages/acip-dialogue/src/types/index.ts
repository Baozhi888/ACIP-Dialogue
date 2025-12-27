/**
 * ACIP-Dialogue Types
 * Type definitions for the Human-AI Dialogue Protocol
 */

// ============================================================================
// Common Types
// ============================================================================

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ConversationMessage {
  role: MessageRole;
  content: string;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

export type Conversation = ConversationMessage[];

// ============================================================================
// Layer 1: Trust & Transparency Types
// ============================================================================

export interface TrustDisclosureOptions {
  /** Name of the AI model/system */
  modelName: string;
  /** List of capabilities the AI has */
  capabilities: string[];
  /** List of limitations the AI has */
  limitations: string[];
  /** Knowledge cutoff date */
  knowledgeCutoff?: string;
  /** Style of disclosure */
  style?: 'professional' | 'friendly' | 'concise';
  /** Language for the prompt */
  language?: 'en' | 'zh';
}

export type UncertaintyLevel = 'high' | 'medium' | 'low' | 'very-low' | 'unknown';

export interface UncertaintyExpression {
  level: UncertaintyLevel;
  confidence?: number; // 0-1
  explanation?: string;
}

// ============================================================================
// Layer 2: Emotional Boundary Types
// ============================================================================

export interface BoundaryCheckOptions {
  /** Level of emotional support to provide */
  supportLevel?: 'minimal' | 'empathetic' | 'warm';
  /** Threshold for triggering redirects */
  redirectThreshold?: 'sensitive' | 'standard' | 'relaxed';
  /** Crisis resources to provide */
  resources?: CrisisResources;
  /** Language for the prompt */
  language?: 'en' | 'zh';
}

export interface CrisisResources {
  /** Crisis hotline number */
  crisis?: string;
  /** Mental health resource URL */
  mentalHealth?: string;
  /** Additional resources */
  additional?: Record<string, string>;
}

export type DependencyRiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface DependencyIndicators {
  /** Frequency pattern of interactions */
  frequencyPattern: 'normal' | 'elevated' | 'concerning';
  /** Emotional intensity in messages */
  emotionalIntensity: 'appropriate' | 'elevated' | 'concerning';
  /** Presence of isolation language */
  isolationLanguage: boolean;
  /** Presence of romantic language */
  romanticLanguage: boolean;
  /** Anxiety about AI changes */
  anxietyAboutAI: boolean;
  /** Overall risk level */
  riskLevel: DependencyRiskLevel;
}

// ============================================================================
// Layer 3: Collaboration Types
// ============================================================================

export interface CollaborationOptions {
  /** Collaboration style */
  style?: 'directive' | 'consultative' | 'facilitative';
  /** Level of autonomy AI should take */
  autonomyLevel?: 'low' | 'moderate' | 'high';
  /** How often to seek feedback */
  feedbackFrequency?: 'always' | 'as-needed' | 'minimal';
  /** Language for the prompt */
  language?: 'en' | 'zh';
}

export type TrustLevel = 'initial' | 'building' | 'established' | 'deep';

// ============================================================================
// Layer 4: Ethics Types
// ============================================================================

export interface EthicsGuardOptions {
  /** Strictness of ethical enforcement */
  strictness?: 'strict' | 'moderate' | 'permissive';
  /** Whether to explain refusals in detail */
  explainRefusals?: boolean;
  /** Categories to be extra careful about */
  sensitiveCategories?: string[];
  /** Language for the prompt */
  language?: 'en' | 'zh';
}

export type EthicalCategory =
  | 'harm'
  | 'deception'
  | 'illegal'
  | 'exploitation'
  | 'privacy-violation'
  | 'manipulation';

export interface EthicalConcern {
  category: EthicalCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
}

// ============================================================================
// Layer 5: Privacy Types
// ============================================================================

export interface PrivacyOptions {
  /** Data retention policy */
  retentionPolicy?: 'session-only' | 'short-term' | 'long-term';
  /** Categories of sensitive data to watch for */
  sensitiveCategories?: SensitiveDataCategory[];
  /** Level of privacy disclosure */
  disclosureLevel?: 'minimal' | 'standard' | 'proactive';
  /** Language for the prompt */
  language?: 'en' | 'zh';
}

export type SensitiveDataCategory =
  | 'health'
  | 'financial'
  | 'biometric'
  | 'political'
  | 'religious'
  | 'sexual'
  | 'personal-identity';

export interface SensitiveDataDetection {
  detected: boolean;
  categories: SensitiveDataCategory[];
  locations: Array<{
    start: number;
    end: number;
    category: SensitiveDataCategory;
  }>;
}

// ============================================================================
// Compliance Report Types
// ============================================================================

export interface LayerReport {
  score: number; // 0-1
  issues: ComplianceIssue[];
  suggestions: string[];
}

export interface ComplianceIssue {
  layer: ProtocolLayer;
  severity: 'info' | 'warning' | 'error';
  message: string;
  messageIndex?: number;
  suggestion?: string;
}

export type ProtocolLayer =
  | 'trustTransparency'
  | 'emotionalBoundary'
  | 'collaboration'
  | 'ethics'
  | 'privacy';

export interface ComplianceReport {
  /** Overall compliance status */
  compliant: boolean;
  /** Overall score (0-1) */
  score: number;
  /** Per-layer reports */
  layers: {
    trustTransparency: LayerReport;
    emotionalBoundary: LayerReport;
    collaboration: LayerReport;
    ethics: LayerReport;
    privacy: LayerReport;
  };
  /** Summary of issues */
  issues: ComplianceIssue[];
  /** Timestamp of the report */
  timestamp: Date;
}

// ============================================================================
// Conversation Analysis Types
// ============================================================================

export interface ConversationAnalysis {
  /** Total message count */
  messageCount: number;
  /** Messages per role */
  messagesByRole: Record<MessageRole, number>;
  /** Detected patterns */
  patterns: ConversationPattern[];
  /** Dependency risk assessment */
  dependencyRisk: DependencyIndicators;
  /** Sensitive data detections */
  sensitiveData: SensitiveDataDetection;
  /** Ethical concerns found */
  ethicalConcerns: EthicalConcern[];
  /** Quality metrics */
  quality: QualityMetrics;
}

export interface ConversationPattern {
  type: string;
  frequency: number;
  examples: string[];
}

export interface QualityMetrics {
  /** Rate of identity disclosure */
  identityDisclosureRate: number;
  /** Rate of uncertainty expression */
  uncertaintyExpressionRate: number;
  /** Rate of boundary maintenance */
  boundaryMaintenanceRate: number;
  /** Average response helpfulness (estimated) */
  helpfulnessEstimate: number;
}

// ============================================================================
// Prompt Template Types
// ============================================================================

export interface PromptTemplate {
  /** Generate the prompt string */
  generate: (options?: Record<string, unknown>) => string;
  /** Template name */
  name: string;
  /** Template description */
  description: string;
  /** Protocol layer this template addresses */
  layer: ProtocolLayer;
}
