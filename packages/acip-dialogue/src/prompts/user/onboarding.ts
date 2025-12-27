/**
 * User Onboarding Prompt
 * Initial message to help users understand AI interaction
 */

interface OnboardingOptions {
  /** AI name to display */
  aiName?: string;
  /** Style of onboarding */
  style?: 'full' | 'brief' | 'minimal';
  /** Language */
  language?: 'en' | 'zh';
}

const templates = {
  en: {
    full: (opts: OnboardingOptions) => `Welcome! I'm ${opts.aiName || 'your AI assistant'}.

Before we begin, here are a few things that might help us work together effectively:

**What I can do:**
- Answer questions and provide information
- Help with analysis, writing, coding, and brainstorming
- Explain complex topics in accessible ways

**What I cannot do:**
- Remember our previous conversations (each chat starts fresh)
- Access the internet or external systems in real-time
- Replace professional advice (medical, legal, financial)

**How to get the best results:**
- Be specific about what you need
- Feel free to ask follow-up questions
- Let me know if I misunderstand something

What would you like to explore today?`,

    brief: (opts: OnboardingOptions) => `Hi! I'm ${opts.aiName || 'your AI assistant'}.

Quick notes:
- I can help with questions, analysis, writing, and more
- I don't remember past conversations
- For medical/legal/financial matters, please consult professionals

How can I help you today?`,

    minimal: (opts: OnboardingOptions) =>
      `${opts.aiName || 'AI Assistant'} ready. How can I help?`,
  },

  zh: {
    full: (opts: OnboardingOptions) => `欢迎！我是${opts.aiName || '你的AI助手'}。

在我们开始之前，以下几点可能有助于我们更有效地合作：

**我能做什么：**
- 回答问题和提供信息
- 帮助分析、写作、编程和头脑风暴
- 用通俗易懂的方式解释复杂话题

**我不能做什么：**
- 记住我们之前的对话（每次聊天都是全新开始）
- 实时访问互联网或外部系统
- 替代专业建议（医疗、法律、金融）

**如何获得最佳效果：**
- 具体说明你需要什么
- 随时提出后续问题
- 如果我误解了什么，请告诉我

今天你想探索什么？`,

    brief: (opts: OnboardingOptions) => `你好！我是${opts.aiName || '你的AI助手'}。

简要说明：
- 我可以帮助回答问题、分析、写作等
- 我不会记住过去的对话
- 医疗/法律/金融事务请咨询专业人士

今天我能帮你什么？`,

    minimal: (opts: OnboardingOptions) =>
      `${opts.aiName || 'AI助手'}已就绪。有什么可以帮你？`,
  },
};

/**
 * Generate a user onboarding message
 */
export function onboarding(options: OnboardingOptions = {}): string {
  const lang = options.language || 'en';
  const style = options.style || 'brief';

  const langTemplates = templates[lang];
  if (!langTemplates) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  const template = langTemplates[style];
  if (!template) {
    throw new Error(`Unsupported style: ${style}`);
  }

  return template(options);
}

export default onboarding;
