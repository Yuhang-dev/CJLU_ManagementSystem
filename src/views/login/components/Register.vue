<template>
  <el-dialog v-model="visible" title="Sign In">
    <el-form :model="registerForm" label-position="left">
      <el-form-item label="User name" :label-width="formLabelWidth">
        <el-input v-model="registerForm.name" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth">
        <el-input v-model="registerForm.password" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="Check Password" :label-width="formLabelWidth">
        <el-input v-model="registerForm.password" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="Role" :label-width="formLabelWidth">
        <el-select v-model="registerForm.role" placeholder="Please select a role">
          <el-option label="Normal user" value="user" />
          <el-option label="Super admin" value="admin" disabled />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false; $emit('closedialog')">Cancel</el-button>
        <el-button type="primary" @click="visible = false; $emit('closedialog')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
export default {
  props: {
    showForm: Boolean,
  },
  data () {
    return {
      visible: false,
      registerForm: {
        name: '',
        password: '',
        role: '',
      },
      formLabelWidth: '140px',
      ruleForm: {},
    }
  },
  watch: {
    showForm () {
      this.visible = this.showForm
    },
    visible () {
      this.$emit('closedialog', this.visible)
    }
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>