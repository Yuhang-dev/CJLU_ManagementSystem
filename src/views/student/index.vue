<template>
  <div style="margin: 5px 0 5px 0;">
    <Header @resetquery="() => this.resetFuzzyQuery()" @fuzzyquery="e => fuzzyquery(e)"
      @newStudent="this.addNewStu = true;">
    </Header>
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
    <el-pagination v-model:page-size="pageSize" v-model:current-page="currentPage" :page-sizes="[5, 10, 20, 50]"
      :pager-count="pageCount" layout="sizes, prev, pager, next, jumper"
      :total="isFuzzyQuery ? totalFuzzyRecords : totalRecords" style="justify-content: center;margin-top: 10px;" />
  </div>
  <StuAdd @reload="reloadTable(1)" @changeVisible="e => this.addNewStu = e" :showForm=this.addNewStu></StuAdd>
  <Detail @RefreshTable="() => reloadTable(1)" @closedialog="e => this.showDetail = e" :showForm1="this.showDetail"
    v-bind="this.detailStudent"></Detail>
</template>

<script>
import { getStuList, queryCountApi, deleteStudent, fuzzyQuery } from '@/api/stu';
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
      detailStudent: {},
      fuzzyQueryData: [],
      isFuzzyQuery: false,
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
    resetFuzzyQuery () {
      this.isFuzzyQuery = false;
      this.fuzzyQueryData = [];
      this.currentPage = 1;
    },
    fuzzyquery (stu) {
      var _this = this
      _this.currentPage = 1
      fuzzyQuery(stu)
        .then((response) => {
          _this.isFuzzyQuery = true
          _this.fuzzyQueryData = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    reloadTable (n) {
      var _this = this
      _this.loading = true
      getStuList(n)
        .then((response) => {
          _this.loading = false
          _this.totalData = response.data
          ElMessage({
            type: 'success',
            message: '表格更新'
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
      this.detailStudent =
      {
        "stuid": row.stuid,
        "stunum": row.stunum,
        "stuname": row.stuname,
        "stusex": row.stusex,
        "studep": row.studep,
        "stubirth": row.stubirth,
        "stuidentification": row.stuidentification,
      }
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

          deleteStudent(row.stuid)
            .then((response) => {
              ElMessage({
                type: 'success',
                message: 'Delete success.'
              })
              reloadTable(1)
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
      if (_this.isFuzzyQuery) {

      } else {
        if (_this.currentPage * _this.pageSize < (_this.currentDatabasePage - 1) * _this.oneQueryAmount) {
          _this.currentDatabasePage = Math.floor((_this.currentPage * _this.pageSize / 100) + 1)
          _this.reloadTable(_this.currentDatabasePage)
        }
        else if (_this.currentPage * _this.pageSize > _this.currentDatabasePage * _this.oneQueryAmount) {
          _this.currentDatabasePage = Math.floor((_this.currentPage * _this.pageSize / 100) + 1)
          _this.reloadTable(_this.currentDatabasePage)
        }
      }
    }
  },
  computed: {
    totalFuzzyRecords () {
      return this.fuzzyQueryData.length
    },
    totalRecords () {
      return this.databaseTotal
    },
    currentTableData () {
      if (this.isFuzzyQuery) {
        if (this.search == null || this.search.length == 0 || this.search === '') {
          return this.fuzzyQueryData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize - 1)
        } else {
          var _this = this
          var searchData = _this.fuzzyQueryData.filter(function (element, index, self) {
            if (element.stuname.includes(_this.search)) {
              return element
            }
          })
          return searchData
        }
      } else {
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