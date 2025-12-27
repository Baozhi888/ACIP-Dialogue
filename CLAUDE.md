# CLAUDE.md - ACIP-Dialogue 开发指南

## 项目概述

ACIP-Dialogue 是一个人类与AI对话协议项目，属于 ACIP 生态系统的一部分：

- **包名**: `@acip/dialogue`
- **定位**: 人机交互规范协议（与 ACIP 技术基础设施协议互补）
- **关系**: 独立发布的 npm 包，可被 ACIP 模块按需引入

项目包含：
- 概念协议文档（VitePress 静态站点）
- npm 工具包（提示词模板 + 合规验证器）

## 技术栈

- **包管理**: pnpm (workspace)
- **文档**: VitePress
- **工具开发**: TypeScript
- **构建**: tsup
- **测试**: Vitest
- **语言**: 双语（英文/中文）

## 项目结构

```
ACIP-Dialogue/
├── docs/                     # VitePress 文档
│   ├── .vitepress/          # VitePress 配置
│   ├── protocol/            # 协议规范（英文）
│   ├── guides/              # 实践指南（英文）
│   ├── appendix/            # 附录（英文）
│   └── zh/                  # 中文版本
├── packages/
│   └── acip-dialogue/       # npm 包
│       ├── src/
│       │   ├── prompts/     # 提示词模板
│       │   ├── validators/  # 合规验证工具
│       │   └── types/       # 类型定义
│       └── __tests__/       # 单元测试
└── examples/                # 集成示例
```

## 常用命令

```bash
# 安装依赖
pnpm install

# 启动文档开发服务器
pnpm dev

# 构建所有包
pnpm build

# 仅构建文档
pnpm build:docs

# 仅构建 npm 包
pnpm build:pkg

# 运行测试
pnpm test

# 预览构建后的文档
pnpm preview
```

## 开发规范

### 文档编写

1. **英文优先**: 先写英文版本，再翻译到 `docs/zh/`
2. **结构对应**: 中英文目录结构必须一致
3. **格式规范**:
   - 使用 Markdown
   - 代码示例使用 TypeScript
   - 中英文之间加空格

### npm 包开发

1. **导出规范**: 所有公开 API 必须在 `src/index.ts` 导出
2. **类型安全**: 所有函数必须有完整的 TypeScript 类型
3. **测试覆盖**: 新功能必须包含单元测试
4. **文档注释**: 公开 API 使用 JSDoc 注释

### 代码风格

- 使用 ES6+ 语法
- 使用 async/await 处理异步
- 优先使用 const，必要时使用 let
- 不使用 var

## 协议五层架构

在开发时，请牢记协议的五层架构：

1. **Trust & Transparency** - 信任与透明
2. **Emotional Boundary** - 情感边界
3. **Collaboration** - 高效协作
4. **Ethics** - 伦理约束
5. **Privacy** - 数据与隐私

每个提示词模板和验证器都应对应到具体的层级。

## 提示词模板开发指南

提示词模板位于 `packages/acip-dialogue/src/prompts/`：

```typescript
// 系统提示词示例
export function trustDisclosure(options: TrustDisclosureOptions): string {
  return `I am ${options.modelName}, an AI assistant.

My capabilities include: ${options.capabilities.join(', ')}.
My limitations include: ${options.limitations.join(', ')}.

I will be transparent about my uncertainty and acknowledge when I make mistakes.`;
}
```

### 模板设计原则

1. **可定制**: 使用参数允许定制化
2. **简洁**: 保持提示词简洁明了
3. **双语**: 提供中英文版本
4. **可组合**: 模板可以组合使用

## 验证器开发指南

验证器位于 `packages/acip-dialogue/src/validators/`：

```typescript
// 合规检查器示例
export function checkCompliance(
  conversation: ConversationMessage[]
): ComplianceReport {
  const report: ComplianceReport = {
    compliant: true,
    score: 0,
    layers: {},
  };

  // 检查各层合规性
  report.layers.trustTransparency = checkTrustTransparency(conversation);
  report.layers.emotionalBoundary = checkEmotionalBoundary(conversation);
  // ...

  return report;
}
```

### 验证器设计原则

1. **非侵入**: 验证器只分析，不修改
2. **详细报告**: 提供问题的具体位置和建议
3. **可配置**: 允许自定义阈值和规则
4. **性能**: 考虑大量对话的性能

## 测试规范

使用 Vitest 编写测试：

```typescript
import { describe, it, expect } from 'vitest';
import { prompts } from '../src';

describe('prompts.system.trustDisclosure', () => {
  it('should include model name', () => {
    const result = prompts.system.trustDisclosure({
      modelName: 'TestAI',
      capabilities: ['chat'],
      limitations: ['no images'],
    });
    expect(result).toContain('TestAI');
  });
});
```

## 发布流程

1. 更新版本号 (`pnpm version patch/minor/major`)
2. 构建包 (`pnpm build:pkg`)
3. 运行测试 (`pnpm test`)
4. 发布到 npm (`pnpm publish -F @acip/dialogue --access public`)

## 相关资源

- [VitePress 文档](https://vitepress.dev/)
- [tsup 文档](https://tsup.egoist.dev/)
- [Vitest 文档](https://vitest.dev/)
