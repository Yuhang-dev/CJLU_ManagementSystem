
<template>
  <el-dialog v-model="visible" title="Sign In">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="User Name" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input showPassword v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="Check Again" prop="checkpassword">
        <el-input showPassword v-model="ruleForm.checkpassword" />
      </el-form-item>
      <el-form-item label="Role" prop="role">
        <el-radio-group v-model="ruleForm.role">
          <el-radio label="Normal User" />
          <el-radio label="Super Admin" disabled />
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, toRefs } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { addOneUserApi } from '@/api/user';

interface RuleForm {
  username: string
  password: string
  checkpassword: string
  role: string
}

const props = defineProps(['showForm'])
const { showForm } = toRefs(props)
const loading = ref<Boolean>(false)
const emit = defineEmits(['closedialog', 'registerSuccess'])
const visible = ref<Boolean>(false);
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  checkpassword: '',
  role: '',
})

watch(showForm, () => {
  visible.value = showForm.value
});

watch(visible, () => {
  emit('closedialog', visible.value)
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkpassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkpassword', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const changeVisibility = () => {
  visible.value = false;
}

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
  ],
  password: [{ required: true, validator: validatePass, trigger: 'blur' },
  { min: 6, max: 13, message: 'Length should be 6 to 13', trigger: 'blur' }],
  checkpassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  role: [{ required: true, message: 'At least select one role', trigger: 'change' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      const user = {
        "username": ruleForm.username,
        "password": ruleForm.password,
        "role": ruleForm.role === 'Super Admin' ? '1' : '0',
      }
      addOneUserApi(user)
        .then((response) => {
          ElMessage({
            type: 'success',
            message: response.msg,
          })
          loading.value = false
          emit('registerSuccess', response.data)
          //           {
          //            "user": {
          //                      "uid": 7,
          //                      "username": "xiaowang",
          //                      "password": "123456",
          //                      "role": 0
          //                    }
          //            }
          visible.value = false
        })
        .catch((error) => {
          ElMessage({
            type: 'error',
            message: error.msg,
          })
          loading.value = false
        })
    } else {
      ElMessage({
        type: 'error',
        message: 'Submit failed',
      })
      loading.value = false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}



</script>