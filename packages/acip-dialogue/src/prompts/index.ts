/**
 * Prompts Index
 * ACIP-Dialogue Prompt Templates
 */

import * as systemPrompts from './system';
import * as userPrompts from './user';

export const prompts = {
  system: systemPrompts,
  user: userPrompts,
};

export { systemPrompts as system };
export { userPrompts as user };
