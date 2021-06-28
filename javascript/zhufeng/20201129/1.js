/* 
 * 基于原生JS实现Promise「遵循的是Promise A Plus规范」
 *    https://promisesaplus.com/ 
 */
(function () {
    function Promise(executor) {
        // 要求传递的executor必须是一个函数才可以
        if (typeof executor !== 'function') throw new TypeError('Promise resolver ' + executor + ' is not a function');

        // self->promise实例 && 初始其状态state和值value
        var self = this;
        self.state = 'pending';
        self.value = undefined;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];

        var change = function change(state, value) {
            // 状态只能修改一次,第二次更改无效「啥都不处理即可」
            if (self.state !== 'pending') return;
            self.state = state;
            self.value = value;
            
            // 通知集合中的方法执行
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

    Promise.prototype = {
        constructor: Promise,
        customize: true,
        /*
         * .then(onfulfilled, onrejected) 
         *    case1：如果此时promise实例已经是成功或者失败，我们创建一个异步的微任务，等待同步任务结束，执行对应的函数即可
         *    case2：此时状态还是pending，我们需要把onfulfilled/onrejected保存起来，当后期状态修改了（例如：resolve/reject方法执行），再次通知保存的方法执行，而这个操作也是异步微任务
         */
        then: function (onfulfilled, onrejected) {
            var self = this;
            switch (self.state) {
                case 'fulfilled':
                    setTimeout(function () {
                        onfulfilled(self.value);
                    });
                    break;
                case 'rejected':
                    setTimeout(function () {
                        onrejected(self.value);
                    });
                    break;
                default:
                    self.onFulfilledCallbacks.push(onfulfilled);
                    self.onRejectedCallbacks.push(onrejected);
            }
        },
        catch: function () {}
    };

    // 暴露API
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Promise;
    }
    if (typeof window !== 'undefined') {
        window.Promise = Promise;
    }
})();

let p1 = new Promise((resolve, reject) => {
    // resolve(100);
    // reject(0);
    setTimeout(() => {
        resolve(100);
        console.log(2);
    }, 1000);
});
p1.then(result => {
    console.log('成功', result);
}, reason => {
    console.log('失败', reason);
});
p1.then(result => {
    console.log('成功', result);
}, reason => {
    console.log('失败', reason);
});
console.log(`1`);