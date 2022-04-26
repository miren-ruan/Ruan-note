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