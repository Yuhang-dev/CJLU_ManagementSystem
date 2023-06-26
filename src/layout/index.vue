<template>
  <el-container style="height:100%">
    <el-header style="padding:0">
      <Header @showSearch="showSearchWindow = true"></Header>
    </el-header>
    <el-container>
      <el-aside style="position:fixed;width: var(--aside-width);">
        <Sidebar></Sidebar>
      </el-aside>
      <el-main class="my-pagecontent"><router-view /></el-main>
    </el-container>
    <div v-if="showSearchWindow" @click="eventHandle('mask')" class="searchwindow">
      <div @click.stop="eventHandle('modal')" class="search-modal">
        <header class="search-header">
          <form class="search-form">
            <label class="DocSearch-MagnifierLabel" for="docsearch-input" id="docsearch-label"><svg width="20" height="20"
                class="DocSearch-Search-Icon" viewBox="0 0 20 20">
                <path
                  d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                  stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                </path>
              </svg></label>
            <input v-model="searchValue" class="search-input" id="docsearch-input" enterkeyhint="go" spellcheck="false"
              autofocus="true" placeholder="Search Function" maxlength="64" type="search">
            <button type="reset" class="search-button"></button>
          </form>
        </header>
        <div v-for="item in RecommendItems" :key="item.id" class="search-items">
          <div v-if="RecommendItems.length > 0" class="search-item">
            {{ item.name }}
          </div>
        </div>
        <div v-if="RecommendItems.length == 0" class="search-items">
          <div class="search-item">
            none data
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>

import Header from "./components/header/index.vue"
import Sidebar from "./components/sidebar/index.vue"

export default {
  data () {
    return {
      showSearchWindow: false,
      searchValue: '',
      searchRecommend: [
        { 'id': 1, 'name': '新增用户', 'link': '/useradd' },
        { 'id': 2, 'name': '个人信息管理', 'link': '/myinfo' },
        { 'id': 3, 'name': '个人信息管理', 'link': '/myinfo' },
        { 'id': 4, 'name': '个人信息管理', 'link': '/myinfo' },
      ],
    }
  },
  components: {
    Header,
    Sidebar,
  },
  methods: {
    eventHandle (targetname) {
      if (targetname === 'mask')
        this.showSearchWindow = false;
    },
  },
  mounted () {
    var _this = this;
    document.onkeydown = function (e) {
      let key = window.event.keyCode;
      if (key == 75 && event.ctrlKey) {//== 83 && event.ctrlKey
        window.event.preventDefault() //关闭浏览器快捷键
        _this.showSearchWindow = true;//;saveProject1()
      } else if (key == 27) {
        _this.showSearchWindow = false;
      }
    };
  },
  computed: {
    RecommendItems () {
      var _this = this;
      if (_this.searchValue != null && _this.searchValue != '') {
        var recommendData = _this.searchRecommend.filter(function (element, index, self) {
          if (element.name.includes(_this.searchValue)) {
            return element
          }
        })
        return recommendData
      } else {
        return _this.searchRecommend.slice(0, 2);
      }
    }
  }
}
</script>
<style scoped>
.my-pagecontent {
  padding-left: calc(var(--aside-width) + 10px);
}

.searchwindow {
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
}

.search-modal {
  background: #fafafa;
  border-radius: 6px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .1), 0px 8px 20px rgba(0, 0, 0, .2);
  flex-direction: column;
  margin: 60px auto auto;
  max-width: 560px;
  position: relative;
  padding-bottom: 5px;
}

.search-header {
  display: flex;
  padding: 12px 12px 0;
  margin-bottom: 5px;
}

.search-form {
  align-items: center;
  background: #f2f2f2;
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px #409eff;
  display: flex;
  height: 56px;
  margin: 0;
  padding: 0 12px;
  position: relative;
  width: 100%;
}

.search-input {
  appearance: none;
  background: transparent;
  border: 0;
  color: #606266;
  flex: 1;
  font: inherit;
  font-size: 1.2em;
  height: 100%;
  outline: none;
  padding: 0 0 0 8px;
  width: 80%;
}

.search-button {
  animation: fade-in .1s ease-in forwards;
  appearance: none;
  background: none;
  border: 0;
  border-radius: 50%;
  /* color: var(--docsearch-icon-color); */
  cursor: pointer;
  padding: 2px;
  /* right: 0; */
  stroke-width: 1.4;
  display: flex;
  justify-content: center;
  touch-action: manipulation;
  text-transform: none;
}

.search-button:hover {
  color: #409eff;
}

.search-items {
  display: flex;
  align-items: center;
  margin: 5px 12px 5px 12px;
  height: 60px;
  transition-duration: var(--transition-duration-fast);
  border-radius: 5px;
}

.search-items:hover {
  background-color: var(--el-color-primary);
  color: #fff;
}

.search-item {
  padding: 0 12px 0 12px;
  display: flex;
  width: 100%;
}
</style>