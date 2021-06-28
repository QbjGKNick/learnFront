/*
 * 进程和线程
 *   + 进程：可以理解为一个程序（浏览器打开一个页面就是开辟一个进程） 
 *   + 线程：程序中具体干事的人
 *   一个进程中可以包含很多的线程，一个线程同时只能做一件事情
 * 
 * 同步编程：一件事一件事的去做，上一件事情没有完成，则无法处理下一个事情「单线程」
 * 异步编程：上一件事情没有处理完成，则下一件事情可以继续去处理「多线程、基于单线程的EventLoop机制...」
 * 
 * JS中的异步编程
 *   「异步微任务」
 *    + promise
 *    + async/await 「generator」
 *    + requestAnimationFrame
 *   「异步宏任务」
 *    + 定时器
 *    + ajax「HTTP网络请求」
 *    + 事件绑定
 *    + ...
 * 
 * JS是单线程的，所以：
 *   1. JS中大部分代码都是同步编程
 *   2. 但是可以基于单线程的EventLoop（事件循环机制）实现出异步的效果
 * 
 * 浏览器是多线程的，打开一个页面，浏览器会分配很多线程，同时处理一些事情
 *   + GUI渲染线程:自上而下渲染页面 
 *   + JS引擎(渲染)线程:JS单线程是因为，浏览器只会开辟这一个线程，用来执行JS代码
 *   + HTTP网络请求线程:加载资源文件还是一些数据
 *   + 定时器监听线程:监听定时器是否到达时间
 *   + DOM事件监听线程:监听DOM事件的触发
 *   + ...
 */




/* setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
// console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
// console.timeEnd('AA'); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9); */

//========================
/* setTimeout(() => {
    console.log(1);
}, 0);
console.log(2);
while (1) {
    // do somthing
}
console.log(3);
setTimeout(() => {
    console.log(4);
}, 10);
console.log(5); */

//========================
/* setTimeout(function () {
    console.log(1);
}, 0); //异步宏任务  5ms  function->1  //=>1
console.log(2); //=>2
// throw new Error('xxx');
console.log(a); //报错  Uncaught ReferenceError: a is not defined
console.log(3);
setTimeout(() => {
    console.log(4);
}, 10); */

/* setTimeout(function () {
    console.log(1);
}, 0); //异步宏任务1  5ms  function->1 
console.log(2);

try {
    console.log(a);
} catch (err) {}

console.log(3);
setTimeout(() => {
    console.log(4);
}, 10); //异步宏任务1  10ms  function->4 */