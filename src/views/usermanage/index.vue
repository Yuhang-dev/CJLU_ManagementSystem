<template>
  <div class="table-wrapper">
    <el-table max-height="550" v-loading="loading" id="userdiv" element-loading-text="Loading..." :border="true"
      :default-sort="{ prop: 'uid', order: 'ascending' }" :data="currentTableData" stripe style="width: 100%;">
      <el-table-column sortable :width="tableWidth * 0.15" prop="uid" label="编号" />
      <el-table-column :width="tableWidth * 0.17" prop="username" label="用户名" />
      <el-table-column :width="tableWidth * 0.23" prop="password" label="密码" />
      <el-table-column :width="tableWidth * 0.25" prop="role" label="角色" />
      <el-table-column fixed="right" width="200">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:page-size="pageSize" v-model:current-page="currentPage" :page-sizes="[10, 20, 50, 5]"
      :pager-count="pageCount" layout="sizes, prev, pager, next, jumper" :total="totalRecords"
      style="justify-content: center;margin-top: 10px;" />
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      pageCount: 11,
      totalData: [],
      tableWidth: 0,
      loading: false,
      search: '',
    }
  },
  components: {
  },
  created () {
    this.loading = true
    getUserList()
      .then((response) => {
        // console.log(response)
        this.loading = false
        this.totalData = response.data.data
        ElMessage({
          type: 'success',
          message: response.msg
        })
      })
      .catch((error) => {
        ElMessage({
          type: 'error',
          message: response.msg
        })
        this.loading = false
        console.log(error)
      })
  },
  methods: {
    handleSizeChange () {
      console.log(this.pageSize)
    },
    handleEdit (index, row) {
      console.log(index, row)
      // console.log(row.stunum)
    },
    handleDelete (index, row) {
      ElMessageBox.confirm(
        '是否删除' + row.uid + "," + row.username + "?",
        '删除',
        {
          autofocus: false,
          draggable: true,
          type: 'warning',
          distinguishCancelAndClose: true,//可以区分按下关闭按钮还是Esc（或者点击遮罩层）退出
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'el-button el-button--danger is-plain',
        },
      )
        .then(() => {
          axios.delete('https://mock.presstime.cn/mock/64925b923acfaff9262afadc/studentlist/getstulist')
            .then((response) => {

            })
          ElMessage({
            type: 'success',
            message: 'Delete success.'
          })
        })
        .catch((action) => {
          ElMessage({
            type: 'info',
            message:
              action === 'cancel'
                ? 'Delete canceled.'
                : 'Receed'
          })
        })
    },

  },
  computed: {
    totalRecords () {
      return this.totalData.length
    },
    currentTableData () {
      if (this.search == null || this.search.length == 0 || this.search === '') {
        return this.totalData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize - 1)
      } else {
        var _this = this
        var searchData = _this.totalData.filter(function (element, index, self) {
          if (element.username.includes(_this.search)) {
            return element
          }
        })
        return searchData
      }
    },
  },
  mounted () {
    var _this = this;
    var tableWidthPx = window.getComputedStyle(document.getElementById('userdiv')).width;
    _this.tableWidth = tableWidthPx.slice(0, tableWidthPx.lastIndexOf('p'));
    window.onresize = () => {
      return (() => {
        var tableWidthPx = window.getComputedStyle(document.getElementById('userdiv')).width;
        _this.tableWidth = tableWidthPx.slice(0, tableWidthPx.lastIndexOf('p'));
      })()
    }
  }
}
</script>
<style scoped>
.table-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5px;
}

.cancel-button {
  color: aqua;
}
</style>