<template>
  <el-button link type="primary" size="small" v-if="action=='detail'">{{ id }}</el-button>
  <el-button link type="primary" size="small" v-if="action=='edit'">{{ id }}</el-button>
</template>

<script>
  export default {
    props:{
      action: String,
      id: Number,
      label: String,
    },
    data() {
      return {
        count: 0
      }
    },
    methods:{

    }
  }
</script>
<style scoped>
</style>