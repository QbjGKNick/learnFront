<template>
    <div class="view-wrap-table">
        <WrapTable
        :total="total"
        :getData="getData"
        :data="data"
        :fields="columns"
        :selectionCol="false">
          <c-table-column
            prop="date"
            label="日期"
            width="180">
            </c-table-column>
        </WrapTable>
    </div>
</template>
<script>
import WrapTable from '@cci/cp-wrap-table'
import MemoryStore from '@cci/lib-store/src/proxyMemory.js'
export default {
  name: 'wrapTable',
  data() {
       this.store = new MemoryStore({ // 本地数据
        data: [{
          date: '2016-05-02',
          name: '王小虎',
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
      data:[],
      total: 0,
      columns: [
        // {
        //   prop: "date",
        //   label: "日期",
        //   width: "180"
        // },
        {
          prop: "name",
          label: "姓名",
          width: "180"
        },
        {
          prop: "address",
          label: "地址"
        },
        {
          label: '头像',
          prop: 'src',
          scopedSlots: {
          default: scope => (
            <img props-model={ scope.row } width="40px"  src={scope.row.src} />
          )
          }
        },
      ],
      page: 1,
      limit: 10,
      sizes: [10, 20, 30, 40]
    }
  },
  components: {
    WrapTable
  },
  
  created() {
  },
  methods: {
    getData({ page, limit }) {
      return this.store
        .read({ start: page, limit: limit })
        .then(({ data, total }) => {
                this.data = data
                this.total = total
        })
    }
  }

}
</script>
<style lang="scss">
.view-wrap-table{
    padding: 0 40px;
    box-sizing: border-box;
}
</style>

