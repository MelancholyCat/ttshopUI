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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    redirect: '/commodity/index',
    children: [
      {
        path: 'commodity/index',
        name: 'Table',
        component: () => import('@/views/commodity/index'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'commodity/edit/:id',
        hidden: true,
        component: () => import('@/views/commodity/edit/'),
        meta: { title: '编辑商品信息', icon: 'form' }
      },
      {
        path: 'standard/index/:id',
        hidden: true,
        component: () => import('@/views/commodity/standard/index'),
        meta: { title: '设置商品规格', icon: 'form' }
      },
      {
        path: 'standard/add/:id',
        hidden: true,
        component: () => import('@/views/commodity/standard/add'),
        meta: { title: '添加商品规格', icon: 'form' }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        hidden: true,
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'TT后台', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/commodity-type',
    // hidden: true,
    component: Layout,
    redirect: '/commodity-type/index',
    name: 'Example',
    // meta: { title: '商家管理', icon: 'example' },
    children:[
      {
        path: 'index',
        component: () => import('@/views/commodity/type/index'),
        meta: { title: '商品种类列表', icon: 'table' }
      },
      {
        path: 'edit/:id',
        hidden: true,
        component: () => import('@/views/commodity/type/edit/'),
        meta: { title: '编辑商品种类', icon: 'taformble' }
      },
      {
        path: 'add',
        hidden: true,
        component: () => import('@/views/commodity/type/add'),
        meta: { title: '添加商品种类', icon: 'taformble' }
      },
    ]
  },

  {
    path: '/shop',
    component: Layout,
    alwaysShow: true,
    redirect: '/shop/shopkeeper/index',
    name: 'Example',
    meta: { title: '商家管理', icon: 'example' },
    children: [
      {
        path: 'shopkeeper/index',
        name: 'Table',
        component: () => import('@/views/shopkeeper/index'),
        meta: { title: '店主列表', icon: 'table' }
      },{
        path: 'store/index',
        name: 'Table',
        component: () => import('@/views/store/index'),
        meta: { title: '店铺列表', icon: 'table' }
      },
      {
        path: 'shopkeeper/edit/:id',
        hidden: true,
        component: () => import('@/views/shopkeeper/edit/'),
        meta: { title: '编辑店主信息', icon: 'form' }
      },
      {
        path: 'shopkeeper/add',
        hidden: true,
        component: () => import('@/views/shopkeeper/add'),
        meta: { title: '添加店主信息', icon: 'form' }
      },
      {
        path: 'store/edit/:id',
        hidden: true,
        component: () => import('@/views/store/edit/'),
        meta: { title: '编辑店铺信息', icon: 'form' },
      },
      {
        path: 'sales/index',
        hidden: true,
        component: () => import('@/views/sales/index'),
        meta: { title: '商品销售情况统计', icon: 'table' }
      },
      // {
      //   path: 'standard/index/:id',
      //   hidden: true,
      //   component: () => import('@/views/commodity/standard/index'),
      //   meta: { title: '设置商品规格', icon: 'form' }
      // },
      // {
      //   path: 'standard/add/:id',
      //   hidden: true,
      //   component: () => import('@/views/commodity/standard/add'),
      //   meta: { title: '添加商品规格', icon: 'form' }
      // },
      
      // {
      //   path: 'commodity/type/index',
      //   component: () => import('@/views/commodity/type/index'),
      //   meta: { title: '商品种类列表', icon: 'table' }
      // },
      // {
      //   path: 'commodity/type/edit/:id',
      //   hidden: true,
      //   component: () => import('@/views/commodity/type/edit/'),
      //   meta: { title: '编辑商品种类', icon: 'taformble' }
      // },
      // {
      //   path: 'commodity/type/add',
      //   hidden: true,
      //   component: () => import('@/views/commodity/type/add'),
      //   meta: { title: '添加商品种类', icon: 'taformble' }
      // },
      // {
      //   path: 'commodity/index',
      //   name: 'Table',
      //   component: () => import('@/views/commodity/index'),
      //   meta: { title: '商品列表', icon: 'table' }
      // },
      // {
      //   path: 'commodity/edit/:id',
      //   hidden: true,
      //   component: () => import('@/views/commodity/edit/'),
      //   meta: { title: '编辑商品信息', icon: 'form' }
      // },
      // {
      //   path: 'commodity/add',
      //   hidden: true,
      //   component: () => import('@/views/commodity/add'),
      //   meta: { title: '添加商品信息', icon: 'form' }
      // },
      // {
      //   path: 'commodity/type/index',
      //   component: () => import('@/views/commodity/type/index'),
      //   meta: { title: '商品种类列表', icon: 'table' }
      // },
      // {
      //   path: 'commodity/type/edit/:id',
      //   hidden: true,
      //   component: () => import('@/views/commodity/type/edit/'),
      //   meta: { title: '编辑商品种类', icon: 'taformble' }
      // },
      // {
      //   path: 'commodity/type/add',
      //   hidden: true,
      //   component: () => import('@/views/commodity/type/add'),
      //   meta: { title: '添加商品种类', icon: 'taformble' }
      // },
      // {
      //   path: 'sales/index',
      //   component: () => import('@/views/sales/index'),
      //   meta: { title: '商品销售情况统计', icon: 'table' }
      // },
    ]
  },
  

  // {
  //   path: '/shopkeeper',
  //   component: Layout,
  //   alwaysShow: true,
  //   redirect: '/shopkeeper/index',
  //   name: 'Example',
  //   meta: { title: '商家管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Table',
  //       component: () => import('@/views/shopkeeper/index'),
  //       meta: { title: '店主列表', icon: 'table' }
  //     },{
  //       path: 'store',
  //       name: 'Table',
  //       component: () => import('@/views/store/index'),
  //       meta: { title: '店铺列表', icon: 'table' }
  //     },
  //     {
  //       path: 'edit/:id',
  //       hidden: true,
  //       component: () => import('@/views/shopkeeper/edit/'),
  //       meta: { title: '编辑店主信息', icon: 'form' }
  //     },
  //     {
  //       path: 'add',
  //       hidden: true,
  //       component: () => import('@/views/shopkeeper/add'),
  //       meta: { title: '添加店主信息', icon: 'form' }
  //     },
  //   ]
  // },


  // 404 page must be placed at the end !!!
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
