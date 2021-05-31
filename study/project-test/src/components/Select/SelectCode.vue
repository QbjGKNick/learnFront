<script>
import SelectBase from './SelectBase'
import jsonCode from '@/utils/store/jsonCode.js'
import { getCodeList } from '@/api/dictionary'
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
    }
  },
  computed: {

  },
  created() {
    if (!this.isLocal) {
      this.getCode()
    } else {
      const data = jsonCode(this.dataType)
      this.data = data && this.formData(data)
    }
  },
  methods: {
    getCode() {
      this.dataType && getCodeList(this.dataType).then(({ data }) => {
        data && (this.data = this.formData(data))
      }).catch(err => console.log(err))
    }
  }
}
</script>

