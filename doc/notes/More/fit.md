<h2 align="center" style='padding:10px 0 20px 0;'>🚀如何适配iphoneX</h2>

#### (一)、适配方法

**1、配置manifest.json文件**

在`manifest.json` 文件 `app-plus` 节点下配置 `safearea`

```json
{
    "app-plus":{
        "safearera":{
            "background":"#RRGGBB",  //安全区域背景颜色
            "backgroundDark":"#RRGGBB",  //暗黑模式安全区域背景颜色
            "bottom":{  //底部安全区域配置
                "offset":"none"  //安全区域偏移值，可选值auto、none
            },
            "left":{
                "offset":"none"
            },
            "right":{
                "offset":"none"
            }
        }
    }
}
```

仅支持APP端,小程序端不支持

**2、使用padding-bottom**

兼容小程序时，可以在所需元素上加上如下属性

```css
.contain{
    padding-bottom:constant(safe-area-inset-bottom);  
    padding-bottom:env(safe-area-inset-bottom);
}
/*如果要在tabbar之上的话，就要加上tabbar的高度,例如tabbar的高度为100rpx*/
.bottom{
	bottom: calc(100rpx + env(safe-area-inset-bottom));
}
```

**3、根据获取设备信息适配(微信小程序)**

```js
//app.js
App({
    onLaunch:function(){
        //获取设备信息
        wx.getSystemInfo({
            success:function(res){
                that.globalData.windowHeight = res.windowHeight
            }
        })
    },
    globalData:{
           windowHeight:null,
    }
})

```

```js
//index.js
Page({
    data:{
        windowHeight:app.globalData.windowHeight
    }
})
```

