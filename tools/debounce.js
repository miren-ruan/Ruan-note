//防抖：n秒后再执行该事件，若在n秒内被重复触发，则重新计时

function debounce3(fn, delay, immediate) {
    let timer

    return function () {
        let args = arguments
        let _this = this
        if (timer) clearTimeout(timer)

        if (immediate) {  //是否立即执行
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay);

            if (callNow) { fn.apply(_this, args) }
        } else {
            timeout = setTimeout(() => {
                func.apply(_this, arguments)
            }, delay);
        }
    }
}