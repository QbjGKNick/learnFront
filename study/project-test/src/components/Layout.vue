<template>
  <div class="app-wrapper cp-layout">
    <div class="nav navbar">
        <div class="logo">后台模板系统</div>
        <CpNavbar
          ref="nav"
          :menu-items="menu"
          :active-id="sidebarItem.id"
          @menuChange="handleMenuChange('topMenu',$event)"
        />
      <div class="user">
        <!-- <c-dropdown> -->
          <span class="el-dropdown-link">
            <span class="user-slogan"> 欢迎，{{ user.name }} </span> <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <!-- <c-dropdown-menu slot="dropdown">
            <c-dropdown-item @click.native="changePwd">
              修改密码
            </c-dropdown-item>
          </c-dropdown-menu> -->
        <!-- </c-dropdown> -->
        <span class="nav-line"></span>
        <span class="logout" @click="logout"> 退出系统 </span>
      </div>
    </div>
    <div ref="middle" class="middle">
      <CpSidebar
        v-show="!hideMenu"
        class="sidebar-container"
        :menu="sidebarItemChildren"
        :default-openeds="defaultOpeneds"
        @menuChange="handleMenuChange('sidebar',$event)"
      />
      <div class="main-container">
        <CpTagsView
          v-show="!hideMenu"
          ref="tag"
          :active-status="!showEmpty"
          @tagChange="handleMenuChange('tag',$event)"
          @tagClose="handleTagClose"
        />
        <CpBreadCrumb v-show="!hideMenu" ref="breadCrumb" :items="menuLevel" />
        <c-scrollbar v-show="!showEmpty" class="con_scroll">
          <MyKeepalive
            v-show="!isIframe"
            exclude="noKeepalive"
            :remove-key="removeKey"
            @cached="handleKeepaliveCached"
          >
            <slot />
          </MyKeepalive>
          <IframeTemplate v-show="isIframe" :items="iframes" />
        </c-scrollbar>
        <div v-show="showEmpty" class="empty-page">
          <p>
            页面没有找到 ！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CpNavbar from './Navbar'
  import CpSidebar from './Siderbar'
  import CpTagsView from '@cci/cp-tags-view'
  import CpBreadCrumb from './BredCrumb'
  import MyKeepalive from '@cci/cp-keepalive'
  import IframeTemplate from '@cci/cp-iframe-template'

  function findFirstItem(menu) {
    if (menu && menu.children) {
      for (let i = 0, len = menu.children.length; i < len; i++) {
        if (menu.children[i].url) {
          return menu.children[i]
        } else if (menu.children[i].children) {
          return findFirstItem(menu.children[i])
        }
      }
    }
    return ''
  }
  export default {
    name: 'Layout',
    componentName: 'layout',
    provide() {
      return {
        'layout': this
      }
    },
    components: {
      CpNavbar,
      CpSidebar,
      CpTagsView,
      CpBreadCrumb,
      MyKeepalive,
      IframeTemplate
    },
    props: {
      menu: {
        type: Array,
        default: () => []
      },
      version: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        user: { name: localStorage.getItem("staffName") },
        removeKey: [],
        hideMenu: false,
        menuLevel: [],
        sidebarItem: null,
        showEmpty: false,
        iframes: [],
        defaultOpeneds:[],
        isIframe: false
      }
    },
    mounted(){
        // console.log(this.menu)
    },
    computed: {
      sidebarItemChildren() {
        return (this.sidebarItem && this.sidebarItem.children) || []
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': {
        immediate: true,
        handler: function(r) {
          const meta = this.$route.meta || {}
          const { pids, id, pidsByPath } = meta
          const name = this.$route.name
          // const pids = this.$route.meta && this.$route.meta.pids
          // const id = this.$route.meta && this.$route.meta.id
          // const topId = pids && pids[0] || (~id && id)
          this.sidebarItem = this.getMenuByID(this.menu, pids && pids[0] || id)
          // console.log("router::::", this.$route.meta)

          this.menuLevel = pidsByPath === true ? this.buildMenuLevelByPath() : this.buildMenuLevel(this.$route.meta)
          this.buildIframeList(this.$route.path, name)
          this.sidebarItem = Object.keys(this.sidebarItem).length ? this.sidebarItem : { id: 0 }
          let firstItem = findFirstItem(this.sidebarItem)
          if(firstItem){
            this.defaultOpeneds = [firstItem.pids[1]]
          }
          this.showEmpty = false
          if (r.meta && r.meta.hideMenu === true) {
            this.hideMenu = true
          } else {
            this.hideMenu = false
          }
        }
      }
    },
    created() {
      this.$router && this.$router.onError(error => {
        if (error && error.code === 'MODULE_NOT_FOUND') {
          this.showEmpty = true
        }
      })
    },
    methods: {

      /**
       * 侦听 Keepalive 缓存实例完成
       */
      handleKeepaliveCached(key) {
        if (!key || !this.$route || !this.$route.name) {
          return false
        }
        // 如果 meta.addTag是 false 不缓存
        if (this.$route.meta && this.$route.meta.addTag === false) {
          return false
        }
        // 缓存 route meta并记录vm实例的key
        Object.assign(this.$route.meta, {
          key
        })
      },
      getMenuByID(menus, id) {
        if (!id) {
          return { id: 0 }
        }
        if (menus && Object.prototype.toString.call(menus) === "[object Array]") {
          for (let i = 0, len = menus.length; i < len; i++) {
            if (menus[i].id === id) {
              return menus[i]
            }
          }
        }
        return { id: 0 }
      },
      buildIframeList(url, name) {
        if (url.substring(0, 8) === '/iframe/') {
          let isInCache = false
          this.isIframe = true
          this.iframes.forEach(p => {
            if (p.name === name && p.url === url) {
              isInCache = true
              p.show = true
            } else {
              p.show = false
            }
          })
          if (!isInCache) {
            this.iframes.push({
              show: true,
              url,
              name
            })
          }
          isInCache = null
        } else {
          this.isIframe = false
        }
      },
      buildMenuLevel(menu) {
        if (!menu) {
          return []
        }
        const pids = menu.pids || []
        const len = pids.length
        const list = new Array(len + 1)
        for (let i = 0; i < len; i++) {
          if (i === 0) {
            list[i] = this.getMenuByID(this.menu, pids[i])
          } else if (list[i - 1] && list[i - 1].children) {
            list[i] = this.getMenuByID(list[i - 1].children, pids[i])
          }
        }
        list[len] = menu
        return list
      },
      buildMenuLevelByPath() {
        const path = this.$route.path.split('/')
        const list = []
        for (let i = 1, len = path.length; i < len; i++) {
          const str = path.slice(0, i + 1).join('/')
          const route = this.$router.matcher.match(`${str}`)
          if (route.name) {
            list.push({
              url: route.path,
              path: route.path,
              text: route.meta.text,
              key: route.meta.key,
              pids: route.meta.pids,
              id: route.meta.id,
              icon: route.meta.icon
            })
          }
        }
        return list
      },
      removeKeepaliveCacheByKey(key, name, url) {
        // 清除 keepalive 缓存
        if (key) {
          this.removeKey = [key]
        }
        // 清除Iframe页面
        if (url && name) {
          for (let i = 0, len = this.iframes.length; i < len; i++) {
            let arr = this.iframes[i]
            if (arr.name === name && arr.url === url) {
              arr = null
              this.iframes.splice(i, 1)
              break
            }
            arr = null
          }
        }
      },
      handleTagClose(tag) {
        const { name, path, key } = tag
        /**
         * 清理keeplive缓存
         */
        this.removeKeepaliveCacheByKey(key, name, path)
      },
      handleMenuChange(type, menu) {
        let url = menu.url || menu.path
        const id = menu.id
        /**
         * 实现首页隐藏 左侧菜单栏（首页的id为0）
         */
        this.hideMenu = (id === 0)
        // if (type === 'topMenu') {
        //   this.sidebarItem = menu
        //   this.menuLevel = [menu]
        // // } else if (type === 'tag') {
        // //   this.sidebarItem = this.getMenuByID(this.menu, pids && pids[0] || id)
        // }
        if (type === 'topMenu') {
          this.sidebarItem = menu
          // this.menuLevel = [menu]
          let item = findFirstItem(menu)
          if(!url){
            url = item.url
          }
          this.defaultOpeneds = [item.pids[1]]
        }
        this.sidebarItem = Object.keys(this.sidebarItem).length ? this.sidebarItem : { id: 0 }
        this.showEmpty = !url
        if (url) {
          this.$router.push({ path: url })
        } else {
            // console.log(12)
        }
      },
      changePwd() {
        console.log('do changePwd')
      },
      logout() {
        localStorage.setItem("beforeRouter",this.$route.path)
        localStorage.removeItem("getTheeList")
        localStorage.removeItem("staffId")
        localStorage.removeItem("staffName")
        localStorage.removeItem("userId")
        localStorage.removeItem("roleId")
        localStorage.removeItem("departmentId")
        this.$router.replace('/login');
      }
    }
  }
</script>
<style lang="scss">
.cp-layout {
  .sidebar-container{
    background:rgba(52,79,131,1);
    .el-menu{
      .el-submenu__title{
        background:rgba(52,79,131,1) !important;
        .submenu-title-noDropdown{
          color: rgba(255,255,255,0.65) !important;
          font-size: 20px;
        }
        text-align: left;
        i{
          color: rgba(255,255,255,0.65) !important;
        }
      }
      &.is-active{
        background:rgba(111,145,195,1) !important;
      }
    }
  }
  .el-submenu .el-menu-item,.nest-menu .el-submenu>.el-submenu__title {
    background:rgba(52,79,131,1) !important;
    color: rgba(255,255,255,0.65) !important;
    &:hover{
      background:rgba(111,145,195,1) !important;
    }
    &.active{
      background:rgba(111,145,195,1) !important;
    }
  }
  .sidebar-container .router-link-active .el-menu-item{
    color: rgba(255,255,255,1) !important;
    background:rgba(111,145,195,1) !important;
    &:hover{
      background:rgba(111,145,195,1) !important;
    }
  }
  .nav.navbar {
    background: #001529 url("~@/assets/img/topBg.png") 0 0 no-repeat;
    background-size: 100% 100%;
    .logo{
      width: auto;
      font-size: 30px;
      font-weight: bold;
    }
    .cp-navbar {
      display: flex;
      justify-content: flex-start;
      font-size: 30px;
      flex: auto;
      margin-left: 48px;
      .menu-item{
        padding: 0 35px;
        display: flex;
        align-items: center;
        .menu-item-svg{
          fill: #ffffff;
        }
        &.active {
        color: #344F83;
        background: linear-gradient(
          180deg,
          rgba(220, 236, 255, 1) 0%,
          rgba(141, 162, 195, 1) 100%
        );
        .menu-item-svg{
          fill:#344F83;
        }
      }
      }
      .user {
        position: absolute;
      }
    }
    .nav-line{
      width: 2px;
      height: 14px;
      background-color: rgba(255,255,255,0.65);
    }
    .logout{
      padding: 0;
      font-size: 14px;

    }
  }
  .tags-view-container {
    display: none;
  }
  .app-breadcrumb{
    background:rgba(52,79,131,.9);
    .label{
      float: left;
      color:rgba(255,255,255,.65);
      margin-right: 12px;
    }
    .el-breadcrumb__item{
      .el-breadcrumb__inner{
        a{
          color:rgba(255,255,255,.65);
          &:hover{
          color:rgba(255,255,255,1);
          }
        }
      }
    }
  }
  .middle{
    background: #B5C8E4;
    padding-top: 20px;
    background-color: #B5C8E4;
    .main-container{
      margin: 0 20px 20px 20px;
      background-color: #fff;
    }
  }
}
</style>
