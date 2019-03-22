import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/get-started',
      name: 'getstarted',
      component: () =>
        import(/* webpackChunkName: "get-started" */ './views/GetStarted.vue')
    },
    {
      path: '/login-callback',
      name: 'logincallback',
      component: () =>
        import(/* webpackChunkName: "logincallback" */ './views/LoginCallback.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () =>
        import(/* webpackChunkName: "manage" */ './views/Manage.vue')
    }
  ]
})
