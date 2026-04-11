import type { AiLoginSubmitDetail } from '@ai-lit/ui';
import '@ai-lit/ui';

document.addEventListener('ai-login-submit', (e: Event) => {
  if (!(e instanceof CustomEvent)) return;
  const d = e.detail as AiLoginSubmitDetail;
  console.log('[playground] ai-login-submit', d);
});
