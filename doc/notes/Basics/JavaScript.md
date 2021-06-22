#### 1、获取鼠标指针的坐标

```javascript
//在IE8及以下的浏览器中，是将事件对象作为window对象的属性保存的
//先判断是否存在event
event = event || window.event;
var x = event.clientX;
var y = event.clientY;
```

------

#### 2、事件冒泡：**当一个元素接收到事件的时候，会把他接收到的事件传给自己的父级，一直到window;**

阻止事件冒泡的方法：

```javascript
event = event || window.event;
event.cancelBubble = true;
```

------

#### 3、变量类型

###### 原始类型

```javascript
let a = 10;
let b = a;
//此时b=10;
//如果此时 let a = 20,b不会改变，还是10
```

###### 引用类型

```js
let a = {age:20};
let b = a;
//此时b=20;
//如果 a.age = 30 , 则b=30
```

> 原始类型：值保存在栈中，因此互不影响，如：`string`,`number`,`boolean`,`symbol`;
>
> 引用类型：值保存在堆中，内存地址在栈中，如：`object`,`array`,`null`,`function()`;

##### (一）`join`:将数组转换为字符串

```javascript
//格式：arr.join('分隔符')；
var arr = ['a','b','c','d','e'];
var str = arr.join();
console.log(str);  //a,b,c,d,e  分隔符可以省略，变成逗号分隔
var nt = arr.join('');
console.log(nt);  //abcde   拼接在一起
```

##### (二）`indexOf`:在数组中查找指定的值

**`lastIndexOf`:从后向前找**

**如果有则返回其下标，如果没有则返回`-1`**

```js
var arr = [10,20,30,40,50];
var res = arr.indexOf(40);
console.log(res);  //3
var res = arr.indexOf(40,4); //从下标为4的元素开始查找
```

##### (三)`concat`:数组拼接

```js
var arr1 = [1,2,3];
var arr2 = [4,5];
var newArr = arr1.concat(arr2,100,200);//可以拼数组或者数据
```

##### (四)`map`:返回一个新数组，数组中的元素是原数组调用函数处理后的值

```js
arr.map(function(val,index,arr){
    console.log(val);      //正在处理的数组元素
    console.log(index);   //数组下标
    console.log(arr);     //当前元素所在的数组
})
```

##### (五)`push`:在数组的尾部追加数组元素

**返回值：新的数组的长度**

```js
var arr = [1,2,3,4];
var res = arr.push(100);
console.log(res); //5  
```

##### (六)`pop`:删除数组最后一个元素

**返回值：被删除的元素**

```js
var arr = [1,2,3,4];
var res = arr.pop();
console.log(arr);  //[1,2,3]
console.log(res);  //4
```

##### (七)`unshift`:在数组头部添加元素

**格式和返回值与`push`类似**

##### (八)`shift`:在数组头部删除元素

**格式和返回值与`pop`类似**

##### (九)`slice`:从数组中截取特定元素，并用这些元素组成新的数组

**格式：`arr.slice(begin,end);`**

> `begin`:表示截图的起始位置的下标
>
> `end`:表示截取的终止位置的下标，截取时不包括`end`对应的值

```js
var arr = [1,2,3,4,5,6,7,8];
var res = arr.slice(2,4);
console.log(res);  //[3,4]

var res = arr.slice(2);  //表示从第三个截取到最后
var res = arr.slice();   //表示对原有数组的复制
```

##### (十)`some`:用于检测数组中的元素是否有满足指定条件

```js
var arr = [1,2,3,4,5];
//判断数组中是否有大于3的元素
var res = arr.some(function(val,index,arr){
    return val>3;
})
console.log(res);  //true
```

##### (十一)`every`:用于检测数组中的元素是否都满足条件

```js
var arr = [1,2,3,4,5];
//判断数组中是否都大于3
var res = arr.every(function(val,index,arr){
    return val>3;
})
console.log(res);  //false
```

##### (十二)`includes`:判断数组是否包含指定的值

```js
arr.includes(3); //判断数组中是否包含3
arr.includes(3,4);  //从下标为4的元素开始找是否包含3
```

##### (十三)`sort`:对数组中的元素进行排序

```js
var arr = [1,3,53,14,2,90];
arr.sort(function(a,b){
    return a-b;  //升序
});
arr.sort(function(a,b){
    return b-a;  //降序
});
```

##### (十四)`splice`:对数组进行增、删、改操作

```js
var arr = [1,2,3,4,5];
//增的格式：数组名称.splice(下标,0,要增加的数据)
arr.splice(3,0,100);
//删的格式：数组名称.splice(下标,个数)，返回值为被删除元素形成的新的数组
arr.splice(3,2);
//改的格式：数组名称.splice(下标,个数,新的值)
arr.splice(3,1,100);
```

##### (十五)`reduce`和`reduceRight`方法

**作用**：`reduce()`方法接收一个函数作为累加器，数组中的值开始缩减，最终计算为一个值，`reduceRight`的作用和`reduce`相同，但执行顺序从右到左

```js
//求数组的合,无初始值
var arr = [11,12,13,14,15,16,17,18,19,110];
vae res = arr.reduce(function(prev,currentValue,currentIndex,arr){
   /*
   第一次执行时：
     prev:数组的第一个元素 11
     currentValue:数组的第二个元素 12
     currentIndex:数组第二个元素的下标 1
     arr:整个数组
   */ 
    return prev + currentValue;
});
//11+12+13+...+19+110
```

```js
//求数组的合,有初始值
var arr = [11,12,13,14,15,16,17,18,19,110];
vae res = arr.reduce(function(prev,currentValue,currentIndex,arr){
   /*
   第一次执行时：
     prev:数组的初始值 1000
     currentValue:数组的第一个元素 11
     currentIndex:数组第一个元素的下标 0
     arr:整个数组
   */ 
    return prev + currentValue;
},1000);
//1000+11+12+13+...+19+110
```



#### 5、定时器

###### (一)`setInterval()`，定时调用，可以将一个函数每段时间执行一次

```js
var timer = setInterval(function(){
//每次调用的间隔时间单位为毫秒
},1000);
```

###### (二)`clearInterval()`可以用来关闭定时器

`setInterval()`会返回一个`Number`类型的数据作为定时器的唯一标识，通过标识来进行关闭

```js
clearInterval(timer);
```

###### (三)`setTimeout()`延时调用，隔一段时间调用函数，只会执行一次

```js
var timer = setTimeout(function(){
//隔三秒调用函数
},3000);
```

###### (四)`clearTimeout()`可以用来关闭延时调用

```js
clearTimeout(timer);
```

------

#### 6、快捷的类型转换

```js
// 强制转换为Boolean 用 !!
var bool = !!"c";
console.log(typeof bool); // boolean

// 强制转换为Number 用 +
var num = +"1234";
console.log(typeof num); // number

// 强制转换为String 用 ""+
var str = ""+ 1234;
console.log(typeof str); // string
```

