#### 1、什么是`rem`

> `px`:绝对长度单位
>
> `em`:相对长度单位，相对于父元素
>
> `rem`:相对长度单位，相对于html根元素

```js
html{
  font-size:200px;//1rem
}
.p1{
  font-size:0.1rem;//20px
} //可以用来实现响应式布局
```

------

#### 2、网页中有大量图片加载很慢，如何优化？

> 1、图片懒加载，在图片不可视区域增加一个滚动条事件，判断图片位置与浏览器顶端和页面的距离，如果前者小于后者，优先加载；
>
> 2、使用图片预加载技术，将当前展示的图片的前一张和后一张优先下载；
>
> 3、使用`CSS Sprite`或者`svg Sprite`;

`CSS Sprite`其实就是把网页中的一些背景图片整合到一张图片文件中

------

#### 3、JS中常见的内存泄露？

> 1、意外的全局变量；
>
> 2、被遗忘的计时器或者回调函数；
>
> 3、脱离DOM的引用；
>
> 4、闭包；

内存泄漏是指一块被分配的内存既不能使用又不能回收，直到浏览器进程结束；

释放内存的方法：赋值为`null`;


