import { defineConfig } from 'vitepress';

export default defineConfig({
  // GitHub Pages default: https://<user>.github.io/<repo>/
  base: '/ai-lit/',
  title: 'ai-lit UI',
  description: 'Lit + TypeScript UI component library',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Components', link: '/components/login' },
    ],
    sidebar: {
      '/components/': [
        {
          text: 'Components',
          items: [{ text: 'Login', link: '/components/login' }],
        },
      ],
    },
    socialLinks: [],
  },
});
