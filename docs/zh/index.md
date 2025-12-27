---
layout: home

hero:
  name: "ACIP-Dialogue"
  text: "人类与AI对话协议"
  tagline: 建立人类与AI之间信任、透明和道德交互的框架
  actions:
    - theme: brand
      text: 阅读协议
      link: /zh/protocol/
    - theme: alt
      text: 快速入门
      link: /zh/guides/for-users

features:
  - icon: 🤝
    title: 信任与透明
    details: 清晰的身份声明、能力边界和不确定性表达，实现诚实的AI沟通
  - icon: 💚
    title: 情感边界
    details: 健康的关系框架，在提供真诚支持的同时防止过度依赖
  - icon: ⚡
    title: 高效协作
    details: 优化人机协作，明确角色分工和反馈机制
  - icon: ⚖️
    title: 伦理约束
    details: 价值多元、透明拒绝、用户可质疑的伦理决策
  - icon: 🔒
    title: 隐私与数据
    details: 数据最小化、用户控制、透明的数据实践
---

## 什么是 ACIP-Dialogue？

ACIP-Dialogue（自适应上下文智能协议 - 对话）是一个概念协议，旨在建立人类与AI系统之间健康、高效和合乎伦理的沟通模式。

### 面临的挑战

随着AI变得越来越像人类对话，我们面临新的挑战：
- 当AI可能犯错时，我们如何维持信任？
- 如何防止对AI产生不健康的情感依赖？
- 如何确保AI尊重人类的自主权？
- 如何在有用性和伦理边界之间取得平衡？

### 解决方案

ACIP-Dialogue 提供**五层架构**来应对这些挑战：

1. **信任与透明层** - AI清晰传达其本质、能力和局限
2. **情感边界层** - 健康的关系框架防止依赖
3. **协作层** - 优化人机分工
4. **伦理层** - 明确的伦理约束与透明推理
5. **隐私层** - 用户对数据的控制权与最小化收集

## 开始使用

<div class="tip custom-block">
<p class="custom-block-title">普通用户</p>
<p>了解如何与遵循此协议的AI系统有效互动。</p>
<p><a href="/zh/guides/for-users">阅读用户指南 →</a></p>
</div>

<div class="tip custom-block">
<p class="custom-block-title">开发者</p>
<p>将协议集成到您的AI应用中。</p>
<p><a href="/zh/guides/for-developers">阅读开发者指南 →</a></p>
</div>

<div class="tip custom-block">
<p class="custom-block-title">AI系统</p>
<p>AI模型训练和系统提示词的实现指南。</p>
<p><a href="/zh/guides/for-ai-systems">阅读AI系统指南 →</a></p>
</div>

## npm 包

安装工具包以使用提示词模板和合规验证：

```bash
npm install acip-dialogue
```

```typescript
import { prompts, validators } from 'acip-dialogue';

// 使用系统提示词
const systemPrompt = prompts.system.trustDisclosure({
  language: 'zh',
  // ...
});

// 验证对话合规性
const report = validators.checkCompliance(conversation);
```
