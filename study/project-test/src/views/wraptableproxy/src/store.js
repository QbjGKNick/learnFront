import {ProxyAjax as AjaxStore} from '@cci/lib-store'
const { filterParam } = AjaxStore
export default {
  data() {
    return {
      addNodeInfoUrl: '/v1/sys/function/add',
      updateNodeInfoUrl: '/v1/sys/function/update',
      delNodeInfoUrl: '/v1/sys/function/delete',
      delNodeInfoListUrl: '/v1/sys/function/deleteList',
      url: '/v1/sys/function/query',
      store: new AjaxStore({
        url: '/v1/sys/function/query'
      })
    }
  },
  computed: {
    request() {
      return this.store.request
    }
  },
  methods: {
    listenCall(methods, data) {
      if (methods) {
        if (data) {
          this[methods](data)
        } else {
          this[methods]()
        }
      }
    },
    getNodeInfo(params) {
      return this.request({
        url: this.getNodeInfoUrl,
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: filterParam(params)
      })
    },
    addNodeInfo(ruleForm) {
      return this.request({
        url: this.addNodeInfoUrl,
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: filterParam(ruleForm)
      })
    },
    updateNodeInfo(ruleForm) {
      return this.request({
        url: this.updateNodeInfoUrl,
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: ruleForm
      })
    },
    delNodeInfo(funId) {
      return this.request({
        url: this.delNodeInfoUrl,
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          funId
        }
      })
    },
    delNodeInfoList(funIds) {
      return this.request({
        url: this.delNodeInfoListUrl,
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          funIds
        }
      })
    }
  }
}
