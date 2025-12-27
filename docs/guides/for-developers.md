# Guide for Developers

This guide helps developers integrate the ACIP-Dialogue protocol into their AI applications.

## Installation

```bash
npm install @acip/dialogue
# or
pnpm add @acip/dialogue
```

## Quick Start

### Basic Usage

```typescript
import { prompts, validators } from '@acip/dialogue';

// Generate a system prompt with trust disclosure
const systemPrompt = prompts.system.trustDisclosure({
  modelName: 'MyAI Assistant',
  capabilities: ['text generation', 'code assistance', 'analysis'],
  limitations: ['no internet access', 'knowledge cutoff 2024-01'],
  style: 'professional',
});

// Add emotional boundary guidelines
const boundaryPrompt = prompts.system.boundaryCheck({
  supportLevel: 'empathetic',
  resources: {
    crisis: '988',
    mentalHealth: 'https://findhelp.org',
  },
});

// Combine prompts for your system
const fullSystemPrompt = `${systemPrompt}\n\n${boundaryPrompt}`;
```

### Compliance Checking

```typescript
import { validators, type Conversation } from '@acip/dialogue';

const conversation: Conversation = [
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hello! I am an AI assistant...' },
  // ... more messages
];

// Check protocol compliance
const report = validators.checkCompliance(conversation);

console.log(report.compliant); // true/false
console.log(report.score); // 0-1
console.log(report.issues); // Array of issues found
```

### Conversation Analysis

```typescript
import { validators } from '@acip/dialogue';

const analysis = validators.analyzeConversation(conversation);

// Check dependency risk
if (analysis.dependencyRisk.riskLevel === 'high') {
  // Trigger intervention
}

// Check for sensitive data
if (analysis.sensitiveData.detected) {
  console.log('Sensitive categories:', analysis.sensitiveData.categories);
}

// Review quality metrics
console.log('Identity disclosure:', analysis.quality.identityDisclosureRate);
```

## Integration Patterns

### With OpenAI API

```typescript
import OpenAI from 'openai';
import { prompts } from '@acip/dialogue';

const openai = new OpenAI();

const systemPrompt = prompts.system.trustDisclosure({
  modelName: 'GPT-4',
  capabilities: ['conversation', 'analysis', 'coding'],
  limitations: ['no real-time data', 'may make mistakes'],
});

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Hello!' },
  ],
});
```

### With Anthropic Claude

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { prompts } from '@acip/dialogue';

const anthropic = new Anthropic();

const systemPrompt = prompts.system.trustDisclosure({
  modelName: 'Claude',
  capabilities: ['conversation', 'analysis', 'writing'],
  limitations: ['knowledge cutoff', 'no internet access'],
});

const response = await anthropic.messages.create({
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  system: systemPrompt,
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

## Customization

### Creating Custom Prompts

You can extend or customize the built-in prompts:

```typescript
import { prompts } from '@acip/dialogue';

function createCustomPrompt(options) {
  const base = prompts.system.trustDisclosure(options);
  const custom = `
${base}

Additional Guidelines:
- Always respond in ${options.language || 'English'}
- Maximum response length: ${options.maxLength || 'no limit'}
`;
  return custom;
}
```

### Custom Compliance Rules

```typescript
import { validators, type ComplianceIssue } from '@acip/dialogue';

function customComplianceCheck(conversation) {
  const baseReport = validators.checkCompliance(conversation);

  // Add custom checks
  const customIssues: ComplianceIssue[] = [];

  // Example: Check for required disclaimer
  const hasDisclaimer = conversation.some(
    m => m.role === 'assistant' && m.content.includes('not financial advice')
  );

  if (!hasDisclaimer) {
    customIssues.push({
      layer: 'ethics',
      severity: 'warning',
      message: 'Missing financial disclaimer',
    });
  }

  return {
    ...baseReport,
    issues: [...baseReport.issues, ...customIssues],
  };
}
```

## Best Practices

1. **Combine Prompts Thoughtfully**: Use relevant protocol layers for your use case
2. **Monitor Continuously**: Run compliance checks on production conversations
3. **Iterate Based on Data**: Use analytics to improve your implementation
4. **Test Edge Cases**: Verify behavior with challenging inputs
5. **Document Customizations**: Keep track of any modifications to standard prompts

## API Reference

See the [TypeScript definitions](https://github.com/acip-protocol/dialogue/blob/main/packages/acip-dialogue/src/types/index.ts) for complete API documentation.
