<script>
  function parseUrl(url) {
    if (Object.prototype.toString.call(url) !== '[object String]') {
      return { url: '', isExternal: false }
    }
    if (/^https?:\/\//.test(url)) {
      return {
        url: '/iframe/' + encodeURIComponent(url),
        isExternal: true
      }
    } else if (url.substring(0, 8) === '/iframe/') {
      return {
        url,
        isExternal: true
      }
    } else if (url.charAt(0) === '/') {
      return {
        url: url.toLocaleLowerCase(),
        isExternal: false
      }
    } else {
      return { url: '', isExternal: false }
    }
  }
  export default {
    name: "CpSidebar",
    props: {
      menu: {
        type: Array,
        default: () => []
      },
      defaultOpeneds:{
        type: Array,
        default: () => []
      },
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      menu: {
        immediate: true,
        handler() {
          this.menuCache = {}
        }
      }
    },
    methods: {
      handleMenuClick(index) {
        // console.log('handleMenuClick:::', index, this.menuCache[index])
        this.$emit('menuChange', this.menuCache[index])
      },
      r(h, subMenu, level) {
        const { url, isExternal } = parseUrl(subMenu.url)
        const eventnums = subMenu.eventNums
        const children = Object.prototype.toString.call(subMenu.children) === "[object Array]" ? subMenu.children.filter(item => { return item.nodeType !== 3 }) : []
        let {id , name = [].concat(subMenu.pids || [], id).join('-') }= subMenu
        if (name) {
          this.menuCache[name] = subMenu
        }
        if (children && children.length) {
          return (
            <c-submenu class={`level_${level}`} index={ name } on-click={ this.handleMenuClick.bind(this, subMenu) }>
              <div slot="title">
                {
                  url
                    ? (<router-link to={ { path: url } } >
                      <span class="submenu-title-noDropdown">{ subMenu.text }
                      {
                        eventnums > 0 ? (
                          <span class="infoNum">{subMenu.eventNums}</span>
                        ) : null
                      }
                    </span>
                    </router-link>)
                    : <span class="submenu-title-noDropdown">{ subMenu.text }
                    {
                        eventnums > 0 ? (
                          <span class="infoNum">{subMenu.eventNums}</span>
                        ) : null
                      }
                    </span>
                }
              </div>
              {
                children.map(item => {
                  return this.r(h, item, level + 1)
                })
              }

            </c-submenu>
          )
        } else if (url) {
          if (isExternal) {
            return (
              <router-link to={ { path: url } }>
                <c-menu-item index={ name } class="submenu-title-noDropdown">{ subMenu.text }
                {
                  eventnums > 0 ? (
                    <span class="infoNum">{subMenu.eventNums}</span>
                  ) : null
                }
                </c-menu-item>
              </router-link>
            )
          }
          return (
            <router-link to={ { name } }>
              <c-menu-item index={ name } class="submenu-title-noDropdown">{ subMenu.text }
              {
                eventnums > 0 ? (
                  <span class="infoNum">{subMenu.eventNums}</span>
                ) : null
              }
              </c-menu-item>
            </router-link>
          )
        } else {
          return (
            <c-menu-item index={ name } class="submenu-title-noDropdown">{ subMenu.text }</c-menu-item>
          )
        }
      }
    },
    render(h) {
      return (
        <c-scrollbar class="sidebar-wrap">
          <c-menu mode="vertical" unique-opened background-color="rgba(52,79,131,1) !important" text-color="#fff"
            default-active={ this.$route.name }
            collapse={ this.isCollapse }
            default-openeds={this.defaultOpeneds}
            on-select={ this.handleMenuClick }
          >
            {
              this._l(this.menu, item => {
                return this.r(h, item, 0)
              })
            }
          </c-menu>
        </c-scrollbar>
      )
    }
  }
</script>
<style lang="scss">
  .sidebar-wrap{
    .submenu-title-noDropdown{
      position: relative;
      .infoNum{
          min-width: 20px;
          min-height: 20px;
          border-radius: 50%;
          font-weight: bold;
          background: #D93026;
          font-size: 12px;
          color: #fff;
          text-align: center;
          line-height: 20px;
          position: absolute;
          right: 5px;
          top: 15px;
        }
    }
    .el-submenu__title{
      .infoNum{
        display: none;
      }
    }
  }
</style>
