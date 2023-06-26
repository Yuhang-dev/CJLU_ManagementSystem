<template>
  <el-dialog draggable="true" v-model="dialogFormVisible">
    <template #header="titleId">
      <h2 :id="titleId">Add a student</h2>
    </template>
    <el-form :ref=this.stuForm :rules="rules" :model="stuForm" label-width="120px" label-position="left">
      <el-form-item label="Number:" prop="stunum">
        <el-input v-model="stuForm.stunum" clearable />
      </el-form-item>
      <el-form-item label="Name:" prop="stuname">
        <el-input v-model="stuForm.stuname" clearable />
      </el-form-item>
      <el-form-item label="Birthday:" prop="stubirth">
        <el-date-picker v-model="stuForm.stubirth" type="date" placeholder="Pick a day" />
      </el-form-item>
      <el-form-item label="Sex:" prop="stusex">
        <el-radio-group v-model="stuForm.stusex">
          <el-radio label="1">Man</el-radio>
          <el-radio label="0">Woman</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Department:" prop="studep">
        <el-input v-model="stuForm.studep" clearable />
      </el-form-item>
      <el-form-item label="Identification:" prop="stuidentification">
        <el-input v-model="stuForm.stuidentification" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitStuForm(this.stuForm)">Create</el-button>
        <el-button @click="dialogFormVisible = false;">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
const ruleFormRef = ref()

export default {
  props: {
    showForm: Boolean,
  },
  data () {
    return {
      dialogFormVisible: false,
      stuForm: {
        stunum: '',
        stuname: '',
        stubirth: '',
        stusex: '',
        studep: '',
        stuidentification: '',
      },
      rules: {
        stunum: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 1, max: 7, message: 'Length should be 1 to 7', trigger: 'blur' },
        ],
        stuname: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 2, max: 20, message: 'Length should be 2 to 20', trigger: 'blur' },
        ],
        stubirth: [
          { required: true, message: 'Please select a date', trigger: 'blur', },
        ],
        stusex: [
          { required: true, message: 'Please select at least one sex', trigger: 'change', },
        ],
        studep: [
          { required: true, message: 'Please input a dep', trigger: 'blur', },
        ],
        stuidentification: [
          { required: true, message: 'Please input a identification', trigger: 'blur' },
          { min: 13, max: 13, message: 'Input the valid identification,(13char)', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async submitStuForm (formEl) {
      if (!formEl)
        return
      await formEl.validate((valid, fields) => {
        if (valid)
          console.log('Submit!')
        else
          console.log('Submit failed', fields)
      })
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