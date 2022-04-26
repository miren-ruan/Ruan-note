//节流：n秒内只运行一次，若在n秒内重复触发，只有一次生效

function throttle2(fn, wait) {
    let timer
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fn()
            }, wait);
        }
    }
}