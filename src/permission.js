import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
import { ElMessage } from 'element-plus';

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 进度条


const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = localStorage.getItem("accessToken");
  if (token != "") {
    const userStore = useUserStoreHook();
    if (to.path === "/login") {
      next("/");
      NProgress.done();
    }
    else if (userStore.username != "") {
      if (to.path === "/usermanage") {
        if (userStore.role != 1) {
          next("/401");
          NProgress.done();
          ElMessage({
            type: 'warning',
            message: '无权访问'
          })
        } else {
          next();
          NProgress.done();
        }
      }
      else {
        next();
        NProgress.done();
      }
    }
    else {
      try {
        await userStore.getInfo();
        next();
        NProgress.done();
      } catch (error) {
        // 移除 token 并跳转登录页
        await userStore.resetToken();
        next("/login");
        NProgress.done();
      }
    }
  }
  else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
      NProgress.done();
    } else {
      next("/login");
      NProgress.done();
    }
  }
})