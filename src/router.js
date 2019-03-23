import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { hasValidToken } from './util/auth'

Vue.use(Router)

const router = new Router({
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
      path: '/login-callback',
      name: 'logincallback',
      component: () =>
        import(/* webpackChunkName: "logincallback" */ './views/LoginCallback.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/manage',
      name: 'manage',
      component: () =>
        import(/* webpackChunkName: "manage" */ './views/Manage.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!hasValidToken()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
