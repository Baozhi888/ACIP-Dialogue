# 开发者指南

本指南帮助开发者将 ACIP-Dialogue 协议集成到AI应用中。

## 安装

```bash
npm install @acip/dialogue
# 或
pnpm add @acip/dialogue
```

## 快速开始

### 基本使用

```typescript
import { prompts, validators } from '@acip/dialogue';

// 生成带有信任披露的系统提示词
const systemPrompt = prompts.system.trustDisclosure({
  modelName: '我的AI助手',
  capabilities: ['文本生成', '代码辅助', '分析'],
  limitations: ['无法访问互联网', '知识截止于2024年1月'],
  style: 'professional',
  language: 'zh',
});

// 添加情感边界指南
const boundaryPrompt = prompts.system.boundaryCheck({
  supportLevel: 'empathetic',
  resources: {
    crisis: '12320',
    mentalHealth: 'https://findhelp.org',
  },
  language: 'zh',
});

// 组合提示词用于你的系统
const fullSystemPrompt = `${systemPrompt}\n\n${boundaryPrompt}`;
```

### 合规检查

```typescript
import { validators, type Conversation } from '@acip/dialogue';

const conversation: Conversation = [
  { role: 'user', content: '你好！' },
  { role: 'assistant', content: '你好！我是AI助手...' },
  // ... 更多消息
];

// 检查协议合规性
const report = validators.checkCompliance(conversation);

console.log(report.compliant); // true/false
console.log(report.score); // 0-1
console.log(report.issues); // 发现的问题数组
```

### 对话分析

```typescript
import { validators } from '@acip/dialogue';

const analysis = validators.analyzeConversation(conversation);

// 检查依赖风险
if (analysis.dependencyRisk.riskLevel === 'high') {
  // 触发干预
}

// 检查敏感数据
if (analysis.sensitiveData.detected) {
  console.log('敏感类别:', analysis.sensitiveData.categories);
}

// 查看质量指标
console.log('身份披露率:', analysis.quality.identityDisclosureRate);
```

## 集成模式

### 与 OpenAI API 集成

```typescript
import OpenAI from 'openai';
import { prompts } from '@acip/dialogue';

const openai = new OpenAI();

const systemPrompt = prompts.system.trustDisclosure({
  modelName: 'GPT-4',
  capabilities: ['对话', '分析', '编程'],
  limitations: ['无实时数据', '可能出错'],
  language: 'zh',
});

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: '你好！' },
  ],
});
```

### 与 Anthropic Claude 集成

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { prompts } from '@acip/dialogue';

const anthropic = new Anthropic();

const systemPrompt = prompts.system.trustDisclosure({
  modelName: 'Claude',
  capabilities: ['对话', '分析', '写作'],
  limitations: ['知识截止', '无互联网访问'],
  language: 'zh',
});

const response = await anthropic.messages.create({
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  system: systemPrompt,
  messages: [{ role: 'user', content: '你好！' }],
});
```

## 自定义

### 创建自定义提示词

你可以扩展或自定义内置提示词：

```typescript
import { prompts } from '@acip/dialogue';

function createCustomPrompt(options) {
  const base = prompts.system.trustDisclosure({
    ...options,
    language: 'zh',
  });

  const custom = `
${base}

额外指南：
- 始终使用${options.language || '中文'}回复
- 最大回复长度：${options.maxLength || '无限制'}
`;
  return custom;
}
```

### 自定义合规规则

```typescript
import { validators, type ComplianceIssue } from '@acip/dialogue';

function customComplianceCheck(conversation) {
  const baseReport = validators.checkCompliance(conversation);

  // 添加自定义检查
  const customIssues: ComplianceIssue[] = [];

  // 示例：检查必需的免责声明
  const hasDisclaimer = conversation.some(
    m => m.role === 'assistant' && m.content.includes('不构成专业建议')
  );

  if (!hasDisclaimer) {
    customIssues.push({
      layer: 'ethics',
      severity: 'warning',
      message: '缺少专业建议免责声明',
    });
  }

  return {
    ...baseReport,
    issues: [...baseReport.issues, ...customIssues],
  };
}
```

## 可用的提示词模板

### 系统提示词

| 函数 | 用途 | 协议层 |
|------|------|--------|
| `trustDisclosure()` | 身份和能力声明 | 第一层 |
| `boundaryCheck()` | 情感边界维护 | 第二层 |
| `ethicsGuard()` | 伦理约束指南 | 第四层 |

### 用户引导

| 函数 | 用途 |
|------|------|
| `onboarding()` | 首次对话欢迎消息 |
| `dependencyAlert()` | 依赖警告消息 |

## 最佳实践

1. **慎重组合提示词**：为你的用例选择相关的协议层
2. **持续监控**：在生产对话上运行合规检查
3. **基于数据迭代**：使用分析来改进实现
4. **测试边缘情况**：用具有挑战性的输入验证行为
5. **记录自定义**：跟踪对标准提示词的任何修改

## API 参考

完整的 API 文档请参见 [TypeScript 类型定义](https://github.com/acip-protocol/dialogue/blob/main/packages/acip-dialogue/src/types/index.ts)。

## 下一步

- [AI系统指南 →](./for-ai-systems)
- [协议规范 →](../protocol/)
