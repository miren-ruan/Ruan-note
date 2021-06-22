#### 1、多出部分省略号显示

```css
text-overflow:ellipsis;
white-space:nowrap;
overflow:hidden;
```

------

#### 2、居中问题

```css
//元素内容水平居中
text-align:center;

//块级元素水平居中
margin:0 auto;

//一行文字垂直居中
line-height = 30px;
height = 30px;//使行高等于高
```

------

#### 3、伪类选择器

| 名称         | 状态                   | 适用     |
| ------------ | ---------------------- | -------- |
| :link        | 点击之前               | a标签    |
| :visited     | 点击之后               | a标签    |
| :hover       | 鼠标悬停               | 所有元素 |
| :active      | 鼠标按下               | 所有元素 |
| :first-child | 父元素的第一个子元素   | 所有元素 |
| :last-child  | 父元素的最后一个子元素 | 所有元素 |
| :nth-child() | 父元素的第n个元素      | 所有元素 |

```css
.box{
    width:200px;
    height:200px;
    background:red;
}
.box:hover{
    background:blue;
}
```

------

#### 5、元素定位`position`

```css
position:absolute; //绝对定位，相对于已经定位的父元素定位
position:fixed; //固定定位，一直固定在屏幕的某个位置，上下滑动不影响位置
position:relative; //相对定位，相对于自己的原位置定位，定位后原位置保留
position:static; //默认值，没有定位
```

------

#### 6、堆叠顺序

```css
z-index:number;  //number越大层级越往上
```

------

#### 7、`display`

| 值           | 描述                               |
| ------------ | ---------------------------------- |
| none         | 此元素不会被显示，隐藏后位置不保留 |
| block        | 显示为块级元素，前后会带有换行符   |
| inline       | 默认。此元素会被显示为内联元素     |
| inline-block | 行内块元素                         |
| table-cell   | 元素会作为一个表格单元格显示       |
| Flex         | 弹性盒模型                         |

------

#### 8、关于隐藏的几个区别

| display:none;      | 隐藏，原位置不保留    |
| ------------------ | --------------------- |
| visibility:hidden; | 隐藏，保留原位置      |
| opacity:0;         | 透明度为0，保留原位置 |
| overflow:hidden;   | 溢出部分隐藏          |

------



#### 9、`flex`弹性盒模型

##### (一)`flex-direction`，用来设置容器的**主轴方向**和主轴线的起点，属性如下：

```css
 flex-direction: row;   //(默认值)主轴为水平方向，起点在左侧
 flex-direction: row-reverse;  //主轴为水平方向，起点在右侧
 flex-direction: column;  //主轴为垂直方向，起点在顶部
 flex-direction: column-reverse;  //主轴为垂直方向，起点在底部
```

<img src="assets/images/direction.png" align='center'>

##### (二)`flex-wrap`,用来设置如果一条轴线上排满了是否换行，属性如下：

```css
 flex-wrap: nowrap;     //(默认值)设置不换行，就挤着
 flex-wrap: wrap;    //换行，按顺序第一行从交叉轴线起点端开始排列
 flex-wrap: wrap-reverse; //换行，但是被后来居上了，第一行从交叉轴线结束端开始排列
```

<img src="assets/images/wrap.png" align='center'>

##### (三)`justify-content`,用来设置项目在**主轴方向**的排列方式，属性如下：

```css
justify-content: flex-start;   //(默认值)主轴线起点对齐
justify-content: flex-end;   //主轴线终点对齐
justify-content: center; //主轴线中心对齐
justify-content: space-between;  //主轴线两端对齐，项目间距相等
justify-content: space-around; //项目两侧间距相等，所以项目间距是两端间距2倍 
justify-content: space-evenly;  //项目间距相等，与两端间距也相等
```

<img src="assets/images/justify.png" align='center'>

##### (四)`align-items`,用来设置项目在交叉轴上的排列对齐方式，属性如下：

```css
align-items: flex-start;  //交叉轴的起点对齐
align-items: flex-end;  //交叉轴的终点对齐
align-items: center;  //交叉轴居中对齐。
align-items: baseline;  //项目的第一行文字的基线对齐。
align-items: stretch;  //如果项目未设置高度或设为auto，将占满整个容器的高度
```

<img src="assets/images/align.png" align='center'>

##### (五)`align-content`,用来设置多轴线的在交叉轴线上的对齐方式，只对多轴线起作用，属性如下：

```css
align-content: flex-start;  //与交叉轴的起点对齐
align-content: flex-end;  //与交叉轴的终点对齐 
align-content: center;  //与交叉轴中心对齐
align-content: space-between;  //与交叉轴两端对齐
align-content: space-around; //每根轴线两侧的间隔都相等，轴线之间的间隔比轴线与边框的间隔大一倍
align-content: stretch; //(默认值)轴线占满整个交叉轴
```

<img src="assets/images/content.png" align='center'>

------

