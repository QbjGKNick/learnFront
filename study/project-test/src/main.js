import SvgIcon from "@/components/SvgIcon"
import "@/icons"
import cui from '@cci/cui'
import "@cci/cui/lib/theme-default/index.css"
import Vue from 'vue'
import Router from 'vue-router'
import './permission.js'
import router from './router.js'
import "./styles/cui.scss"
import "./styles/index.scss"
import "./styles/reset.scss"


Vue.component("SvgIcon",SvgIcon)

Vue.use(cui)
Vue.use(Router)

new Vue({
    el: '#app',
    router,
    render: h => h("div",{attrs:{id:"app"}},[h("router-view")])
})
