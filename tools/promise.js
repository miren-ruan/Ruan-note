//封装一个异步加载图片的方法
function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = function () {
            resolve(image)
        };
        image.onerror = function () {
            reject(new Error('Could not load image at' + url));
        };
        image.src = url;
    });
}

//手写promise
class MyPromise2 {
    constructor(executor) {
        this.state = "pending"  //规定状态
        this.value = undefined  // 保存 `resolve(res)` 的res值
        this.reason = undefined  // 保存 `reject(err)` 的err值
        this.successCB = []   // 成功存放的数组
        this.failCB = []  // 失败存放的数组

        let resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled"  //修改状态，为成功
                this.value = value
                this.successCB.forEach(f => f())
            }
        }
        let reject = (value) => {
            if (this.state === "pending") {
                this.state = "rejected"  //修改状态，为失败
                this.value = value
                this.failCB.forEach(f => f())
            }
        }

        try {
            // 执行
            executor(resolve, reject)
        } catch (error) {
            // 若出错，直接调用reject
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        if (this.state === "fulfilled") {
            onFulfilled(this.value)
        }
        if (this.state === "rejected") {
            onRejected(this.value)
        }
        if (this.state === "pending") {
            this.successCB.push(() => { onFulfilled(this.value) })
            this.failCB.push(() => { onRejected(this.reason) })
        }
    }
}

