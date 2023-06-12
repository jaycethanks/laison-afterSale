import { systemRoutes } from '@/router';

let system = [];
systemRoutes.forEach((route) => {
  if (!route.hidden) {
    const { path, name, icon, children = [] } = route;
    const requiredFields = ['path', 'name', 'icon'];
    requiredFields.forEach((i) => {
      if (typeof route[i] === 'undefined') {
        console.error(`页面侧边栏路由注册 "${name}" 失败,${requiredFields.join()}字段为必要字段, 不可为空!`);
      }
    });
    system.push({
      path: '/system' + '/' + path,
      name,
      icon,
      children,
    });
  }
});

export default system;
