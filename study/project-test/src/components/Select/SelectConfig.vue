<script>
import SelectBase from './SelectBase'
import jsonCodeConfig from '@/utils/store/jsonCodeConfig.js'
import { getConfigCodeList } from '@/api/dictionary'
export default {
  mixins: [SelectBase],
  props: {
    dataType: {
      type: String,
      default: ''
    },
    isLocal: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    autoLoad: {
      type: Boolean,
      default: true
    },
    getData: {
      type: Function,
      default() {
        return getConfigCodeList(this.dataType).then(({ data }) => {
          this.handleNoData(data)
          return this.formData(data)
        }).catch(err => {
          // eslint-disable-next-line
          console.log(err)
          this.handleNoData()
        })
      }
    }
  },
  methods: {
    handleNoData(data) {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        this.$emit('change', '')
        return
      }
    },
    load(params) {
      if (!this.isLocal) {
        this.getData(params).then((data) => {
          this.data = data
        })
      } else {
        const data = jsonCodeConfig(this.dataType)
        this.data = data && this.formData(data)
      }
    }
  },
  created() {
    this.autoLoad && this.load()
  }
}
</script>
