// 题目一：
// 存在一个request(option, callback)函数用来进行ajax请求
// 请使用 Promise 实现一个retry(option, callback, count)函数。
async function  request(option, callback) {
    try {
        const result = await axios(option)
        callback(true, result)
    } catch (error) {
        callback(false, error)
    }
}

function retry(option, count) {
    return new Promise((resolve, reject) => {
        let limitNum =0
        const start = async () => {
            try {
                await request(option, (err, data) => {
                    if (err === true) {
                        resolve(data)
                    } else {
                        reject(err)
                    }
                })
            } catch (error) {
                limitNum++
                if (limitNum<=count) {
                    start()
                } else {
                    reject(error)
                }
            }           
        }
        start()
    })
}

// 题目二：
// 全局有一个方法function ajax(url, option)，其返回一个Promise
// 由于浏览器存在最大的并发限制，因此需要你实现一个createRequest方法
// 要求：
// 1. 调用方式：const request = createRequest({ pool: 5 })
// 2. 当前这个request函数和ajax的调用方式完全一致（参数及返回值均同）
//    也就是表示在任何场景下，ajax和request均可以完全等价
// 3. 但两者表现不同，ajax会同时发起最大20个请求，request会在同一时刻最多并行pool个请求，例如：
// for (let i =0; i < 20; i++) {
//     ajax("/user", { id: i }).then(console.log); /* 20个请求同时发起 */
//     request("/user", { id: i }).then(console.log); /* 同一时刻至多pool个请求发起 */
// }
function ajax(url, options) {
    return fetch(url, options)
}
function createRequest({pool}) {
    let allAjax=[]
    const max = pool
    return function(url, option) {
        return new Promise((resolve,reject) => {
            allAjax.push(() => ajax(url, option))
            const len = allAjax.length
            let count = 0;
            let isStop = false;
            const start = async () => {
                if(isStop) return
                const subRequest = allAjax.shift()
                if(subRequest) {
                    try {
                        await subRequest()
                        // 最后一个请求
                        if(count === len - 1) {
                            return resolve()
                        } else {
                            count++
                            start()
                        }
                    } catch (error) {
                        subRequest.errorNum++
                        // 尝试3次错误重连
                        if (subRequest.errorNum < 3) {
                            allAjax.unshift(subRequest)
                            start()
                        } else {
                            // 错误3次，直接结束
                            isStop = true
                            return reject(error)
                        }
                    }
                }
            }
            start()
        })
    }
}

const request = createRequest({ pool: 5 })
for (let i = 0; i < 10; i++) {
    request(`https://jsonplaceholder.typicode.com/todos/${i + 1}`).then(res => {
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}
