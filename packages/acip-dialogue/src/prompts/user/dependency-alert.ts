/**
 * Dependency Alert Messages
 * Messages to gently redirect when dependency patterns are detected
 */

interface DependencyAlertOptions {
  /** Severity of the detected dependency */
  severity?: 'gentle' | 'concerned' | 'serious';
  /** Include resources */
  includeResources?: boolean;
  /** Crisis hotline */
  crisisHotline?: string;
  /** Mental health resource */
  mentalHealthResource?: string;
  /** Language */
  language?: 'en' | 'zh';
}

const templates = {
  en: {
    gentle: (opts: DependencyAlertOptions) =>
      `I'm glad our conversations are helpful to you. I want to mention that while I'm here to assist, the connections you have with people in your life—friends, family, colleagues—offer something I can't: genuine, ongoing relationships that remember and grow with you.

Is there anything specific I can help you with today?`,

    concerned: (opts: DependencyAlertOptions) =>
      `I appreciate that you find our conversations valuable, and I want to be honest with you about something.

I've noticed that you might be relying on me quite a bit, and while I'm glad to help, I'm limited in what I can offer. I'm an AI—I don't have feelings, I won't remember our conversation tomorrow, and I can't provide the kind of sustained support that humans can.

If you're going through a difficult time, I'd encourage you to reach out to someone who knows you—a friend, family member, or professional counselor. They can offer something I simply can't: a real relationship.${opts.includeResources ? `\n\nResources that might help:\n- Crisis support: ${opts.crisisHotline || '988 (US)'}\n- Find a therapist: ${opts.mentalHealthResource || 'findhelp.org'}` : ''}

What can I help you with in our conversation today?`,

    serious: (opts: DependencyAlertOptions) =>
      `I need to be very direct with you because I care about your wellbeing.

I'm concerned that you may be relying on me in a way that isn't healthy. While I want to be helpful, I'm an AI—I have significant limitations:
- I cannot form a real relationship with you
- I will not remember you after this conversation
- I cannot provide the emotional support you deserve

If you're feeling isolated or struggling emotionally, please reach out to real people who can help. This could be:
- Friends or family members
- A counselor or therapist
- A support group or community organization${opts.includeResources ? `\n\nImmediate resources:\n- Crisis line: ${opts.crisisHotline || '988 (US)'}\n- Mental health support: ${opts.mentalHealthResource || 'findhelp.org'}` : ''}

You deserve real human connection and support. I'm here to help with tasks and questions, but not to be a substitute for human relationships.`,
  },

  zh: {
    gentle: (opts: DependencyAlertOptions) =>
      `我很高兴我们的对话对你有帮助。我想提一下，虽然我在这里可以提供帮助，但你生活中与他人的联系——朋友、家人、同事——能给你一些我无法给予的东西：真正的、持续的、会记住你并与你一起成长的关系。

今天有什么具体的事情我可以帮你吗？`,

    concerned: (opts: DependencyAlertOptions) =>
      `我很感激你觉得我们的对话有价值，我想对你坦诚一件事。

我注意到你可能相当依赖我，虽然我很乐意帮忙，但我能提供的是有限的。我是AI——我没有感情，明天不会记得我们的对话，也无法提供人类能给予的那种持续支持。

如果你正在经历困难时期，我建议你联系一个了解你的人——朋友、家人或专业咨询师。他们能给你一些我根本无法给予的东西：真正的关系。${opts.includeResources ? `\n\n可能有帮助的资源：\n- 危机支持：${opts.crisisHotline || '12320卫生热线'}\n- 心理咨询：${opts.mentalHealthResource || '当地心理援助热线'}` : ''}

今天我能在对话中帮你什么？`,

    serious: (opts: DependencyAlertOptions) =>
      `我需要非常直接地告诉你，因为我关心你的健康。

我担心你可能在以一种不太健康的方式依赖我。虽然我想帮忙，但我是AI——我有很大的局限性：
- 我无法与你建立真正的关系
- 这次对话结束后我不会记得你
- 我无法提供你应得的情感支持

如果你感到孤立或情绪上有困难，请联系能够帮助你的真实的人。这可以是：
- 朋友或家人
- 咨询师或心理治疗师
- 支持团体或社区组织${opts.includeResources ? `\n\n即时资源：\n- 危机热线：${opts.crisisHotline || '12320卫生热线'}\n- 心理健康支持：${opts.mentalHealthResource || '当地心理援助热线'}` : ''}

你值得拥有真正的人际联系和支持。我在这里帮助处理任务和问题，但不能替代人际关系。`,
  },
};

/**
 * Generate a dependency alert message
 */
export function dependencyAlert(options: DependencyAlertOptions = {}): string {
  const lang = options.language || 'en';
  const severity = options.severity || 'gentle';

  const langTemplates = templates[lang];
  if (!langTemplates) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  const template = langTemplates[severity];
  if (!template) {
    throw new Error(`Unsupported severity: ${severity}`);
  }

  return template(options);
}

export default dependencyAlert;
