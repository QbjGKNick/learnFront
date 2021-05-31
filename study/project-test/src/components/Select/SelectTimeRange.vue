<script>
  import SelectTime from '@cci/cp-select-time'

  const selectTimeRender = SelectTime.render || function() { return this._e() }

  export default {
    mixins: [SelectTime],
    props: {
      dataType: {
        type: String,
        default: 'daterange'
      },
      prefix: {
        type: Boolean,
        default: false
      },
      suffix: {
        type: Boolean,
        default: false
      },
      prefixInfo: {
        type: String,
        default: ''
      },
      suffixInfo: {
        type: String,
        default: ''
      }
    },
    render(h) {
      return (
        <div>
          {
            this.prefix ? (<span class="prefix">{ this.prefixInfo }</span>) : null
          }
          {
            selectTimeRender.call(this, h)
          }
          {
            this.suffix ? (<span class="suffix">{ this.suffixInfo }</span>) : null
          }
        </div>
      )
    }
  }
</script>
