### handleQuery mixin 的作用与用法

#### 快速说明

handleQuery 提供了两个值：

- computed 值 :`computedQuery:{x[string]:string}`

  > 根据组件中 data.query 预定义的字段，去获取路由的 query 参数， 在这个过程中，将会去验证：
  >
  > 1. data.query 中的预定义字段的 必传 字段定义是否合法(合乎规定)
  > 2. 对于必传 query 字段， 实际的路由中是否传入了对应的 query 字段
  > 3. 获取到路由传入的字段

  这个组件最终返回一个拍平的 data.query 对象，例如 data.query 如下定义：

  ```js
   query:{
        maxWidth: 'auto',//示例字段
        minWidth: 'auto',//示例字段
        example: { //必须字段
          type: Number,
        },
    }
  ```

  computedQuery 值将会是：

  ```json
   {
    maxWidth: 'auto',//示例字段
    minWidth: 'auto',//示例字段
    example: 路由传入的type参数<Number>
   }
  ```

- data 值:`wrongPage:Booelean`
  > 这个值默认为 false, 在 computed 的过程中，遇到了不合法的情况，这个值将会是 true. 可以利用这个字段去做一些渲染相关的逻辑。

#### 使用说明 [必须]

在你的组件引入该 mixin

```js
import handleQuery from '@/mixins/handleQuery.js';
export deafault {
  mixins: [handleQuery],
  ...
  data(){
    query:{
      // 必须字段
        maxWidth: 'auto',//示例字段
        minWidth: 'auto',//示例字段
        example: { //示例字段
          type: Number,
        },
    }
  }
}

```

**指定必传字段**
你需要通过将一个必传字段指定为一个形如 :`{ type: Number | String | Boolean }` 的对象， 其作用除了用于验证字段是否传递之外， 还会将 query 中对应的字段，通过这些构造函数包装转换后返回。

### 注意：

如果你要指定某个 query 字段是这个页面组件在访问时，所必须传递的， 那么你一定要将其指定为 **一个对象**.

_如果你需要修改这部分代码的逻辑， 你需要验证并测试是否会对其他混入了该 mixin 的组件产生影响， 如果有必要，在其他依赖该 mixin 页面正常工作时， 你应该自定义一个新的 mixin 而非直接修改该 mixin_
