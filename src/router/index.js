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
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '用户管理',roles: ['admin'], icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '用户管理', roles: ['admin'], icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree',  roles: ['admin'], icon: 'tree' }
  //     },
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/test/index'),
  //       meta: { title: 'Test',  roles: ['admin'],icon: 'table' }
  //     }
  //   ]
  // },
  
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '历史数据', roles: ['admin'],icon: 'form' }
  //     }
  //   ]
  // },

  // 患者
  // 菜单一： 身体监测
  {
    path: '/patients-monitor',
    component: Layout,
    children: [
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/patients/center/monitor/index'),
        meta: { title: '身体监测', roles: ['patient','relation'], icon: 'table' }
      }
    ]
  },

  // 菜单二：个人中心
  {
    path: '/patients-center',
    component: Layout,
    redirect: '/patients-center/companions',
    name: 'Center',
    meta: { title: '个人中心', roles: ['patient'],icon: 'el-icon-s-help' },
    children: [
      {
        path: 'companions',
        name: 'Companions',
        component: () => import('@/views/patients/center/companions/index'),
        meta: { title: '我的陪伴',  roles: ['patient'], icon: 'tree' }
      },
      // {
      //   path: 'medical',
      //   name: 'Medical',
      //   component: () => import('@/views/patients/center/medical/index'),
      //   meta: { title: '我的医护',  roles: ['patient'],icon: 'table' }
      // },
      // {
      //   path: 'realtion',
      //   name: 'Relation',
      //   component: () => import('@/views/patients/center/relation/index'),
      //   meta: { title: '我的家属',  roles: ['patient'],icon: 'table' }
      // },
      {
        path: 'information',
        name: 'Information',
        component: () => import('@/views/patients/center/information/index'),
        meta: { title: '个人信息',  roles: ['patient'],icon: 'table' }
      }
    ]
  },
  

  {
    path: '/patients-equipment',
    component: Layout,
    children: [
      {
        path: 'equipments',
        name: 'Equipment',
        component: () => import('@/views/patients/equipment/index'),
        meta: { title: '设备管理', roles: ['patient'],icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/notice',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Notice',
  //       component: () => import('@/views/notice/index'),
  //       meta: { title: '我的通知', roles: ['patient'],icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/patients-visualization',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'visual',
  //       name: 'Data_visualization',
  //       component: () => import('@/views/patients/visualization/index'),
  //       meta: { title: '数据可视化', roles: ['patient'],icon: 'form' }
  //     }
  //   ]
  // },
  //家属
  //菜单一：我的病人家属
  
  //菜单二：个人信息
  {
    path: '/relation-center',
    component: Layout,
    redirect: '/relation-center/my-info',
    name: 'PersonalCentre',
    meta: { title: '个人中心', roles: ['relation'], icon: 'el-icon-s-help' },
    children: [
      {
        path: 'my-info',
        name: 'Info',
        component: () => import('@/views/relation/Info'),
        meta: { title: '个人信息', roles: ['relation'],icon: 'form' }
      },
      {
        path: 'companions',
        name: 'Companions',
        component: () => import('@/views/relation/companions'),
        meta: { title: '家属医护',  roles: ['relation'], icon: 'form' }
      },
    ]
  },
  // 医生
  // 菜单一：我的病人
   {
    path: '/doctors-patiens',
    component: Layout,
    children: [
      {
        path: 'my-patiens',
        name: 'Patients',
        component: () => import('@/views/doctors/Patients'),
        meta: { title: '我的病人', roles: ['doctor'],icon: 'form' }
      }
    ]
  },
  // 菜单二：个人中心
  {
    path: '/doctors-center',
    component: Layout,
    redirect: '/doctors-center/my-info',
    name: 'PersonalCentre',
    meta: { title: '个人中心', roles: ['doctor'], icon: 'el-icon-s-help' },
    children: [
      {
        path: 'my-info',
        name: 'Info',
        component: () => import('@/views/doctors/Info'),
        meta: { title: '我的信息', roles: ['doctor'],icon: 'form' }
      },
    ]
  },
  //护士
  //一级菜单：我的病人
  {
    path: '/nurses-patiens',
    component: Layout,
    children: [
      {
        path: 'my-patiens',
        name: 'Patients',
        component: () => import('@/views/nurses/Patients'),
        meta: { title: '我的病人', roles: ['nurse'],icon: 'form' }
      },
    ]
  },
  //二级菜单：个人中心
  {
    path: '/nurses-center',
    component: Layout,
    redirect: '/nurses-center/my-info',
    name: 'PersonalCentre',
    meta: { title: '个人中心', roles: ['nurse'], icon: 'el-icon-s-help' },
    children: [
      {
        path: 'my-info',
        name: 'Info',
        component: () => import('@/views/nurses/Info'),
        meta: { title: '我的信息', roles: ['nurse'],icon: 'form' }
      },
    ]
  },
  // 管理员
  {
    path: '/admin-devices',
    component: Layout,
    children: [
      {
        path: 'devices',
        name: 'Devices',
        component: () => import('@/views/admin/Devices'),
        meta: { title: '设备管理', roles: ['admin'],icon: 'form' }
      },
    ]
  },
  {
    path: '/admin-users',
    component: Layout,
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/admin/Users'),
        meta: { title: '用户管理', roles: ['admin'],icon: 'form' }
      },
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
