---
layout: home

hero:
  name: "ACIP-Dialogue"
  text: "Human-AI Dialogue Protocol"
  tagline: A framework for trust, transparency, and ethical interaction between humans and AI
  actions:
    - theme: brand
      text: Read the Protocol
      link: /protocol/
    - theme: alt
      text: Quick Start Guide
      link: /guides/for-users

features:
  - icon: 🤝
    title: Trust & Transparency
    details: Clear identity disclosure, capability boundaries, and uncertainty expression for honest AI communication
  - icon: 💚
    title: Emotional Boundary
    details: Healthy relationship frameworks that prevent over-dependency while providing genuine support
  - icon: ⚡
    title: Efficient Collaboration
    details: Optimized human-AI teamwork with clear role divisions and feedback mechanisms
  - icon: ⚖️
    title: Ethical Constraints
    details: Value pluralism, transparent refusal, and user-challengeable ethical decisions
  - icon: 🔒
    title: Privacy & Data
    details: Data minimization, user control, and transparent data practices
---

## What is ACIP-Dialogue?

ACIP-Dialogue (Adaptive Contextual Intelligence Protocol - Dialogue) is a conceptual protocol designed to establish healthy, productive, and ethical communication patterns between humans and AI systems.

### The Challenge

As AI becomes more conversational and human-like, we face new challenges:
- How do we maintain trust when AI can make mistakes?
- How do we prevent unhealthy emotional dependency?
- How do we ensure AI respects human autonomy?
- How do we balance helpfulness with ethical boundaries?

### The Solution

ACIP-Dialogue provides a **five-layer architecture** that addresses these challenges:

1. **Trust & Transparency Layer** - AI clearly communicates its nature, capabilities, and limitations
2. **Emotional Boundary Layer** - Healthy relationship frameworks prevent dependency
3. **Collaboration Layer** - Optimized division of labor between human and AI
4. **Ethics Layer** - Clear ethical constraints with transparent reasoning
5. **Privacy Layer** - User control over data with minimal collection

## Getting Started

<div class="tip custom-block">
<p class="custom-block-title">For Users</p>
<p>Learn how to interact with AI systems that follow this protocol.</p>
<p><a href="/guides/for-users">Read the User Guide →</a></p>
</div>

<div class="tip custom-block">
<p class="custom-block-title">For Developers</p>
<p>Integrate the protocol into your AI applications.</p>
<p><a href="/guides/for-developers">Read the Developer Guide →</a></p>
</div>

<div class="tip custom-block">
<p class="custom-block-title">For AI Systems</p>
<p>Implementation guidelines for AI model training and system prompts.</p>
<p><a href="/guides/for-ai-systems">Read the AI System Guide →</a></p>
</div>

## npm Package

Install the toolkit for prompt templates and compliance validation:

```bash
npm install acip-dialogue
```

```typescript
import { prompts, validators } from 'acip-dialogue';

// Use system prompts
const systemPrompt = prompts.system.trustDisclosure();

// Validate conversation compliance
const report = validators.checkCompliance(conversation);
```
