/**
 * 想要分清楚函数执行的执行主体（this），按如下规律分析
 *  + 事件绑定
 *      + 不论是DOM0还是DOM2级事件绑定，给元素E的某个事件行为绑定方法，当事件触发方法执行，方法中的this是当前元素E本身
 *      + 特殊情况：
 *          + IE6~8中基于attachEvent实现DOM2事件绑定，事件触发方法执行，方法中的this不再是元素本身，大部分情况都是window
 *          + 如果基于call/apply/bind强制改变了函数中的this，我们也是以强制改变的为主
 *  + 普通函数执行
 *      + 函数执行，看函数前面是否有“点”，有“点”，“点”前面是谁this就是谁，没有“点”this是window【JS严格模式下是undefined】
 *        fn() -> this:window/undefined
 *        obj.fn() -> this:obj
 *        xxx.__proto__.fn() -> this:xxx.__proto__
 *        ...
 *      + 自执行函数执行：其内的this是window/undefined
 *      + 回调函数中的this一般也是window/undefined，除非做过特殊的处理
 *      + 括号表达式
 * 
 *  + 构造函数执行
 *  + 箭头函数执行
 *  + 基于call/apply/bind强制改变this
 * 
 * 在浏览器运行JS代码，非函数中的this一般都是window；研究this都是研究函数中的this；
 * 有一个特殊的，就是es6+中“块级上下文”中的this，是其所在上下文中的this【理解为：块级上下文是没有自己this的】
 */

//  var obj = {
//     num: (function () {
//         // 把自执行函数执行的返回值，赋值给obj.num成员
//         console.log(this);  // this -> window
//         return 10;
//     })()
//  }

function fn() {
    console.log(this)
}

var obj = {
    name: 'nick',
    fn: fn
}
fn() //this->window
obj.fn() //this->obj
    (obj.fn)() //this->obj 小括号中只有一项，不算是括号表达式
    (fn, 10, obj.fn)() //this->window 小括号中有多项，只取最后一项，如果把其执行，不论之前this是谁，现在基本上都会变为window【括号表达式】

// var obj = {name: 'nick'}
// setTimeout(function () {
//     console.log(this)  // -> windonw
// }, 1000)
// [10].forEach(function() {
//     console.log(this) // -> window
// });
// [10].forEach(function() {
//     console.log(this) // -> obj
// }, obj);

var x = 5,
    obj = { x: 5 };
obj.fn = (function () {
    this.x *= ++x;
    return function (y) {
        this.x *= (++x) + y;
        console.log(x)
    }
})()
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x)

// 获取元素某个样式属性值
function getCss(element, attr) {
    if ('getComputedStyle' in windonw) {
        return window.getComputedStyle(element)[attr]
    }
    return element.currentStyle[attr]
}
//-------优化思想：第一次执行getCss我们已经知晓是否兼容了，第二次及以后再次执行getCss，则不想在处理兼容的校验了，其实这种思想就是
// “惰性思想”【懒，干一次可以搞定的，绝对不做第二次】
function getCss(element, attr) {
    // 第一次执行，根据是否兼容，实现函数的重构
    if ('getComputedStyle' in window) {
        getCss = function getCss(element, attr) {
            return window.getComputedStyle(element)[attr]
        }
    } else {
        getCss = function getCss(element, attr) {
            return element.currentStyle[attr]
        }
    }
    // 为了保证第一次也可以获取信息，则需要把重构的函数执行一次
    return getCss(element, attr)
}

//=====================================
// 函数柯理化：预先处理的思想【形成一个不被释放的闭包，把一些信息存储起来，以后基于作用域链，访问到事先存储的信息，然后进行相关的处理，
// 所有符合这种模式（或者闭包应用的）都被称为柯理化函数】
function curring(x) {

    return function (...args) {
        //args->[20,30]
        args.unshift(x)
        // 数组求和：
        // 方法一

        // var total = 0;
        // args.forEach(function (item) {
        //     total += item
        // })
        // return total

        // 方法二
        // var total = 0;
        // total = eval(args.join("+"))
        // return total

        // 方法三
        return args.reduce((result, item) => result + item)
    }
    // return function() {
    //     var args = Array.from(arguments)
    //     var args = [].slice.call(arguments)
    // }
}

// 数组的reduce方法：在遍历数组的过程中，可以累积上一次处理的结果，基于上次处理的结果继续遍历处理
//      + 数组.reduce([callback],[initialValue])
var arr = [10,20,30,40];
var res = arr.reduce(function (result, item, index) {
    // [initialValue]初始值不传递，result默认初始值是数组第一项，然后reduce从数组第二项开始遍历
    // 每遍历数组中的一项，回调函数被触发执行一次
    //      + result 存储的是上一次回调函数返回的结果（除了第一次是初始值或者数组第一项）
    //      + item 当前遍历这一项
    //      + index 当前遍历这一项的索引
    console.log(result)
    return item+result;
})

var res = arr.reduce((result, item) => {
    // 如果传递初始值，则result第一次的结果就是初始值，item从数组第一项开始遍历
    return result + item;
}, 0)

Array.prototype.reduce = function reduce(callback, initial) {
    var self = this, // this-> arr
        i=0;
    if(typeof initial==='undefined') {
        initial=self[0]
        i=1;
    }
    if (typeof callback !=="function") throw new TypeError("callback must be an function!")
    // 迭代数组每一项
    for(;i<self.length;i++) {
        var item =self[i],
        index=i;
        initial = callback(initial, item, index)
    }
    return initial
}

/*
在函数式编程当中有一个很重要的概念就是函数组合，实际上就是把处理数据的函数像管道一样连接起来，然后让数据穿过管道得到最终的结果。
例如：
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
div2(mul3(add1(add1(0)))); // =>3

而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose
返回的也是一个函数，达到以下的效果：
const operate = compose(div2, mul3, add1, add1)
operate(0) // => 相当于div2(mul3(add1(add1(0))))
operate(2) // => 相当于div2(mul3(add1(add1(2))))

简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f,g,h)(x)，请你完成compose函数的编写
*/
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;

// funcs：存储的是最后需要执行的函数及其顺序（最后传递的函数优先执行）
//      + 执行compose只是把最后要执行的函数及顺序事先存储起来，函数还没有执行【柯理化思想】
//      + 返回一个operate处理函数，执行compose，并且传递初始值，才按照之前存储的函数及顺序依次执行函数
function compose(...funcs) {
    // funcs-> [div2,mul3,add1]
    return function operate(x) {
        // x->0 初始值
        if (funcs.length === 0) return x;
        if (funcs.length === 1) return typeof funcs[0] === "function" ? funcs[0](x) : x;
        return funcs.reduceRight(function (result, item) {
            if (typeof item !== "function") return result;
            return item(result)
        }, x)
    }
}
var operate = compose(div2,mul3,add1);
var result = operate(0)
console.log(result)