#### **1、`var`,`const`,`let`有什么区别？**

​        `var`

- var声明的变量可进行变量提升，let和const不会

- var可以重复声明

- var在非函数作用域中定义是挂在到window上的

  `let`

- let声明的变量只在局部起作用

- let防止变量污染

- 不可在声明

  `const`

- 具有let的所有特征

- 不可被改变

- 如果使用const声明的是对象的话，是可以修改对象里面的值的

------

#### **2、`ES6`和`common.js`的区别？**

- `commonjs`模块输出的是值的拷贝，而`ES6`输出的值是值的引用；
- `commonjs`是在运行时加载，是一个对象，`ES6`是在编译时加载，是一个代码块；
- `commonjs`的this指向当前模块，`ES6`的`this`指向`undefined`；

------

#### 3、了解ES6的延展操作符吗？

```js
let arr1 = ['a' , 'b' , 'c'];
let arr2 = ['d' , 'e'];
let result = [...arr1 , ...arr2];
//['a','b','c','d','e']
```

如果延展对象，对象的属性值一致，则会覆盖

------

#### 4、了解哪些字符串方法？

- startsWith()：判断字符串是否以 XX 开头
- endsWith()：判断字符串是否以 XX 结尾
- includes()：判断字符串中是否包含XX
- repeat()：拷贝n份
- padStart()/padEnd()：头部或尾部补全，有两个参数，第一个表示字符串最小长度，第二个是用来补全的字符串

------

#### 5、了解哪些ES6的数组方法？

- forEach()

```js
arr.forEach(function(value,index,array){
  console.log(value)
  //value表示数组当前项的值，index表示当前项的索引，array表示数组本身
  //注意：无返回值，和 map的区别点
})
```

- filter()：过滤，返回符合条件的新数组
- some()：检测数组是否存在满足指定条件的项，返回值为布尔值，找到则返回true，并终止遍历
- map()：类似于foreEach()，但会返回新数组
- every()：遍历，只要有一项不满足条件，就返回false

------

#### 6、`find`和`findIndex`有了解吗？

##### find()：返回数组中符合测试函数的第一个元素的值，没有则返回`undefined`

##### findIndex()：返回数组中符合测试函数的第一个元素的索引，没有则返回`-1`

------

#### 7、对promise了解多少？

**定义**：promise是一种异步编程解决方案，有三种状态，pending(进行中)，resolved(已完成)，rejected(已失败)

**解决的痛点**：

> 1、回调地狱，解决异步操作函数里的嵌套回调问题
>
> 2、可以支持多个并发的请求，获取并发请求中的数据
>
> 3、解决了代码的可读性问题
>
> 4、在异步执行的流程中，将执行代码和处理结果的代码清晰的分离了