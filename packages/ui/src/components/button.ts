import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ai-button")
export class AiButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
        Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    }

    button {
      appearance: none;
      border: 1px solid var(--ai-lit-border, rgba(15, 23, 42, 0.14));
      background: var(--ai-lit-bg, #fff);
      color: var(--ai-lit-fg, #0f172a);
      border-radius: var(--ai-lit-radius, 10px);
      padding: 10px 14px;
      font-size: 14px;
      line-height: 1;
      cursor: pointer;
      box-shadow: var(--ai-lit-shadow, 0 10px 30px rgba(15, 23, 42, 0.08));
      transition: transform 120ms ease, box-shadow 120ms ease,
        border-color 120ms ease;
      user-select: none;
    }

    button:hover {
      transform: translateY(-1px);
      border-color: color-mix(
        in oklab,
        var(--ai-lit-accent, #4f46e5) 50%,
        var(--ai-lit-border, rgba(15, 23, 42, 0.14))
      );
    }

    button:active {
      transform: translateY(0px);
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
    }

    button:focus-visible {
      outline: 3px solid
        color-mix(in oklab, var(--ai-lit-accent, #4f46e5) 35%, transparent);
      outline-offset: 2px;
    }

    button[disabled] {
      cursor: not-allowed;
      opacity: 0.55;
      transform: none;
      box-shadow: none;
    }
  `;

  @property({ type: String }) label = "Button";
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`<button ?disabled=${this.disabled}>
      <slot>${this.label}</slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ai-button": AiButton;
  }
}

