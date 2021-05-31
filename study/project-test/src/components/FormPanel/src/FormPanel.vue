<script>
import Form from '@/components/Form'
export default {
  mixins: [Form],
  render(h) {
    return (
      <div class="formPanel" >
        {
          this._t('title')
        }
        {
          this.wrapForm(h, [h('c-row', { staticClass: 'fields-box' }, this.renderItems(h, this.items))])
        }
        {
          this.fieldsLength > this.defaultItemsLength ? (
            <span class="see-more" onClick={this.handleShowAll } >
              <i class={ this.showAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down' }></i>
            </span>
          ) : ''
        }
        {
          this._t('default')
        }
      </div>
    )
  }
}
</script>

