/**
 * 在导入 `@ai-lit/ui` 主包**之前**调用，用于设置自定义元素标签前缀。
 *
 * @example
 * ```ts
 * import { setElementPrefix } from "@ai-lit/ui/config";
 * setElementPrefix("acme");
 * import "@ai-lit/ui";
 * ```
 */
export {
  elementLocalTag,
  getElementPrefix,
  normalizeElementPrefix,
  setElementPrefix,
  syncElementPrefixFromGlobal,
} from './element-prefix';
