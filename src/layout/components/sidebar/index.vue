<template>
  <el-scrollbar :height="scrollbarlength">
    <RouterLink v-for="column in columns" :key="column.idx" class="scrollbar-item" :to="column.link">
      {{ column.columnname }}
    </RouterLink>
  </el-scrollbar>
</template>

<script>

export default {
  data () {
    return {
      windowheight: window.innerHeight,
      scrollbarlength: window.innerHeight,
      timer: false,

      columns: [
        { 'idx': 1, 'columnname': '学生数据', 'link': '/student' },
        { 'idx': 2, 'columnname': '教师数据', 'link': '/teacher' },
        { 'idx': 3, 'columnname': '课程成绩', 'link': '/scores' },
        { 'idx': 4, 'columnname': '教师任课', 'link': '/course' },
        { 'idx': 5, 'columnname': '用户管理', 'link': '/usermanage' },
      ]
    }
  },
  watch: {
    // windowlength(newwindowlength,oldwindowlength) {
    //   if (!this.timer) {
    //     this.timer = true;
    //     let _this = this;
    //     setTimeout(() => {
    //       _this.scrollbarlength = _this.windowheight;
    //       console.log("新值大小"+newwindowlength+"，旧值大小"+oldwindowlength)
    //       _this.timer = false;
    //     }, 500);
    //   }

    // }
  },
  methods: {

  },
  mounted () {
    var _this = this;
    window.onresize = () => {
      return (() => {
        _this.scrollbarlength = window.innerHeight;
      })()
    }
  }
}
</script>
<style scoped>
.scrollbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 5px 20px 5px 10px;

  text-align: center;
  border-radius: 4px;
  transition-duration: var(--transition-duration-fast);
}

.scrollbar-item:hover {
  background: var(--el-color-primary);
  color: #FAFCFF;
  cursor: pointer;
}
</style>