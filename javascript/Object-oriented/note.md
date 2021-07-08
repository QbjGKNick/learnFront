# 面向对象

## =====面向对象编程【对象、类、实例】

- 对象：万物皆对象（泛指）
- 类：对“对象”的划分（按照其功能结构特点，划分出大类和小类）
- 实例：类中具体的事务`JS本身就是基于面向对象思想开发出来的编程语言，所以我们学习和开发JS的时候，也要按照面向对象的思想去处理！！`

  -【内置类】

  - 每一种数据类型都有一个自己所属的内置类：Number(每一个数字/NaN/Infinity 都是它的实例)、String、Boolean、
    Symbol、BigInt、Array、RegExp、Date、Function、Object...
  - 每一种 DOM 元素也都有自己所属的类:
    - window -> Window -> WindowProperties -> EventTarget -> Object
    - document -> HTMLDocument -> Document -> Node -> EventTarget -> Object
    - div -> HTMLDivElement -> HTMLElement -> Element -> Node -> EventTarget -> Object
    - a -> HTMLAnchorElement -> HTMLElement -> Element -> Node -> EventTarget -> Object
    - HTMLCollect(document.getElementsByTagName(""))/NodeList(document.querySelectorAll(""))/CSSStyleDeclaration/DOMTokenList ... - ...

  `学习数组，首先分析一个数组（实例），研究清楚这个实例的特征后（含：结构特点和常用方法等），我们再遇到其他的数组，直接也是按照相同的机制进行处理`

  -【自定义类】
  `创建一个函数 fn`

  - fn() 普通函数执行【堆栈机制】
  - new fn() 构造函数执行 【堆栈机制 + 面向对象机制】

```js
function Fn(x, y) {
  let total = x + y
  this.x = x
  this.y = y
}
let result = new Fn(10, 20)
console.log(result)
```

`new 函数()：构造函数执行，它和普通函数执行，还是有区别的`

- 相似
  - 一样是把函数执行（传递实参也是一样的）
  - 形成私有上下文【按照步骤逐一处理】
  - 也存在私有变量
  - ...
- 不同
  - new 执行，浏览器会在当前上下文中，默认创建一个对象（实例对象）
  - 在初始化 this 的时候，会让 this 指向这个实例对象
    - 代码中编写 this.xxx = xxx 的操作，都是实例对象设置私有属性或者方法
    - 除这些操作，其余的操作和实例对象没有直接的关系
  - 函数如果没有返回值，或者返回的是基本数据类型，则默认返回创建的实例对象；如果自己返回的是引用类型，以自己返回的为主
    【构造函数执行】
    新称呼：函数被称为类，返回结果是类的一个实例

```js
function Fn() {
  let total = 0
  this.x = 1
  this.y = 2
}
let f1 = new Fn()
```

`let f2 = new Fn // new 执行的时候，如果类不需要传递实参，可以不用加小括号(不加小括号，叫做无参数列表new;设置小括号，叫做带参数列表new；除了是否传递参数的区别，在运算符优先级上也有区别) new Fn-> 19 new Fn() -> 20`

每一次 new 都是把函数重新执行（重新形成一个新的私有上下文，重新创建一个实例对象，代码重新执行...）

检测某个成员（属性/键）是否属于这个对象，或者是否属于这个对象的私有属性
in: 检测成员是否属于这个对象【特点：不论是否私有属性，还是公有的属性，只要有则检测结果就是 true】
hasOwnProperty: 用来检测当前成员是否为对象的私有属性【特点：只有是私有属性，结果才是 true，哪怕有这个属性，但是属于公有属性，结果也是 false】

```js
console.log(f1)
console.log('x' in f1) //-> true
console.log('hasOwnProperty' in f1) // -> true
console.log(f1.hasOwnProperty('hasOwnProperty')) // -> false 说明‘hasOwnProperty’不是它的私有属性，而是它的公有属性【前提基于in检测出来的结果是true】

// obj: 要检测的对象
// attr: 要验证的成员
function hasPubProperty(obj, attr) {
  // 思路一：是它的属性 但是还不是私有的，那么一定是公有的【BUG：如果某个属性即是私有的，也是公有的，则检测出来的结果是不准确的】
  // return attr in obj && (!obj.hasOwnProperty(attr))
  // 思路二：真正的思路应该是检测原型上的属性，因为原型上的属性都是公有的
  // Object.getPrototypeOf：获取当前对象的原型
  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    // 依次查找原型链，直到找到Object.prototype为止
    if (proto.hasOwnProperty(attr)) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

let sy = Symbol()
let obj = {
  name: 'nick',
  [sy]: 100
}
console.log(obj)
console.log(obj.hasOwnProperty('name')) // => true
console.log(obj.hasOwnProperty(sy)) // => true hasOwnProperty是可以检测Symbol属性的
console.log(sy in obj) // => true in也是可以检测Symbol属性的
```

`很多对‘对象’的操作是无法拿到Symbol属性的`

```js
let sy = Symbol()
let obj = {
  name: 'nick',
  age: 12,
  3: 'dafds',
  0: 'xiaosha',
  [sy]: 100
}
Object.prototype.AAA = 1000 // -> ‘AAA’是obj公共的属性， obj.hasOwnProperty('AAA') -> false 'AAA' in obj -> true
console.log(obj.hasOwnProperty('AAA')) // -> false
console.log('AAA' in obj) // -> true
for (let key in obj) {
  console.log(key)
}

// for in 遍历的时候
//    + 无法遍历Symbol的私有属性
//    + 但是可以遍历到自己扩展的公共属性【内置的公共属性是不可枚举的（就是无法遍历到的）】
//    + 优先遍历数字属性，而且按照从小到大（不会严格按照属性书写的顺序 ）

// 解决：能够避免遍历公共的
for (let key in obj) {
  if (!obj.hasOwnProperty(key)) break // 已经遍历到公共的，则私有已经遍历完，结束循环
  console.log(key) // -> key
}
// 解决：只想遍历私有的，包含Symbol的
// Object.keys：获取一个对象非Symbol的私有属性（结果是一个数组，数组中包函获取的属性）
// 类似还有：Object.getOwnPropertyNames
// Object.getOwnPropertySymbols: 只获取Symbol的私有属性（结果也是一个数组）
let keys = [
  ...Object.getOwnPropertyNames(obj),
  ...Object.getOwnPropertySymbols(obj)
]
keys.forEach((key) => {
  console.log(key, obj[key])
})
```
