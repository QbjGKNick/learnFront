<script>
/* eslint-disable */
import Form from "@cci/cp-form";
const components = {
  SelectTime: () => import("@/components/Select/SelectTime"),
  SelectTimeRange: () => import("@/components/Select/SelectTimeRange"),
  // SelectCode: () => import("@/components/Select/SelectCode"),
  // SelectConfig: () => import("@/components/Select/SelectConfig"),
  SelectTree: () => import("@/components/Select/SelectTree")
};
const componentList = Object.keys(components);

export default {
  mixins: [Form],
  components,
  beforeCreate() {
    this.R = this.R || {};
    componentList.forEach(name => {
      this.R[`${name}Render`] = function(h, item, opts) {
        if (!item.anchor) {
          item.anchor = {
            span: 8,
            lg: 12,
            sm: 12
          };
        }
        // console.log(item.anchor);
        opts.on["change"] = this.mixinEvent(
          opts.on["change"],
          this.handleChange.bind(this, item)
        );
        return [h(name, opts)];
      };
    });
  },
  methods: {
    handleChange(item, e) {
      this.model[item.prop] = e;
      this.emitRelated(e, item.relatedFields, item.ref || item.prop);
    }
  }
};
</script>
