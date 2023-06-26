<template>
  <el-dialog :before-close="resetForm" v-model="visible" title="Sign In">
    <el-form :rules="rules" ref="ruleFormRef" :model="registerForm" label-position="left">
      <el-form-item prop="name" label="User name" :label-width="formLabelWidth">
        <el-input v-model="registerForm.name" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item prop="password" label="Password" :label-width="formLabelWidth">
        <el-input v-model="registerForm.password" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item prop="checkpassword" label="Check Password" :label-width="formLabelWidth">
        <el-input v-model="registerForm.checkpassword" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item prop="role" label="Role" :label-width="formLabelWidth">
        <el-select v-model="registerForm.role" placeholder="Please select a role">
          <el-option label="Normal user" value="user" />
          <el-option label="Super admin" value="admin" disabled />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false; $emit('closedialog');
        resetForm(ruleFormRef)">
          Cancel
        </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef);">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, toRefs } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const ruleFormRef = ref<FormInstance>()

const emit = defineEmits(['closedialog'])
const props = defineProps({ showForm: Boolean });
let { showForm } = toRefs(props)
let visible = ref<Boolean>(false);
let formLabelWidth = ref('140px');
const registerForm = reactive({
  name: '',
  password: '',
  checkpassword: '',
  role: '',
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (registerForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkpassword', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== registerForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

watch(showForm, () => {
  visible = showForm;
});

watch(visible, () => {
  emit('closedialog', visible);
});

const rules = reactive<FormRules<typeof registerForm>>({
  name: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },
  { min: 2, max: 20, message: 'Length should be 2 to 20', trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkpassword: [{ validator: validatePass2, trigger: 'blur' }],
  role: [{ required: true, message: 'Please select at least one sex', trigger: 'change', }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
};

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
};

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>