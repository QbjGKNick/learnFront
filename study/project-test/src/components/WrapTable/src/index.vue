<script>
import WrapTable from '@cci/cp-wrap-table'

export default {
  mixins: [WrapTable],
  props: {
    paginationLayout: {
      type: String,
      default: "->, total, sizes,  prev, pager, next, jumper"
    },
  },
};
</script>
