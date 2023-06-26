<template>
  <el-dialog v-model="dialogFormVisible">
    <h2>Add a Student</h2>
    <el-form v-model="stuForm" label-width="120px">
      <el-form-item label="Number:">
        <el-input v-model="stuForm.stunum" />
      </el-form-item>
      <el-form-item label="Name:">
        <el-input v-model="stuForm.stuname" />
      </el-form-item>
      <el-form-item label="Birthday:">
        <el-date-picker v-model="stuForm.stubirth" type="date" placeholder="Pick a day" />
      </el-form-item>
      <el-form-item label="Sex:">
        <el-radio-group v-model="stuForm.stusex">
          <el-radio label="1">Man</el-radio>
          <el-radio label="0">Woman</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Department:">
        <el-input v-model="stuForm.studep" />
      </el-form-item>
      <el-form-item label="Identification:">
        <el-input v-model="stuForm.stuidentification" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="">Create</el-button>
        <el-button @click="dialogFormVisible = false;">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showForm: Boolean,
  },
  data () {
    return {
      dialogFormVisible: true,
      stuForm: {
        stunum: '',
        stuname: '',
        stubirth: '',
        stusex: '',
        studep: '',
        stuidentification: '',
      },
    }
  },
  watch: {
    showForm () {
      this.dialogFormVisible = this.showForm
    },
    dialogFormVisible () {
      this.$emit('changeVisible', this.dialogFormVisible)
    }
  }
}
</script>
<style scoped>
.new-stu-mask {
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
}

.new-stu-modal {
  background: #fafafa;
  border-radius: 6px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .1), 0px 8px 20px rgba(0, 0, 0, .2);
  flex-direction: column;
  margin: 60px auto auto;
  max-width: 560px;
  position: relative;
  padding: 10px 10px 5px 5px;
}
</style>