<template>
  <div class="home-wrapper">
    <h1>Welcome to CJLU Management System</h1>
    <h2 v-if="role == 1">管理员：{{ username }}</h2>
    <h2 v-if="role == 0">普通用户：{{ username }}</h2>
  </div>
</template>

<script>
import { useUserStore } from '../../store/modules/user';
import { storeToRefs } from "pinia";

export default {
  setup () {
    const store = useUserStore()
    let { token, username, role } = storeToRefs(store) //方法3：可以利用从pinia中引用的storeToRefs方法，进行解构赋值 再return出去 类似 vue3 中的 toRefs
    console.log(store)
    return {
      store, //方法1：可以把整个store return出去
      // baseUrl: computed(() => store.baseUrl),  //方法2：可以利用computed属性，将需要展示的值return出去
      //token,
      username,
      role,
    }
  },
  data () {
    return {
      count: 0
    }
  }
}
</script>
<style scoped>
.home-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

}
</style>