(function () {
    /* 工具类方法 */
    var isPromise = function isPromise(obj) {
        if ((obj !== null && typeof obj === "object") || (typeof obj === "function")) {
            if (typeof obj.then === "function") {
                return true;
            }
        }
        return false;
    };
    var resolvePromise = function resolvePromise(promiseNew, x, resolve, reject) {
        if (x === promiseNew) throw new TypeError('Chaining cycle detected for promise #<Promise>');
        if (isPromise(x)) {
            try {
                x.then(resolve, reject);
            } catch (err) {
                reject(err);
            }
            return;
        }
        resolve(x);
    };

    /* 构造函数 */
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

    /* 原型 */
    Promise.prototype = {
        constructor: Promise,
        customize: true,
        then: function (onfulfilled, onrejected) {
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

    /* 对象 */
    Promise.resolve = function resolve(value) {
        return new Promise(function (resolve) {
            resolve(value);
        });
    };
    Promise.reject = function reject(value) {
        return new Promise(function (_, reject) {
            reject(value);
        });
    };
    Promise.all = function all(promises) {
        return new Promise(function (resolve, reject) {
            try {
                var index = 0,
                    len = promises.length,
                    results = [];
                for (var i = 0; i < len; i++) {
                    (function (i) {
                        var item = promises[i];
                        if (!isPromise(item)) {
                            index++;
                            results[i] = item;
                            index === len ? resolve(results) : null;
                            return;
                        }
                        item.then(function (result) {
                            index++;
                            results[i] = result;
                            index === len ? resolve(results) : null;
                        }, function (reason) {
                            reject(reason);
                        });
                    })(i);
                }
            } catch (err) {
                reject(err);
            }
        });
    };

    /* 暴露API */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Promise;
    }
    if (typeof window !== 'undefined') {
        window.Promise = Promise;
    }
})();


/* let p1 = Promise.resolve(10);
let p2 = new Promise(resolve => {
    setTimeout(function () {
        resolve(20);
    }, 000);
});
let p3 = new Promise((resolve, reject) => {
    setTimeout(function () {
        reject(30);
    }, 500);
});
let p4 = 40;

Promise.all([p1, p2, p3, p4]).then(results => {
    console.log('成功', results);
}).catch(reason => {
    console.log('失败', reason);
}); */