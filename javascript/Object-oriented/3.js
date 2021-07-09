// 箭头函数：箭头函数中没有自己的this，所用到的this都是所处上下文中的this
/* let obj = {
  n: 0,
  fn() {
    // this-> obj
    let self = this
    setTimeout(function () {
      // console.log(this) // this -> window
      self.n++
    }, 1000)

    setTimeout(() => {
      // this -> 上级上下文中的this -> obj
      this.n++
    }, 1000)
  }
}
obj.fn() */

// Function.prototype: call/apply/bind 都是用来改变 this指向的，以后函数执行调用这三个方法就可以实现this的改变
function fn(x, y) {
  console.log(this, x, y)
}
let obj = {
  name: 'nick'
}
// obj.fn() // Uncaught TypeError: obj.fn is not a function  obj和fn没有关系，我们无法基于obj.fn来改变fn中的this
// ==BIND== 并不会把函数立即执行，它是预先处理函数中的THIS和参数的
// fn.bind(obj, 10, 20)
// document.body.onclick = fn; // 把fn方法本身作为值绑定给body的点击事件，当触发body的点击操作，浏览器会帮助我们把fn函数执行
// [并且传递一个事件对象]，方法中的THIS->body => this:body x:MouseEvent y:undefined
// document.body.onclick = fn() // -> 立即把fn执行，把其执行的结果当做值，赋值给事件绑定，事件触发执行的是返回结果

// 需求：点击body的时候，把FN执行，并且让this-> obj，而且传递10/20给x/y
// document.body.onclick = fn.call(obj, 10, 20) // 这样子处理不行：因为apply/call都是把函数立即执行的，还没有等到点击的时候，函数都执行完了
/* document.body.onclick = function (ev) {
  // 创建一个匿名函数，绑定给点击事件，触发body点击行为的时候，执行的是匿名函数
  //  + this-> body
  //  + ev-> 传递的MouseEvent事件对象
  // 在匿名函数中，我们自己执行fn即可，接下来想改啥改啥
  fn.call(obj, 10, 20, ev)
} */
document.body.onclick = fn.bind(obj, 10, 20)

// ==CALL/APPLY== 都是立即执行函数，并且改变函数中的THIS，再给函数传递参数信息
fn.call(obj, 10, 20)
// 1. fn实例基于__proto__找到Function.prototype上的call方法，把call方法执行
//  + call方法中的this：fn
//  + context存储的就是传递的obj
// 2. call方法内部做的事情
//  + 把fn执行（也就是把call中的this执行）
//  + 把fn中的this改变为第一个参数context:obj
// 简述：把fn执行，让fn中的this变为obj，并且把除了obj外的剩余参数，依次传递给fn
// fn.call(undefined) // 在非严格模式下，context不传递或者传递null/undefined，则this都改为window；
// 严格模式下，不传是undefined，否则传递谁，this就改为谁
fn.call(10, 20) // -> this->Number(10) -> x->20 y-> undefined
fn.apply(obj, [10, 20]) // this-> obj x-> 10 y->20 apply和call的唯一区别，就是在给fn传递参数的时候，
// apply需要把所有需要传递的参数信息放在一个数组中，而call是一个个的传递进来即可，但是不论哪种办法，最后的结果都是把这些参数一个个传递给fn

// call的性能要比apply好一些：尤其是传递三个以及以上参数的时候

// 获取数组中的最大值
let arr = [10, 13, 24, 15, 26, , 34, 11]

console.log(Math.max(...arr))
console.log(Math.max.apply(null, arr))
let max = 0
arr.forEach((item) => {
  item > max ? (max = item) : null
})
console.log(eval(`Math.max(${arr})`))

// 需求：任意数求和[把传递进来的实参（不固定个数）进行求和]
// function sum(...params) {
//   // params-> [...] 数组，存储传递的所有实参
//   return params.reduce((result, item) => {
//     return result + item
//   }, 0)
// }

/* Array.prototype.slice = function slice() {
  // this-> arr
  let params = []
  for (let i = 0; i < this.length; ++i) {
    params.push(this[i])
  }
  return params
}
 */
let arr = [10, 20, 30]
let params = arr.slice() // 把arr克隆

function sum() {
  // arguments 类数组，不是数组
  // 1. 把类数组转转为数组
  // let params = Array.from(arguments)
  // let params = [...arguments]
  /*
  let params = []
  for(let i = 0; i < arguments.length; ++i) {
    params.push(arguments[i])
  }
  */
  // 鸭子类型：长的像鸭子就称之为鸭子 -> 类数组除了__proto__不是Array.prototype外，它的结构特点和数组基本一样
  //【常规操作处理都一样的，例如：循环...】 -> 让类数组借用数组原型上的方法，实现一些特定的处理
  let params = [].slice.call(arguments)

  // Array.prototype.forEach.call(arguments, item => {})

  // 2. 求和
  return params.length ? eval(params.join('+')) : 0
}

let total = sum()
console.log(total) // 0
total = sum(10)
console.log(total) // 10
total = sum(10, 20)
console.log(total) // 30
total = sum(10, 20, 30)
console.log(total) // 60
