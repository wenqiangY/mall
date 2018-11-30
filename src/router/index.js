import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Rights from '@/components/rights/rights'
import Role from '@/components/rights/role'

Vue.use(Router)

// 配置路由
const router = new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }, {
      name: 'roles',
      path: '/roles',
      component: Role
    }]
  }]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('请先登录后在访问')
      router.push({name: 'login'})
      return
    }
    next()
  }
})

export default router
