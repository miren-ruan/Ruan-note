#### 1、安装

**`webpack`是一个模块打包工具，可以用它管理项目中的模块依赖，并编译输出模块所需的静态文件**

```js
npm install webpack -g
```

------

#### 2、五个核心概念

> `Entry`：指示以哪个文件为入口起点开始打包，分析构建内部依赖图
>
> `Output`：指示打包后的资源`bundles`输出到哪里去，以及如何命名
>
> `Loader`：让webpack能处理非JavaScript的文件
>
> `Plugins`：插件可以用于执行范围更广的任务，打包优化和压缩等
>
> `Mode`：指示webpack使用相应模式的配置

