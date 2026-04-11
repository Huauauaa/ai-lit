import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  AI_LOGIN_DEFAULT_SUBMIT_EVENT,
  AiLogin,
  getAiLoginTagName,
  type AiLoginSubmitDetail,
} from './login';
import { setElementPrefix } from '../element-prefix';

function mountLogin(): AiLogin {
  const el = new AiLogin();
  document.body.appendChild(el);
  return el;
}

async function flush(el: AiLogin): Promise<void> {
  await el.updateComplete;
}

async function setCredentials(el: AiLogin, user: string, pass: string) {
  await flush(el);
  const root = el.shadowRoot!;
  const userInput = root.querySelector<HTMLInputElement>(
    'input[name="username"]',
  )!;
  const passInput = root.querySelector<HTMLInputElement>(
    'input[name="password"]',
  )!;
  userInput.value = user;
  userInput.dispatchEvent(
    new Event('input', { bubbles: true, composed: true }),
  );
  passInput.value = pass;
  passInput.dispatchEvent(
    new Event('input', { bubbles: true, composed: true }),
  );
  await flush(el);
}

describe('AiLogin', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  it(`dispatches ${AI_LOGIN_DEFAULT_SUBMIT_EVENT} with trimmed username and password`, async () => {
    const el = mountLogin();
    await setCredentials(el, '  alice  ', 'secret');

    const handler = vi.fn();
    el.addEventListener(AI_LOGIN_DEFAULT_SUBMIT_EVENT, handler);

    el.shadowRoot!.querySelector<HTMLButtonElement>(
      'button[type=submit]',
    )!.click();
    await flush(el);

    expect(handler).toHaveBeenCalledTimes(1);
    const ev = handler.mock.calls[0]![0] as CustomEvent<AiLoginSubmitDetail>;
    expect(ev.type).toBe(AI_LOGIN_DEFAULT_SUBMIT_EVENT);
    expect(ev.bubbles).toBe(true);
    expect(ev.composed).toBe(true);
    expect(ev.detail).toEqual({ username: 'alice', password: 'secret' });
  });

  it('dispatches a custom submit-event name when submitEvent is set', async () => {
    const el = mountLogin();
    el.submitEvent = 'my-app:authenticate';
    await setCredentials(el, 'bob', 'pw');

    const handler = vi.fn();
    el.addEventListener('my-app:authenticate', handler);

    el.shadowRoot!.querySelector<HTMLButtonElement>(
      'button[type=submit]',
    )!.click();
    await flush(el);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0]![0]).toBeInstanceOf(CustomEvent);
    const ev = handler.mock.calls[0]![0] as CustomEvent<AiLoginSubmitDetail>;
    expect(ev.detail).toEqual({ username: 'bob', password: 'pw' });
  });

  it('falls back to default event name when submit-event is only whitespace', async () => {
    const el = mountLogin();
    el.submitEvent = '   \t  ';
    await setCredentials(el, 'c', 'd');

    const handler = vi.fn();
    el.addEventListener(AI_LOGIN_DEFAULT_SUBMIT_EVENT, handler);

    el.shadowRoot!.querySelector<HTMLButtonElement>(
      'button[type=submit]',
    )!.click();
    await flush(el);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not dispatch when loading is true', async () => {
    const el = mountLogin();
    el.loading = true;
    await setCredentials(el, 'u', 'p');

    const handler = vi.fn();
    el.addEventListener(AI_LOGIN_DEFAULT_SUBMIT_EVENT, handler);

    el.shadowRoot!.querySelector<HTMLButtonElement>(
      'button[type=submit]',
    )!.click();
    await flush(el);

    expect(handler).not.toHaveBeenCalled();
  });

  it('registers login under default tag name', () => {
    expect(getAiLoginTagName()).toBe('ai-login');
    expect(new AiLogin().tagName.toLowerCase()).toBe('ai-login');
  });

  it('rejects setElementPrefix after components are registered', () => {
    expect(() => setElementPrefix('other')).toThrow(
      /Cannot change element prefix/,
    );
  });
});
