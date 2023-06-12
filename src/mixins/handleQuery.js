/**
 * step1: 页面加载
 * step2: 获取 url.query ,赋值给 this.query
 * step3: 动态计算 computedQuery 值
 *
 */
export default {
  data() {
    return {
      wrongPage: false,
    };
  },
  computed: {
    // 1.将query 拍平
    // 2.验证字段初始化合法性
    // 3.验证路由必传字段是否传递,获取路由query
    computedQuery: function () {
      const routeQuery = this.$route.query;
      const Obj = {};
      Object.entries(this.query).forEach(([key, value]) => {
        let _value = undefined;

        if (typeof value === 'object') {
          // 验证字段初始化合法性
          const exist = Object.keys(value).includes('type');
          if (!exist) {
            this.$message.error(`必传字段${key}需要初始化为{type:Number|String|Boolean}!`);
            this.wrongPage = true;
            return;
          }
          // 验证路由是否传递了必传字段
          if (!(key in routeQuery)) {
            this.$message.error(`${key} 为必要的 query 字段！请检查路由的query传参！`);
            this.wrongPage = true;
            return;
          }

          // 设定默认值,获取路由query参数
          _value = this.parseType(value.type, routeQuery[key]);
        } else {
          _value = routeQuery[key];
        }
        Obj[key] = _value;
      });
      return Obj;
    },
  },
  methods: {
    parseType(type, routeVal) {
      // 如果是数字，则转数字类型返回
      let temp = routeVal;
      switch (type.name) {
        case 'Number':
          temp = Number(routeVal);
          break;
        case 'String':
          temp = String(routeVal);
          break;
        case 'Boolean':
          temp = routeVal === 'false' ? false : true;
          break;
        default:
          throw Error('query 中必传字段传入的 type不合法， 应该为 Number | Boolean | String');
      }

      return temp;
    },
  },
};
