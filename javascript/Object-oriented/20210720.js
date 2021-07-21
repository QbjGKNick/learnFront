/**
 * ===绝对相等：左右两边类型和值都一致相等
 * ==相等：左右两边类型不同，会默认先转换为相同的类型，再去比较
 *      对象==字符串：对象转字符串
 *      null == undefined: 相等，但是和其他值都不等
 *      NaN == NaN: false NaN和谁都不相等
 *      剩余的都是转换为数字
 * 对象->数字/字符串
 *      + 先调取这个属性 Symbol.toPrimitive
 *      + 没有这个属性，再去调用 valueOf 获取原始值【基本类型值】
 *      + 没有原始值，再去调用 toString 变为字符串
 *      + 如果最后是转换为数字，再去调用Number，把字符串转换为数字
 *      + ...
 */
let obj = {}
obj[Symbol.toPrimitive] = function toPrimitive(hint) {
    console.log(hint); // 'number' / 'string' / 'default'
}

/* // 方案1
var a = {
    i: 0
}
// Symbol.toPrimitive/valueOf/toString
a[Symbol.toPrimitive] = function () {
    // this -> a
    return ++this.i
}
if (a == 1 && a == 2 && a == 3) {
    console.log('ok');
} */

// var a = [1, 2, 3]
// a.toString = a.shift
// if (a == 1 && a == 2 && a == 3) {
//     console.log('ok');
// }

/* // 方案2：
//      + 在全局上下文中基于var/function声明变量，相当于给window设置对应的属性  -> window.a
//      + Object.defineProperty劫持对象中某个属性的获取和设置等操作
var i = 0
Object.defineProperty(window, 'a', {
    get() {
        // 获取window.a的时候触发getter函数
        return ++i
    },
    set(value) {
        // 设置window.a属性值的时候触发setter函数
    }
})
if (a == 1 && a == 2 && a == 3) {
    console.log('ok');
} */

//========================
/* Array.prototype.push = function push(value) {
    // this -> arr
    // value -> 40
    // 操作一：把value放置在了this的末尾 this[this.length] = value
    // 操作二：把数组的length累加
    // 返回结果是新增后数组的长度
}
let arr = [10, 20, 30]
arr.push(40) */

// let obj = {
//     2: 3,
//     3: 4,
//     length: 2,
//     push: Array.prototype.push
// }
// obj.push(1) // this->obj value->1 obj[obj.length]=1 -> obj[2]=1 this.length++ obj.length=3
// obj.push(2) // this->obj value->2 obj[ob j.length]=2 -> obj[3]=2 this.length++ obj.length=4
// console.log(obj); // { 2: 1, 3: 2, length: 4, push: Array.prototype.push }

// [].push.call(obj, 1) // 等价于obj.push(1)

//=============================
// ES6基于class创建的类：只能new执行，无法当做普通函数执行【Class constructor Modal cannot be invoked without 'new'】
class Modal {
    //------给实例设置私有的属性 实例.x
    // 构造函数体
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    z = 100; // 相当于在构造函数中 this.z = 100

    //------给构造函数原型上设置属性方法【实例的公共属性】 实例.getX()
    //  + 设置方法如下即可
    //  + 设置属性不可以
    getX() {
        console.log(this.x);
    }
    getY() {
        console.log(this.y);
    }

    //------给构造函数设置静态属性方法【把它当做普通对象】 Modal.setNumber()
    static n = 200
    static setNumber(n) {
        this.n = n
    }
}

/* function Modal(x, y) {
    this.x = x
    this.y = y
}
Modal.prototype.z = 10
Modal.prototype.getX = function() {
    console.log(this.x);
}
Modal.prototype.getY = function () {
    console.log(this.y);
}
Modal.n = 200
Modal.setNumber = function (n) {
    this.n = n
}
let m = new Modal(10, 20) */

/**
 * 编写queryURLParams实现如下的效果（至少两种方案）
 *      + 方案一：字符串拆分【考虑到是否存在问号和#号】 -> 获取""
 *          + 动态创建A标签，基于内置属性获取
 *      + 方案二：正则
 */
// String.prototype.queryURLParams = function queryURLParams(key) {
//     // this->url key->property
//     var self = this,
//         link = document.createElement('a'),
//         hash = '',
//         search = '',
//     link.href = self
//     hash = link.hash
//     search = link.search

//     // 解析结果
//     if (hash) {
//         hash = hash.substring(1)
//         result['_HASH'] = hash
//     }
//     if (search) {
//         search = search.substring(1)
//         search.split('&').forEach(function (item) {
//             item = item.split('=')
//             result[item[0]] = item[1]
//         })
//     }
//     // '?lx=1&from=wx'
//     // '#video'
//     // 返回信息
//     return typeof key === "undefined" ? result : result[key]
// }

String.prototype.queryURLParams = function queryURLParams(key) {
    var self = this,
        result = {}
    self.replace(/#[^?#=&]+/g, function (_, $1) {
        result['_HASH'] = $1
    })
    self.replace(/([^?#=&]+)=([^?#=&]+)/g, function (_, $1, $2) {
        result[$1] = $2
    })
    return typeof key === "undefined" ? result : result[key]
}

let url = "http://www.zhufengpeixun.cn?lx=1&from=wx#video"
// -> {lx: 1, from: 'wx', _HASH: 'video' }
console.log(url.queryURLParams("from")); // => "wx"
console.log(url.queryURLParams("_HASH")); // => "video"

//======================
var validate = function validate(x) {
    x = +x
    return isNaN(x) ? 0 : x
}
Number.prototype.plus = function plus(x) {
    x = validate(x)
    // this都是对象数据类型的值 this->10/new Number(10)
    return this + x
}
Number.prototype.minus = function minus(x) {
    x = validate(x)
    return this - x
}
let n = 10
let m = n.plus(10).minus(5)
console.log(m); //=> 15 (10+10-5)

//=============
functon Foo() {
    getName = function () {
        console.log(1);
    }
    return this
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}
var getName = function () {
    console.log(4);
}

function getName() {
    console.log(5);
}

Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()

//=======================
function Fn() {
    let a = 1
    this.a = a
}
Fn.prototype.say = function () {
    this.a = 2
}
Fn.prototype = new Fn
let f1 = new Fn
Fn.prototype.b = function () {
    this.a = 3
}
console.log(f1.a);
console.log(f1.prototype);
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);
console.log(f1.constructor == Fn);