/* function Fn() {
  // 创建一个实例对象
  // ---- 也会像普通函数执行一样，让其执行【THIS指向实例对象】
  // 返回值没有或者基本值，则返回的是实例对象
}
new Fn()
 */

// 分析内置new的原理，重写一下
function Dog(name) {
  this.name = name
}
Dog.prototype.bark = function () {
  console.log('wangwang')
}
Dog.prototype.sayName = function () {
  console.log('my name is' + this.name)
}

// function _new(Ctor) {
//   let params = [].slice.call(arguments, 1)
// }

// Ctor -> constructor
function _new(Ctor, ...params) {
  // 1. 创建一个实例对象【创建Ctor类的实例：实例.__proto__ -> 类.prototype】
  // let obj = {}
  // obj.__proto__ = Ctor.prototype // IE浏览器不支持 __proto__ 被保护起来了
  let obj = Object.create(Ctor.prototype)

  // 2. 把函数执行【THIS指向实例对象】 call -> 执行函数，改变函数中THIS
  let result = Ctor.call(obj, ...params)

  // 3. 处理返回值
  if (result !== null && /^(object|function)/.test(typeof result)) return result
  return obj
}
let sanmao = _new(Dog, '三毛')
sanmao.bark() // => 'wangwang'
sanmao.sayName() // => 'my name is 三毛'
console.log(sanmao instanceof Dog) // => true

// --------- https://caniuse.com/
// Object.create([proto]): 创建一个对象，并且让创建的这个空对象的.__proto.__指向[proto] "把[proto]作为创建对象的原型"
// let obj = Object.create() // Uncaught TypeError: Object prototype may only be an Object or null
let obj = Object.create(null) // 创建一个空对象，并且阻止了它的__proto__指向【没有这个属性了】
