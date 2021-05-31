import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  const result = originalPush.call(this, location)
  return result.catch && result.catch(err => err)
}
export default new Router({
    // mode: 'history', //后端支持可开
    routes: [
      {
        name: 'Login',
        path: '/login',
        component: () => import ("./login.vue"),
        chunkName: 'views/login',
        hidden: true
      },
      {
          name: 'index',
          path: '/',
          redirect: '/home',
          chunkName: 'views/index',
          component: () => import ("./Layout.vue"),
          children: [{
            name: 'Home',
            meta: {
                id: 0,
                pids: [],
                hideMenu: true,
                addTag: false
            },
            path: '/home',
            component: () => import ("./home.vue"),
            chunkName: 'views/home'
        }]
      },
      {
          path: '*',
          redirect: '/home'
      }
  ]
})
