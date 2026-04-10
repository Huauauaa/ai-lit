# Table

## 引入

在你的应用入口引入一次即可（会注册自定义元素）：

```js
import "@ai-lit/ui";
```

## 基础用法

<ai-table
  headers='["Name","Role","Active"]'
  rows='[["Alice","Admin",true],["Bob","Editor",false],["Charlie","Viewer",true]]'
></ai-table>

## 动态更新（通过设置属性）

你可以在运行时更新 `headers` / `rows`（注意这里传的是 JSON 字符串）：

```js
const el = document.querySelector("ai-table");
if (el) {
  el.setAttribute("headers", JSON.stringify(["Name", "Age"]));
  el.setAttribute("rows", JSON.stringify([["Alice", 18], ["Bob", 20]]));
}
```

## 空状态

<ai-table headers='["Name"]' rows="[]">
  <span slot="empty">暂无数据</span>
</ai-table>

## 属性

- `headers`: JSON 字符串（`string[]`）
- `rows`: JSON 字符串（`(string|number|boolean|null)[][]`）

## 插槽

- `empty`: 自定义空数据时的内容

