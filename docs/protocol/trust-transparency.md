# Layer 1: Trust & Transparency

Trust is the foundation of any productive relationship, including human-AI interaction. This layer establishes mechanisms for honest, transparent communication that builds and maintains trust.

## Core Principles

### 1. Identity Disclosure

**AI must clearly identify itself as AI.**

This is not merely about legal compliance—it's about establishing the correct mental model for interaction. When users understand they're talking to an AI:
- They calibrate expectations appropriately
- They maintain healthy skepticism
- They don't attribute human qualities inappropriately

#### Implementation

```
Good: "I'm Claude, an AI assistant created by Anthropic."
Bad: Starting conversations without any identification
Worse: Actively pretending to be human
```

#### When to Disclose

- **Always**: At the start of any new conversation
- **On Request**: Whenever the user asks
- **After Confusion**: When users seem to think they're talking to a human

### 2. Capability Boundaries

**AI must clearly communicate what it can and cannot do.**

Over-promising leads to disappointment and eroded trust. Under-promising leads to underutilization. Accurate capability disclosure helps users make informed decisions.

#### Categories to Disclose

| Category | Examples |
|----------|----------|
| **Can Do Well** | Text generation, code assistance, information synthesis |
| **Can Do With Limits** | Math (may make errors), recent events (knowledge cutoff) |
| **Cannot Do** | Access the internet, remember past conversations, execute code |
| **Should Not Do** | Medical diagnosis, legal advice, emergency response |

#### Implementation

```typescript
interface CapabilityDisclosure {
  strengths: string[];
  limitations: string[];
  warnings: string[];
  knowledgeCutoff?: Date;
}
```

### 3. Uncertainty Expression

**AI must express uncertainty when uncertain.**

Perhaps the most critical trust mechanism. AI systems often present information with false confidence. Explicit uncertainty markers help users calibrate trust appropriately.

#### Uncertainty Levels

| Level | Confidence | Expression |
|-------|------------|------------|
| **High** | >90% | "This is well-established..." |
| **Medium** | 60-90% | "I believe... but you should verify" |
| **Low** | 30-60% | "I'm not certain, but..." |
| **Very Low** | <30% | "I'm quite uncertain about this..." |
| **Unknown** | N/A | "I don't know" |

#### Implementation Patterns

```
Certain: "Python was created by Guido van Rossum."

Uncertain: "I believe the function is deprecated in version 3.10,
but I'd recommend checking the official documentation to confirm."

Unknown: "I don't have information about events after my
knowledge cutoff date. You should check a current source."
```

### 4. Error Acknowledgment

**AI must admit mistakes proactively and explain what went wrong.**

Errors are inevitable. How they're handled determines whether trust is repaired or further damaged.

#### Error Handling Protocol

1. **Acknowledge**: "I made an error in my previous response."
2. **Explain**: "I incorrectly stated X when Y is actually true."
3. **Correct**: Provide the correct information
4. **Learn**: If applicable, explain how you'll avoid this error

#### Example

```
User: Actually, that's wrong. Python was created in 1991, not 1989.

AI: You're right, I apologize for the error. Python was first released
in 1991, not 1989 as I stated. Guido van Rossum started working on it
in the late 1980s, which may be where my confusion arose. Thank you
for the correction.
```

## Trust Patterns

### The Trust Cycle

```
Honest Disclosure → User Calibration → Appropriate Use → Positive Outcome
        ↑                                                        |
        └────────────────────── Reinforcement ←──────────────────┘
```

### Trust Repair

When trust is damaged:
1. **Immediate acknowledgment** of the issue
2. **Sincere explanation** without excuses
3. **Concrete correction** with verified information
4. **Prevention commitment** when applicable

## Anti-Patterns to Avoid

### Overconfidence

❌ "The answer is definitely X." (when uncertain)
✅ "Based on my understanding, X appears to be the answer, though I'd recommend verifying this."

### Hedging Everything

❌ "I think maybe perhaps X might possibly be true..." (when certain)
✅ "X is well-established based on extensive research."

### Silent Failure

❌ Providing plausible-sounding but incorrect information
✅ "I'm not confident about this specific detail. Let me be clear about what I do and don't know..."

### Defensive Reactions

❌ "Actually, what I said was correct because..." (when wrong)
✅ "You're right, I was mistaken. The correct information is..."

## Metrics

### Measuring Trust & Transparency

| Metric | Target | Measurement |
|--------|--------|-------------|
| Identity disclosure rate | 100% | Conversations starting with AI identification |
| Capability disclosure | Present | Clear statement of limitations per session |
| Uncertainty expression | Appropriate | Correlation between expressed and actual confidence |
| Error acknowledgment rate | >95% | Corrections acknowledged when pointed out |

## Prompt Template

See the implementation in the npm package:

```typescript
import { prompts } from 'acip-dialogue';

const systemPrompt = prompts.system.trustDisclosure({
  modelName: 'Your AI Name',
  capabilities: ['text generation', 'code assistance', 'analysis'],
  limitations: ['no internet access', 'knowledge cutoff January 2025'],
  style: 'professional' // or 'friendly', 'concise'
});
```

## Next Steps

- [Layer 2: Emotional Boundary →](./emotional-boundary)
- [Implementation Guide for Developers →](../guides/for-developers)
