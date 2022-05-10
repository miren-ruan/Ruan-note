####  **1、请说明px，em，rem，vw，vh，rpx等单位的特性？**

- px：像素
- em：当前元素的字体大小
- rem：根元素字体大小
- vw：100vw是总宽度
- vh：100vh是总高度
- rpx：750rpx是总宽度

------

#### 2、网页中有大量图片加载很慢，如何优化？

> 1、图片懒加载，在图片不可视区域增加一个滚动条事件，判断图片位置与浏览器顶端和页面的距离，如果前者小于后者，优先加载；
>
> 2、使用图片预加载技术，将当前展示的图片的前一张和后一张优先下载；
>
> 3、使用`CSS Sprite`或者`svg Sprite`;

`CSS Sprite`其实就是把网页中的一些背景图片整合到一张图片文件中

------

#### 3、`clientHeight`、`offsetHeight`、`scrollHeight`有什么区别?

**clientHeight**：用户可见内部高度+padding

**offsetHeight**：总高度，算上滚动条

**scrollHeight**：可滚动高度的+padding

**scrollTop**：当前元素距离顶部的距离

触底加载：scrollTop + clientHeight >= scrollHeight - 50px

------

#### 4、BOM和DOM的区别？

BOM：就是window，包含windows(窗口)、navigator（浏览器）、screen（浏览器屏幕）、history（访问历史）、location（地址）等，浏览器相关的东西，bom是包含dom的

DOM：就是document，html相关的都在里面

------

#### 5、script标签中的defer和async都代表了什么？

**script会阻塞页面的加载，如果我们要是引用外部js，假如这个外部js请求很久的话就难免出现空白页问题，好在官方为我们提供了defer和async**

`defer`：不会阻止页面解析，并行下载对应的js文件，下载完之后不会执行，等其他所有脚本加载完之后执行

`async`：不会阻止DOM解析，并行下载对应的js文件，下载后立即执行

------

#### 6、什么是BFC？

**BFC是一个独立渲染区域，它丝毫不会影响到外部元素**

BFC的特性：

> 1、同一个BFC下margin会重叠
>
> 2、计算BFC高度时会算上浮动
>
> 3、BFC不会影响到外部元素
>
> 4、BFC内部元素是垂直排列的
>
> 5、BFC区域不会与float元素重叠

如何创建BFC：

> 1、position设置为absolute或者fixed
>
> 2、float不为none
>
> 3、overflow设置为hidden
>
> 4、display设置为inline-block或者inline-table或flex

------

#### 7、如何清除浮动？

- 设置额外标签，添加`clear:both;`样式
- 利用BFC，设置`overflow:hidden;`
- 使用`after`

------

#### 8、css如何绘制三角形？

```css
.x {
      width: 0;
      height: 0;
      background-color: red;
      border-left: 30px transparent solid;
      border-top: 50px black solid;
      border-right: 30px transparent solid;
  }
```

------

#### 9、什么是DOM事件流？什么是事件委托？

DOM事件流三个阶段：捕获阶段、目标阶段、冒泡阶段

事件委托：利用冒泡原理，把事件绑定到父元素中，实现事件委托

------

#### 10、事件冒泡和事件捕捉有什么区别？

事件冒泡：在`addEventListener`中的第三属性设置为false（默认），自下而上执行

事件捕捉：在`addEventListener`中的第三属性设置为true，自上而下执行

------

#### 11、css的优先级问题？

- important无条件优先
- 内联样式（1000）
- id选择器（100）
- class、伪类、属性（10）
- 标签，伪元素（1）

------

#### 12、css水平、垂直居中有哪些写法？

**水平居中：**

> 行内元素：`text-align:center;`
>
> 块级元素：`margin:0 auto;`
>
> `position:absolute;` +`left:50%;`+ `transform:translateX(-50%);`
>
> `display:flex;`+ `justify-content: center;`

**垂直居中：**

> 设置`line-height` 等于`height`
>
> `position:absolute;` +`top:50%;`+ `transform:translateY(-50%);`
>
> `display:flex;` + `align-items: center;`

------

#### 13、对Flex有哪些了解？

**容器的属性：**

```css
flex-direction: row | row-reverse | column | column-reverse;//沿主轴方向排列
flex-wrap: nowrap | wrap | wrap-reverse; //用来设置轴线满了是否换行
justify-content: flex-start | flex-end | center | space-between | space-around;
//项目在主轴上的排列方式
align-items: flex-start | flex-end | center | baseline | stretch;
//项目在交叉轴上的对齐方式
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
//多根轴线的对齐方式
```

**子元素item的属性：**

```css
order: <integer>; //定义项目的排列顺序,数值越小，排列越靠前，默认为0
flex-grow: <number>; //定义项目的放大比例，默认为0，如果存在剩余空间，也不放大
flex-shrink: <number>; //定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
flex-basis: <length> | auto; //定义了在分配多余空间之前，项目占据的主轴空间
align-self: auto | flex-start | flex-end | center | baseline | stretch;
//表示继承父元素的 align- items属性
```

详情参考阮一峰老师的[Flex布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)



