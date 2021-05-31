<template>
  <CpLayout :version="version" :menu="menu">
    <div class="logo" slot="logo"><span class="text">新的系统名</span></div>
    <router-view></router-view>
  </CpLayout>
</template>
<script>
import { getMenu } from './utils/index.js'
import CpLayout from "@cci/cp-layout"
export default {
  name: "Layout",
  components: {
    CpLayout
  },
  data() {
    return {
      user: { name: "admin" },
      version: process.env.VUE_APP_VERSION || "",
      menuLevel:[],
      menu: getMenu()
    };
  },
  methods: {

  }
};
</script>
<style lang="scss">
.cp-layout-ant{
$--logo-height: 84px !default;
$--navbar-height: 64px !default;
$--sidebar-background-color: rgb(48, 65, 86) !default;
$--sidebar-open-background-color: #1f3045 !default;
$--sidebar-color: #CBCBCB !default;
$--sidebar-item-hover-background-color: #001528 !default;
$--sidebar-item-background-active-color: $--color-primary !default;
$--sidebar-item-active-color: $--color-white !default;
$--navbar-color: $--color-white !default;
$--navbar-border-color: rgba(0,21,41,0.15) !default;
$--toggle-icon-color: #CBCBCB !default;
$--toggle-icon-border-color: #4B4B4B !default;
$--toggle-icon-height: 57.39px !default;
$--user-font-size: 14px !default;
$--user-color: #252525 !default;
$--user-color2: $--color-primary !default;
$--tagsview-wrapper-background-color:  #eef1f6 !default;
$--tagsview-background-color: $--color-white !default;
$--tagsview-background-active-color:  $--color-primary !default;
$--tagsview-border-color:   #d8dce5 !default;
$--tagsview-border-active-color:   $--color-primary !default;
$--tagsview-color:   #495060 !default;
$--tagsview-active-color:  $--color-white !default;
$--tagsview-dot-background-color:  $--color-white !default;
$--tagsview-close-background-color:   #b4bccc !default;
$--tagsview-close-color:  $--color-white !default;
$--router-view-wrapper-background-color: #f0f2f5 !default;
$--router-view-inner-background-color: $--color-white !default;

}
@import '@cci/cp-layout/src/Layout.scss';
</style>