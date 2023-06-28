# cjlu_managementsys

A management system by Vue3 + pinia + vite + [element-plus](https://element-plus.org/), Some functionality was modified from [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/), based on js.

## Recommended IDE Setup(推荐运行环境)

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [Javascript](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript).

## 项目接口

见项目src/api/目录，可自行修改，跨域问题在后端解决

## 权限管理

见src/permission.js，用户目前只根据数据库user的role字段来区别（1为管理员，0为普通用户）

## Project Setup(初始化项目)

```sh
npm install
```

### Compile and Hot-Reload for Development(运行项目)

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
