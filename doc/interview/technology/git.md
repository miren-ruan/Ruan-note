#### **1、Git常用命令**

- git clone：初始化仓库
- git branch xx：创建分支
- git checkout xx：切换分支
- git status：查看状态
- git checkout . ：放弃分支上的修改
- git add . ：将修改加入缓存区
- git reset HEAD：撤销缓存区的文件
- git commit -m "xxxxx"：提交到本地仓库
- git pull：拉取远程代码
- git push：将本地代码提交到远程
- git log：查看当前提交的日志
- git reset commit：回滚操作

------

#### 2、git中`rebase`和`merge`的区别？

都是合并分支的操作，rebase不会产生额外的commit，merge会重新创建一个commit保存起来，比较臃肿

------

#### 3、git fetch 和 git pull 的区别？

`git fetch`：把远程代码拉下来但是不会合并

`git pull`：会自动合并

