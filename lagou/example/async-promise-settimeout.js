// async/await -> 底层依赖于Promise，因此的话其执行顺序完全参考Promise的执行顺序

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("timeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// timeout


// pending -> resolve/reject未被调用时，则整体为pending状态
// fulfilled -> resolve调用后，从pending状态转变为fullfilled
// rejected -> reject调用后，从pending状态转变为rejected
// pending -> fullfiled/rejected

// 结论：
// 1. 当调用.then方法后，其会返回一个全新的Promise对象，且此对象状态为pending
// 2. 如果在fulfilled的Promise对象内部去调用.then，
//    那么其onFulfilled/onRejected对应的Promise会直接放入MicroTask Queue中
// 3. 如果在pending的Promise对象内部去调用.then，
//    那么onFulfilled/onRejected对应的Promise会存放在老Promise的Reactions队列中
// 4. 当MicroTask Queue中的Promise触发之后，其会在调用结束后检查自身的Reactions队列中是否
//    存在Promise，若存在，则将会放置在MicroTask Queue中

// 做题时的简单思路：
// 当遇到resolve/reject时，即认为其后续部分整体放置在microtask queue中等待触发（先进先出）

 Promise.resolve() // fulfilled
.then(()=>{ // pending -> microtask queue
  console.log("then 1");
}).then(()=>{ // pending -> reactions queue(Promise自身的队列)
  console.log("then 2");
}).then(()=>{ // pending -> reactions queue(Promise自身的队列)
  console.log("then 4");
}).then(()=>{ // pending -> reactions queue(Promise自身的队列)
  console.log("then 5");
});

Promise.resolve() // fulfilled
.then(()=>{ // pending -> microtask queue
  console.log('then 3');
});

// 输出顺序： 1 3 2 4 5

// callback -> callback hell
// promise -> 共享变量无法很好的进行.then链式传递
// async/await -> 具有传染性