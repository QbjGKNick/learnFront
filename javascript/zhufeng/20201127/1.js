/*
 * Promise ES6新增的类，它是一种承诺模式，有效管控JS中的异步编程，可以解决异步编程中产生的回调“地狱”
 */

// new Promise的时候会立即执行executor函数 「同步」
//   + resolve执行：修改promise实例的状态 fulfilled/resolved，成功的结果就是传递的实参信息
//   + reject执行：修改promise实例的状态 rejected，失败的原因也是传递的实参信息
/* let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1);
        resolve('OK');
        console.log(2);
    }, 1000);
});
console.log(3);
// then(onfulfilled,onrejected):执行then方法只是把onfulfilled/onrejected函数保存起来 「同步」，但是此时还没有执行，当promise状态变为成功或者失败的时候，才会去触发执行对应的函数 「异步->微任务」
p1.then(result => {
    console.log('成功', result);
}, reason => {
    console.log('失败', reason);
});
console.log(4); */

/* // new Promise创建的实例，其状态和结果，取决于：executor函数中的resolve/reject执行 & executor函数执行是否报错
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});
 
.then(onfulfilled)
.then(onfulfilled)
....
.catch(onrejected) */

//---------------------
// async await 「ES7新增的」
// async:修饰函数，最后默认让函数返回一个promise实例（函数执行报错，实例状态是失败，结果是报错原因；否则实例状态是成功，
// 结果是return后面的值） -> 一般都是配合await的「函数中使用await，则必须基于async修饰才可以」
/* async function fn() {
    return 10;
}
console.log(fn().then(result => {
    console.log(result);
})); */

// await “promise实例”：如果设置的不是promise实例
//   + 正常的值  await 10 -> await Promise.resolve(10)
//   + 函数执行  await xxx() -> 首先立即执行xxx函数，接收它的返回值 -> await 返回值
// 本身是异步微任务：把当前上下文中 await 下面要执行的代码整体存储到异步的微任务中，
// 当await后面的promise实例状态为成功后，再去执行下面的代码(也就是那个异步的微任务)

/* function computed() {
    console.log(1);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, 1000)
    });
}
console.log(3);
async function fn() {
    console.log(4);
    let result = await computed();
    console.log(result);
    console.log(5);
}
fn();
console.log(6); */

/* // 对失败的promise实例没有做异常的处理，则控制台抛出异常信息「不会影响后续代码执行」
//    + promise.catch(reason=>{})
//    + await需要自己基于try catch做异常捕获
async function fn() {
    try {
        let result = await Promise.reject(100);
        console.log(result);
    } catch (err) {}
}
fn(); */

// Uncaught RangeError: Maximum call stack size exceeded
/* let i = 0;
function fn() {
    console.log(++i);
    fn();
}
fn(); */

/* // 不会抱错，但是会形成死循环  =>在EventLoop机制中，只有主线程空闲才会执行异步的任务
function delay(interval = 500) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

let i = 0;
async function fn() {
    console.log(++i);
    // await delay();
    await 0;
    fn();
}
fn(); */
