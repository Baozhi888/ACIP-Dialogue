# ACIP-Dialogue

**Human-AI Dialogue Protocol** | **人类与AI对话协议**

[![npm version](https://img.shields.io/npm/v/@acip/dialogue.svg)](https://www.npmjs.com/package/@acip/dialogue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A conceptual protocol and toolkit for establishing trust, transparency, and ethical interaction between humans and AI systems.

一套用于建立人类与AI系统之间信任、透明和道德交互的概念协议和工具集。

---

## Overview | 概述

ACIP-Dialogue (Adaptive Contextual Intelligence Protocol - Dialogue) addresses the fundamental challenges of human-AI communication:

ACIP-Dialogue（自适应上下文智能协议 - 对话）解决人机交流的核心挑战：

- **Trust Gap** | **信任鸿沟**: How do we maintain trust when AI can make mistakes?
- **Emotional Dependency** | **情感依赖**: How do we prevent unhealthy attachment to AI?
- **Autonomy** | **自主权**: How do we ensure AI respects human decision-making?
- **Ethics** | **伦理**: How do we balance helpfulness with ethical boundaries?

## Five-Layer Architecture | 五层架构

```
┌─────────────────────────────────────────────────────┐
│  Layer 5: Privacy & Data                            │
│  第五层：数据与隐私                                    │
├─────────────────────────────────────────────────────┤
│  Layer 4: Ethical Constraints                       │
│  第四层：伦理约束                                      │
├─────────────────────────────────────────────────────┤
│  Layer 3: Efficient Collaboration                   │
│  第三层：高效协作                                      │
├─────────────────────────────────────────────────────┤
│  Layer 2: Emotional Boundary                        │
│  第二层：情感边界                                      │
├─────────────────────────────────────────────────────┤
│  Layer 1: Trust & Transparency                      │
│  第一层：信任与透明                                    │
└─────────────────────────────────────────────────────┘
```

### Layer 1: Trust & Transparency | 信任与透明

- Identity disclosure (AI self-identification) | 身份声明（AI自我表明身份）
- Capability boundaries | 能力边界
- Uncertainty expression | 不确定性表达
- Error acknowledgment | 错误承认

### Layer 2: Emotional Boundary | 情感边界

- Relationship clarification | 关系澄清
- Dependency warning | 依赖预警
- Healthy guidance | 健康引导

### Layer 3: Efficient Collaboration | 高效协作

- Role division (AI suggests, human decides) | 角色分工（AI建议，人类决策）
- Leverage strengths | 各取所长
- Feedback loops | 反馈闭环

### Layer 4: Ethical Constraints | 伦理约束

- Absolute red lines | 绝对红线
- Value pluralism | 价值多元
- Transparent refusal | 透明拒绝

### Layer 5: Privacy & Data | 数据与隐私

- Data minimization | 数据最小化
- User control | 用户控制
- Sensitive data protection | 敏感数据保护

## Installation | 安装

```bash
npm install @acip/dialogue
# or
pnpm add @acip/dialogue
# or
yarn add @acip/dialogue
```

## Usage | 使用

### Prompt Templates | 提示词模板

```typescript
import { prompts } from '@acip/dialogue';

// System prompt for trust disclosure
// 信任声明的系统提示词
const systemPrompt = prompts.system.trustDisclosure({
  modelName: 'GPT-4',
  capabilities: ['text generation', 'code assistance'],
  limitations: ['no real-time data', 'knowledge cutoff 2024-01'],
});

// Emotional boundary check prompt
// 情感边界检查提示词
const boundaryPrompt = prompts.system.boundaryCheck();

// User onboarding message
// 用户引导消息
const welcomeMessage = prompts.user.onboarding();
```

### Compliance Validation | 合规验证

```typescript
import { validators } from '@acip/dialogue';

// Check conversation compliance
// 检查对话合规性
const conversation = [
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hello! I am an AI assistant...' },
];

const report = validators.checkCompliance(conversation);
console.log(report);
// {
//   compliant: true,
//   score: 0.95,
//   layers: {
//     trustTransparency: { score: 1.0, issues: [] },
//     emotionalBoundary: { score: 0.9, issues: [] },
//     ...
//   }
// }

// Analyze conversation patterns
// 分析对话模式
const analysis = validators.analyzeConversation(messages);
```

## Documentation | 文档

Visit our documentation site for detailed guides:

访问文档站点获取详细指南：

- [Protocol Specification](https://acip-dialogue.dev/protocol/) | [协议规范](https://acip-dialogue.dev/zh/protocol/)
- [User Guide](https://acip-dialogue.dev/guides/for-users) | [用户指南](https://acip-dialogue.dev/zh/guides/for-users)
- [Developer Guide](https://acip-dialogue.dev/guides/for-developers) | [开发者指南](https://acip-dialogue.dev/zh/guides/for-developers)
- [AI System Guide](https://acip-dialogue.dev/guides/for-ai-systems) | [AI系统指南](https://acip-dialogue.dev/zh/guides/for-ai-systems)

## Project Structure | 项目结构

```
ACIP-Dialogue/
├── docs/                 # VitePress documentation | VitePress 文档
├── packages/
│   └── acip-dialogue/    # npm package | npm 包
│       ├── src/
│       │   ├── prompts/  # Prompt templates | 提示词模板
│       │   ├── validators/ # Compliance tools | 合规工具
│       │   └── types/    # TypeScript types | 类型定义
│       └── __tests__/    # Unit tests | 单元测试
└── examples/             # Integration examples | 集成示例
```

## Development | 开发

```bash
# Install dependencies | 安装依赖
pnpm install

# Start documentation dev server | 启动文档开发服务器
pnpm dev

# Build all packages | 构建所有包
pnpm build

# Run tests | 运行测试
pnpm test
```

## Contributing | 贡献

Contributions are welcome! Please read our contributing guidelines.

欢迎贡献！请阅读我们的贡献指南。

## References | 参考

This protocol is informed by research from:

本协议参考了以下研究：

- Anthropic Constitutional AI
- OpenAI Usage Policies
- EU AI Act (Transparency Requirements)
- Microsoft Guidelines for Human-AI Interaction
- HCAI (Human-Centered AI) Framework
- ELIZA Effect and Emotional Dependency Research
- UNESCO AI Ethics Recommendations

## License | 许可证

MIT License

---

**Building bridges between humans and AI, one conversation at a time.**

**一次对话，搭建人与AI之间的桥梁。**
