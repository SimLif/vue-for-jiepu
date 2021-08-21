import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register','/register_doc&nur','/register_pat&rel','/register_succ','/','/doctors-patiens','/patients-center/companions','/nurses-patiens','/relation-center/companions','/admin-users'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取roles
          //const { roles } = await store.dispatch('user/getInfo')
          var results = await store.dispatch('user/getInfo')
          window.localStorage.setItem("id",results.id)
          window.localStorage.setItem("identity",results.identity)
          let roles = []
          roles.push(results.identity)
          console.log(roles,'per roles...')
          // 获取通过权限的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 更新路由
          router.options.routes = store.getters.permission_routes

          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})