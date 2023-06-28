<template>
  <div style="display: flex;">
    <el-button @click="$emit('newStudent')">新增</el-button>
    <el-input v-model="student.stunum" placeholder="学号" clearable style="width:15%;margin-left: 10px;" />
    <el-input v-model="student.stuname" placeholder="姓名" clearable style="width:10%;margin-left: 5px;" />
    <el-date-picker v-model="student.stubirth" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
      placeholder="Pick a day" style="width:20%;margin-left: 5px;" />
    <el-input v-model="student.stuidentification" placeholder="证件号码" clearable style="width:20%;margin: 0 5px 0 5px;" />
    <el-button @click="$emit('fuzzyquery', this.student)" style="margin-left: 5px;">查询</el-button>
    <el-button @click="$emit('resetquery')">恢复</el-button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      student: {
        stunum: '',
        stuname: '',
        stubirth: '',
        stuidentification: '',
      }
    }
  },
  methods: {
  }
}
</script>
<style scoped></style>