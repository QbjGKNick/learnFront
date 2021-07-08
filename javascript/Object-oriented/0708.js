function Fn() {}
Fn.prototype.x = 100
Fn.prototype.y = 200

/* // 缺少constructor && 原始原型对象上的x/y也丢失了
Fn.prototype = {
  // getX: function...
  getX() { },
  getY() { }
} */

/* let proto = {
  // 手动设置的constructor是属于可枚举的
  constructor: Fn,
  getX() {},
  getY() {}
}
Fn.prototype = Object.assign({}, Fn.prototype, proto) // -> 这样合并，返回的是一个全新的对象，由于内置的Fn.prototyp中constructor是内置的不可枚举的属性，所以合并后也是无法赋给新对象的 */

Fn.prototype = Object.assign(Fn.prototype, {
  getX() {},
  getY() {}
}) // 这种合并方法，Fn.prototype还是之前的堆地址，只不过是把新对象中的内容全部扩展到了原始的堆中

let obj1 = {
  x: 100,
  y: 200,
  n: {
    0: 1,
    1: 2
  }
}
let obj2 = {
  y: 300,
  z: 400,
  n: {
    name: 'nick'
  }
}
// Object.assign: 合并两个对象【浅比较】
//    + 让obj2中的内容替换obj1中的：两者都有的以obj2为主，只有其中一个具备的都是相当于新增...
//    + 最后返回的是obj1对象的堆内存地址【相当于改变的是obj1对象中的内容】，并不是返回一个全新的对象...
// let obj = Object.assign(obj1, obj2)
// console.log(obj === obj1) // true

// let obj = Object.assign({}, obj1, obj2)
// console.log(obj === obj1) // false -> 全新的对象，也就是assign的第一个参数[新对象]

console.log(Object.assign(obj1, obj2)) // -> { x:100,y:300,z:400,n:{name: 'nick'} } -> 浅比较：obj2.n覆盖obj1.n

let obj = {
  fn1() {},
  fn2: function () {}
  // 两者写法的区别：
  //    + 第一种写法：obj.fn1函数没有prototype属性的【不能作为构造函数】
  //    + 第二种写法：和正常的函数没有区别
}
new obj.fn1() // uncaught TypeError: obj.fn1 is not a constructor
