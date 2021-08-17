import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/register_doc&nur',
    component: () => import('@/views/login/register_doc&nur'),
    hidden: true
  },
  {
    path: '/register_pat&rel',
    component: () => import('@/views/login/register_pat&rel'),
    hidden: true
  },
  {
    path: '/register_succ',
    component: () => import('@/views/login/register_succ'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-discount' }
    }]
  },

  // 404 page must be placed at the end !!!
  //{ path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * 只有拥有权限的用户，才能显示的路由表
 */
 export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '用户管理',roles: ['admin'], icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用户管理', roles: ['admin'], icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree',  roles: ['admin'], icon: 'tree' }
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test/index'),
        meta: { title: 'Test',  roles: ['admin'],icon: 'table' }
      }
    ]
  },
  
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '历史数据', roles: ['admin'],icon: 'form' }
      }
    ]
  },

  //患者
  {
    path: '/center',
    component: Layout,
    redirect: '/center/body',
    name: 'Center',
    meta: { title: '个人中心', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'body',
        name: 'Body',
        component: () => import('@/views/center/body/index'),
        meta: { title: '身体监测', roles: ['patient','relation'], icon: 'table' }
      },
      {
        path: 'medical',
        name: 'Medical',
        component: () => import('@/views/center/medical/index'),
        meta: { title: '我的医护',  roles: ['patient','relation'], icon: 'tree' }
      },
      {
        path: 'realtion',
        name: 'Relation',
        component: () => import('@/views/center/relation/index'),
        meta: { title: '我的家属',  roles: ['patient'],icon: 'table' }
      },
      {
        path: 'information',
        name: 'Information',
        component: () => import('@/views/center/information/index'),
        meta: { title: '个人信息',  roles: ['patient','relation'],icon: 'table' }
      }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Equipment',
        component: () => import('@/views/equipment/index'),
        meta: { title: '设备管理', roles: ['patient'],icon: 'form' }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Notice',
        component: () => import('@/views/notice/index'),
        meta: { title: '我的通知', roles: ['patient'],icon: 'form' }
      }
    ]
  },
  {
    path: '/visualization',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Data_visualization',
        component: () => import('@/views/visualization/index'),
        meta: { title: '数据可视化', roles: ['patient'],icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
