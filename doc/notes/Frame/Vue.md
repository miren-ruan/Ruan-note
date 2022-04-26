#### 1、几种常用指令

> v-once：表示元素和组件只会渲染一次，指令后面不需要跟表达式；
>
> v-html：该指令后面往往会跟一个`string`类型，会解析HTML并进行渲染；
>
> v-text：将数据显示在界面中，和`{{}}`相似；
>
> v-pre：用于跳过这个元素和其子元素的编译过程，显示原本的语法；
>
> v-cloak：斗篷，会直接显示出未编译的`Mustache`标签；
>
> v-bind：动态绑定属性，语法糖 `:`，不支持驼峰

------

#### 2、动态切换`class`

可以在对象中传入多个字段来切换多个`class`，并且`v-bind:class`可以和一般的`class`共存

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

```js
data: {
  isActive: true,
  hasError: false
}
```

最终渲染结果为：

```html
<div class="static active"></div>
```

------

#### 3、事件监听`v-on`

- 作用：绑定事件监听器
- 语法糖：@
- 注意：如果需要传入某个参数，同时需要`event`时，可以通过`$event`传入事件

```html
<button @click="handAdd(10,$event)">按钮1</button>
```

- `v-on`的修饰符

```html
<!--停止冒泡 -->
<button @click.stop="doThis"></button>
<!--阻止默认行为 -->
<button @click.prevent="doThis"></button>
<!--串联修饰符 -->
<button @click.stop.prevent="doThis"></button>
<!--键修饰符  键别名 -->
<input @keyup.enter="onEnter">
<!--键修饰符  键代码 -->
<input @keyup.13="onEnter">
<!--点击回调只触发一次 -->
<button @click.once="doThis"></button>
```

------

#### 4、循环遍历`v-for`

```vue
<!--遍历过程中，不使用索引值-->
<li v-for="item in names">{{item}}</li>
<!--遍历过程中，获取索引值(数组)-->
<li v-for="(item,index) in names">{{index}}.{{name}}</li>
<!--遍历对象，(key,value)-->
<li v-for="(key,value) in info">{{key}}-{{value}}</li>
```

------

#### 5、过滤器

```vue
<tr>
   <td>{{item.price|showPrice}}</td>
</tr>

methods:{
  filters:{
     showPrice(price){
       return '$' + price.toFixed(2)
    }
  }
}
```

------

#### 6、`v-model`

**`v-model`其实是一个语法糖，本质包含两个操作:**

> 1、`v-bind`绑定一个`value`属性；
>
> 2、`v-on`给当前元素绑定`input`事件；

**修饰符：**

`lazy`：可以让数据失去焦点或者回车时更新

```vue
<input type="text" v-model.lazy="message">
```

`number`：可以让在输入框输入的内容自动转成数字类型

```vue
<input type="number" v-model.number="age">
```

`trim`：可以过滤内容左右两边的空格

```vue
<input type="text" v-model.trim="name">
```

------

#### 7、父子组件通信

> 通过`props`向子组件传递数据
>
> 通过事件向父组件发送消息

##### 父传子

```js
props:{
   width:{
       type:Number,  //属性的类型
       default:'30',  //默认值
       required:true  //必传
   },
       
   //类型是数组或对象时，默认值必须是一个函数
   timer:{
       type:Array,
       default(){
           return []
       }
   }
}
```

##### 子传父

```vue
<script>
   methods:{
       btnClick(item){
           //发射自定义事件,同时将item传过去
           this.$emit('item-click',item)
           //父组件需要对事件进行监听  @item-click="xxxxx"
       }
   }
</script>
```

##### 父组件访问子组件 `$children`或者 `$refs`

```js
//在父组件中
methods:{
    btnClick(){
        console.log(this.$children);
        this.$children.......
    }
}
```

```vue
<div>
    <cpn ref="aaa"></cpn>
</div>

methods:{
    btnClick(){
        console.log(this.$refs.aaa.name);
    }
}
```

**注意：使用时先给子组件做标记，例如:`<cpn ref="aaa"></cpn>`，然后在父组件，就可以通过`this.$refs.aaa`来进行访问，包括`data`里面的数据，调用它的函数**

##### 子组件访问父组件 `$parent`

##### 访问根组件 `$root`

```js
//假设vue示例有个data
data:{
   message:'1111'
}
//在子组件中就能进行访问
methods:{
   btnClick(){
       console.log(this.$root.message)
   }
}
```

**但`$parent`和`$root`一般很少使用**

------

#### 8、插槽

###### 插槽的基本使用

```vue
<slot></slot>
```

###### 给插槽加入默认值

```vue
<slot>
   <button></button>
</slot>
```

###### 如果有多个值，同时放进去进行替换，会一起作为替换元素

###### 当需要用到多个插槽时，使用具名插槽

```vue
<!--使用时-->
<div>
    <cpn><span slot="centre">标题</span></cpn>
</div>

<!--定义时-->
<slot name="centre"></slot>
```

------


