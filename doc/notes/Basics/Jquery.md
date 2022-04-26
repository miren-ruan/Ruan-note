#### 1、jquery 如何实现链式调用？

```js
let fun = {
    fun1: function() {
        console.log("fun1");
        return this;
    },
    fun2: function() {
        console.log("fun2");
        return this;
    },
    fun3: function() {
        console.log("fun3");
        return this;
    }
}
fun.fun1().fun2().fun3();
```

