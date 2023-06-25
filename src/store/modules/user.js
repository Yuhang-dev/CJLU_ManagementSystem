import { defineStore } from "pinia";

import { loginApi, logoutApi } from "@/api/auth";
import { getUserInfo } from "@/api/user";
import { resetRouter } from "../../router/index.js";
import { store } from "@/store";

import { ref } from "vue";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  // state
  const token = useStorage("accessToken", "");
  const username = ref("");
  const role = ref(0);

  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login (loginData) {
    return new Promise((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          token.value = response.data.token; // eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo () {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          console.log(data)
          username.value = data.userInfo.username;
          role.value = data.userInfo.role;
          console.log(data.userInfo);
          resolve(data.userInfo);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 注销
  function logout () {
    return new Promise((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetRouter();
          resetToken();
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 重置
  function resetToken () {
    token.value = "";
    username.value = "";
    role.value = 0;
  }
  return {
    token,
    username,
    role,
    login,
    getInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook () {
  return useUserStore(store);
}
