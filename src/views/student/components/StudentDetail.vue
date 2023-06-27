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
        <el-button v-loading="loading" type="primary" @click="">
          Update
        </el-button>
        <el-button @click="resetForm(ruleFormRef); changeVisibility()">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref, watch, toRefs, onMounted } from 'vue';

const props = defineProps(['stuid', 'showForm1']);
const { stuid } = toRefs(props);
const { showForm1 } = toRefs(props)
const emit = defineEmits(['closedialog'])
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

// onMounted(() => {
//   editForm.stuid = stuid.value;
// })

const editForm = reactive<STUDENT>({
  stuid: '1111',
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