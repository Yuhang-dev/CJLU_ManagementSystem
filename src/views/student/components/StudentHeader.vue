<template>
  <div style="display: flex;">
    <el-button @click="$emit('newStudent')">新增</el-button>
    <el-input v-model="student.stunum" placeholder="学号" clearable style="width:15%;margin-left: 10px;" />
    <el-input v-model="student.stuname" placeholder="姓名" clearable style="width:10%;margin-left: 5px;" />
    <el-input v-model="student.stubirth" placeholder="出生日期" clearable style="width:20%;margin-left: 5px;" />
    <el-input v-model="student.stuidentification" placeholder="证件号码" clearable style="width:20%;margin: 0 5px 0 5px;" />
    <el-button @click="$emit('')">查询</el-button>
  </div>
</template>

<script>
import { queryOneStu } from '@/api/stu'

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
    queryOneStudent () {
      var _this = this;
      queryOneStu(_this.student)
        .then(() => {

        })
    }
  }
}
</script>
<style scoped></style>