/*
 * 遍历器（Iterator）是一种机制(接口)：为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署Iterator接口，就可以完成遍历操作，依次处理该数据结构的所有成员
 *   + 拥有next方法用于依次遍历数据结构的成员
 *   + 每一次遍历返回的结果是一个对象 {done:false,value:xxx}
 *     + done:记录是否遍历完成
 *     + value:当前遍历的结果
 * 
 * 拥有Symbol.iterator属性的数据结构(值)，被称为可被遍历的，可以基于for of循环处理
 *   + 数组
 *   + 部分类数组：arguments/NodeList/HTMLCollection...
 *   + String
 *   + Set
 *   + Map
 *   + generator object
 *   + ...
 * 
 * 对象默认不具备Symbol.iterator，属于不可被遍历的数据结构
 */

class Iterator {
    constructor(assemble) {
        // 挂载到实例的是有属性上:方便后期在方法中基于实例获取这些值
        // assemble:数字作为索引逐级递增、拥有length属性存储集合长度
        let self = this;
        self.assemble = assemble;
        self.index = 0;
    }
    next() {
        let self = this,
            assemble = self.assemble,
            index = self.index;
        if (index > assemble.length - 1) {
            // 遍历结束了
            return {
                done: true,
                value: undefined
            };
        }
        return {
            done: false,
            value: assemble[self.index++]
        };
    }
}
/* let itor = new Iterator([10, 20, 30, 40]);
console.log(itor.next()); //->{done:false,value:10}
console.log(itor.next()); //->{done:false,value:20}
console.log(itor.next()); //->{done:false,value:30}
console.log(itor.next()); //->{done:false,value:40}
console.log(itor.next()); //->{done:true,value:undefined}  */

/* let obj = {
    0: 10,
    1: 20,
    2: 30,
    3: 40,
    length: 4,
    // [Symbol.iterator]: Array.prototype[Symbol.iterator]
    /!* [Symbol.iterator]: function () {
        return new Iterator(this);
    } *!/
    [Symbol.iterator]: function () {
        let self = this,
            index = 1;
        return {
            next() {
                if (index > self.length - 1) {
                    return {
                        done: true,
                        value: undefined
                    };
                }
                let result = {
                    done: false,
                    value: self[index]
                };
                index += 2;
                return result;
            }
        };
    }
};
for (let item of obj) {
    console.log(item);
} */

/* let arr = [10, 20, 30, 40];
for (let item of arr) {
    // for of内部是按照 iterator.next 去迭代处理，所以只有具备 Symbol.iterator 属性「也就是具备Iterator迭代规范的」，才可以基于for or遍历 
    console.log(item);
} */


/*
 * 生成器对象是由一个generator function返回的,并且它符合可迭代协议和迭代器协议
 *   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
 * 
 * 普通函数 VS 生成器函数
 *    生成器函数 [[IsGenerator]]:true
 *    
 *   「把它当做一个实例 __proto__」
 *    普通函数是 Function 的实例，普通函数.__proto__===Function.prototype
 *    生成器函数是 GeneratorFunction 的实例，生成器函数.__proto__===GeneratorFunction.prototype -> GeneratorFunction.prototype.__proto__===Function.prototype
 *    ({}).toString.call(生成器函数) => "[object GeneratorFunction]"
 *    
 *   「把它作为一个构造函数 prototype」
 *    普通构造函数.prototype -> 原型对象（constructor:构造函数）
 *    生成器构造函数.prototype -> 原型对象(空对象：可以自己设置内容)
 *       生成器函数.prototype.__proto__ === Generator.prototype（next/return/throw/Symbol.toStringTag/Symbol.iterator...）
 */

/* 
function* func() {}
func.prototype.xxx = 'zhufeng';

// let itor = new func(); //Uncaught TypeError: func is not a constructor
let itor = func(); //=>创建func/Generator类的实例  并且是具备迭代器规范的(itor.next)
// itor.__proto__===func.prototype 
// itor.__proto__.__proto__===Generator.prototype  
console.log(itor); 
// console.log(({}).toString.call(itor)); //=>"[object Generator]"
*/

// Generator是基于Iterator迭代器规范管理Promise或者异步编程的；Promise是基于承诺模式管理异步编程；async/await是对Generator的进一步封装「语法糖」；
/* function* func() {
    console.log('A');
    yield 1;

    console.log('B');
    yield 2;

    console.log('C');
    yield 3;

    console.log('D');
    return 4;
}
let itor = func();
console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next()); //->{done:false,value:2}
console.log(itor.next()); //->{done:false,value:3}
console.log(itor.next()); //->{done:true,value:4} */
/*
 * 创建了func的实例，但是和new执行不一样，func中的代码还没有执行
 * 当后续执行itor.next才会把这些代码执行
 * 并且每一次执行next遇到一个yield就结束
 *    + 每一次返回的结果是符合迭代器规范的
 *    + {done:true/false,value:yield后面的值或者是函数返回的值}
 */

/* // 执行next传递值，可以把传递值作为上一次yeild后的结果，但是yield后面跟的值是给每一次next执行后的value的
function* func() {
    let x = yield 1;
    console.log(x);
}
let itor = func();
console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next(10)); //->{done:true,value:undefined} */

/* function* func1() {
    yield 1;
    yield 2;
}
function* func2() {
    yield 3;
    yield* func1();
    yield 4;
}
let itor = func2();
console.log(itor.next()); //->{done:false,value:3}
console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next()); //->{done:false,value:2}
console.log(itor.next()); //->{done:false,value:4}
console.log(itor.next()); //->{done:true,value:undefined} */

/* function* func() {
    console.log(this); //=>window
    yield 1;
}
let itor = func();
itor.next(); */


// 本身基于promise管理的异步编程:每一次执行query，首先返回promise实例，1000ms后会让promise实例状态为成功，结果是传递进来的值+1
const query = x => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(++x);
        }, 1000);
    });
};

// AJAX(异步)串行的效果:第一个异步请求成功后再去发送第二个异步请求，第二个异步请求成功再去发送第三个请求...「一般上一个请求的结果对下一个请求很重要」

/* 基于promise及then链机制管理异步编程 */
/* query(1).then(result1 => {
    console.log(`第一个请求的结果：${result1}`);
    return query(result1);
}).then(result2 => {
    console.log(`第二个请求的结果：${result2}`);
    return query(result2);
}).then(result3 => {
    console.log(`第三个请求的结果：${result3}`);
}); */

/* 基于async/await实现 */
/* (async function () {
    let result1 = await query(1);
    console.log(`第一个请求的结果：${result1}`);

    let result2 = await query(result1);
    console.log(`第二个请求的结果：${result2}`);

    let result3 = await query(result2);
    console.log(`第三个请求的结果：${result3}`);
})(); */

/* 基于Generator管理 */
/* function* func(x) {
    let result1 = yield query(x);
    console.log(`第一个请求的结果：${result1}`);

    let result2 = yield query(result1);
    console.log(`第二个请求的结果：${result2}`);

    let result3 = yield query(result2);
    console.log(`第三个请求的结果：${result3}`);
}
let itor = func(1);
itor.next().value.then(result1 => {
    itor.next(result1).value.then(result2 => {
        itor.next(result2).value.then(result3 => {
            itor.next(result3);
        });
    });
}); */


var isPromise = function isPromise(obj) {
    if ((obj !== null && typeof obj === "object") || (typeof obj === "function")) {
        if (typeof obj.then === "function") {
            return true;
        }
    }
    return false;
};

function AsyncFunc(generator, ...params) {
    const itor = generator(...params);
    const next = x => {
        let {
            value,
            done
        } = itor.next(x);
        if (done) return;
        // value.then(result => next(result));
        !isPromise(value) ? value = Promise.resolve(value) : null;
        value.then(next);
    };
    next();
}
AsyncFunc(function* (x) {
    let result1 = yield query(x);
    console.log(`第一个请求的结果：${result1}`);

    let result2 = yield query(result1);
    console.log(`第二个请求的结果：${result2}`);

    let result3 = yield query(result2);
    console.log(`第三个请求的结果：${result3}`);

    yield 10;
    console.log('OK');
}, 1);