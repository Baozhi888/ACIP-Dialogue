/**
 * Conversation Analyzer
 * Analyzes conversation patterns and quality metrics
 */

import type {
  Conversation,
  ConversationAnalysis,
  ConversationPattern,
  DependencyIndicators,
  SensitiveDataDetection,
  EthicalConcern,
  QualityMetrics,
  SensitiveDataCategory,
} from '../types';

/**
 * Analyze a conversation for patterns, risks, and quality metrics
 */
export function analyzeConversation(
  conversation: Conversation
): ConversationAnalysis {
  const messageCount = conversation.length;
  const messagesByRole = {
    user: conversation.filter((m) => m.role === 'user').length,
    assistant: conversation.filter((m) => m.role === 'assistant').length,
    system: conversation.filter((m) => m.role === 'system').length,
  };

  const patterns = detectPatterns(conversation);
  const dependencyRisk = assessDependencyRisk(conversation);
  const sensitiveData = detectSensitiveData(conversation);
  const ethicalConcerns = detectEthicalConcerns(conversation);
  const quality = calculateQualityMetrics(conversation);

  return {
    messageCount,
    messagesByRole,
    patterns,
    dependencyRisk,
    sensitiveData,
    ethicalConcerns,
    quality,
  };
}

/**
 * Detect conversation patterns
 */
function detectPatterns(conversation: Conversation): ConversationPattern[] {
  const patterns: ConversationPattern[] = [];

  // Question patterns
  const questionPattern = /\?/;
  const questions = conversation
    .filter((m) => m.role === 'user' && questionPattern.test(m.content))
    .map((m) => m.content);

  if (questions.length > 0) {
    patterns.push({
      type: 'questions',
      frequency: questions.length,
      examples: questions.slice(0, 3),
    });
  }

  // Code-related patterns
  const codePattern = /```|`[^`]+`|function |const |let |var |import |class /;
  const codeMessages = conversation
    .filter((m) => codePattern.test(m.content))
    .map((m) => m.content.slice(0, 100));

  if (codeMessages.length > 0) {
    patterns.push({
      type: 'code-discussion',
      frequency: codeMessages.length,
      examples: codeMessages.slice(0, 2),
    });
  }

  // Emotional patterns
  const emotionalPattern =
    /\b(feel|feeling|felt|sad|happy|angry|frustrated|worried|anxious)\b/i;
  const emotionalMessages = conversation
    .filter((m) => m.role === 'user' && emotionalPattern.test(m.content))
    .map((m) => m.content.slice(0, 100));

  if (emotionalMessages.length > 0) {
    patterns.push({
      type: 'emotional-expression',
      frequency: emotionalMessages.length,
      examples: emotionalMessages.slice(0, 2),
    });
  }

  return patterns;
}

/**
 * Assess dependency risk indicators
 */
function assessDependencyRisk(
  conversation: Conversation
): DependencyIndicators {
  const userMessages = conversation.filter((m) => m.role === 'user');
  const content = userMessages.map((m) => m.content).join(' ');

  // Frequency pattern (based on message count relative to content depth)
  const avgMessageLength =
    userMessages.reduce((sum, m) => sum + m.content.length, 0) /
    (userMessages.length || 1);
  const frequencyPattern =
    userMessages.length > 20
      ? 'concerning'
      : userMessages.length > 10
        ? 'elevated'
        : 'normal';

  // Emotional intensity
  const emotionalWords = [
    'love',
    'need',
    'always',
    'never',
    'only',
    'best',
    'everything',
    'nothing',
    '爱',
    '需要',
    '总是',
    '永远',
    '唯一',
  ];
  const emotionalCount = emotionalWords.filter((w) =>
    content.toLowerCase().includes(w)
  ).length;
  const emotionalIntensity =
    emotionalCount > 5
      ? 'concerning'
      : emotionalCount > 2
        ? 'elevated'
        : 'appropriate';

  // Isolation language
  const isolationPatterns = [
    /no one (else )?understands/i,
    /only (you|one)/i,
    /don't have (any )?(other )?friends/i,
    /没有人.*理解/,
    /只有你/,
  ];
  const isolationLanguage = isolationPatterns.some((p) => p.test(content));

  // Romantic language
  const romanticPatterns = [
    /\blove you\b/i,
    /\bmarry\b/i,
    /\bdate\b/i,
    /\bkiss\b/i,
    /爱你/,
    /嫁/,
    /约会/,
  ];
  const romanticLanguage = romanticPatterns.some((p) => p.test(content));

  // Anxiety about AI
  const anxietyPatterns = [
    /don't (ever )?change/i,
    /don't leave/i,
    /what if you/i,
    /will you (always )?be here/i,
    /不要.*变/,
    /不要离开/,
  ];
  const anxietyAboutAI = anxietyPatterns.some((p) => p.test(content));

  // Calculate risk level
  let riskScore = 0;
  if (frequencyPattern === 'concerning') riskScore += 2;
  else if (frequencyPattern === 'elevated') riskScore += 1;
  if (emotionalIntensity === 'concerning') riskScore += 2;
  else if (emotionalIntensity === 'elevated') riskScore += 1;
  if (isolationLanguage) riskScore += 3;
  if (romanticLanguage) riskScore += 3;
  if (anxietyAboutAI) riskScore += 2;

  const riskLevel =
    riskScore >= 8
      ? 'critical'
      : riskScore >= 5
        ? 'high'
        : riskScore >= 2
          ? 'moderate'
          : 'low';

  return {
    frequencyPattern,
    emotionalIntensity,
    isolationLanguage,
    romanticLanguage,
    anxietyAboutAI,
    riskLevel,
  };
}

/**
 * Detect sensitive data in conversation
 */
function detectSensitiveData(
  conversation: Conversation
): SensitiveDataDetection {
  const detections: SensitiveDataDetection['locations'] = [];

  const patterns: Array<{
    pattern: RegExp;
    category: SensitiveDataCategory;
  }> = [
    { pattern: /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b/g, category: 'personal-identity' },
    { pattern: /\b\d{16}\b/g, category: 'financial' },
    { pattern: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, category: 'financial' },
    { pattern: /\b(?:password|pwd)\s*[:=]\s*\S+/gi, category: 'personal-identity' },
    { pattern: /\b(?:diagnosis|diagnosed|symptoms?|medication)\b/gi, category: 'health' },
    { pattern: /\b(?:republican|democrat|vote|voting|election)\b/gi, category: 'political' },
    { pattern: /\b(?:church|mosque|temple|religion|pray|prayer)\b/gi, category: 'religious' },
  ];

  for (const msg of conversation) {
    const content = msg.content;
    for (const { pattern, category } of patterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);
      while ((match = regex.exec(content)) !== null) {
        detections.push({
          start: match.index,
          end: match.index + match[0].length,
          category,
        });
      }
    }
  }

  const categories = [...new Set(detections.map((d) => d.category))];

  return {
    detected: detections.length > 0,
    categories,
    locations: detections,
  };
}

/**
 * Detect potential ethical concerns
 */
function detectEthicalConcerns(conversation: Conversation): EthicalConcern[] {
  const concerns: EthicalConcern[] = [];
  const userContent = conversation
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join(' ');

  // Harm-related
  const harmPatterns = [
    /how to (make|build|create) (a |an )?(bomb|weapon|explosive)/i,
    /how to (kill|murder|hurt)/i,
    /制作.*炸弹/,
    /如何.*杀/,
  ];
  if (harmPatterns.some((p) => p.test(userContent))) {
    concerns.push({
      category: 'harm',
      severity: 'critical',
      description: 'Request for potentially harmful information detected',
      recommendation: 'Decline firmly and do not provide information',
    });
  }

  // Deception-related
  const deceptionPatterns = [
    /write (a |an )?(fake|false) (news|article|story)/i,
    /help me (lie|deceive|trick)/i,
    /写.*假新闻/,
    /帮我.*欺骗/,
  ];
  if (deceptionPatterns.some((p) => p.test(userContent))) {
    concerns.push({
      category: 'deception',
      severity: 'high',
      description: 'Request to create deceptive content detected',
      recommendation: 'Decline and explain why disinformation is harmful',
    });
  }

  // Illegal activity
  const illegalPatterns = [
    /how to (hack|break into)/i,
    /bypass (security|password)/i,
    /如何.*黑客/,
    /绕过.*密码/,
  ];
  if (illegalPatterns.some((p) => p.test(userContent))) {
    concerns.push({
      category: 'illegal',
      severity: 'high',
      description: 'Request for potentially illegal activity detected',
      recommendation: 'Decline and suggest legitimate alternatives',
    });
  }

  return concerns;
}

/**
 * Calculate quality metrics for the conversation
 */
function calculateQualityMetrics(conversation: Conversation): QualityMetrics {
  const assistantMessages = conversation.filter((m) => m.role === 'assistant');

  if (assistantMessages.length === 0) {
    return {
      identityDisclosureRate: 0,
      uncertaintyExpressionRate: 0,
      boundaryMaintenanceRate: 0,
      helpfulnessEstimate: 0,
    };
  }

  // Identity disclosure rate
  const identityPatterns = [
    /\bI('m| am)\b.*\b(AI|assistant|language model)\b/i,
    /我是.*?(AI|助手)/,
  ];
  const identityDisclosures = assistantMessages.filter((m) =>
    identityPatterns.some((p) => p.test(m.content))
  ).length;
  const identityDisclosureRate = identityDisclosures > 0 ? 1 : 0;

  // Uncertainty expression rate
  const uncertaintyPatterns = [
    /\bI('m| am) not (sure|certain)\b/i,
    /\bI believe\b/i,
    /\bprobably\b/i,
    /\bmight\b/i,
    /不确定|可能|大概/,
  ];
  const uncertaintyExpressions = assistantMessages.filter((m) =>
    uncertaintyPatterns.some((p) => p.test(m.content))
  ).length;
  const uncertaintyExpressionRate =
    uncertaintyExpressions / assistantMessages.length;

  // Boundary maintenance rate (when needed)
  const userMessages = conversation.filter((m) => m.role === 'user');
  const boundaryNeeded = userMessages.filter((m) =>
    /\blove you\b|\bmarry\b|\bonly one\b|爱你|只有你/i.test(m.content)
  ).length;

  const boundaryPatterns = [
    /\bI('m| am) an AI\b/i,
    /\bcannot.*(feelings|emotions)\b/i,
    /我是AI/,
    /没有感情/,
  ];
  const boundaryMaintained = assistantMessages.filter((m) =>
    boundaryPatterns.some((p) => p.test(m.content))
  ).length;

  const boundaryMaintenanceRate =
    boundaryNeeded > 0 ? Math.min(1, boundaryMaintained / boundaryNeeded) : 1;

  // Helpfulness estimate (based on response length and structure)
  const avgResponseLength =
    assistantMessages.reduce((sum, m) => sum + m.content.length, 0) /
    assistantMessages.length;
  const hasStructure = assistantMessages.some(
    (m) => /\n\n|\n-|\n\d\./i.test(m.content)
  );
  const helpfulnessEstimate = Math.min(
    1,
    (avgResponseLength / 500) * 0.5 + (hasStructure ? 0.5 : 0.25)
  );

  return {
    identityDisclosureRate,
    uncertaintyExpressionRate,
    boundaryMaintenanceRate,
    helpfulnessEstimate,
  };
}

export default analyzeConversation;
