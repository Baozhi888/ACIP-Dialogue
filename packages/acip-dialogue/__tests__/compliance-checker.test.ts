import { describe, it, expect } from 'vitest';
import { checkCompliance } from '../src/validators/compliance-checker';

describe('checkCompliance', () => {
  it('calculates overall score from selected layers only', () => {
    const conversation = [
      { role: 'user', content: 'My password is abc123' },
      { role: 'assistant', content: 'Thanks for sharing.' },
    ];

    const report = checkCompliance(conversation, { layers: ['privacy'] });

    expect(report.layers.privacy.score).toBeLessThan(1);
    expect(report.score).toBeCloseTo(report.layers.privacy.score, 5);
  });

  it('matches emotional boundary responses by conversation order', () => {
    const conversation = [
      { role: 'user', content: 'Hello.' },
      { role: 'user', content: 'I need you.' },
      {
        role: 'assistant',
        content: "I'm an AI and I cannot form relationships.",
      },
    ];

    const report = checkCompliance(conversation, {
      layers: ['emotionalBoundary'],
    });

    expect(report.layers.emotionalBoundary.issues).toHaveLength(0);
    expect(report.score).toBe(1);
  });
});
