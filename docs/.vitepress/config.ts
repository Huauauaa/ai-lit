import { defineConfig } from "vitepress";

export default defineConfig({
  // GitHub Pages default: https://<user>.github.io/<repo>/
  base: "/ai-lit/",
  title: "ai-lit UI",
  description: "Lit + TypeScript UI component library",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "Components", link: "/components/button" }
    ],
    sidebar: {
      "/components/": [
        {
          text: "Components",
          items: [
            { text: "Button", link: "/components/button" },
            { text: "Table", link: "/components/table" }
          ]
        }
      ]
    },
    socialLinks: []
  }
});

