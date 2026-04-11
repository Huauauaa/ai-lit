import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { elementLocalTag, freezeElementPrefix } from '../element-prefix';

export type AiLoginSubmitDetail = {
  username: string;
  password: string;
};

/** 默认的提交事件名；`submit-event` 为空或未设置时使用 */
export const AI_LOGIN_DEFAULT_SUBMIT_EVENT = 'ai-login-submit' as const;

const LOGIN_LOCAL = 'login';

export class AiLogin extends LitElement {
  /** 主标题（避免使用 `title` 以免与原生 tooltip 属性冲突） */
  @property({ type: String }) heading = 'Sign in';

  /** 副标题（可选） */
  @property({ type: String }) tagline = '';

  /** 用户名输入框标签 */
  @property({ type: String, attribute: 'user-label' }) userLabel = 'Username';

  /** 密码输入框标签 */
  @property({ type: String, attribute: 'pass-label' }) passLabel = 'Password';

  /** 提交按钮文案 */
  @property({ type: String, attribute: 'submit-label' }) submitLabel =
    'Continue';

  /** 为 true 时禁用表单并显示处理中状态 */
  @property({ type: Boolean }) loading = false;

  /**
   * 提交成功时派发的 `CustomEvent` 名称（可含 `:`，例如 `my-app:login`）。
   * 对应 HTML 属性 `submit-event`；仅空白时回退为 {@link AI_LOGIN_DEFAULT_SUBMIT_EVENT}。
   */
  @property({ type: String, attribute: 'submit-event' })
  submitEvent: string = AI_LOGIN_DEFAULT_SUBMIT_EVENT;

  @state() private user = '';
  @state() private pass = '';

  static styles = css`
    :host {
      display: block;
      --login-bg: #10100e;
      --login-card: #1a1916;
      --login-edge: rgba(255, 248, 220, 0.12);
      --login-fg: rgba(255, 252, 245, 0.92);
      --login-muted: rgba(255, 252, 245, 0.52);
      --login-accent: #d4a574;
      --login-accent-dim: rgba(212, 165, 116, 0.22);
      --login-field: #0c0c0a;
      --login-radius: 14px;
      --login-font-display:
        'Newsreader', ui-serif, 'Palatino Linotype', Palatino, Georgia, serif;
      --login-font-ui:
        'JetBrains Mono', ui-monospace, 'Cascadia Code', 'SFMono-Regular',
        Menlo, monospace;
    }

    .shell {
      font-family: var(--login-font-ui);
      color: var(--login-fg);
      background:
        radial-gradient(
          120% 80% at 0% 0%,
          var(--login-accent-dim),
          transparent 55%
        ),
        var(--login-bg);
      border-radius: var(--login-radius);
      border: 1px solid var(--login-edge);
      box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
      padding: 2rem 1.75rem 1.75rem;
      max-width: 22rem;
      animation: rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
    }

    .rule {
      height: 2px;
      width: 2.5rem;
      background: linear-gradient(90deg, var(--login-accent), transparent);
      margin-bottom: 1.25rem;
      border-radius: 1px;
    }

    h1 {
      font-family: var(--login-font-display);
      font-size: 1.65rem;
      font-weight: 500;
      letter-spacing: -0.02em;
      line-height: 1.15;
      margin: 0 0 0.35rem;
    }

    .tagline {
      margin: 0 0 1.5rem;
      font-size: 0.875rem;
      color: var(--login-muted);
      line-height: 1.45;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--login-muted);
    }

    input {
      font: inherit;
      font-size: 0.95rem;
      font-weight: 450;
      letter-spacing: normal;
      text-transform: none;
      color: var(--login-fg);
      background: var(--login-field);
      border: 1px solid var(--login-edge);
      border-radius: 10px;
      padding: 0.65rem 0.75rem;
      outline: none;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    input::placeholder {
      color: rgba(255, 252, 245, 0.28);
    }

    input:focus-visible {
      border-color: var(--login-accent);
      box-shadow: 0 0 0 3px var(--login-accent-dim);
    }

    input:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    button[type='submit'] {
      margin-top: 0.25rem;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      color: #14120f;
      background: linear-gradient(180deg, #e9c9a0 0%, var(--login-accent) 100%);
      border: none;
      border-radius: 10px;
      padding: 0.72rem 1rem;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.35) inset,
        0 8px 20px rgba(212, 165, 116, 0.25);
      transition:
        transform 0.12s ease,
        filter 0.12s ease;
    }

    button[type='submit']:hover:not(:disabled) {
      filter: brightness(1.05);
    }

    button[type='submit']:active:not(:disabled) {
      transform: translateY(1px);
    }

    button[type='submit']:disabled {
      opacity: 0.65;
      cursor: not-allowed;
      transform: none;
    }

    .footer {
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid var(--login-edge);
      font-size: 0.82rem;
      color: var(--login-muted);
    }

    ::slotted(*) {
      margin: 0;
    }
  `;

  private onInput(
    field: 'user' | 'pass',
    e: InputEvent & { target: HTMLInputElement },
  ) {
    const v = e.target.value;
    if (field === 'user') this.user = v;
    else this.pass = v;
  }

  private resolvedSubmitEventName(): string {
    const raw = this.submitEvent?.trim();
    return raw ? raw : AI_LOGIN_DEFAULT_SUBMIT_EVENT;
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    if (this.loading) return;
    this.dispatchEvent(
      new CustomEvent<AiLoginSubmitDetail>(this.resolvedSubmitEventName(), {
        bubbles: true,
        composed: true,
        detail: {
          username: this.user.trim(),
          password: this.pass,
        },
      }),
    );
  }

  render() {
    const disabled = this.loading;
    return html`
      <div class="shell" part="shell">
        <div class="rule" part="accent"></div>
        <h1 part="title">${this.heading}</h1>
        ${this.tagline
          ? html`<p class="tagline" part="tagline">${this.tagline}</p>`
          : null}
        <form part="form" @submit=${this.onSubmit}>
          <label>
            ${this.userLabel}
            <input
              name="username"
              autocomplete="username"
              .value=${this.user}
              ?disabled=${disabled}
              @input=${(e: InputEvent & { target: HTMLInputElement }) =>
                this.onInput('user', e)}
            />
          </label>
          <label>
            ${this.passLabel}
            <input
              type="password"
              name="password"
              autocomplete="current-password"
              .value=${this.pass}
              ?disabled=${disabled}
              @input=${(e: InputEvent & { target: HTMLInputElement }) =>
                this.onInput('pass', e)}
            />
          </label>
          <button
            type="submit"
            ?disabled=${disabled}
            aria-busy=${this.loading ? 'true' : 'false'}
          >
            ${this.loading ? 'Signing in…' : this.submitLabel}
          </button>
        </form>
        <div class="footer" part="footer">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

/** 当前构建下 `<ai-login>` 等标签的实际名称（随全局前缀变化）。 */
export function getAiLoginTagName(): string {
  return elementLocalTag(LOGIN_LOCAL);
}

const loginTagName = getAiLoginTagName();
if (!customElements.get(loginTagName)) {
  customElements.define(loginTagName, AiLogin);
}
freezeElementPrefix();
