# Login

默认标签为 `<ai-login>`（前缀 `ai`）。提供带用户名与密码字段的登录面板，提交时派发 `ai-login-submit` 事件（与元素前缀无关）。

## 用法

```html
<ai-login
  heading="欢迎回来"
  tagline="使用你的账号继续"
  user-label="邮箱"
  pass-label="密码"
  submit-label="登录"
  submit-event="my-app:login"
></ai-login>
```

```js
import { AI_LOGIN_DEFAULT_SUBMIT_EVENT } from '@ai-lit/ui';
import '@ai-lit/ui';

const el = document.querySelector('ai-login');
el?.addEventListener('my-app:login', (e) => {
  const { username, password } = e.detail;
  console.log(username, password);
});

// 未设置 `submit-event` 时，事件名为默认常量：
el?.addEventListener(AI_LOGIN_DEFAULT_SUBMIT_EVENT, (e) => {
  console.log(e.detail);
});
```

## 属性

| 属性           | 类型    | 默认              | 说明                                                  |
| -------------- | ------- | ----------------- | ----------------------------------------------------- |
| `heading`      | string  | `Sign in`         | 主标题                                                |
| `tagline`      | string  | `""`              | 副标题，空则不渲染                                    |
| `user-label`   | string  | `Username`        | 用户名字段标签                                        |
| `pass-label`   | string  | `Password`        | 密码字段标签                                          |
| `submit-label` | string  | `Continue`        | 提交按钮文案                                          |
| `loading`      | boolean | `false`           | 为 true 时禁用输入并显示处理中                        |
| `submit-event` | string  | `ai-login-submit` | 提交时派发的 `CustomEvent` 类型名；仅空白时回退为默认 |

## 事件

- 默认事件名 **`ai-login-submit`**（与导出常量 `AI_LOGIN_DEFAULT_SUBMIT_EVENT` 相同）。
- 设置 `submit-event` 后，使用自定义名称派发，**`detail` 仍为** `{ username: string; password: string }`，且 **`bubbles` / `composed` 行为不变**。

## 插槽

- **默认插槽**：渲染在表单下方的页脚区域（适合「忘记密码」等链接）。

## 外观定制

组件使用 `part`：`shell`、`accent`、`title`、`tagline`、`form`、`footer`，可用 `::part()` 在外层样式中覆盖。

## 全局元素前缀

自定义元素名格式为 `{prefix}-login`，默认 `prefix` 为 `ai`。

**方式一：任意脚本早于模块加载**（例如 `index.html` 里先内联再 `type="module"`）：

```html
<script>
  globalThis.AI_LIT_ELEMENT_PREFIX = 'acme';
</script>
<script type="module" src="/main.js"></script>
```

**方式二：在导入主包之前调用**（推荐在打包应用中使用）：

```ts
import { setElementPrefix } from '@ai-lit/ui/config';
setElementPrefix('acme');
import '@ai-lit/ui';
```

在 HTML 中应使用与当前前缀一致的标签，例如 `acme-login`。可用 `getAiLoginTagName()` 读取实际标签名：

```js
import { getAiLoginTagName } from '@ai-lit/ui';
import '@ai-lit/ui';

document
  .querySelector(getAiLoginTagName())
  ?.addEventListener('ai-login-submit', () => {});
```

前缀一旦用于注册组件后即冻结；之后再调用 `setElementPrefix` 会抛出错误。
