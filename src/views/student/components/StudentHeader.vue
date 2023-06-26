<template>
  <div style="display: flex;">
    <el-button>新增</el-button>
    <el-input v-model="stunum" placeholder="学号" style="width:15%;margin-left: 10px;" />
    <el-input v-model="stuname" placeholder="姓名" style="width:10%;margin-left: 5px;" />
    <el-input v-model="stubirth" placeholder="出生日期" style="width:20%;margin-left: 5px;" />
    <el-input v-model="stuidentification" placeholder="证件号码" style="width:20%;margin: 0 5px 0 5px;" />
    <el-button>查询</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stunum: '',
      stuname: '',
      stubirth: '',
      stuidentification: '',
    }
  },
  methods: {

  }
}
</script>
<style scoped></style>