<template>
  <el-dialog :before-close="beforeCLOSE" destroy-on-close="true" v-model="visible" title="Detail" draggable="true">
    <el-form ref="ruleFormRef" :model="editForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="Student ID" prop="stuid">
        <el-input v-model="editForm.stuid" disabled />
      </el-form-item>
      <el-form-item label="Student Num" prop="stunum">
        <el-input v-model="editForm.stunum" />
      </el-form-item>
      <el-form-item label="Student Name" prop="stuname">
        <el-input v-model="editForm.stuname" />
      </el-form-item>
      <el-form-item label="Student Sex" prop="stusex">
        <el-radio-group v-model="editForm.stusex">
          <el-radio label="Man" />
          <el-radio label="Women" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Department" prop="studep">
        <el-input v-model="editForm.studep" />
      </el-form-item>
      <el-form-item label="Birthday" prop="stubirth">
        <el-date-picker v-model="editForm.stubirth" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
          placeholder="Pick a day" />
      </el-form-item>
      <el-form-item label="Identification" prop="stuidentification">
        <el-input v-model="editForm.stuidentification" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="update()">
          Update
        </el-button>
        <el-button @click="resetForm(ruleFormRef); changeVisibility()">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref, watch, toRefs, onUpdated } from 'vue';
import { updateStudent } from '@/api/stu';

const props = defineProps(['showForm1', 'stuid', 'stunum', 'stuname', 'stusex', 'studep', 'stubirth', 'stuidentification']);
const { showForm1, stuid, stunum, stuname, stusex, studep, stubirth, stuidentification } = toRefs(props)
const emit = defineEmits(['closedialog', 'RefreshTable'])
const loading = ref<Boolean>(false);
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const visible = ref<Boolean>(false);

interface STUDENT {
  stuid: string
  stunum: string
  stuname: string
  stusex: string
  studep: string
  stubirth: string
  stuidentification: string
}

onUpdated(() => {
  editForm.stuid = stuid.value;
  editForm.stunum = stunum.value;
  editForm.stuname = stuname.value;
  if (stusex.value === 0 || stusex.value === '0')
    editForm.stusex = 'Women';
  else
    editForm.stusex = 'Man';
  editForm.studep = studep.value;
  editForm.stubirth = stubirth.value;
  editForm.stuidentification = stuidentification.value;
})

const editForm = reactive<STUDENT>({
  stuid: '',
  stunum: '',
  stuname: '',
  stusex: '',
  studep: '',
  stubirth: '',
  stuidentification: '',
})


const rules = reactive<FormRules<STUDENT>>({
  stunum: [
    { required: true, message: 'Please input stunum', trigger: 'blur' },
    { min: 7, max: 7, message: 'Student Number must be 7', trigger: 'blur' },
  ],
  stuname: [
    { required: true, message: 'Please input stuname', trigger: 'blur' },
    { min: 2, max: 20, message: 'Length should be 2 to 20', trigger: 'blur' },
  ],
  studep: [
    { required: true, message: 'Every Student has a Department', trigger: 'blur' }
  ],
  stuidentification: [
    { required: true, message: 'Input the Identification', trigger: 'blur' },
    { min: 18, max: 18, message: 'Length must be 13', trigger: 'blur' },
  ],
})

watch(showForm1, () => {
  visible.value = showForm1.value
});

watch(visible, () => {
  emit('closedialog', visible.value)
});

const changeVisibility = () => {
  visible.value = false;
}

const update = function () {
  const student = {
    "stuid": editForm.stuid,
    "stunum": editForm.stunum,
    "stuname": editForm.stuname,
    "stusex": editForm.stusex,
    "studep": editForm.studep,
    "stubirth": editForm.stubirth,
    "stuidentification": editForm.stuidentification,
  }
  if (editForm.stusex !== 'Women' || editForm.stusex != 'Women')
    student.stusex = '1';
  else
    student.stusex = '0';
  updateStudent(student)
    .then((response) => {
      editForm.stuid = response.data.stuid;
      editForm.stunum = response.data.stunum;
      editForm.stuname = response.data.stuname;
      if (response.data.stusex === 0 || response.data.stusex === '0')
        editForm.stusex = 'Women';
      else
        editForm.stusex = 'Man';
      editForm.studep = response.data.studep;
      editForm.stubirth = response.data.stubirth;
      editForm.stuidentification = response.data.stuidentification;
      ElMessage({
        type: 'success',
        message: 'Successful'
      })
      emit('RefreshTable')
    })
    .catch((error) => {
      ElMessage({
        type: 'error',
        message: error.msg || '更新失败'
      })
    })
}


const beforeCLOSE = function (done) {
  editForm.stuid = ''
  editForm.stunum = ''
  editForm.stuname = ''
  editForm.stubirth = ''
  editForm.studep = ''
  editForm.stusex = ''
  editForm.stuidentification = ''

  done()
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}



</script>
<style scoped></style>