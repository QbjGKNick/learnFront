/* 
 * 基于原生JS实现Promise「遵循的是Promise A Plus规范」
 *    https://promisesaplus.com/ 
 */
(function () {
    function Promise(executor) {
        if (typeof executor !== 'function') throw new TypeError('Promise resolver ' + executor + ' is not a function');

        var self = this;
        self.state = 'pending';
        self.value = undefined;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];
        var change = function change(state, value) {
            if (self.state !== 'pending') return;
            self.state = state;
            self.value = value;
            setTimeout(function () {
                var callbacks = self.state === 'fulfilled' ? self.onFulfilledCallbacks : self.onRejectedCallbacks;
                for (var i = 0; i < callbacks.length; i++) {
                    var item = callbacks[i];
                    if (typeof item === "function") {
                        item(self.value);
                    }
                }
            });
        };

        try {
            executor(function resolve(result) {
                change('fulfilled', result);
            }, function reject(reason) {
                change('rejected', reason);
            });
        } catch (err) {
            change('rejected', err);
        }
    }

    /* function resolvePromise(promiseNew, x, resolve, reject) {
        if (x === promiseNew) throw new TypeError('Chaining cycle detected for promise #<Promise>');
        if (x instanceof Promise) {  //必须保证返回值是你自己构建的这个Promise类的实例
            // 返回结果是一个新的promise实例
            x.then(resolve, reject);
        } else {
            // 返回结果不是promise实例
            resolve(x);
        }
    } */
    function resolvePromise(promiseNew, x, resolve, reject) {
        if (x === promiseNew) throw new TypeError('Chaining cycle detected for promise #<Promise>');
        if ((x !== null && typeof x === "object") || (typeof x === "function")) {
            try {
                var then = x.then;
                if (typeof then === "function") {
                    // x是一个promise(类promise)实例：x.then(resolve,reject)
                    then.call(x, resolve, reject);
                } else {
                    resolve(x);
                }
            } catch (err) {
                reject(err);
            }
            return;
        }
        resolve(x);
    }
    Promise.prototype = {
        constructor: Promise,
        customize: true,
        then: function (onfulfilled, onrejected) {
            // onfulfilled/onrejected如果不是函数：未来保证穿透顺延的效果，我们需要为其设置默认的函数
            if (typeof onfulfilled !== "function") {
                onfulfilled = function onfulfilled(value) {
                    return value;
                };
            }
            if (typeof onrejected !== "function") {
                onrejected = function onrejected(value) {
                    throw value;
                };
            }

            var self = this,
                promiseNew = null;
            // 创建一个新的promise实例并且返回
            //   + 执行resolve/reject控制它成功或者失败
            //   + 到底是成功还是失败，是由onfulfilled/onrejected执行决定
            //       + onfulfilled/onrejected函数执行不报错，应该让其状态为成功，让其值为函数执行的返回值
            //       + 如果onfulfilled/onrejected返回的也是promise实例，那么promiseNew的状态和值和新返回的实例保持一致
            //       + 但是如果onfulfilled/onrejected返回的promise实例和promiseNew是一个东西，则直接抛出异常即可
            promiseNew = new Promise(function (resolve, reject) {
                switch (self.state) {
                    case 'fulfilled':
                        setTimeout(function () {
                            try {
                                var x = onfulfilled(self.value);
                                resolvePromise(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        break;
                    case 'rejected':
                        setTimeout(function () {
                            try {
                                var x = onrejected(self.value);
                                resolvePromise(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        break;
                    default:
                        // 把它存储到集合中，但是我们以后还要监听方法执行的结果，从而做其它事情
                        self.onFulfilledCallbacks.push(function (value) {
                            try {
                                var x = onfulfilled(value);
                                resolvePromise(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        self.onRejectedCallbacks.push(function (value) {
                            try {
                                var x = onrejected(value);
                                resolvePromise(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                }
            });
            return promiseNew;
        },
        catch: function (onrejected) {
            var self = this;
            return self.then(null, onrejected);
        }
    };

    // 暴露API
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Promise;
    }
    if (typeof window !== 'undefined') {
        // window.Promise = Promise;
    }
})();

let p1 = new Promise((resolve, reject) => {
    // resolve(100);
    reject(0);
});
let p2 = p1.then(
    /* result => {
        return result;
    } */
    /* reason=>{
        throw reason;
    } */
);
p2.then(result => {
    console.log('成功', result);
}).then(null, reason => {
    console.log('失败', reason);
});