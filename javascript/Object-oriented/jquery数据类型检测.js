/**
 * JS中的数据类型检测都有哪些方法
 *      + typeof [value]
 *          + 简单方便，大部分数据类型都可以有效检测出来
 *          + typeof null -> "object"   JS设计的缺陷：数据值都是按照二进制存储的  1整数 010浮点数 100字符串 110布尔值 000对象
 *              -2^30:undefined 000000:null ... 也说明typeof检测数据类型是按照二进制存储的值进行检测的
 *          + typeof不能细分具体的对象数据类型值，所有对象数据类型的值，检测出来的结果都是“object”
 *          + typeof检测基于构造函数创建出来的，基本数据类型的实例对象，结果也是“object”
 *      + Object.prototype.toString.call([value])
 *      + instanceof
 *          + 检测某个实例是否属于这个类的
 *          + 基于instanceof可以细分一下不同类型的对象【也可以检测出构造函数方式创建出来的基本数据类型对象值】
 *          + 临时当“壮丁”的，存在很多问题
 *              + 原理：基于构造函数[Symbol.hasInstance](实例)
 *              + 原理：检测当前构造函数的原型prototype是否出现在，当前实例所处的原型链上__proto__，如果能出现，结果就是true，反之是false
 *              + 在JS中原型链是可以改动的，所以结果不准确
 *              + 所有实例的原型链最后都指向Object.prototype，所以“实例 instanceof Object”的结果都是true
 *              + 字面量方式创建的基本数据类型值是无法基于 instanceof 检测的 【浏览器默认并不会把它转换成new的方式】，因为它本身不是对象，不存在__proto__这个东西
 *      + constructor
 */

class Fn {
    static [Symbol.hasInstance]() {
        console.log('ok');
        return false
    }
}
let f = new Fn()
console.log(f instanceof Fn); // ok false

let arr = [10,20]
let obj = {
    0: 10,
    1: 20,
    length: 2
}
let num = new Number(100)
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true
console.log(obj instanceof Array); // false
console.log(num instanceof Number); // true
// 基于instanceof可以细分一下不同类型的对象【也可以检测出构造函数方式创建出来的基本数据类型对象值】
// arr instanceof Array -> Array[Symbol.hasInstance](arr)

/* 
// JS中创建一个值有两种方案：
//      1. 字面量方式
let n = 100
let obj1 = {}
//      2. 构造函数方式 【不能 new Symbol/new BigInt -> Object(symbol/bigint)】
let m = new Number(100)
let obj2 = new Object()

// 对于基本数据类型，两种方式的结果是不一样的：
// 字面量方式得到的是基本数据类型，而构造函数方式得到的是对象类型【正规的实例】
// 对于引用类型，两种方式除了语法上的一些区别，没有本质的区别，获取的都是对应类的实例对象 
*/