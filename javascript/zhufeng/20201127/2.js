/* async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end'); */


/* let body = document.body;
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(1);
    });
    console.log(2);
});
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(3);
    });
    console.log(4);
}); */

/* // => 'start'  'p1'  'p2'  'timeout1'  ‘p3’  ‘p4’  'interval'...
// 微任务1  微任务2  宏任务1  微任务3  微任务4  宏任务2...
console.log('start');
let intervalId;
Promise.resolve().then(() => { //微任务1 「找到微任务队列即可执行，因为此时promise实例已经是成功的」
    console.log('p1');
}).then(() => { //微任务2 「只有微任务1的onfulfilled方法执行完，没有报错，证明其promise是成功的，才会执行微任务2」
    console.log('p2');
});
setTimeout(() => { //宏任务1
    Promise.resolve().then(() => { //微任务3 「找到微任务队列即可执行」
        console.log('p3');
    }).then(() => { //微任务4 「微任务3执行完才可以执行」
        console.log('p4');
    });
    intervalId = setInterval(() => { //宏任务2
        console.log('interval');
    }, 3000);
    console.log('timeout1');
}, 0); */

/* // => ‘b’ ‘f’ ‘c’ ‘a’ ‘d’
// 微任务1  微任务2  微任务4  微任务3  宏任务1  宏任务2
setTimeout(() => { //宏任务1 
    console.log('a');
});
Promise.resolve().then(() => { //微任务1 「进入到微任务队列即执行」
    console.log('b');
}).then(() => { //微任务2 「微任务1执行完即可」
    return Promise.resolve('c').then(data => { //微任务4 「进入到微任务队列立即执行」
        setTimeout(() => { //宏任务2
            console.log('d')
        });
        console.log('f');
        return data;
    });
}).then(data => { //微任务3 「微任务2执行完，并且告知其promise实例是成功的才可以执行」
    console.log(data);
}); */

function func1() {
    console.log('func1 start');
    return new Promise(resolve => {
        resolve('OK');
    });
}
function func2() {
    console.log('func2 start');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('OK');
        }, 10);
    });
}
console.log(1);
setTimeout(async () => {
    console.log(2);
    await func1();
    console.log(3);
}, 20);
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4);
func1().then(result => {
    console.log(5);
});
func2().then(result => {
    console.log(6);
});
setTimeout(() => {
    console.log(7);
}, 0);
console.log(8);