/** 在任意脚本中于加载组件前设置：`globalThis.AI_LIT_ELEMENT_PREFIX = "myapp"` */
declare global {
  var AI_LIT_ELEMENT_PREFIX: string | undefined;
}

const DEFAULT_PREFIX = 'ai';

let resolvedPrefix = DEFAULT_PREFIX;
let frozen = false;

/**
 * 校验并规范化自定义元素前缀（小写、以字母开头、仅 `a-z0-9-`、≤32）。
 * @throws 若无法得到合法前缀
 */
export function normalizeElementPrefix(raw: string): string {
  const collapsed = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  if (!collapsed) {
    throw new Error(
      `Invalid element prefix "${raw}": need at least one letter or digit.`,
    );
  }
  if (collapsed.length > 32) {
    throw new Error(
      `Invalid element prefix "${raw}": max length is 32 (got ${collapsed.length}).`,
    );
  }
  if (!/^[a-z]/.test(collapsed)) {
    throw new Error(
      `Invalid element prefix "${raw}": must start with a lowercase letter (a-z).`,
    );
  }
  return collapsed;
}

export function getElementPrefix(): string {
  return resolvedPrefix;
}

/**
 * 当前前缀下的完整标签名，例如 `login` → `ai-login` 或 `myapp-login`。
 */
export function elementLocalTag(localName: string): string {
  const local = localName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-');
  if (!local) {
    throw new Error(`Invalid local element name: "${localName}".`);
  }
  return `${getElementPrefix()}-${local}`;
}

export function freezeElementPrefix(): void {
  frozen = true;
}

export function isElementPrefixFrozen(): boolean {
  return frozen;
}

/**
 * 从 `globalThis.AI_LIT_ELEMENT_PREFIX` 同步前缀（仅在尚未冻结时执行）。
 * 无效值会被忽略并在非 production 下 `console.warn`。
 */
export function syncElementPrefixFromGlobal(): void {
  if (frozen) return;
  const g = globalThis as { AI_LIT_ELEMENT_PREFIX?: unknown };
  const raw = g.AI_LIT_ELEMENT_PREFIX;
  if (typeof raw !== 'string' || !raw.trim()) return;
  try {
    resolvedPrefix = normalizeElementPrefix(raw);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (
      typeof process !== 'undefined' &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.warn(
        `[@ai-lit/ui] Ignoring invalid AI_LIT_ELEMENT_PREFIX: ${msg}`,
      );
    }
  }
}

/**
 * 在**任何组件注册之前**设置全局标签前缀。
 * @throws 若组件已注册则无法再修改
 */
export function setElementPrefix(prefix: string): void {
  if (frozen) {
    throw new Error(
      'Cannot change element prefix after components are registered. Import "@ai-lit/ui/config" first, call setElementPrefix(), then import "@ai-lit/ui".',
    );
  }
  resolvedPrefix = normalizeElementPrefix(prefix);
}

syncElementPrefixFromGlobal();
