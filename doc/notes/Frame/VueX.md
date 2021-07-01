#### 1、存放情况

一般用户的登陆状态、用户名称、头像、地理位置信息或者商品的收藏、购物车中的物品等，这些状态信息可以放在统一的地方进行保存管理，并且它们还是响应式的

------

#### 2、`store`的对象

`store`是Vuex.Store这个构造函数new出来的实例，在构造函数中可以传一个对象参数，这个参数中可以包含5个对象

```js
//一个完整的store结构
const store = new Vuex.Store({
    state:{
        //存放状态
        counter:1000
    },
    getters:{
        //state的计算属性
    },
    mutations:{
        //更改state中状态的逻辑，同步操作
        increment(state){
            //state会默认传过来，不需要this
            state.counter++
        }
    },
    actions:{
        //提交mutation，异步操作
    },
    //如果将store分成一个个模块，就需要用到modules
    //然后在每一个module中写state, getters, mutations, actions等
    modules:{
        a:moduleA,
        b:moduleB,
        //...
    }
})
```

```js
//在页面中使用时
export default{
    methods:{
        increment:function(){
            this.$store.commit('increment')
        }
    }
}
```

