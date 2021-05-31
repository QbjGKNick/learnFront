<script>
import ButtonList from "@cci/cp-button-list"
export default {
  name: "ButtonList",
  mixins: [ButtonList],
  inject: {
    Page: {
      default: ""
    },
    Form: {
      default: ""
    }
  },
  props: {
    model: [Array, Object],
    operateBtnList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      newOperateBtnList: []
    }
  },
  computed: {
    btnList() {
      return (
        (this.operateBtnList.length &&
          this.operateBtnList.filter((item, index) =>
            this.itemsFilter(item, index)
          )) ||
        []
      )
    }
  },
  methods: {
    handleChangeStatus(methods, newStatus) {
      this.newOperateBtnList = this.newOperateBtnList.map(item => {
        if (item.methods === methods) {
          item = Object.assign(item, newStatus)
        }
        return item
      })
    },
    clickBinding(e, item, index) {
      this.$emit("button-list-click", e, item, index)

      let fn = null
      let isDoing = false
      if (typeof item.methods === "function") {
        fn = item.methods
      } else if (
        item.methods &&
        this.Page &&
        this.Page.hasOwnProperty(item.methods)
      ) {
        fn = this.Page[item.methods]
      }

      if (typeof fn === "function") {
        if (isDoing) {
          console.log("Place wait, Ajax is sending....")
          // eslint-disable-next-line
          return;
        } else {
          isDoing = true
        }
        const res = fn(this.model || {}, this.Form)
        if (res && res instanceof Promise) {
          res
            .then(() => {
              setTimeout(() => {
                isDoing = false
              }, 500)
            })
            .catch(() => {
              isDoing = false
            })
          return res
        } else {
          setTimeout(() => {
            isDoing = false
          }, 500)
        }
      }
    }
  },
  render(h) {
    this.newOperateBtnList = this.btnList
    return h(
      "div",
      { staticClass: "c-button-list" },
      this._l(this.newOperateBtnList, item => {
        const { icon, svgIcon, label, ...rest } = item
        const opts = this.baseOptions(rest)
        const labelPart = label && this._v(this._s(item.label))
        const svgPart =
          svgIcon && h("svg-icon", { attrs: { "icon-class": svgIcon }})
        const iconPart = icon && h("i", { class: [icon] })
        const children = [svgPart || iconPart, labelPart]

        if (item.slot) {
          return typeof item.slot === "function"
            ? item.slot(h, opts)
            : item.slot
        } else {
          return h("c-button", opts, children)
        }
      })
    )
  }
}
</script>
