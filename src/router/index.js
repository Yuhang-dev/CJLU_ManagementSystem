import { createRouter, createWebHistory } from 'vue-router'

export const Layout = () => import("@/layout/index.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'student',
          component: () => import('@/views/student/index.vue')
        },
        {
          path: 'teacher',
          component: () => import('@/views/teacher/index.vue')
        },
        {
          path: 'scores',
          component: () => import('@/views/scores/index.vue')
        },
        {
          path: 'course',
          component: () => import('@/views/course/index.vue')
        },
        {
          path: 'usermanage',
          component: () => import('@/views/usermanage/index.vue')
        },
        {
          path: "401",
          component: () => import("@/views/error-page/401.vue"),
          meta: { hidden: true },
        },
        {
          path: "404",
          component: () => import("@/views/error-page/404.vue"),
          meta: { hidden: true },
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: { hidden: true },
    },
  ]
})

/**
 * 重置路由
 */
export function resetRouter () {
  router.replace({ path: "/login" });
}


export default router
