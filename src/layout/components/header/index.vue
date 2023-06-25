<template>
  <header class="navbar-wrapper">
    <RouterLink class="logo" to="/">
      <img src="@/assets/logo.png" height="50">
    </RouterLink>

    <div class="navbar-right">
      <div class="searchbar">
        <button @click="showSearchWindow()" @keyup.alt.107="alert('按下了K')" style="none" class="searchbar-innerblock">
          <el-icon style="margin-left: 5px;" :size="20" color="#000000">
            <Search />
          </el-icon>
          <span style="padding: 0 12px 0 6px;">Search</span>
          <span class="DocSearch-Button-Keys">
            <kbd class="DocSearch-Button-Key">
              <svg width="15" height="15" class="DocSearch-Control-Key-Icon">
                <path d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 
                  0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 
                  1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953" stroke-width="1.2" stroke="currentColor"
                  fill="none" stroke-linecap="square"></path>
              </svg>
            </kbd>
            <kbd class="DocSearch-Button-Key">K</kbd>
          </span>
        </button>
        <el-menu :default-active="activeIndex" class="my-el-menu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3" disabled>Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </div>

      <el-dropdown trigger="click">
        <div class="profile">
          <svg font-size="30" class="icon profile-avatar" aria-hidden="true">
            <use xlink:href="#icon-001-man"></use>
          </svg>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout()">
              注销
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </header>
</template>

<script>
import '//at.alicdn.com/t/c/font_4125077_nfpt6vlfrnr.js';
import { useUserStore } from '@/store/modules/user';

export default {
  data () {
    return {
      url: 'icons/logo.png',

    }
  },
  methods: {
    showSearchWindow () {
      this.$emit('showSearch');
    },
    logout () {
      ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const userStore = useUserStore();
          userStore
            .logout()
            .then(() => {
              ElMessage({
                type: 'success',
                message: 'Logout success.'
              })
            })
            .then(() => {
              router.push("/login");
            });
        })
        .catch((action) => {
          ElMessage({
            type: 'info',
            message:
              action === 'cancel'
                ? 'Logout canceled.'
                : 'Receed'
          })
        });
    }
  }
}
</script>
<style scoped>
.navbar-wrapper {
  top: 0;
  width: 100%;
  position: fixed;
  display: flex;
  background-image: radial-gradient(transparent 1px, #ffffff 1px);
  backdrop-filter: saturate(50%) blur(4px);
  background-size: 4px 4px;
  margin-bottom: 1px;
  border-bottom: solid 1px var(--el-menu-border-color);
}

.logo {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.logo:hover {
  cursor: pointer;
}

.navbar-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.searchbar {
  display: flex;
  align-items: center;
}

.searchbar-innerblock {
  background-color: transparent;
  width: 157px;
  height: 38px;
  border: #fff solid 2px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  color: var(--color-mutegrey);
  font-weight: 500;
}

.searchbar-innerblock:hover {
  border: var(--el-menu-active-color) solid 2px;
  cursor: pointer;
  box-shadow: var(--el-menu-active-color);
  color: var(--color-mutegrey);
  background-color: #f2f2f2;
  transition-duration: .2s;
}

.DocSearch-Button-Keys {
  display: flex;
  width: 53px;
}

.DocSearch-Button-Key {
  align-items: center;
  background: rgba(125, 125, 125, .1);
  border-radius: 3px;
  box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, .4);
  ;
  color: var(--color-mutegrey);
  display: flex;
  height: 18px;
  justify-content: center;
  margin-right: .4em;
  position: relative;
  padding: 0 0 2px;
  border: 0;
  top: -1px;
  width: 20px
}

.my-el-menu {
  background-color: transparent;
  background-image: radial-gradient(transparent 1px, #ffffff 1px);
  backdrop-filter: saturate(50%) blur(4px);
  background-size: 4px 4px;
}

.profile {
  height: 36px;
  width: 36px;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: transparent solid 2px;
  border-radius: 50%;
  transition-duration: var(--transition-duration-slow);
}

.profile:hover {
  border: var(--el-menu-active-color) solid 2px;
  cursor: pointer;
}
</style>