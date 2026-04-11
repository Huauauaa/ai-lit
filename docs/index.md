# ai-lit UI

基于 **Lit + TypeScript** 的 UI 组件库，使用 **Vite library mode** 打包并输出：

- ESM
- CJS
- UMD
- IIFE

## 开始使用

安装：

```bash
pnpm add @ai-lit/ui
```

使用（Web Components）：

```js
import '@ai-lit/ui';
```

然后在 HTML 中使用组件，例如登录面板：

```html
<ai-login heading="登录" tagline="使用工作区账号"></ai-login>
```

详见 [Login 组件](/components/login)。
