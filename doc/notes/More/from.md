<h2 align="center" style='padding:10px 0 20px 0;'>🚀表单提交</h2>

#### 一、form属性

| 属性           | 值                                    | 描述                                           |
| -------------- | ------------------------------------- | ---------------------------------------------- |
| accept-charset | character_set                         | 规定服务器可处理的表单数据字符集               |
| action         | URL                                   | 提交表单的目标地址                             |
| autocomplete   | on / off                              | 是否启用表单的自动完成功能                     |
| enctype        | 默认application/x-www-form-urlencoded | 规定在向服务器发送表单数据之前如何对其进行编码 |
| method         | get / post                            | 发送表单数据的http方法                         |
| name           | text                                  | 表单的名称                                     |
| target         | _blank等                              | 在何处打开action URL                           |

**注意：**

1、只有`method="post"`时，才能使用`enctype`属性；

2、`target`的常用选值：

- _blank：在新窗口/选项卡中打开；
- _self：同一框架中打开(默认)；
- _parent：父框架中打开；
- _top：整个窗口中打开；
- framename：在指定的iframe中打开;

------

#### 二、浏览器执行步骤

###### 在进行表单提交后，浏览器会进行如下操作：

1. 识别出表单中表单元素的有效项，作为提交项；
2. 构建一个表单数据集；
3. 根据form表单中的`enctype`属性的值作为`content-type`对数据进行编码；
4. 根据form表单中的`action`属性和`method`属性向指定的地址发送数据；





##### 纯js实现表单提交

```js
function formPost(URL , PARAMS){
    var temp = document.creatElement("form");
    temp.action = URL; 
    temp.method = "post"; 
    temp.style.display = "none";
    for(var x in PARAMS){
        var opt = document.creatElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}
```

