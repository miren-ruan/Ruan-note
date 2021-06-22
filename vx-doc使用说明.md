## 简介

`vx-docs` 可以快速帮你生成文档网站，也可以生成PDF。

## 启动文档

* 首先运行`npm install`安装相关依赖(如果安装太慢也可以使用`cnpm install`)

* 然后将文档放入`vx-docs/doc`中 (注意，`vx-docs`下的`README.md`是文档网站的首页)

* 在目录文件`_sidebar.md`中配置对应文档相对路径

* 可以自行启动一个静态服务器去预览你的网站，如nginx等。 

  也可以运行`npm install -g docsify-cli`全局安装`docsify-cli`,然后在`vx-docs`目录下运行`docsify serve .`就可以启动文档

## 生成pdf

* 运行`npm run pdf`，生成的pdf保存在`vx-docs`下的`pdf`文件夹中

