import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type Cell = string | number | boolean | null;
type Row = Cell[];
type Headers = string[];

function parseJsonAttr<T>(value: string | null): T | undefined {
  if (!value) return;
  try {
    return JSON.parse(value) as T;
  } catch {
    return;
  }
}

@customElement("ai-table")
export class AiTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
        Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      color: var(--ai-lit-fg, #0f172a);
    }

    .wrap {
      border-radius: 14px;
      overflow: clip;
      border: 1px solid var(--ai-lit-border, rgba(15, 23, 42, 0.14));
      background: var(--ai-lit-bg, #fff);
      box-shadow: var(--ai-lit-shadow, 0 10px 30px rgba(15, 23, 42, 0.08));
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      line-height: 1.3;
    }

    thead th {
      text-align: left;
      font-weight: 600;
      padding: 12px 12px;
      border-bottom: 1px solid var(--ai-lit-border, rgba(15, 23, 42, 0.14));
      background: color-mix(in oklab, var(--ai-lit-bg, #fff) 92%, #eef2ff);
      white-space: nowrap;
    }

    tbody td {
      padding: 10px 12px;
      border-bottom: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      opacity: 0.92;
      vertical-align: top;
    }

    tbody tr:hover td {
      background: color-mix(
        in oklab,
        var(--ai-lit-accent, #4f46e5) 6%,
        transparent
      );
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    .empty {
      padding: 14px 12px;
      opacity: 0.7;
      font-size: 13px;
    }
  `;

  /**
   * JSON string attribute. Example: `headers='["Name","Age"]'`
   */
  @property({ attribute: "headers" }) headersJson: string | null = null;

  /**
   * JSON string attribute. Example: `rows='[["Alice",18],["Bob",20]]'`
   */
  @property({ attribute: "rows" }) rowsJson: string | null = null;

  get headers(): Headers {
    return parseJsonAttr<Headers>(this.headersJson) ?? [];
  }

  get rows(): Row[] {
    return parseJsonAttr<Row[]>(this.rowsJson) ?? [];
  }

  render() {
    const headers = this.headers;
    const rows = this.rows;

    return html`<div class="wrap">
      ${rows.length === 0
        ? html`<div class="empty"><slot name="empty">No data</slot></div>`
        : html`<table>
            ${headers.length
              ? html`<thead>
                  <tr>
                    ${headers.map((h) => html`<th>${h}</th>`)}
                  </tr>
                </thead>`
              : null}
            <tbody>
              ${rows.map(
                (r) => html`<tr>
                  ${r.map((c) => html`<td>${c ?? ""}</td>`)}
                </tr>`
              )}
            </tbody>
          </table>`}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ai-table": AiTable;
  }
}

