// 简述你对闭包的理解，以及优缺点？「闭包」
//  + 基本介绍：ECStack、EC、VO、AO、GO、SCOPE、SCOPE-CHAIN、GC
//  + 优 缺 点：保存和保护、性能消耗（内存泄露）
//  + 实战应用：
//      + 项目实战应用：循环事件绑定「突出：事件委托」、LET和VAR
//      + 插件组件封装：JS高阶编程技巧「单例设计模式、惰性函数、柯里化函数、compose组合函数」
//      + 源码阅读应用：Lodash源码「函数的防抖和节流」、JQ的源码、redux、react-redux「高阶组件」...
//      + ...
//  + 自己的思想和理解「一句话概括」
// 总结个5min左右的话术，回答过程中拒绝“背书式”回答，通俗一些，安排一些场景...

/**
 * 简述let和var的区别？
 * + 变量提升
 * + 重复声明
 * + 全局下声明和GO的关系
 * + 暂时性死区 「突出 “typeof检测一个没有被声明的变量，结果是undefined” 的作用 -> 封装插件组件」
 * + 块级作用域
 * + ...
 */

// 匿名函数“具名化”：这样的写法是符合规范的
// const func = function func() {};
// + 匿名函数具名化，设置的名字不属于当前函数所在作用域中的变量
/**
 * (function b() {})()
 * console.log(b) // Uncaught ReferenceError: b is not defined
 * + 函数名只能在函数内部使用：好处就是，后期匿名函数也可以实现递归调用「严格模式下禁止arguments.callee的使用」
 *
 * + 并且函数内部直接修改它的值也是无效的
 * + 除非函数内部重新声明了这个变量，则可以修改这个名字的值：基于 var/let/const/function都可以
 * (function b() {
 *  /!*
 *  b = 20
 * console.log(b) // 函数
 * let b=20
 * console.log(b) // 20
 *  *!/
 *  console.log(arguments.callee)
 * })()
 */

/*
var b =10;
(function b(b) {
    // 没有被声明过，b都是按照具名化的名字处理；但是不论基于何种方式一旦被声明了，则按照变量处理，和函数名字没关系了；
    console.log(b) // => 20
})(20)
 */

//=====================
// function fn(...outerArgs) {
//     return function anonymous(...innerArgs) {
//         return outerArgs
//             .concat(innerArgs)
//             .reduce(function handle(result, item) {
//                 return result + item;
//             }, 0);
//     };
// }

const fn = (...outerArgs) => (...innerArgs) =>
    outerArgs.concat(innerArgs).reduce((result, item) => result + item, 0);

let res = fn(1, 2)(3);
console.log(res);

// =============
var num = 10; // window.num = 10 => 65
var obj = {
    num: 20 // =>30
}; // obj=0x000;
obj.fn = (function (num) {
    /**
     * EC(AN)「闭包」
     *  作用域链：<EC(AN),EC(G)>
     *  初始化THIS：window(匿名函数自执行，非严格模式下this是window，严格模式下是undefined)
     *  形参赋值：num=20 // -> 21 -> 22 -> 23
     *  变量提升：---
     */
    this.num = num * 3; // window.num=20*3=60
    num++;
    return function (n) {
        // /**
        //  * EC(FN1) -> fn(5)
        //  *  作用域链：<EC(FN1),EC(AN)>
        //  *  初始化THIS：window
        //  *  形参赋值：n=5
        //  *  变量提升：---
        //  */
        // this.num += n; // window.num=window.num+n=60+5=65
        // num++;
        // console.log(num); // => 22

        /**
         * EC(FN2) -> obj.fn(10)
         *  作用域链：<EC(FN2),EC(AN)>
         *  初始化THIS：obj
         *  形参赋值：n=5
         *  变量提升：---
         */
        this.num += n; // obj.num=obj.num+n=20+10=30
        num++;
        console.log(num); // => 23
    }; // obj.fn=0x001; [[scope]]: EC(AN)
})(obj.num);
var fn = obj.fn; // fn=0x001
fn(5);
obj.fn(10);
console.log(num, obj.num); // 65 30

//=========
// 函数中的THIS是谁，和函数在哪定义的以及在哪执行的都没有关系，按照总结的规律去分析执行主体即可
let obj = {
    fn: (function () {
        /**
         * EC(AN)
         *  作用域链：<EC(AN),EC(G)>
         *  初始化THIS：window
         *  形参赋值：---
         *  变量提升：---
         */
        return function () {
            // /**
            //  * EC(AN1) -> obj.fn()
            //  *  作用域链：<EC(AN1),EC(AN)>
            //  *  初始化THIS：obj
            //  *  形参赋值：---
            //  *  变量提升：---
            //  */
            // console.log(this); // -> obj

            /**
             * EC(AN2) -> fn()
             *  作用域链：<EC(AN2),EC(AN)>
             *  初始化THIS：window
             *  形参赋值：---
             *  变量提升：---
             */
            console.log(this); // -> window
        };
    })() // -> obj.fn=0x001
}; // obj=0x000
obj.fn();
let fn = obj.fn(); // fn=0x001
console.log(fn);
fn();

//==========
var fullName = "language"; //window.fullName='language'
var obj = {
    fullName: "javascript",
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName()); // undefined
// => this是obj.prop
// => obj.prop.fullName => undefined
var test = obj.prop.getFullName;
console.log(test()); // language
// => this:window => window.fullName => language

//==========
var name = "window"; //window.name="window"
var Tom = {
    name: "Tom",
    show: function () {
        // this:window
        console.log(this.name);
    },
    wait: function () {
        // this:Tom
        var fun = this.show;
        fun();
    }
};
Tom.wait(); // window

//==========
window.val = 1; // => 2
var json = {
    val: 10, // => 20
    dbl: function () {
        this.val *= 2;
    }
};
json.dbl(); // this:json json.val = 20
var dbl = json.dbl;
dbl(); // this: window window.val = 2
json.dbl.call(window); // call方法是立即执行 => window.val = 4
alert(window.val + json.val); // "24"

//==========
(function () {
    var val = 1;
    var json = {
        val: 10,
        dbl: function () {
            val *= 2;
        }
    };
    json.dbl(); //this:json
    alert(json.val + val); // "12"
})();

//=============
function fun(n, o) {
    console.log(o);
    return {
        fun: function (m) {
            return fun(m, n);
        }
    };
}
var c = fun(0).fun(1);
c.fun(2);
c.fun(3);

//==========
// 基于函数进行运算，或者输出的时候，一般都会调用函数的toString
function fn() {}
// console.log(fn + 1); // 会依次调取fn的 Symbol.toPrimitive/valueOf/toString 这三个属性
fn.toString = function () {
    console.log("ok");
};
console.log(fn); // 'ok'

// 方法一
function add(...params) {
    const proxy = (...args) => {
        // 把每一次传递的信息都保存在原始的集合中
        params = params.concat(args);
        return proxy;
    };
    proxy.toString = () => {
        // 基于函数运算或者输出的时候，隐式调用函数的toString，我们在这里实现求和即可
        return params.reduce((result, item) => result + item);
    };
    return proxy;
}

// 方法二
function curring() {
    let params = [];
    let add = function (...args) {
        params = params.concat(args);
        return add;
    };
    add.toString = function () {
        return params.reduce((result, item) => result + item);
    };
    return add;
}
let add = curring(); //每次调用add前都要重新执行这个语句

let res = add(1)(2)(3);
console.log(res); // 6

res = add(1, 2, 3)(4);
console.log(res); // 10

res = add(1)(2)(3)(4)(5);
console.log(res); // 15
