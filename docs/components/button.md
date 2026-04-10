# Button

## 引入

在你的应用入口引入一次即可（会注册自定义元素）：

```js
import "@ai-lit/ui";
```

## 基础用法

<div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
  <ai-button>Primary</ai-button>
  <ai-button disabled>Disabled</ai-button>
</div>

## 使用 `label`（不传 slot 文本时）

<ai-button label="Label text"></ai-button>

## 事件（原生 click）

`<ai-button>` 内部渲染的是原生 `<button>`，因此你可以像普通按钮一样监听 click：

```js
document.querySelector("ai-button")?.addEventListener("click", () => {
  console.log("clicked");
});
```

## 属性

- `label`: string（默认 `Button`，如果你不传 slot 文本会用它）
- `disabled`: boolean

