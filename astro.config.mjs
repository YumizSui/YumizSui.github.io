// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://yumizsui.com',
  output: 'static',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      defaultProps: {
        wrap: false,
      },
      styleOverrides: {
        borderRadius: '6px',
        frames: {
          editorBackground: ({ theme }) => theme.name === 'github-dark' ? '#1f2428' : '#f6f8fa',
        },
      },
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme, { styleVariants }) => {
        // If there are multiple themes, generate class-based selectors
        if (styleVariants.length >= 2) {
          const baseSelector = styleVariants[0]?.theme === theme ? '' : '.dark';
          return baseSelector;
        }
        return ':where(html)';
      },
    }),
    react(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    })
  ]
});
