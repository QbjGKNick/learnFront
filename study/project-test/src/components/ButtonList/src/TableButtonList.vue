
<script>
/* eslint-disable */
import ButtonList from "./ButtonList.vue";
export default {
  mixins: [ButtonList],
  name: "TableButtonList",
  methods: {
    itemsFilter(item) {
      item.class = ["btn"].concat(
        item.class || "",
        item.key ? `${item.key}-btn` : ""
      );
      if (!item.slot) {
        if (!item.svgIcon && !item.icon) {
          item.slot = (h, opts) => h("span", opts, [this._v(item.label)]);
        } else {
          item.slot = (h, opts) =>
            h(
              "c-tooltip",
              {
                attrs: {
                  effect: "dark",
                  content: item.label,
                  placement: item.align
                }
              },
              [
                h("a", opts, [
                  item.svgIcon
                    ? h("svg-icon", { props: { "icon-class": item.svgIcon } })
                    : h("i", { class: [item.icon] })
                ])
              ]
            );
        }
      }
      return true;
    }
  },
  render(h) {
    return h(
      "div",
      { staticClass: "c-button-list table-button-list" },
      this._l(this.operateBtnList, item => {
        const opts = this.baseOptions(item);

        if (item.slot) {
          return h("div", opts, [
            typeof item.slot === "function" ? item.slot(h, opts) : item.slot
          ]);
        } else {
          opts.class = [].concat(opts.class, [`${item.key}-btn`, "btn"]);

          if (!item.svgIcon && !item.icon) {
            return h("span", opts, [this._v(item.label)]);
          } else {
            return h(
              "c-tooltip",
              {
                attrs: {
                  effect: "dark",
                  content: item.label,
                  placement: item.align
                }
              },
              [
                h("a", opts, [
                  item.svgIcon
                    ? h("svg-icon", { props: { "icon-class": item.svgIcon } })
                    : h("i", { class: [item.icon] })
                ])
              ]
            );
          }
        }
      })
    );
  }
};
</script>
