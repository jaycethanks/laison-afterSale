import Vue from 'vue';
import VueRouter from 'vue-router';
import FormPreviewer from '@/packages/FormPreviewer';
import FlowFormTemplatesList from '@/components/FlowForm/FlowFormTemplatesList/index.vue';
import RouteView from '@/components/base/RouteView/index.vue';
import FlowPreviewer from '@/packages/FlowPreviewer/index.vue';
import FlowDesigner from '@/packages/FlowDesigner';
import FormDesigner from '@/packages/FormDesigner';
import FlowFormDesignerType from '@/constants/FlowFormDesignerType.js';

import Test from '../../playground/Test.vue';
Vue.use(VueRouter);
export const systemRoutes = [
  {
    path: '', //默认首页
    name: '首页',
    icon: 'home',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/System/HomePage'), //默认sub路由页面
  },
  {
    path: 'flowformDesign',
    icon: 'share-alt', //antd-icon name
    name: '流程模板',
    component: RouteView,
    // hiddenChild: true,
    children: [
      {
        path: 'flowformDesigner',
        icon: 'file-add', //antd-icon name
        name: '新增流程模板',
        meta: {
          title: '新增流程模板',
        },
        beforeEnter: (to, from, next) => {
          if (!to.query.type) {
            // 如果没有传递 query 参数，默认设置 'type'
            next({ path: to.path, query: { type: 1 } });
          } else {
            next();
          }
        },
        props: (route) => ({
          defaultQuery: route.query.defaultQuery || 'default value',
        }),
        component: () => import('@/packages/FlowFormDesigner/index.vue'),
        // component: () => import('@/packages/FlowFormDesigner/index.vue'),
      },
      {
        path: 'flowformTemplatesList',
        icon: 'appstore', //antd-icon name
        name: '流程模板管理列表',
        meta: {
          title: '流程模板管理列表',
        },
        component: () => import('@/components/FlowForm/FlowFormTemplatesList/index.vue'),
      },
    ],
  },

  {
    path: 'configManagement',
    name: '配置管理',
    hidden: false,
    meta: {
      title: '配置管理',
    },
    icon: 'tool', //antd-icon name
    component: () => import('@/views/System/ConfigManagement/index.vue'),
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
        component: () => import('@/views/System/SystemManagement/Department/index.vue'),
      },
      {
        path: 'menu',
        icon: 'menu', //antd-icon name
        name: '菜单管理',
        meta: {
          title: '菜单管理',
        },
        component: () => import('@/views/System/SystemManagement/Menu/index.vue'),
      },
      {
        path: 'role',
        icon: 'solution', //antd-icon name
        name: '角色管理',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/views/System/SystemManagement/Role/index.vue'),
      },
      {
        path: 'userManament',
        icon: 'team', //antd-icon name
        name: '用户管理',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/views/System/SystemManagement/UserManament/index.vue'),
      },
    ],
  },

  {
    path: 'platformManagement',
    name: '平台管理',
    hidden: false,
    icon: 'deployment-unit', //antd-icon name
    component: RouteView,
    children: [
      {
        path: 'platformRegistration',
        icon: 'deployment-unit', //antd-icon name
        name: '平台注册',
        meta: {
          title: '平台注册',
        },
        component: () => import('@/views/System/PlatformManagement/PlatformRegistration/index.vue'),
      },
      {
        path: 'userRegistration',
        icon: 'user-add', //antd-icon name
        name: '平台用户',
        meta: {
          title: '平台用户',
        },
        component: () => import('@/views/System/PlatformManagement/UserRegistration/index.vue'),
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
        component: () => import('@/views/System/StatisticAnalysis/WorkOrder/index.vue'),
      },
      {
        path: 'workOrderResolutionRate',
        icon: 'fund', //antd-icon name
        name: '工单解决率统计',
        meta: {
          title: '工单解决率统计',
        },
        component: () => import('@/views/System/StatisticAnalysis/WorkOrderResolutionRate/index.vue'),
      },
      {
        path: 'workOrderStatus',
        icon: 'dot-chart', //antd-icon name
        meta: {
          title: '工单状态统计',
        },
        name: '工单状态统计',
        component: () => import('@/views/System/StatisticAnalysis/WorkOrderStatus/index.vue'),
      },
      {
        path: 'workOrderType',
        icon: 'radar-chart', //antd-icon name
        name: '工单类型统计',
        meta: {
          title: '工单类型统计',
        },
        component: () => import('@/views/System/StatisticAnalysis/WorkOrderType/index.vue'),
      },
    ],
  },

  {
    path: 'notificationCenter',
    name: '通知中心',
    hidden: false,
    icon: 'bell', //antd-icon name
    meta: {
      title: '通知中心',
    },
    component: RouteView,
    children: [
      {
        path: 'params',
        icon: 'control', //antd-icon name
        name: '通知参数配置',
        meta: {
          title: '通知参数配置',
        },
        component: () => import('@/views/System/NotificationCenter/Params/index.vue'),
      },
      {
        path: 'template',
        icon: 'container', //antd-icon name
        name: '通知模板配置',
        meta: {
          title: '通知模板配置',
        },
        component: () => import('@/views/System/NotificationCenter/Template/index.vue'),
      },
    ],
  },

  {
    path: 'demo',
    icon: 'pull-request', //antd-icon name
    name: '平台页面测试',
    // component: Test,
    component: RouteView,

    // redirect: '/test',
    children: [
      { name: 'test', redirect: '/platform/test', path: 'test' },
      { name: 'formDesign', redirect: '/platform/formDesign', path: 'formDesign' },
      { name: 'formPreviewer', redirect: '/platform/formPreviewer', path: 'formPreviewer' },
      { name: 'flowPreviewer', redirect: '/platform/flowPreviewer', path: 'flowPreviewer' },
      {
        name: 'flowformDesigner',
        path: 'flowformDesigner',
        redirect: '/platform/flowformDesigner',
      },
      {
        name: 'flowformManagement',
        path: 'flowformManagement',
        redirect: '/platform/flowformManagement',
      },
      { name: 'myApply', redirect: '/platform/workorder/myapply', path: 'myApply' },
      { name: 'myTodo', redirect: '/platform/workorder/mytodo', path: 'myTodo' },
      { name: 'myDone', redirect: '/platform/workorder/mydone', path: 'myDone' },
      { name: 'myCopied', redirect: '/platform/workorder/mycopied', path: 'myCopied' },
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
    component: () => import('@/views/System/UserCenter/index.vue'),
  },
];

const platformRoutes = [
  { path: 'test', component: Test },
  { path: 'formDesign', component: FormDesigner },
  { path: 'formPreviewer', component: FormPreviewer },
  { path: 'flowPreviewer', component: FlowPreviewer },
  {
    path: 'flowformDesigner',
    beforeEnter: (to, from, next) => {
      if (!to.query.type) {
        // 如果没有传递 query 参数，默认设置 'type'
        next({ path: to.path, query: { type: FlowFormDesignerType.PLATFORM_NEW } });
      } else {
        next();
      }
    },
    component: () => import('@/packages/FlowFormDesigner/index.vue'),
  },
  {
    path: 'flowformManagement',
    beforeEnter: (to, from, next) => {
      if (!to.query.uniTenantId) {
        // 如果没有传递 query 参数，默认设置 'type'
        next({
          path: to.path,
          query: { uniTenantId: '1660919377043652608', bizToken: '3209eedc-3d2b-48aa-802d-8ffe5799c476' },
        });
      } else {
        next();
      }
    },
    component: () => import('@/views/Platform/FlowFormManagement/index.vue'),
  },
  {
    path: 'workorder',
    icon: 'share-alt', //antd-icon name
    component: RouteView,
    children: [
      {
        path: 'myapply',
        icon: 'file-add', //antd-icon name
        meta: {
          title: '我的发起',
        },
        name: '我的发起',
        beforeEnter: (to, from, next) => {
          if (!to.query.uniTenantId) {
            next({
              path: to.path,
              query: { uniTenantId: '1660919377043652608', bizToken: '3209eedc-3d2b-48aa-802d-8ffe5799c476' },
            });
          } else {
            next();
          }
        },
        component: () => import('@/views/Platform/WorkOrder/MyApply/index.vue'),
      },
      {
        path: 'mytodo',
        icon: 'file-add', //antd-icon name
        name: '我的代办',
        meta: {
          title: '我的代办',
        },
        beforeEnter: (to, from, next) => {
          if (!to.query.uniTenantId) {
            next({
              path: to.path,
              query: { uniTenantId: '1660919377043652608', bizToken: '3209eedc-3d2b-48aa-802d-8ffe5799c476' },
            });
          } else {
            next();
          }
        },
        component: () => import('@/views/Platform/WorkOrder/MyTodo/index.vue'),
      },
      {
        path: 'mydone',
        icon: 'file-add', //antd-icon name
        name: '我的已办',
        meta: {
          title: '我的已办',
        },
        beforeEnter: (to, from, next) => {
          if (!to.query.uniTenantId) {
            next({
              path: to.path,
              query: { uniTenantId: '1660919377043652608', bizToken: '3209eedc-3d2b-48aa-802d-8ffe5799c476' },
            });
          } else {
            next();
          }
        },
        component: () => import('@/views/Platform/WorkOrder/MyDone/index.vue'),
      },
      {
        path: 'mycopied',
        icon: 'file-add', //antd-icon name
        meta: {
          title: '抄送我的',
        },
        beforeEnter: (to, from, next) => {
          if (!to.query.uniTenantId) {
            next({
              path: to.path,
              query: { uniTenantId: '1660919377043652608', bizToken: '3209eedc-3d2b-48aa-802d-8ffe5799c476' },
            });
          } else {
            next();
          }
        },
        name: '抄送我的',
        component: () => import('@/views/Platform/WorkOrder/MyCopied/index.vue'),
      },
    ],
  },
  {
    path: '401',
    meta: {
      title: '业务系统token失效',
    },
    component: () => import('@/views/Platform/401/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/system',
    },
    {
      path: '/system',
      component: () => import('@/components/base/Layout/index.vue'),
      children: systemRoutes,
    },
    {
      path: '/platform',
      name: '平台根路由',
      component: RouteView,
      children: platformRoutes,
    },
    {
      path: '/login',
      meta: {
        title: '工单中台系统-登录',
      },
      component: () => import('@/views/System/Login/index.vue'),
    },

    {
      path: '*',
      meta: {
        title: '工单中台系统-404',
      },
      component: () => import('@/views/System/404/NotFound.vue'),
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
  if (to.path === from.path) {
    console.log('路由重复跳转被拦截!!');
  } else {
    next();
  }
});
