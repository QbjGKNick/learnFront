/**
 * 编程语言
 *      面向对象 OOP Java JavaScript PHP C#（ASP.NET）Python GO C++ Ruby...
 *      面向过程 POP C 
 * 标记语言：HTML/CSS
 * 
 * =====面向对象编程【对象、类、实例】
 * 对象：万物皆对象（泛指）
 * 类：对“对象”的划分（按照其功能结构特点，划分出大类和小类）
 * 实例：类中具体的事务
 * 
 * JS本身就是基于面向对象思想开发出来的编程语言，所以我们学习和开发JS的时候，也要按照面向对象的思想去处理！！
 *  【内置类】
 *      + 每一种数据类型都有一个自己所属的内置类：Number(每一个数字/NaN/Infinity都是它的实例)、String、Boolean、
 *          Symbol、BigInt、Array、RegExp、Date、Function、Object...
 *      + 每一种DOM元素也都有自己所属的类: 
 *          window -> Window -> WindowProperties -> EventTarget -> Object
 *          document -> HTMLDocument -> Document -> Node -> EventTarget -> Object
 *          div -> HTMLDivElement -> HTMLElement -> Element -> Node -> EventTarget -> Object
 *          a -> HTMLAnchorElement -> HTMLElement -> Element -> Node -> EventTarget -> Object
 *      + HTMLCollect(document.getElementsByTagName("*"))/NodeList(document.querySelectorAll("*"))/
 *        CSSStyleDeclaration/DOMTokenList ...
 *      + ...
 *  
 *  学习数组，首先分析一个数组（实例），研究清楚这个实例的特征后（含：结构特点和常用方法等），我们再遇到其他的数组，直接也是按照相同的机制进行处理
 * 
 *  【自定义类】
 *      创建一个函数 fn
 *          + fn() 普通函数执行【堆栈机制】
 *          + new fn() 构造函数执行 【堆栈机制 + 面向对象机制】
 */
function Fn(x, y) {
    let total = x + y
    this.x = x
    this.y = y
}
let result = new Fn(10, 20)
// let result = Fn(10, 20)
console.log(result);

/**
 * new 函数()：构造函数执行，它和普通函数执行，还是有区别的
 * 【相似】
 *      + 一样是把函数执行（传递实参也是一样的）
 *      + 形成私有上下文【按照步骤逐一处理】
 *      + 也存在私有变量
 *      + ...
 * 【不同】
 *      + new执行，浏览器会在当前上下文中，默认创建一个对象（实例对象）
 *      + 在初始化this的时候，会让this指向这个实例对象
 *          + 代码中编写 this.xxx = xxx 的操作，都是实例对象设置私有属性或者方法
 *          + 除这些操作，其余的操作和实例对象没有直接的关系
 *      + 函数如果没有返回值，或者返回的是基本数据类型，则默认返回创建的实例对象；
 *        如果自己返回的是引用类型，以自己返回的为主
 *      【构造函数执行】
 *          新称呼：函数被称为类，返回结果是类的一个实例
 *          
*/