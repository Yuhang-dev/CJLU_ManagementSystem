<template>
  <div style="margin: 5px 0 5px 0;">
    <Header @newStudent="this.addNewStu = true;"></Header>
  </div>
  <div class="table-wrapper">
    <el-table max-height="550" v-loading="loading" id="studiv" element-loading-text="Loading..." :border="true"
      :default-sort="{ prop: 'stunum', order: 'ascending' }" :data="currentTableData" stripe style="width: 100%;">
      <el-table-column sortable :width="tableWidth * 0.10" prop="stunum" label="学号" />
      <el-table-column :width="tableWidth * 0.12" prop="stuname" label="姓名" />
      <el-table-column :width="tableWidth * 0.08" prop="stusex" label="性别" />
      <el-table-column :width="tableWidth * 0.20" prop="studep" label="院系" />
      <el-table-column sortable :width="tableWidth * 0.20" prop="stubirth" label="出生日期" />
      <el-table-column :width="tableWidth * 0.20" prop="stuidentification" label="证件号码" />
      <el-table-column fixed="right" width="150">
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
  <StuAdd @reload="reloadTable(1)" @changeVisible="e => this.addNewStu = e" :showForm=this.addNewStu></StuAdd>
  <Detail @closedialog="e => this.showDetail = e" :showForm1="this.showDetail" :stuid="this.detailStuId"></Detail>
</template>

<script>
import { getStuList, queryCountApi } from '@/api/stu'
import Header from './components/StudentHeader.vue';
import StuAdd from './components/StudentAdd.vue';
import Detail from './components/StudentDetail.vue';
import { ElMessage } from 'element-plus';

export default {
  data () {
    return {
      addNewStu: false,
      showDetail: false,
      currentPage: 1,
      pageSize: 10,
      pageCount: 11,
      totalData: [],
      tableWidth: 0,
      loading: false,
      search: '',
      databaseTotal: 0,
      oneQueryAmount: 100,
      currentDatabasePage: 1,
      detailStuId: '',
    }
  },
  components: {
    Header,
    StuAdd,
    Detail,
  },
  created () {
    this.loading = true
    getStuList(1)
      .then((response) => {
        this.loading = false
        this.totalData = response.data
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

    queryCountApi()
      .then((response) => {
        this.databaseTotal = response.data
      })
      .catch((error) => {
        console.log(error)
        ElMessage({
          type: 'error',
          message: '无法连接数据库',
        })
      })
  },
  methods: {
    reloadTable (n) {
      var _this = this
      _this.loading = true
      getStuList(n)
        .then((response) => {
          _this.loading = false
          _this.totalData = response.data
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
          _this.loading = false
          console.log(error)
        })
    },
    handleSizeChange () {
      console.log(this.pageSize)
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.showDetail = true;
      // console.log(row.stunum)
      this.$emit('stuid', row.stuid)
    },
    handleDelete (index, row) {
      ElMessageBox.confirm(
        '是否删除' + row.stunum + "," + row.stuname + "?",
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
  watch: {
    currentPage () {
      var _this = this
      console.log(_this.currentPage)
      if (_this.currentPage * _this.pageSize < (_this.currentDatabasePage - 1) * _this.oneQueryAmount) {
        _this.currentDatabasePage = Math.floor((_this.currentPage * _this.pageSize / 100) + 1)
        _this.reloadTable(_this.currentDatabasePage)
      }
      else if (_this.currentPage * _this.pageSize > _this.currentDatabasePage * _this.oneQueryAmount) {
        _this.currentDatabasePage = Math.floor((_this.currentPage * _this.pageSize / 100) + 1)
        _this.reloadTable(_this.currentDatabasePage)
      }
    }
  },
  computed: {
    totalRecords () {
      return this.databaseTotal
    },
    currentTableData () {
      if (this.search == null || this.search.length == 0 || this.search === '') {
        return this.totalData.slice((this.currentPage - 1) * this.pageSize - (this.currentDatabasePage - 1) * this.oneQueryAmount,
          this.currentPage * this.pageSize - 1 - (this.currentDatabasePage - 1) * this.oneQueryAmount)
      } else {
        var _this = this
        var searchData = _this.totalData.filter(function (element, index, self) {
          if (element.stuname.includes(_this.search)) {
            return element
          }
        })
        return searchData
      }
    },
  },
  mounted () {
    var _this = this;
    var tableWidthPx = window.getComputedStyle(document.getElementById('studiv')).width;
    _this.tableWidth = tableWidthPx.slice(0, tableWidthPx.lastIndexOf('p'));
    window.onresize = () => {
      return (() => {
        var tableWidthPx = window.getComputedStyle(document.getElementById('studiv')).width;
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