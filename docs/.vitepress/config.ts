import { defineConfig } from 'vitepress';

export default defineConfig({
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
      },
    },
    esbuild: {
      // Use esbuild-wasm for Termux/Android compatibility
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
  },
  title: 'ACIP-Dialogue',
  description: 'Human-AI Dialogue Protocol - A framework for trust, transparency, and ethical interaction',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Protocol', link: '/protocol/' },
          { text: 'Guides', link: '/guides/for-users' },
        ],
        sidebar: {
          '/protocol/': [
            {
              text: 'Protocol Specification',
              items: [
                { text: 'Overview', link: '/protocol/' },
                { text: 'Layer 1: Trust & Transparency', link: '/protocol/trust-transparency' },
                { text: 'Layer 2: Emotional Boundary', link: '/protocol/emotional-boundary' },
                { text: 'Layer 3: Collaboration', link: '/protocol/collaboration' },
                { text: 'Layer 4: Ethics', link: '/protocol/ethics' },
                { text: 'Layer 5: Privacy', link: '/protocol/privacy' },
              ],
            },
          ],
          '/guides/': [
            {
              text: 'Practical Guides',
              items: [
                { text: 'For Users', link: '/guides/for-users' },
                { text: 'For Developers', link: '/guides/for-developers' },
                { text: 'For AI Systems', link: '/guides/for-ai-systems' },
              ],
            },
          ],
        },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '协议规范', link: '/zh/protocol/' },
          { text: '实践指南', link: '/zh/guides/for-users' },
        ],
        sidebar: {
          '/zh/protocol/': [
            {
              text: '协议规范',
              items: [
                { text: '概述', link: '/zh/protocol/' },
                { text: '第一层：信任与透明', link: '/zh/protocol/trust-transparency' },
                { text: '第二层：情感边界', link: '/zh/protocol/emotional-boundary' },
                { text: '第三层：高效协作', link: '/zh/protocol/collaboration' },
                { text: '第四层：伦理约束', link: '/zh/protocol/ethics' },
                { text: '第五层：隐私与数据', link: '/zh/protocol/privacy' },
              ],
            },
          ],
          '/zh/guides/': [
            {
              text: '实践指南',
              items: [
                { text: '用户指南', link: '/zh/guides/for-users' },
                { text: '开发者指南', link: '/zh/guides/for-developers' },
                { text: 'AI系统指南', link: '/zh/guides/for-ai-systems' },
              ],
            },
          ],
        },
        outline: {
          label: '页面导航',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        lastUpdated: {
          text: '最后更新于',
        },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/acip-protocol/dialogue' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2024-present',
    },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'ACIP-Dialogue' }],
    ['meta', { name: 'og:description', content: 'Human-AI Dialogue Protocol' }],
  ],
});
