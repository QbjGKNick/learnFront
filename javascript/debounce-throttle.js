/**
 * 函数的防抖（debounce）和节流（throttle）
 *  在高频触发的场景下，需要进行防抖和节流
 *      + 狂点按钮
 *      + 页面滚动
 *      + 输入模糊匹配
 *
 *  我们自己设定，多长的时间内，触发两次及以上就算“高频”：封装方法的时候需要指定这个频率（可以设置默认值）
 *  「防抖」在某一次高频触发下，我们只识别一次（可以控制开始触发，还是最后一次触发）；详细：假设我们规定500ms触发多次算是高频，
 *         只要我们检测到是高频触发了，则在本次频繁操作下（哪怕你操作了10min）也是只触发一次...
 *  「节流」在某一次高频触发下，我们不是只识别一次，按照我们设定的间隔时间（自己规定的频率），没到达这个频率都会触发一次；
 *         详细：假设我们规定的频率是500ms，我们操作了10min，触发的次数=(10*60*1000)/500
 */

const button = document.getElementById("submit");
button.onclick = function () {
    console.log("ok");
};
/*// 页面场景中处理的技巧1：标识判断
let flag = false;
button.onclick = function () {
    if (flag) return;
    flag = true;
    console.log("ok");
    setTimeout(() => {
        // 事件处理完
        flag = false;
    }, 1000);
};*/

/*// 业务场景中处理的技巧2：按钮重置为灰色，移除事件绑定
function handle() {
    button.click = null;
    button.disabled = true;

    //...
    console.log("ok");
    setTimeout(() => {
        button.onclick = null;
        button.disabled = false;
    }, 1000);
}
button.onclick = handle;
*/

function debounce(func, wait, immediate) {
    // 多个参数及传递和不传递的默认值处理
    if (typeof func !== "funciton")
        throw new TypeError("func must be an function!");
    if (typeof wait === "undefined") wait = 500;
    if (typeof wait === "boolean") {
        immediate = wait;
        wait = 500;
    }
    if (typeof immediate !== "boolean") immediate = false;
    // 设定定时器返回值标识
    /**
     * 定时器的目的，检测500ms内是否会触发第二次，如果有，则为高频触发
     * 第一次proxy执行，设置一个定时器
     * 4ms
     * 第二次proxy执行 清除之前设定的，重新设定，再去检测500ms内是否有第二次触发
     * ...
     * 疯狂点击100次，之前99次定时器都清除了，只留最后一个，等到过了500ms 发现没有触发第二次 则执行函数
     */
    let timer = null;

    return function proxy(...params) {
        let self = this,
            now = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(function () {
            timer = null;
            !immediate ? func.call(self, ...params) : null;
        }, wait);

        // 第一次触发就立即执行
        now ? func.call(self, ...params) : null;
    };
}

function handle(ev) {
    // 具体在点击的时候要处理的业务
    console.log("ok", this, ev);
}

button.onclick = debounce(handle, true);
// button.onclick = debounce(handle, 500, true);
// button.onclick=proxy; // 疯狂点击的情况下，proxy会被疯狂执行，我们需要在proxy中根据频率管控handle的执行次数

function throttle(func, wait) {
    if (typeof func !== "function")
        throw new TypeError("func must be an function!");
    if (typeof wait === "undefined") wait = 500;

    let timer = null,
        previous = 0; // 记录上一次操作的时间
    return function proxy(...params) {
        let self = this,
            now = new Date(), // 当前这次触发操作的时间
            remaining = wait - (now - previous);
        if (remaining <= 0) {
            // 两次间隔时间超过wait了，直接执行即可
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(self, ...params);
        } else if (!timer) {
            // 两次触发间隔时间没有超过wait，则设置定时器，让其等待remaining这么久之后执行一次「前提：没有设置过定时器」
            timer = setTImeout(function () {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(self, ...params);
            }, remaining);
        }
    };
}

function handle() {
    console.log("ok");
}

window.onscroll = throttle(handle);

// window.onscroll = function () {
//     // 默认情况下，页面滚动中：浏览器在最快的反应时间内（4~6ms）,就会识别监听一次事件绑定，
//     // 把绑定的方法执行，这样导致方法执行的次数过多，造成不必要的资源浪费
//     console.log("ok");
// };
