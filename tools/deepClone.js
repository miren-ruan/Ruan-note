//深拷贝：要另外开辟一个内存地址，内容和原来的一样，更改原来的对象，拷贝的对象不会发生变化

//方式1，对象如果只有一层，可以使用Object.assign()

//方式2，转成JSON再转回来
function cloneJson(o) {
    return JSON.parse(JSON.stringify(o))
}
//缺点：1. 它会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object
//2. Date对象, RegExp对象, Error对象等是无法通过这种方式深拷贝。这种方法能正确处理的对象只有 Number, String, Boolean, Array, 扁平对象
//3. 如果原对象中有值为undefined的情况, JSON.stringify 后会丢失


//方式3
function deepClone3(o, hash = new map()) {
    if (!isObject(o)) return o//检测是否为对象或者数组
    if (hash.has(o)) return hash.get(o)
    let obj = Array.isArray(o) ? [] : {}

    hash.set(o, obj)
    for (let i in o) {
        if (isObject(o[i])) {
            obj[i] = deepClone3(o[i], hash)
        } else {
            obj[i] = o[i]
        }
    }
    return obj
}