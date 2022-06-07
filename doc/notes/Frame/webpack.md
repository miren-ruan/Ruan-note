#### 1、webpack的模式

**开发模式(development)：**仅能编译JS中的`ES Module`语法，开发时使用

**生产模式(production)：**能编译JS中的`ES Module`语法，还能压缩JS代码，项目生产上线时使用

------

#### 2、五个核心概念

> `entry`：入口，指示以哪个文件为入口起点开始打包，分析构建内部依赖图
>
> `output`：输出，指示打包后的资源`bundles`输出到哪里去，以及如何命名
>
> `loader`：加载器，让webpack能处理非JavaScript的文件
>
> `plugins`：插件，可以用于执行范围更广的任务，打包优化和压缩等
>
> `mode`：模式，指示webpack使用相应模式的配置

------

#### 3、基本配置

```js
const path = require("path");

module.exports = {
  entry:"./src/main.js", //入口，相对路径
  output:{
    //输出路径
    //__dirname  代表当前文件的文件夹目录
    path:path.resolve(__dirname,"dist"), //绝对路径
    fileName:"static/js/main.js", //输出到static下的js的文件夹下
    clean:true,  //自动清空上次打包的dist文件
  },
  //加载器
  module:{
    rules[
       //loader的配置
      {
        text:/\.css$/, //检测.css文件
        use:[ //执行顺序，从右到左(从下到上)
           "style-loader",  //将js中的css通过创建style标签添加到html中生效
           "css-loader"，  //将css资源编译成commonjs的模块到js中
         ];
      }，
      {
        text:/\.(png|jpe?g|gif|webp|svg)$/, //处理图片资源
        type:"asset",
        parser:{
           dataUrlCondition{
               maxSize:10*1024, //只将小于10kb的图片转成base64，开发中要进行配置优化
           }，
        }，
        generator:{
          //输出图片名称
          //[hash:10]表示哈希值取前10位 
          filename:"static/images/[hash:10][ext][query]" //输出到static下images的文件夹下
        },
      }
    ]
  },
  //插件，数组
  plugins:[
     
  ],
  //模式(开发或者生产)
  mode:"development" 
};
```

------

#### 4、(示例)如何打包css？

1、首先需要安装`css-loader`，注意，要下载附带的，比如`style-loader`

```java
npm install --save-dev css-loader
```

2、然后把loader引用到你的入口文件中

```js
import css from "file.css";
```

3、在`webpack.config.js`中配置

```js
module.exports = {
  module:{
    rules:[
      {
        text:/\.css$/,
        use:["style-loader","css-loader"];
      }
    ]
  }
}
```

