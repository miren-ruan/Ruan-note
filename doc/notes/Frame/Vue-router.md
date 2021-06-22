#### 1、认识路由

###### 路由：通过互联网把信息从源地址传输到目的地址的活动

#### 2、`vue-router`基本使用

###### 安装

```js
npm install vue-router --save
```

###### 在src的`router`文件夹下创建文件`index.js`

```js
//配置路由相关信息
import VueRouter from 'vue-rooter'；
import Vue from 'vue';

//1.通过Vue.use(插件),安装插件
Vue.use(VueRouter);

//2.创建VueRouter对象
const router = new VueRouter({
    //配置路由和组件之间的映射关系
    routes:[
        //进行配置，一个组件对应一个url
        {
          path:'/',
          redirect:'/home'  //重定向，会默认显示刚进入的页面
        },
        {
          path:'/about',
          component: () => import("@/pages/about/index.vue")
        }
    ]
})

//3.将router对象传入到Vue实例
export default router;
```

###### 使用

```js
//push => history.pushState,可返回
this.$router.push('/home');

//replace,不能返回
this.$router.replace('/home');
```

###### `this.$route`表示当前路由信息的对象
<img src="assets/images/route.png" align='center'>

#### 3、`vue-router`嵌套路由

```js
{
    path:'/home',
    component: () => import('../home'),
    children:[
        {//打开默认在news页
          path:'',
          redirect:'news'
        },
        {
          path:'news',
          component:HomeNews
        },
        {
          path:'message',
          component:HomeMessage
        }
    ]
}
//最终还需要在Home文件中加入<router-view></router-view>
```



#### 4、`vue-router`参数传递

###### 传递参数主要有两种类型：`params`和`query`

> 1、命名路由搭配`params`，刷新页面参数会丢失
>
> 2、查询参数搭配`query`，刷新页面数据不会丢失

```js
//命名路由,name为路由的名字
this.$router.push({name:'news',params:{userId:123}})
//获取参数时
{{this.$route.params.userId}}
```

```js
//查询参数
this.$router.push({path:'/news',query:{userId:123}})
//获取参数时
{{this.$route.query.userId}}
```



#### 5、`vue-router`导航守卫

**一个钩子函数执行后的顺序：**

> 全局前置守卫：`beforeEach`
>
> 路由守卫：`beforeEnter`
>
> 组件路由守卫：`beroreRouteEnter`
>
> 全局解析守卫：`beforeResolve`
>
> 全局后置守卫：`afterEach`
>
> 组件生命周期：`beforeCreate`
>
> 组件生命周期：`created`
>
> 组件生命周期：`beforeMount`
>
> 组件生命周期：`mounted`
>
> 组件路由守卫`beforeRouteEnter`的`next`回调

**导航守卫分为：全局的、单个路由独享的、组件内的三种**

**(1)全局的**：指在路由实例上直接操作的钩子函数，所有路由配置的组件都会触发，执行顺序包括：`beforeEach`、`beforeResolve`、`afterEach`三个

```js
const router = new VueRouter({ ... })

router.beforeEach((to,from,next) => {
   //...
})
```

`beforeEach`：在路由跳转前触发，参数包括`to`,`from`,`next`三个，主要用于登录验证，在路由还没有跳转前告知；

`beforeResolve`：这个和`beforeEach`类似，也是在路由跳转前触发，参数也是那三个；

`afterEach`：在路由跳转后触发，参数为`to`和`from`，在`beforeRouteEnter`之前；

**(2)路由独享的**：指配置单个路由时也可以设置的钩子函数，其位置如下，目前只有一个`beforeEnter`

```js
const router = new VueRouter({
    routes:[
        {
            path:'/foo',
            component:Foo,
            beforeEnter:(to,from,next) => {
                // ...
            }
        }
    ]
})
```

**(3)组件内的**：指在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数，钩子函数的执行顺序包括：`beforeRouteEnter`、`beforeRouteUpdate`、`beforeRouteLeave`三个

```vue
<template>
    ...
</template>
export default{
  data(){
     //...
  }
  beforeRouteEnter(to,from,next){
     //在渲染该组件的对应路由被confirm前调用
  },
  beforeRouteUpdate(to,from,next){
     //在当前路由改变，但该组件被复用时调用，比如两个页面之间来回跳转
  },
  beforeRouteLeave(to,from,next){
     //导航离开该组件对应的路由时调用
  }
}
```

###### 注意：涉及到`next`参数的钩子，必须调用`next()`才能继续往下执行下一个钩子，否则路由跳转会停止

#### 6、`keep-alive`

`keep-alive`是Vue内置的一个组件，可以使被包含的组件保留状态，避免重新渲染

两个重要的属性：

> `include`：正则或字符串，只有匹配的组件会被缓存；
>
> `exclude`：正则或字符串，任何匹配的组件都不会被缓存

```vue
<keep-alive exclude="foo,user">
<!--foo和user是组件的name-->
     <router-view/>
</keep-alive>
```



#### 7、路由的懒加载

**用到时再进行加载，将路由对应的组件分割成不同的代码块**

> **写法：**

```js
const routes = [
   {
      path:'/home',
      component:() => import('../components/Home')
   },{
      path:'/about',
      component:() => import('../components/About')
   }
]
//从而不需要一次性import所有组件
```

