import PromptSync from 'prompt-sync';

export const prompt = (ask?: string): string => {
  return PromptSync()(ask || '').trim();
}