//当拷贝时复制的是引用地址，而不是堆里面的值，这就是浅拷贝
//当在堆中开辟出一块内存用来存放复制来的值，就是深拷贝

function deepClone(obj) {
    //不是对象或者为空
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    //循环将obj里的东西赋值给result
    for (let key in obj) {
        //这个方法可以用来检测一个对象是否含有特定的自身属性,会忽略掉那些从原型链上继承到的属性
        if (obj.hasOwnProperty(key)) {
            //可能存在多层值,所以要用递归
            result[key] = deepClone(obj[key])
        }
    }
    return result
}
