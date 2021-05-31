import SelectTree from '@/components/Select/SelectTree'
import SelectCode from '@/components/Select/SelectCode'
import SelectConfig from '@/components/Select/SelectConfig'

export default {
  methods: {
    // 自定义下拉，包括下拉树组件、代码字典、配置字典等
    renderSelectSlot() {
      let selectSlot
      // 处理没有自定义下拉情况
      if (!this.$slots.selectSlot) {
        const defaultSelectOpt = {
          clearable: true,
          dataType: '',
          isLocal: true
        }
        const opt = {
          staticClass: 'select',
          attrs: {
            value: this.selectVal
          },
          on: {
            change: value => { this.selectVal = value },
            selectTreeEmpty: () => { this.selectVal = '' }
          }
        }
        if (this.selectTree && Object.keys(this.selectTree).length) {
          const defaultSelectTreeOpt = {
            visibleChangeLoad: false,
            isLoadAllNode: false,
            lazyCache: false,
            treeParams: {},
            valueToLabelParams: {},
            clearable: true
          }
          const props = Object.assign({}, defaultSelectTreeOpt, this.selectTree)
          const selectTreeOpt = Object.assign({}, opt, {
            props,
            on: {
              'visible-change': val => {
                props.visibleChangeLoad && val && this.handleVisibleChange(props.visibleChangeLoad)
              },
              change: value => {
                this.selectVal = value
              }
            }
          })
          selectSlot = (
            <SelectTree ref="selectTree" {...selectTreeOpt}/>
          )
        }
        if (this.selectCode && Object.keys(this.selectCode).length) {
          const selectCodeOpt = Object.assign({}, opt, {
            props: {
              ...Object.assign({}, defaultSelectOpt, this.selectCode)
            }
          })
          selectSlot = (
            <SelectCode ref="selectCode" {...selectCodeOpt}/>
          )
        }
        if (this.selectConfig && Object.keys(this.selectConfig).length) {
          const selectConfigOpt = Object.assign({}, opt, {
            props: {
              ...Object.assign({}, defaultSelectOpt, this.selectConfig)
            }
          })
          selectSlot = (
            <SelectConfig ref="selectConfig" {...selectConfigOpt}/>
          )
        }
      }
      if (this.$slots.selectSlot || selectSlot) {
        return (<div class="select-wrap">{ this.$slots.selectSlot || selectSlot }</div>)
      }
    },
    // 重现加载 selectTree 组件数据
    handleSelectTreeReload(data) {
      this.$refs.selectTree.reload(data)
    },
    // 处理 select tree 下拉框出现时操作
    handleVisibleChange(visible) {
      typeof visible === 'boolean'
        ? this.$refs.selectTree.reload()
        : visible()
    }
  },
  components: {
    SelectTree,
    SelectCode,
    SelectConfig
  }
}
