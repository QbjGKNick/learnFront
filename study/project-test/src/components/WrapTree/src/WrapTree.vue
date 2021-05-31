<script>
  import tree from '../tree'
  import ButtonList from '@/components/ButtonList'
  import Search from './search'
  import Select from './select'

  export default {
    name: 'WrapTree',
    mixins: [Search, Select],
    provide() {
      return {
        Page: this
      }
    },
    props: {
      // 字段中作为 label 显示的属性
      nodeLabelKey: {
        type: String,
        default: 'text'
      },
      // 字段中作为 tree 唯一标识属性
      nodeIdKey: {
        type: String,
        default: 'id'
      },
      // 字段中作为 子树 唯一标识属性
      nodeChildrenKey: {
        type: String,
        default: 'children'
      },
      // 字段中作为 叶子 唯一标识属性
      nodeLeafKey: {
        type: String,
        default: 'leaf'
      },
      // 字段中作为 节点选中 唯一标识属性
      nodeCheckedKey: {
        type: String,
        default: 'checked'
      },
      tree: {
        type: Object,
        default() {
          return {
            width: {
              type: String,
              default: '200'
            },
            height: {
              type: String,
              default: '500'
            },
            // select tree 组件
            selectTree: {
              type: Object,
              default() {
                return {
                  treeParams: {
                    get: {
                      url: "/v1/sys/function/findNextChildNodeTree",
                      nextNodeKey: "node",
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
                  },
                  valueToLabelParams: {
                    url: '/v1/dataProvider/getFunName',
                    idKey: 'funId'
                  },
                  clearable: true,
                  isLoadAllNode: false,
                  lazyCache: false,
                  // 下拉框出现时是否重新加载数据（或者传入函数自定义操作）
                  visibleChangeLoad: [Boolean, Function],
                  // 外部传入 selectVal 默认值
                  selectCodeVal: [String, Number],
                  // 字段中作为获取 select code key
                  selectCodeKey: {
                    type: String,
                    default: 'groupId'
                  }
                }
              }
            },
            // select code 组件
            selectCode: Object,
            selectConfig: Object,
            // 搜索框相关参数
            search: {
              type: Object,
              default: () => {}
            },
            // 是否初始自动加载
            autoLoad: {
              type: Boolean,
              default: true
            },
            // 懒加载 key, 默认 false
            lazy: {
              type: Boolean,
              default: false
            },
            // 字段中作为获取下一层子节点 key
            nextNodeKey: {
              type: String,
              default: 'node'
            },
            nextNodeValue: {
              type: String,
              default: ''
            },
            // 字段中作为增删改查 key
            idKey: {
              type: String,
              default: 'funId'
            },
            // 顶部面板标题
            title: {
              type: String,
              default: '组织关系'
            },
            // 外部传入菜单按钮数组
            treeMenuButtonList: {
              type: Array,
              default: () => []
            },
            // 外部传入树节点按钮数组或函数
            treeOperateButtonList: [Array, Function],
            // 是否显示标题
            isShowHeader: {
              type: Boolean,
              default: true
            },
            // 是否显示节点勾选框
            showCheckbox: {
              type: Boolean,
              default: false
            },
            checkList: {
              type: Array,
              default: () => []
            },
            // 父子节点是否强关联
            isCheckStrictly: {
              type: Boolean,
              default: false
            },
            // 勾选父节点不影响子节点，勾选子节点影响父节点
            isCheckParentOnly: {
              type: Boolean,
              default: false
            },
            // 是否只在同一级节点展开
            accordion: {
              type: Boolean,
              default: false
            },
            // 是否默认展开全部节点
            defaultExpandAll: {
              type: Boolean,
              default: false
            },
            // 是否高亮
            highlightCurrent: {
              type: Boolean,
              default: true
            },
            // 是否高亮
            expandOnClickNode: {
              type: Boolean,
              default: false
            },
            // 外部传入 icon
            iconSetting: [Function, Object],
            // 外部传入 renderContent 函数
            renderContent: Function,
            // 空白顶部节点
            emptyTopNode: {
              type: Object,
              default: () => ({})
            },
            // 外部传入获取子节点方法
            getNextChildNode: {
              type: Function,
              default: () => () => {}
            },
            // 外部传入删除节点方法
            delNode: {
              type: Function,
              default: () => () => {}
            }
          }
        }
      }
    },
    data() {
      return {
        key: 0, // 强制渲染树组件
        allLoadDefaultExpanded: [], // 默认展开数组
        isShowPanel: true,
        treeLoading: false,
        setTree: [], // 树状菜单数据
        filterText: '', // 搜索文本
        currentNode: null, // 当前节点
        currentAction: '',

        allLoadReload: this.tree.lazy || false,
        checked: this.tree.checkList || [], // 勾选数组
        selectVal: (this.tree.selectTree && this.tree.selectTree.selectCodeVal) ||
                    (this.tree.selectCode && this.tree.selectCode.selectCodeVal) ||
                    (this.tree.selectConfig && this.tree.selectConfig.selectCodeVal) || ''
      }
    },
    watch: {
      setTree(val, oldVal) {
        if (val && val.length === 0) {
          this.$emit('tree-empty')
        }
        if (oldVal && oldVal.length === 0 && val.length) {
          this.$emit('tree-loaded')
        }
      },
      allLoadReload(val) {
        val ? this.handleAllLoad() : this.refresh()
      },
      selectVal: {
        immediate: true,
        handler: function(val) {
          if (this.hasSelect) {
            this.$emit('tree-subSelect', val)
            this.refresh()
          }
        }
      },
      filterText(val, oldVal) {
        if (!val && val !== oldVal) {
          this.allLoadReload = false
        }
      }
    },
    computed: {
      defaultProps() {
        return {
          children: this.nodeChildrenKey,
          label: this.nodeLabelKey,
          isLeaf: this.nodeLeafKey
        }
      },
      autoLoad() {
        return this.tree.autoLoad !== false
      },
      width() {
        return this.tree.width || '200'
      },
      height() {
        return this.tree.height
      },
      selectTree() {
        return this.tree.selectTree || {}
      },
      selectConfig() {
        return this.tree.selectConfig || {}
      },
      selectCode() {
        return this.tree.selectCode || {}
      },
      search() {
        return this.tree.search || {}
      },
      searchKey() {
        return this.tree.search.searchKey || ''
      },
      nextNodeKey() {
        return this.tree.nextNodeKey || 'node'
      },
      idKey() {
        return this.tree.idKey || 'funId'
      },
      title() {
        return this.tree.title || '组织关系'
      },
      isShowHeader() {
        return this.tree.isShowHeader !== false
      },
      treeMenuButtonList() {
        return this.tree.treeMenuButtonList || []
      },
      treeOperateButtonList() {
        return this.tree.treeOperateButtonList || []
      },
      isCheckParentOnly() {
        return this.tree.isCheckParentOnly === true
      },
      isCheckStrictly() {
        return (!this.tree.isCheckParentOnly) && (this.tree.isCheckStrictly === true)
      },
      emptyTopNode() {
        return this.tree.emptyTopNode || {}
      },
      showCheckbox() {
        return this.tree.showCheckbox === true
      },
      accordion() {
        return this.tree.accordion === true
      },
      defaultExpandAll() {
        return this.tree.defaultExpandAll === true
      },
      highlightCurrent() {
        return this.tree.highlightCurrent === true
      },
      expandOnClickNode() {
        return this.tree.expandOnClickNode === false
      },
      iconSetting() {
        return this.tree.iconSetting || {
          // icon: 'el-icon-document',
          // svgIcon: 'folder',
          // class: 'test' || ['test1', 'test2']
        }
      },
      renderContent() {
        return this.tree.renderContent || this.renderNodeContent
      },
      getNextChildNode() {
        return this.tree.getNextChildNode || function() {}
      },
      delNode() {
        return this.tree.delNode || function() {}
      },
      selectCodeKey() {
        return (this.tree.selectTree && this.tree.selectTree.selectCodeKey) ||
                (this.tree.selectCode && this.tree.selectCode.selectCodeKey) ||
                (this.tree.selectConfig && this.tree.selectConfig.selectCodeKey) ||
                'groupId'
      },
      nextNodeValue() {
        return this.tree.nextNodeValue || ''
      },
      hasSelect() {
        const select = this.$slots.selectSlot ||
                        this.selectTree && Object.keys(this.selectTree).length ||
                        this.selectCode && Object.keys(this.selectCode).length ||
                        this.selectConfig && Object.keys(this.selectConfig).length
        return !!select
      }
    },
    methods: {
      // 重新渲染树组件
      reRenderTree() {
        this.key++
      },
      // 处理导入
      handleImport() {
        this.$emit('tree-import')
      },
      // 处理一次性全部加载节点默认展开
      defaultAllLoadExpandArr(arr) {
        const fn = arr => arr.reduce((prev, curr) => prev.concat(
          curr[this.nodeChildrenKey] && curr[this.nodeChildrenKey].length
            ? fn(curr[this.nodeChildrenKey])
            : curr[this.nodeIdKey]
        ), [])

        this.allLoadDefaultExpanded = fn(arr)
      },
      // 处理一次加载全部节点
      handleAllLoad(extraParams) {
        let params = {}
        this.treeLoading = true
        if (this.hasSelect && this.selectCodeKey) {
          params[this.selectCodeKey] = this.selectVal
        }
        if (this.searchKey && this.filterText) {
          params[this.searchKey] = this.filterText
        }
        if (this.nextNodeKey && this.nextNodeKey) {
          params[this.nextNodeKey] = this.nextNodeValue
        }
        if (extraParams) {
          params = Object.assign({}, params, extraParams)
        }
        this.getNextChildNode(params)
          .then(({ data }) => {
            this.treeLoading = false
            this.traverseChecked(data)
            // 默认展开全部
            this.defaultAllLoadExpandArr(data)
            this.setTree = data
            // 遍历勾选
            this.setAllChecked()
            // 派发 tree-empty 事件，不选中节点
            if (this.filterText) {
              this.$emit('tree-empty')
            }
          }).catch(err => {
            console.log(err)
          })
      },
      // 处理搜索
      handleSearch() {
        if (this.filterText) {
          if (!this.allLoadReload) {
            this.allLoadReload = true
          } else {
            this.handleAllLoad()
          }
        }
      },
      handleInputClick() {
        this.handleSearch()
      },
      // 切换顶部菜单
      toggleMenu() {
        this.isShowPanel = !this.isShowPanel
      },
      // 顶部菜单新增
      handleMenuAdd() {
        this.handleAdd()
      },
      handleNodeBtnClick(e) {
        let x = e.target
        while (!x.classList.contains('ButtonList')) {
          x = x.parentNode
        }
        this.currentAction = x.getAttribute('action')
      },
      // 点击节点
      handleNodeClick(data, node) {
        this.currentNode = node
        switch (this.currentAction) {
          case 'plus':
            this.handleAdd(node)
            break
          case 'delete':
            this.handleDel(node)
            break
          case 'custom':
            this.handleCustomOpt(node)
            break
          default:
            this.handleCheck(node)
            break
        }
      },
      handleCustomOpt() {
        this.currentAction = ""
      },
      // 触发新增节点
      handleAdd(node) {
        this.currentAction = ''
        this.$emit('add-treeNode', node)
      },
      // 查看节点
      handleCheck(node) {
        this.currentAction = ''
        this.currentNode = node
        this.$emit('check-treeNode', node)
      },
      // 展开节点
      handleNodeExpand(nodeData, expandFlag) {
        if (!nodeData || !nodeData[this.nodeIdKey]) {
          return
        }
        return new Promise((resolve) => {
          const params = {
            [this.nextNodeKey]: nodeData[this.nodeIdKey]
          }
          if (this.hasSelect) {
            params[this.selectCodeKey] = this.selectVal
          }
          this.getNextChildNode(params)
            .then(({ data }) => {
              // 分层展开节点 处理非子节点
              Array.isArray(data) && data.length && data.forEach(item => {
                if (!item[this.nodeLeafKey]) {
                  item[this.nodeChildrenKey] = [{}]
                }
                this.setInitalChecked(item)
              })
              // children 字段
              this.$set(nodeData, this.nodeChildrenKey, data)
              // 是否需要手动展开
              if (expandFlag) {
                this.$refs.tree.getNode(nodeData).expanded = true
              }
              // 遍历勾选
              this.setAllChecked()

              resolve(data)
            }).catch(e => {
              console.log(e)
            })
        })
      },
      // 触发勾选
      handleChecked(data, node) {
        this.checked = node.checkedKeys
        this.$emit('tree-selected', node.checkedKeys, node.checkedNodes, node.halfCheckedKeys, node.halfCheckedNodes)
      },
      // 获取勾选
      getChecked() {
        return this.$refs.tree.getCheckedKeys()
      },
      // 获取半勾选
      getHalfChecked() {
        return this.$refs.tree.getHalfCheckedKeys()
      },
      // 获取勾选 node list
      getCheckedNodes() {
        return this.$refs.tree.getCheckedNodes()
      },
      // 获取半勾选 node list
      getHalfCheckedNodes() {
        return this.$refs.tree.getHalfCheckedNodes()
      },
      // 删除选中
      deleteChecked(id) {
        if (this.checked.length) {
          const index = this.checked.indexOf(id)
          index > -1 && this.checked.splice(index, 1)
        }
      },
      // 初始选中
      setInitalChecked(item) {
        if (this.showCheckbox) {
          // 父子不关联
          this.isCheckStrictly || this.isCheckParentOnly
            ? item[this.nodeCheckedKey] && this.initalChecked(item)
            : item[this.nodeLeafKey] && item[this.nodeCheckedKey] && this.initalChecked(item)
        }
      },
      initalChecked(item) {
        const index = this.checked.indexOf(item[this.nodeIdKey])
        index === -1 && this.checked.push(item[this.nodeIdKey])
      },
      // 遍历选中
      traverseChecked(arr) {
        this.showCheckbox && arr.length && arr.forEach(item => {
          item.expanded = true
          // 如果有勾选
          this.setInitalChecked(item)
          if (item[this.nodeChildrenKey] && item[this.nodeChildrenKey].length) {
            this.traverseChecked(item[this.nodeChildrenKey])
          }
        })
      },
      // 全部选中
      setAllChecked(checkedList = this.checked) {
        this.showCheckbox && this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(checkedList)
          this.$emit('tree-selected', this.getChecked(), this.getCheckedNodes(), this.getHalfChecked(), this.getHalfCheckedNodes())
        })
      },
      // 设置选中
      setChecked(checkedList) {
        this.checked = checkedList
      },
      // 清空选中
      emptyChecked() {
        this.checked = []
      },
      // 选中当前节点
      setCurrentNodeById(id) {
        this.$refs.tree.setCurrentKey(id)
        this.currentNode = this.getNodeById(id)
      },
      // 获取节点
      getNodeById(id) {
        return this.$refs.tree.getNode(id)
      },
      // 删除 tree 本地节点
      delLocalTree(node) {
        this.$refs.tree.remove(node)
      },
      // 调用删除接口
      delByAjax(node) {
        const params = {
          [this.idKey]: node.data[this.nodeIdKey]
        }
        this.delNode(params)
          .then(({ success }) => {
            if (success) {
              this.$message.success('删除节点成功！')
              this.delLocalTree(node)
              // 从当前树中删除节点, 当前节点为父节点
              let pNode = null
              if (node.parent) {
                pNode = node.parent
              } else {
                if (this.setTree.length === 0) {
                  this.handleMenuAdd()
                  return
                } else {
                  pNode = this.getNodeById(this.setTree[0][this.nodeIdKey])
                }
              }
              this.currentNode = pNode
              this.$refs.tree.setCurrentKey(pNode.data[this.nodeIdKey])
              this.$emit('del-treeNode', pNode)
              // 如果开启勾选，重新触发当前选中
              this.showCheckbox && this.deleteChecked(node[this.nodeIdKey])
            } else {
              return false
            }
          }).catch(err => {
            console.log(err)
          })
      },
      // 触发删除节点
      handleDel(node) {
        this.currentAction = ''
        // if (node.data[this.nodeChildrenKey] || node.data[this.nodeChildrenKey].toString() !== '') {
        this.$confirm('确定删除此节点？', '提示', {
          confirmBottonText: '确认',
          cancelBottomText: '取消',
          type: 'warning'
        }).then(() => {
          this.delByAjax(node)
        }).catch(() => {
          return false
        })
        // } else {
        //   this.delByAjax(node)
        // }
      },
      // 初始选中第一项
      init() {
        this.$nextTick(() => {
          const node = this.$refs.tree.getNode(this.setTree[0])
          if (node) {
            if (this.emptyTopNode && Object.keys(this.emptyTopNode).length) {
              node.expanded = true
            }
            this.$refs.tree.setCurrentKey(node.data[this.nodeIdKey])
            this.handleCheck(node)
            this.currentNode = node
          }
        })
      },
      // 折叠节点
      fold() {
        this.setTree.forEach(item => {
          this.$refs.tree.getNode(item).expanded = false
        })
        this.init()
      },
      // 设置顶部空白节点
      setEmptyTopNode(data) {
        if (this.emptyTopNode && Object.keys(this.emptyTopNode).length) {
          this.emptyTopNode[this.nodeChildrenKey] = data
          this.emptyTopNode['expanded'] = this.emptyTopNode['expanded'] || true
          this.emptyTopNode['leaf'] = this.emptyTopNode['leaf'] || false
          this.emptyTopNode['id'] = this.emptyTopNode['id'] || ''
          this.emptyTopNode['text'] = this.emptyTopNode['text'] || ''
          return [this.emptyTopNode]
        } else {
          return data
        }
      },
      // 刷新节点
      refresh(extraParams) {
        if (this.allLoadReload) {
          this.filterText = ''
        }
        this.treeLoading = true
        let params = {}
        if (this.hasSelect && this.selectCodeKey) {
          params[this.selectCodeKey] = this.selectVal
        }
        if (extraParams) {
          params = Object.assign({}, params, extraParams)
        }
        ((Object.keys(params).length && this.getNextChildNode(params)) || this.getNextChildNode())
          .then(({ data }) => {
            this.treeLoading = false
            // 处理分层获取节点 非子节点
            Array.isArray(data) && data.length && data.forEach(item => {
              if (!item[this.nodeLeafKey]) {
                item[this.nodeChildrenKey] = [{}]
              }
              // 如果有勾选
              this.setInitalChecked(item)
            })
            this.setTree = this.setEmptyTopNode(data)
            // 遍历勾选
            this.setAllChecked()
            // 是否默认展开全部
            this.defaultExpandAll ? this.expand() : this.init()
          }).catch(err => {
            console.log(err)
          })
      },
      // 展开节点
      expand(id = '') {
        this.allLoadReload
          ? this.handleAllLoadExpand()
          : this.handleOneLayerNodeExpand()
            .then(() => {
              // 根据传入 id 或者 当前节点 id 选中
              id = /number|string/.test(typeof id) && id || this.currentNode.data[this.nodeIdKey]
              if (id) {
                this.$refs.tree.setCurrentKey(id)
                const node = this.$refs.tree.getNode(id)
                node && this.handleCheck(node)
              }
              this.setAllChecked()
            })
      },
      // 处理全部加载节点展开
      handleAllLoadExpand() {
        const fn = arr => {
          Array.isArray(arr) && arr.length && arr.forEach(item => {
            if (item[this.nodeChildrenKey] && item[this.nodeChildrenKey].length) {
              this.$refs.tree.getNode(item).expanded = true
              fn(item[this.nodeChildrenKey])
            }
          })
          this.setAllChecked()
        }
        fn(this.setTree)
      },
      // 处理分层节点展开
      handleOneLayerNodeExpand() {
        return new Promise((resolve, reject) => {
          const expandArr = Array.isArray(this.setTree) && this.setTree.length && this.setTree.filter(item => !item[this.nodeLeafKey]) || []

          const fn = async() => {
            try {
              const item = expandArr.shift()
              const data = item && await this.handleNodeExpand(item, true)
              data.length && data.forEach(item => !item[this.nodeLeafKey] && expandArr.push(item))
              expandArr.length ? fn() : resolve()
            } catch (err) {
              reject(err)
            }
          }
          fn()
        })
      },
      // 加载
      load(extraParams) {
        this.resetSelectVal()
        this.emptyChecked()
        this.setTree = []
        this.allLoadReload ? this.handleAllLoad(extraParams) : this.refresh(extraParams)
      },
      resetSelectVal() {
        this.selectVal = (this.tree.selectTree && this.tree.selectTree.selectCodeVal) ||
                            (this.tree.selectCode && this.tree.selectCode.selectCodeVal) ||
                            (this.tree.selectConfig && this.tree.selectConfig.selectCodeVal) || ''
      },
      // 组装渲染树组件参数
      formTreeParams() {
        const defaultTreeParams = {
          ref: "tree",
          staticClass: "expand-tree",
          directives: [{
            name: "loading",
            value: this.treeLoading
          }],
          props: {
            data: this.setTree,
            "node-key": this.nodeIdKey,
            accordion: this.accordion,
            "highlight-current": this.highlightCurrent,
            "show-checkbox": this.showCheckbox,
            "default-expand-all": this.defaultExpandAll,
            "default-checked-keys": this.checked,
            props: this.defaultProps,
            "check-strictly": this.isCheckStrictly,
            "check-parent": this.isCheckParentOnly,
            "expand-on-click-node": this.expandOnClickNode,
            "render-content": this.renderNodeContent
          },
          on: {
            "node-click": this.handleNodeClick,
            check: this.handleChecked
          }
        }
        const customTreeParams = !this.allLoadReload ? {
          on: {
            "node-expand": this.handleNodeExpand
          }
        } : {
          props: {
            "default-expanded-keys": this.allLoadDefaultExpanded
          }
        }
        return {
          defaultTreeParams,
          customTreeParams
        }
      },
      // 渲染树节点内容
      renderNodeContent(h, { node, data }) {
        // 处理 icon 数据
        let iconSetting = typeof this.iconSetting === 'function'
          ? this.iconSetting(node, data)
          : this.iconSetting

        iconSetting = iconSetting.icon && (<i class={ [iconSetting.icon].concat(iconSetting.class || []) }/>) ||
                      iconSetting.svgIcon && (<svg-icon icon-class={ iconSetting.svgIcon } class={ [].concat(iconSetting.class) }/>) || ''

        // 处理 树节点按钮
        const btnList = Array.isArray(this.treeOperateButtonList)
          ? this.treeOperateButtonList
          : this.treeOperateButtonList(node.data, node)

        return (
          <span class="tree-expand">
            <span v-show={ iconSetting }>{ iconSetting }</span>
            <span class="tree-label">
              { this.$scopedSlots.renderNodeLabel ? this.$scopedSlots.renderNodeLabel(node, data) : node.label }
            </span>
            <span
              class="tree-btn"
              on-click={ this.handleNodeBtnClick }
              v-show={ btnList && btnList.length && this.currentNode === node }>
              <ButtonList
                props-model={ node }
                operateBtnList={ btnList } />
            </span>
          </span>
        )
      }
    },
    render() {
      const { defaultTreeParams, customTreeParams } = this.formTreeParams()

      return (
        <div class="wrap-tree">
          <div class="panel-expand-btn" on-click={ this.toggleMenu } v-show={ !this.isShowPanel } >
            <span class="title">{ this.title }</span>
            <i class="el-icon-caret-right" title="展开面板"></i>
          </div>
          <div class="panel" v-show={ this.isShowPanel } style={{ 'width': this.width + 'px' }}>
            <div class="topMenu">
              <div class="header" v-show={ this.isShowHeader }>
                <span class="title">{ this.title }</span>
                <i class="el-icon-caret-left" on-click={ this.toggleMenu } title="隐藏面板"></i>
              </div>
              { this.renderSelectSlot() }
              <ButtonList class="treeMenuBtn" operateBtnList={ this.treeMenuButtonList } />
              { this.renderSearch() }
            </div>
            { this.$slots.default }
            <c-scrollbar
              tag="div"
              wrap-class="el-select-dropdown__wrap"
              view-class="el-select-dropdown__list"
              class="is-empty scroll-tree"
              style={{ 'max-height': this.height + 'px', 'height': this.height + 'px', 'overflow-y': 'auto' }}
            >
              <tree
                key={ this.key }
                {...defaultTreeParams}
                {...customTreeParams}
              ></tree>
            </c-scrollbar>
          </div>
        </div>
      )
    },
    mounted() {
      // selectVal watch 改变会立即调用 refresh
      !this.hasSelect && this.autoLoad && this.load()
    },
    components: {
      tree,
      ButtonList
    }
  }
</script>
