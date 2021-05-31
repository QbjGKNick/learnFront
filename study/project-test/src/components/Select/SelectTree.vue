<script>
import request from "@/utils/request"
import SelectTree from "@cci/cp-select-tree"
export default {
  mixins: [SelectTree],
  name: "SelectTree",
  props: {
    valueToLabelParams: {
      type: Object,
      default() {
        return {}
      }
    },
    isLoadAllNode: {
      type: Boolean,
      default: false
    },
    // 下拉树参数
    treeParams: {
      type: Object,
      default() {
        return {
          get: {
            url: "",
            // url: "/v1/sys/function/findNextChildNodeTree",
            nextNodeKey: "node",
            nextNodeValue: '',
            idKey: "id",
            getNextNode: Function
            // getNextNode 自定义获取节点函数
            /**
             * getNextNode(params, data) {
             *    params.node = data['id']
             *    params.groupId = '1'
             *    return request({
             *      url: ''
             *      methods: 'get'
             *    })
             * }
            */
          }
        }
      }
    }
  },
  data() {
    return {
      isSearch: false,
      assistanceParams: {}
    }
  },
  methods: {
    // 根据 id 查找 label
    getLabelById(value) {
      return new Promise((resolve) => {
        const { url, idKey } = this.valueToLabelParams
        if (!url || !value) return resolve(value)
        const params = {}
        params[idKey] = value
        request({
          url,
          methods: 'get',
          params
        }).then(({ data }) => {
          resolve(data)
        })
      })
    },
    // 重新加载下拉树后操作
    reload(data = {}, isSearch = false) {
      this.assistanceParams = data
      this.isSearch = !!isSearch
      this.refresh()
    },
    // 获取下一次树节点
    getNextNode({ data, level }, resolve) {
      if (level > 0 && (this.isLoadAllNode || this.isSearch)) {
        data = data[this.props.children]
        data && this.formatData(data, resolve)
      } else {
        // 非一次性获取
        // 一次性获取 顶层节点
        const params = {}
        const get = this.treeParams && this.treeParams.get
        if (get) {
          if (Object.keys(this.assistanceParams).length) {
            Object.keys(this.assistanceParams).forEach(k => {
              params[k] = this.assistanceParams[k]
            })
          }
          if (level > 0 && get.nextNodeKey && get.idKey) {
            params[get.nextNodeKey] = data[get.idKey]
          }
          (get.getNextNode && get.getNextNode(params, data) || request({
            url: get.url,
            method: "get",
            params
          })).then(({ data }) => {
            this.handleNoData(level, data)
            // 搜索 添加展开节点
            this.formatData(data, resolve)
            this.isSearch && this.allLoadExpand(data)
          }).catch(() => {
            this.handleNoData(level)
          })
        }
      }
    },
    handleNoData(level, data) {
      // 顶层 没有数据，或者数据为空
      if (level === 0 && (!data || (Array.isArray(data) && data.length === 0))) {
        this.$emit('selectTree-empty')
        return
      }
    }
  }
}
</script>

