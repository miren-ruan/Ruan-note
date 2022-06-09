<h2 align="center" style='padding:10px 0 20px 0;'>🚀vue2到vue3，到底发生了什么？</h2>
<img src="assets/images/vue3.PNG" align='center'/>

#### 1、虚拟dom优化

**虚拟dom：**这是用来追踪当前dom状态，并根据数据生成一个描述dom结构的js对象。当数据再次发生变化时，又会生成一个新的虚拟dom，通过比较新旧虚拟dom的差异，得出一个更新的最优算法，这就是diff算法

**传统diff算法的局限：**虽然保证了最小化的更新，节约浏览器的渲染性能，但是增加了新旧虚拟dom对比的性能消耗，因此虚拟dom的大小就直接决定了对比的快慢

**vue3优化方法：**

- `patchFlag`

假设我们要编译以下代码

```html
<div>
  <span>static<span/>
  <span>{{ msg }}</span>
</div>
```

将会被编译成这个样子

```js
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, "static"),
    _createVNode("span", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
// Check the console for the AST
```

第二个`_createNode`中添加了一个值为`1`的标记，这个标记就是`PatchFlag`

**`PatchFlag`** 是Vue在运行时生成的，用作节点标记。在Vue3.0中，只有带`PatchFlag`的这些`node`会被真正的追踪，也就是说在后续更新的过程中，Vue会知道静态节点不用管，只需要追踪带有`PatchFlag`的节点



- 事件监听缓存：`cacheHandlers`

通过以下代码绑定一个事件

```html
<div>
  <span @click="onClick">
    {{msg}}
  </span>
</div>
```

优化后的编译结果

```js
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", {
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.onClick($event)))
    }, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```

使用`cacheHandlers`之后，会自动会生成一个内联函数，在内联函数里面在引用当前组件最新的`onClick`，再把这个内联函数`cache`起来

第一次渲染的时候，创建这个内联函数，并将这个内联函数缓存起来，后续的更新就从缓存里面读同一个函数，同一个函数就没有更新的必要了，通过这种事件监听缓存的方式对性能提升起到作用

------

#### 2、监测机制的改变：用`Proxy`替换`Object.defineProperty`

**原因：**

1. `defineProperty`的局限性，它只能针对单个属性进行监听，通过对data中的属性做遍历+递归，对每个属性设置了`getter`和`setter`。对于数组来讲，如果通过下标的方式直接修改属性的值，或者添加一个预先不存在的属性，是监听不到变化的；对于对象来讲，只能劫持对象的属性，如果属性值是对象，还需要深度遍历
2. `Proxy`的监听是针对对象的，因此被监听的对象的所有操作都会进入监听操作，这样就能代理所有属性，这就相当于提供了一种可以对外界访问进行过滤和改写的机制
3. 在 Vue2中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行 `Object.defineProperty` 把每一层对象数据都变成响应式的，这会有很大的性能消耗；在 Vue3中，`Proxy`的处理方式是在`getter`中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，就是按需实现响应式，减少性能消耗

|                      | Object.defineProperty | Proxy    |
| -------------------- | --------------------- | -------- |
| 属性的读写           | ✔                     | ✔        |
| 属性的删除           | X                     | ✔        |
| 是否能监听数组、对象 | X                     | ✔        |
| 兼容性               | 不兼容IE8及以下       | 不兼容IE |

------

#### 3、作用域插槽的改变

vue2的机制导致作用域插槽变了，父组件也会进行重新渲染；

vue3将作用域插槽改成函数的方式，这样只会影响子组件的重新渲染，提升渲染性能

------

#### 4、编译优化

```html
<template>
  <div id="content">
    <p class="text">static text</p>
    <p class="text">static text</p>
    <p class="text">{{message}}</p>
    <p class="text">static text</p>
    <p class="text">static text</p>
  </div>
</template>
```

虽然代码中只有一个动态节点，但在vue2中，还是需要遍历整个vnode树，因此vue2的vnode性能只和模板的大小相关，假设动态节点很少，就会浪费很多性能。vue3通过编译阶段对静态模板进行分析，编译生成`Block tree`，通过这个vnode更新性能不再与模板大小相关联，而是与动态节点挂钩，提升了很大的性能

------

#### 5、`Tree shaking`

`Tree shaking` 是一种通过清除多余代码方式来优化项目打包体积的技术，就是在保持代码运行结果不变的前提下，去除无用的代码。主要是借助ES6模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量

- 编译阶段利用`ES6 Module`判断哪些模块已经加载
- 判断那些模块和变量未被使用或者引用，进而删除对应代码

------

#### 6、项目升级vue3的操作

详情修改参考[官方文档](https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#main-js)

------

#### 7、`typescript`的优势

1. 引入静态类型声明，减少不必要的类型判断和文档注释；
2. 静态类型检查，在编译时发现问题，不用等到运行；
3. 类、接口的使用更易于构建和维护组件；
4. 重构更方便可靠，适合大型项目；

------

#### 8、基于函数的组合式API

**`composition API`：**将业务的逻辑关注点从不同`options`，迁移到同一个`option-setup`，传统的`options API`中，如果我要新增或者修改一个需求，需要分别在`data`、`methods`、`computed`里面分别修改，而现在的组合式API可以让相关功能的代码组合在一起

- setup
- ref和reactive

```js
<template>
  <h2>名称：{{name.title}}</h2>
  <h2>主要爱好：{{job.hobby[0].type}}</h2>
  <button @click="changeName">修改姓名和爱好</button>
</template>
<script>
import { ref,reactive } from 'vue' // 按需引入ref函数
export default {
  name: 'App',
  setup () {
    let name = ref({ // ref定义对象类型响应式变量
      title:'赵丽颖'
    }) 
    let job = reactive({ // reactive定义对象类型响应式变量
      type:'演员',
      hobby:[
        {
          type:'演戏',
          degree:'✨✨✨✨✨'
        },
        {
          type:'看书',
          degree:'✨✨✨'
        }
      ],
    })
    function changeName () {
      console.log('name',name)
      name.value.title = '刘亦菲' // 对ref定义的响应式数据进行操作，需要使用.value
      console.log('job',job)
      job.hobby[0].type = '运动' // 对reactive定义的响应式数据进行操作，无需使用.value
    }
    // 将变量和函数返回，以便在模版中使用
    return {
      name,
      job,
      changeName
    }
  }
}
</script>
```

- 计算属性与监视

主要是`watch`的用法的改变，以及新增的`watchEffect`函数

- 生命周期函数

在 vue 3.0 中，生命周期是从 vue 中导出的，我们需要用到哪些，就导出哪些。通过引入使用的这种设定，可以减少我们的最终编译的项目的体积。而且，这样的引入使用，更加的逻辑清晰

| vue2          | vue3            |
| ------------- | --------------- |
| beforeCreate  | setup           |
| created       | setup           |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeforeUpdate  |
| updated       | onUpdated       |
| beforeUnmount | onBeforeUnmount |
| unmounted     | onUnmounted     |

- 自定义hook函数

类似与vue2的`mixin`混入，并且可复用代码, 让setup中的逻辑更清楚易懂

------

**9、暴露了自定义渲染API**

vue2最开始支持运行在浏览器中，渲染到浏览器的dom上，随着vue的流行，出现了weex和myvue。

**weex**：移动端跨平台方案，需要渲染到移动设备。weex被写在vue原项目里，缺点是使vue原项目更大了

**myvue**：小程序上使用，需要渲染到小程序框架上，myvue是单独fork一份源代码进行更改，缺点也非常明显，myvue中vue的版本跟官方版本从fork的那一刻开始，就要开始不一致了

vue2项目架构对于这种渲染到不同平台不太友好，vue3推出了自定义渲染API解决了该问题

------

1、proxy深入了解

2、vue首次加载优化（白屏）

3、打包优化深入了解

4、setup深入了解

5、vue升级的坑、注意点

6、vue3代码的向下兼容性，是否能用vue2的插件 ！important

7、vue3目前存在的问题以及升级风险