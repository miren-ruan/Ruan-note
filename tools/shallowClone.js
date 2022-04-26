//浅拷贝：只拷贝一层，更深层的对象级别只拷贝引用，拷贝的内存地址，使新对象指向拷贝对象的内存地址
var obj1 = {
    a: {
        a1: { a2: 1 },
        a10: { a11: 123, a111: { a1111: 123123 } }
    },
    b: 123,
    c: "123"
}

//方式1
function shallowClone1(o) {
    let obj = {};
    for (let i in o) {
        obj[i] = o[i]
    }
}

//方式2，es6的延展操作符
var shallowObj2 = { ...obj1 }

//方式3，Object.assign()
//Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象
var shallowObj3 = Object.assign({}, obj1)