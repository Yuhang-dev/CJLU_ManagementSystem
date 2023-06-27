<template>
  <el-dialog v-loading="loading" :before-close="resetForm" draggable="true" v-model="dialogFormVisible"
    destroy-on-close="true">
    <template #header="titleId">
      <h2 :id="titleId">Add a student</h2>
    </template>
    <el-form ref="stuForm" :rules="rules" :model="stuForm" label-width="120px" label-position="left">
      <el-form-item label="Number:" prop="stunum">
        <el-input v-model="stuForm.stunum" clearable />
      </el-form-item>
      <el-form-item label="Name:" prop="stuname">
        <el-input v-model="stuForm.stuname" clearable />
      </el-form-item>
      <el-form-item label="Birthday:" prop="stubirth">
        <el-date-picker v-model="stuForm.stubirth" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
          placeholder="Pick a day" />
      </el-form-item>
      <el-form-item label="Sex:" prop="stusex">
        <el-radio-group v-model="stuForm.stusex">
          <el-radio label="1">Man</el-radio>
          <el-radio label="0">Woman</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Department:" prop="studep">
        <el-select v-model="stuForm.studep">
          <el-option v-for="item in DropDown" :key="item.depid" :label="item.depname" :value="item.depnum">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Identification:" prop="stuidentification">
        <el-input v-model="stuForm.stuidentification" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitStuForm()">Create</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'
import { getDepListApi } from '@/api/dep'
import { addOneStu } from '@/api/stu'

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

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
      DropDown: {},
      loading: false,
      rules: {
        stunum: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 7, max: 7, message: 'Length must be 7', trigger: 'blur' },
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
          { min: 18, max: 18, message: 'Input the valid identification,(18char)', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitStuForm () {
      var _this = this;
      _this.$refs.stuForm.validate(valid => {
        if (valid) {
          NProgress.start()
          _this.loading = true
          var student = {
            "stunum": _this.stuForm.stunum,
            "stuname": _this.stuForm.stuname,
            "stubirth": _this.stuForm.stubirth,
            "stusex": _this.stuForm.stusex,
            "studep": _this.stuForm.studep,
            "stuidentification": _this.stuForm.stuidentification,
          }
          addOneStu(student)
            .then((response) => {
              ElMessage({
                type: 'success',
                message: response.msg
              })
              _this.loading = false
              NProgress.done()

              _this.dialogFormVisible = false
              _this.$emit('reload')
            })
            .catch((error) => {
              NProgress.done()
              _this.loading = false
              console.log(error)
              ElMessage({
                type: 'error',
                message: error.msg
              })
            })
        } else {
          NProgress.done()
          this.loading = false
          return false;
        }
      });
    },
    resetForm (done) {
      this.$refs.stuForm.resetFields()
      done()

    }
  },
  watch: {
    showForm () {
      this.dialogFormVisible = this.showForm
    },
    dialogFormVisible () {
      this.$emit('changeVisible', this.dialogFormVisible)
    }
  },
  created () {
    this.loading = true
    getDepListApi()
      .then((response) => {
        this.DropDown = response.data.data
        this.loading = false
      })
      .catch((error) => {
        ElMessage({
          type: 'error',
          message: response.msg
        })
        this.loading = false
        console.log(error)
      })
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