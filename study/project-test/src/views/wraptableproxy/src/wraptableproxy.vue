<template>
  <div class="page page-demo">
    <SearchForm
      ref="searchForm"
      :items="searchFields"
      :inline="true"
      :model="searchModel"
      label-width="120px"
    />
    <WrapTable
      ref="table"
      :total="total"
      :data="data"
      empty-column-text="88888"
      :fields="columns"
      :selection-col="true"
      :indexCol="true"
      @load="getData"
      @row-dblclick="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <div slot="append" class="empty">
        <p>append text.....</p>
      </div>
      <c-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <c-table-column
        prop="date1"
        label="日期1"
        width="180"
      />
    </WrapTable>
  </div>
</template>
<script>
  import SearchForm from '@/components/SearchForm'
  import WrapTable from '@cci/cp-wrap-table'
  import { ProxyMemory } from '@cci/lib-store'

  export default {
    name: 'supervison',
    components: {
      WrapTable,
      SearchForm
    },
    data() {
      this._store = new ProxyMemory({ // 本地数据
        data: [{
          date: '2016-05-02',
          status: 1,
          name: '',
          src: '',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          src: '',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      })
      return {
        dialogVisible: false,
        data: [],
        total: 0,
        xStore: [
          { label: "美食/餐厅线上活动", value: 0 },
          { label: "地推活动", value: 1111 },
          { label: "线下主题活动", value: 2 },
          { label: "单纯品牌曝光", value: 3 }
        ],
        searchModel: {
          "funId": '',
          "funName": '',
          "location": '',
          "pid": '',
          "orderNo": '',
          "funType": '',
          "funType1": 2,
          "logFlag": 1,
          "icon": '',
          "version": ''
        },
        searchFields: [
          { label: '任务编号', prop: 'funId', placeholder: '请输入任务编号', anchor: 8, focus: true },
          { label: '任务类型', prop: 'funType1', xType: 'select',
            xStore: () => { return this.xStore },
            on: {
              change: ()=>{
                console.log("hehehhe",arguments)
              }
            },
            relatedFields:['funId'],
            anchor: 8
          },
          { label: '审批类别', prop: 'funId', placeholder: '请输入审批类别', anchor: 8, focus: true,
            on: {
              "el.form.update":(a,b,c,d)=>{
                this.searchModel.funId = 'adfadfa'
                console.log("ab",a,b,c,d)
              }
            }
          },
          { label: '广告设置人', prop: 'funName', placeholder: '输入广告设置人', anchor: 8 },
          { label: '地址', prop: 'location', placeholder: '输入地址', anchor: 8 },
          { label: '本环节开始时间', prop: 'orderNo', placeholder: '输入排序号', anchor: 8 },
          { label: '记日志', prop: 'logFlag', xType: 'switch', anchor: 8, "active-value": 1, "inactive-value": 0 },
          { label: '图标', prop: 'icon', anchor: 8 },
          { label: '版本', prop: 'version', anchor: 8 }
        ],
        columns: [
          {
            prop: "status",
            label: "status",
            formatter: (row, col, val) => val ? 'r':'y',
          },
          {
            group: [{ label: 't1', 'header-align': 'center' }],
            prop: "name",
            label: "姓名",
            width: "180",
            formatter: (row, col, val) => val || '--',
            "show-overflow-tooltip": true
          },
          {
            group: ['t1'],
            prop: "address",
            label: "地址"
          },
          {
            group: ['t1'],
            prop: "add",
            label: "add"
          },
          {
            label: '头像',
            prop: 'src',
            scopedSlots: {
              default: scope => (
                <img props-model={ scope.row } width="40px" src={scope.row.src} />
              )
            }
          },
          {
            group: [{label:'time','header-align': 'center'}],
            prop: "date",
            label: "date1"
          },
          {
            group: ['time'],
            prop: "date2",
            label: "date2"
          },
        ],
        page: 1,
        limit: 10,
        sizes: [10, 20, 30, 40],
      }
    },
    computed: {},
    mounted() {
      this.$refs.searchForm.$on('el.form.update',(a,b,c,d)=>{
        console.log("el.form.update",a,b,c,d)
      })
    },
    methods: {
      handleClose() {
        // console.log("handleClose", 1)
      },
      clear() {
        this.$refs.table.clearSelection()
      },
      handleRowClick(row) {
        console.log('demo:handleRowClick', row)
      },
      handleSelectionChange(list) {
        console.log("demo:handleSelectionChange", list)
      },
      getData({ page, limit }) {
        // console.log(page, limit)
        this._store
          .read({ start: page, limit: limit })
          .then(({ data, total }) => {
            // setTimeout(() => {
              this.data = data
              this.total = total
            // }, 500)
          })
      }
    }
  }
</script>
<style lang="scss">
.page-demo{
  padding: 20px 40px 0;
  width: 100%;
  .cp-qrcode{
    margin: 50px;
  }
}
</style>

