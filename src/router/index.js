import Vue from 'vue';
import VueRouter from 'vue-router';
import RouteView from '@/components/base/RouteView/index.vue';

const uniTenantId = process.env.VUE_APP_UNITENANT;

Vue.use(VueRouter);
export const systemRoutes = [
  {
    path: '', //默认首页
    name: '首页',
    icon: 'home',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/HomePage'), //默认sub路由页面
  },
  {
    path: 'configManagement',
    name: '配置管理',
    hidden: false,
    meta: {
      title: '配置管理',
    },
    icon: 'tool', //antd-icon name
    component: () => import('@/views/ConfigManagement/index.vue'),
  },
  {
    path: 'systemManagement',
    name: '系统管理',
    hidden: false,
    icon: 'setting', //antd-icon name
    component: RouteView,
    children: [
      {
        path: 'department',
        icon: 'apartment', //antd-icon name
        name: '部门管理',
        meta: {
          title: '部门管理',
        },
        component: () => import('@/views/SystemManagement/Department/index.vue'),
      },
      {
        path: 'menu',
        icon: 'menu', //antd-icon name
        name: '菜单管理',
        meta: {
          title: '菜单管理',
        },
        component: () => import('@/views/SystemManagement/Menu/index.vue'),
      },
      {
        path: 'role',
        icon: 'solution', //antd-icon name
        name: '角色管理',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/views/SystemManagement/Role/index.vue'),
      },
      {
        path: 'userManament',
        icon: 'team', //antd-icon name
        name: '用户管理',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/views/SystemManagement/UserManament/index.vue'),
      },
    ],
  },
  {
    path: 'statisticAnalysis',
    name: '统计分析',
    hidden: false,
    icon: 'pie-chart', //antd-icon name
    component: RouteView,
    children: [
      {
        path: 'workOrder',
        icon: 'bar-chart', //antd-icon name
        name: '工单统计',
        meta: {
          title: '工单统计',
        },
        component: () => import('@/views/StatisticAnalysis/WorkOrder/index.vue'),
      },
      {
        path: 'workOrderResolutionRate',
        icon: 'fund', //antd-icon name
        name: '工单解决率统计',
        meta: {
          title: '工单解决率统计',
        },
        component: () => import('@/views/StatisticAnalysis/WorkOrderResolutionRate/index.vue'),
      },
      {
        path: 'workOrderStatus',
        icon: 'dot-chart', //antd-icon name
        meta: {
          title: '工单状态统计',
        },
        name: '工单状态统计',
        component: () => import('@/views/StatisticAnalysis/WorkOrderStatus/index.vue'),
      },
      {
        path: 'workOrderType',
        icon: 'radar-chart', //antd-icon name
        name: '工单类型统计',
        meta: {
          title: '工单类型统计',
        },
        component: () => import('@/views/StatisticAnalysis/WorkOrderType/index.vue'),
      },
    ],
  },
  {
    path: 'workorder',
    name: '工单',
    icon: 'share-alt', //antd-icon name
    component: RouteView,
    children: [
      {
        path: 'myapply',
        icon: 'ordered-list', //antd-icon name
        meta: {
          title: '我的发起',
        },
        name: '我的发起',
        component: () => import('@/views/WorkOrder/MyApply/index.vue'),
      },
      {
        path: 'mytodo',
        icon: 'carry-out', //antd-icon name
        name: '我的代办',
        meta: {
          title: '我的代办',
        },
        component: () => import('@/views/WorkOrder/MyTodo/index.vue'),
      },
      {
        path: 'mydone',
        icon: 'file-done', //antd-icon name
        name: '我的已办',
        meta: {
          title: '我的已办',
        },

        component: () => import('@/views/WorkOrder/MyDone/index.vue'),
      },
      {
        path: 'mycopied',
        icon: 'notification', //antd-icon name
        meta: {
          title: '抄送我的',
        },

        name: '抄送我的',
        component: () => import('@/views/WorkOrder/MyCopied/index.vue'),
      },
    ],
  },
  {
    path: 'userCenter',
    name: '用户中心',
    hidden: false,
    meta: {
      title: '用户中心',
    },
    icon: 'user', //antd-icon name
    component: () => import('@/views/UserCenter/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/components/base/Layout/index.vue'),
      children: systemRoutes,
    },
    {
      path: '/login',
      meta: {
        title: '工单中台系统-登录',
      },
      component: () => import('@/views/Login/index.vue'),
    },
    {
      path: '*',
      meta: {
        title: '工单中台系统-404',
      },
      component: () => import('@/views/404/NotFound.vue'),
    },
  ],
});

export default router;

// 动态设置标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // bugfix: 解决从 系统模板编辑 直接通过 menu 跳转到 新增模板时，路由守卫beforeEnter 不会触发的问题
  // 这里直接禁止重复跳转
  // if (to.path === from.path) {
  //   console.log('路由重复跳转被拦截!!');
  // } else {
  next();
  // }
});
