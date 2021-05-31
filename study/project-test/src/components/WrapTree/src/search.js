export default {
  methods: {
    renderSearch() {
      if (this.search && Object.keys(this.search).length) {
        return (
          <c-input
            class="search-input"
            placeholder="输入关键字进行过滤"
            size="small"
            value={ this.filterText }
            on-input={ event => { this.filterText = event } }
            nativeOnKeydown={(ev) => { ev.keyCode === 13 && this.handleInputClick(ev, this.filterText) } } >
            <i slot="suffix" class="el-input__icon el-icon-search" on-click={ (ev) => this.handleInputClick(ev, this.filterText) }></i>
          </c-input>
        )
      }
    }
  }
}
