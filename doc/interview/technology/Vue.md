#### **1、`watch`和`computed`的区别？**

- `computed`支持缓存，只有依赖数据发生改变，才会重新计算；`watch`不支持缓存；
- `computed`不支持异步；`watch`支持异步；
- 如果一个属性由其它属性计算来的，依赖其它属性，一般用`computed`；当一个属性发生变化，需要执行对应的操作时，一般用`watch`；

------

#### **2、了解`watch`的简单使用吗？**

```js
watch: {
    'cityName.name': {
      handler(newName, oldName) {
      // ...
      },
      deep: true, //需要监听数组对象中的属性变化的时候，需要深度监听
      immediate: true //如果需要在最初绑定值的时候也执行函数，设为true
    }
  }
```

------

#### **3、如何理解Vue中的`nextTick`？**

解释：在下次DOM更新循环结束之后执行延迟回掉，在修改数据后立即使用这个方法，获取更新后的DOM

应用：

- 想要在Vue生命周期函数中的`created()`操作DOM可以使用`Vue.nextTick()`回调函数
- 在数据改变后要执行的操作，而这个操作需要等数据改变后而改变DOM结构的时候才进行操作，需要用到`nextTick`

------

#### **4、阐述一下你理解的MVVM响应式原理？**

vue是采用数据劫持配合发布者-订阅者的模式的方式，通过`Object.defineProperty()`来劫持各个属性的`getter`和`setter`，在数据变动时，发布消息给依赖收集器，去通知（notify）观察者，做出对应的回调函数，去更新视图；

MVVM作为绑定的入口，整合`Observer`,`Compile`和`Watcher`三者，通过`Observer`来监听model数据变化，通过`Compile`来解析编译模板指令，最终利用`Watcher`搭起`Observer`，`Compile`之间的通信桥路，达到数据变化=>视图更新；视图交互变化=>数据model变更的双向绑定效果。

------

#### **5、说说vue的生命周期？**

**beforeCreate**：创建之前，此时还没有`data`和`Method`；可以在这加loading事件，加载实例时触发；
**created**：创建完成，此时`data`和`Method`可以使用了，在`Created`之后`beforeMount`之前如果没有el选项的话那么此时生命周期结束，停止编译，如果有则继续；初始化完成时的事件可以写在这里；
**beforeMount**：载入前，在渲染之前；
**mounted**：载入后，页面已经渲染完成，并且`vm`实例中已经添加完`$el`了，已经替换掉那些DOM元素了（双括号中的变量），这个时候可以操作DOM了（但是是获取不了元素的高度等属性的，如果想要获取，需要使用`nextTick()`）
**beforeUpdate**：data改变后，对应的组件重新渲染之前；
**updated**：data改变后，对应的组件重新渲染完成；
**beforeDestory**：在实例销毁之前，此时实例仍然可以使用；
**destoryed**：实例销毁后；

------

#### **6、vue的优化方式？**

1. 合理使用`v-if`和`v-show`；
2. 使用`Object.freeze()`方式冻结data中的属性，从而阻止数据劫持减少`getter`和`setter`；
3. 使用`keep-alive`来缓存组件；
4. 路由懒加载，图片懒加载；
5. 防抖和节流；

------

#### **7、了解vue-router的模式吗？**

- `hash模式`：监听`hashchange`事件实现前端路由，利用url中的hash来模拟一个hash，保证URL改变时页面不会重新加载；
- `history模式`：利用`pushstate`和`replacestate`来将url替换但不刷新，但是有一个致命点就是，一旦刷新的话，就会可能404，因为没有当前的真正路径，要想解决这一问题需要后端配合，将不存在的路径重定向到入口文件；

------

#### **8、了解虚拟DOM吗？优缺点有哪些？**

**虚拟DOM**：就是一个普通的js对象；虚拟dom可以很好的追踪当前dom的状态，它会根据当前描述dom结构生成一个虚拟dom，然后数据变化后生成一个新的虚拟dom，然后通过diff算法比较两个虚拟dom的差异，获得一个更新的最优算法；

**优点**：减少了DOM操作，减少了重绘和回流，具备了局部更新的能力；

**缺点**：首次渲染大量DOM时，由于多了一层虚拟DOM计算，会比innerHTML慢；

------

#### **9、简述一下diff算法？**

diff算法就是比较新旧两个虚拟DOM差异的一种算法

**几个核心方法：**

- h函数：在render函数内运行，在created和beforeMount之间执行，生成虚拟DOM；
- patch函数：diff从这开始，用于比较两个虚拟DOM的根节点；
- patchVnode函数：用于比较两个相同节点的子级；
- updateChldren函数：比较新旧两个vnode的子节点；

**diff比较规则：**

- 是否在同一层并且有相同的父级；
- 用先序深度优先遍历进行节点比较；

------

#### **10、vue组件的通讯方式有了解吗？**

- **Props和$emit**

父组件向子组件传递数据是通过prop传递的，子组件传递数据给父组件是通过$emit触发事件来做到的

- **$attrs和$listeners**

如果父组件A下面有子组件B，组件B下面有组件C,这时如果组件A想传递数据给组件C，就可以用

- **中央事件总线**

如果两个组件不是父子关系呢？这种情况下可以使用中央事件总线的方式，新建一个Vue事件bus对象，然后通过`bus.$emit`触发事件，`bus.$on`监听触发的事件

- **provide和inject**

父组件中通过`provider`来提供变量，然后在子组件中通过`inject`来注入变量，不论子组件有多深，只要调用了`inject`那么就可以注入`provider`中的数据，而不是局限于只能从当前父组件的prop属性来获取数据，只要在父组件的生命周期内，子组件都可以调用

- **v-model**

父组件通过v-model传递值给子组件时，会自动传递一个value的prop属性，在子组件中通过`this.$emit(‘input’,val)`自动修改`v-model`绑定的值

- **$parent和$children**

这两种都是直接得到组件实例，使用后可以直接调用组件的方法或访问数据，无法在跨级和兄弟间通信

- **vuex处理组件之间的数据交互**

vuex就是将这一些公共的数据抽离出来，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的

------

#### **11、第一次加载会触发几个钩子？**

`beforeCreate` , `created` , `beforeMount` , `mounted`

------

#### **12、子组件和父组件生命周期发生的先后顺序？**

**加载渲染过程**：父beforeCreate->父created->父beforeMount->子beforeCreate->子created-> 子beforeMount->子mounted->父mounted

**子组件更新过程**：父beforeUpdate->子beforeUpdate->子updated- >父updated

 **销毁过程**：父beforeDestroy->子beforeDestroy- >子destroyed->父destroyed

------

#### **13、Vuex是什么？如何使用？**

Vuex 是一个专为 Vue.js 应用程序开发的状态管理器， 主要是为了多页面、多组件之间的通信

- **state**：存储基本数据；
- **getters**：相当于vue中的计算属性；
- **mutations**：相当于vue中的methods，定义方法，但是可以在多个组件中调用，只能写同步操作；
- **actions**：写异步操作，通过`store.dispatch`；
- **modules**：模块化，相当于一个store，里面也有这五个属性；

------

#### **14、`Vuex`和`localStorage`的区别是什么？**

1. vuex存储在内存，而localStorage以文件的形式存储在本地；
2. localStorage只能存储字符串类型的数据；
3. vuex用于组件之间的传值，而localStorage一般在跨页面传递数据时使用；
4. vuex能做到数据的响应式，localStorage不能；
5. 刷新页面时 vuex 存储的值会丢失， localstorage 是永久性，不会丢失；

------

#### 15、