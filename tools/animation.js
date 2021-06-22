/**
 * 迷人软(miren-ruan) 2021-05-26 南京
 * ---------------------------------
 * 封装执行简单动画的函数
 */

 /**
  * 参数：
  *    obj:要执行动画的对象
  *    attr:要执行动画的样式，比如：left  top  width  height
  *    target:执行动画的目标位置
  *    speed:移动的速度(正数向右移动，负数向左移动)
  *    callback:回调函数，在动画执行完毕后执行
  */

  function move(obj , attr , target , speed , callback){
      //关闭上一个定时器
      clearInterval(obj.timer);

      //获取元素目前的位置
      var current = parseInt(getStyle(obj,attr));
      
      //判断速度的正负
      if(current > target){
          //当前的大于目标的,让它取反
          speed = -speed;
      }

      //开启一个定时器，用来执行动画效果
      //向执行动画的对象添加一个timer属性，用来保存自己定时器的标识
      obj.timer = setInterval(function(){
          //获取原来的值
          var oldValue = parseInt(getStyle(obj,attr));
          //在旧值得基础上增加
          var newValue = oldValue+speed;

          //对新值和目标进行判断，让它在边界处完美停止
          if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
                newValue = target;
          }

          //将新值赋给目标
          obj.style[attr] = newValue + "px";

          //当元素移动到目标时，关闭定时器
          if(newValue == target){
              clearInterval(obj.timer);
              //动画执行完毕，调用回调函数
              callback && callback();
          }
      },30);
  };

  /**
   * 参数：
   *    obj:要获取样式得元素
   *    name:要获取得样式名
   */

   function getStyle(obj , name){
       if(window.getComputedStyle){
           //正常浏览器的方式，具有getComputedStyle()方法
           return getComputedStyle(obj , null)[name];
       }else{
           //IE8的方式，没有此方法
           return obj.currentStyle[name];
       }
   }