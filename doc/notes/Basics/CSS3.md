#### 1、盒阴影 `box-shadow`

| 值       | 描述                           |
| -------- | ------------------------------ |
| h-shadow | 必需，水平阴影的位置，允许负值 |
| v-shadow | 必需，垂直阴影的位置，允许负值 |
| blur     | 可选，模糊距离                 |
| spread   | 可选，阴影的尺寸               |
| color    | 可选，阴影的颜色               |
| inset    | 可选，将外部阴影改为内部阴影   |

------

#### 2、渐变

**(一)线性渐变**

```css
background:linear-gradient(direction,color-stop1,color-stop2,...);
//颜色最少两种，而direction的取值可以是 to right,to right bottom,0deg,45deg等
```

**(二)径向渐变**

```css
background:radial-gradient(center,shape size,start-color,...,last-color);
//第一个属性代表方向，取值可以是 top,left top
//第二个属性是渐变形状，取值可以是 circle,默认椭圆
```

**注意：浏览器有的不支持可以改成：`background:-webkit-radial-gradient(...);`**

------

#### 3、转换变型

**位移**

```css
transform:translate(x,y);
//transform:translate(10px,-10px);
```

**旋转**

```css
transform:rotate(30deg);
```

**缩放**

```css
transform:scale(number);
//transform:scale(1.5);放大1.5倍
```

**倾斜**

```css
transform:skew(30deg);
```

###### 综上，写下`transform`的四个属性

```css
transform:translate() rotate() scale() skew();
```

1、一般只取一个值代表水平方向，两个值代表水平和垂直方向；

2、旋转和倾斜的角度为0时，也要加上单位deg;

3、四个属性都有单独的X和Y属性，比如:`transform:translateX();``transform:translateX();`等；

------

#### 4、过渡 `transition` ：元素从一种样式逐渐变为另一种的效果

**过渡必须有触发事件，比如 `:hover`**

| 属性                       | 值                        | 是否必选 |
| -------------------------- | ------------------------- | -------- |
| transition-property        | 属性1,属性2,...(变化属性) | 是       |
| transition-duration        | number(持续时间)          | 是       |
| transition-timing-function | ease..(速度变化类型)      | 否       |
| transition-delay           | number(延迟变化时间)      | 否       |

------

#### 5、动画的语法

```js
@keyframes name{ //name：动画名称，自己命名
from|0%{
  css样式
}
percent{//percent：百分比值，比如25%，30%，...可以添加多个
  css样式
}
...
to|100%{
  css样式
}
}
//调用动画时，语法： animation:name 持续时间
```

