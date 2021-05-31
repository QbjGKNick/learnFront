<template>
  <div class="cp-navbar">
    <span
      v-for="(item) in menus"
      ref="menuItem"
      :key="item.text"
      class="menu-item"
      :class="{active: activeId === item.id}"
      @click="handleMenuItemClick(item.id)"
    >
     <SvgIcon :iconClass="item.icon" class="menu-item-svg"></SvgIcon> {{ item.text }} <span class="infoNum" v-show="item.eventNums > 0">{{item.eventNums}}</span>
    </span>
    <c-dropdown
      class="operate"
      :class="{hidden: hiddenFlag}"
    >
      <span class="el-dropdown-link ">
        <i class="el-icon-caret-bottom" />
      </span>
      <c-dropdown-menu slot="dropdown">
        <c-dropdown-item
          v-for="(item) in remainItems"
          :key="item.text"
          :class="{active: activeId === item.id}"
          @click.native="handleMenuItemClick(item.id)"
        >
          {{ item.text }} <span class="infoNum" v-show="item.eventNums > 0">{{item.eventNums}}</span>
        </c-dropdown-item>
      </c-dropdown-menu>
    </c-dropdown>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon"
  export default {
    name: "CpNavbar",
    components: {
      SvgIcon
    },
    props: {
      menuItems: {
        type: Array,
        default: () => []
      },
      activeId: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      this.timer = null
      return {
        icons:"approve",
        spliceIndex: this.menuItems.length,
        hiddenFlag: true
      }
    },
    computed: {
      itemList() {
        return this.menuItems.map(item => {
          return {
            id: item.id,
            text: item.text,
            eventNums:item.eventNums,
            icon:item.icon ? item.icon : "approve"
          }
        })
      },
      menus() {
        return this.itemList.slice(0, this.spliceIndex)
      },
      remainItems() {
        return this.itemList.slice(this.spliceIndex)
      }
    },
    mounted() {
      this.splitMenu()
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    methods: {
      splitMenu() {
        // console.log(fragment.innerHtml, div.getBoundingClientRect(), span.offsetWidth)
        if(!this.$refs.menuItem || !this.$refs.menuItem.length){
          return
        }
        const { x, width } = this.$el.getBoundingClientRect()
        const rightLine = x + width
        for (let i = 0, length = this.$refs.menuItem.length; i < length; ++i) {
          const { x, width } = this.$refs.menuItem[i].getBoundingClientRect()
          if (x + width + 60 >= rightLine) {
            this.spliceIndex = i
            this.hiddenFlag = false
            break
          }
        }
      },
      handleResize() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.spliceIndex = this.menuItems.length
          this.$nextTick(() => {
            this.hiddenFlag = true
            this.splitMenu()
          })
        }, 300)
      },
      handleMenuItemClick(index) {
        this.$emit('menuChange', this.menuItems.find(item => {
          return item.id === index
        }))
      }
    }
  }
</script>
<style lang="scss">
    .cp-navbar{
        padding-top: 10px;
        .menu-item{
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
          .menu-item-svg{
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
    }
</style>
