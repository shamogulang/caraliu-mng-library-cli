import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login'
import Home from '../components/home/Home'
import User from '../components/users/User'
import Permission from '../components/perimissions/Permission'
import Role from '../components/roles/Role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        name: 'User',
        path: 'users',
        component: User
      }, {
        name: 'Permission',
        path: 'permissions',
        component: Permission
      }, {
        name: 'Role',
        path: 'roles',
        component: Role
      }
      ]
    }
  ]
})
