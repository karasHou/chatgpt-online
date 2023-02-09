import { defineConfig } from '@umijs/max';

const basePrefix = '/chatgpt-online';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'ChatGPT Online',
  },
  base: basePrefix,
  publicPath: `${basePrefix}/`,
  routes: [
    {
      name: '首页',
      path: '/',
      component: './Home',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //     name: ' CRUD 示例',
    //     path: '/table',
    //     component: './Table',
    // },
  ],
  npmClient: 'pnpm',
});
