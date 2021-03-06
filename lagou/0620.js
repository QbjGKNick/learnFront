// 题目一：
// 存在一个request(option, callback)函数用来进行ajax请求
// 请使用 Promise 实现一个retry(option, count)函数。
function _request(option) {
  return new Promise((resolve, reject) => {
    request(option, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function retry(option, count) {
  let promise = Promise.resolve()
  let isStoped = false
  for (let i=0;i<count;i++) {
    promise = promise
    .then((data) => {
      if (isStoped) {
        return Promise.resolve(data)
      }
      return _request(option)
    })
    .then((data) => {
      if (!isStoped) {
        isStoped = true
      }
      return Promise.resolve(data)
    })
    .catch(err => {
      if(i>= count) {
        return Promise.reject(err)
      }
    })
  }
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
function createRequest({ pool }) {
  let allRequest = []
  let doingRequest = []
  let max = pool
  let isStop = false
  let count = 0
  return function (url, option) {
    return new Promise((resolve, reject) => {
      allRequest.push(() => ajax(url, option))
      doingRequest.push(() => ajax(url, option))
      const start = async () => {
        const subRequest = doingRequest.shift()
        if (subRequest) {
          try {
            const result = await subRequest()
            count++
            resolve(result)
            // 最后一个请求
            if (count === allRequest.length - 1) {
              isStop = true
            } else {
              start()
            }
          } catch (error) {
            // subRequest.errorNum++
            // // 尝试3次错误重连
            // if (subRequest.errorNum < 3) {
            //   allRequest.unshift(subRequest)
            //   start()
            // } else {
              // 错误3次，直接结束
              isStop = true
              return reject(error)
            }
          }
        }
      }
      while (!isStop && doingRequest.length <= max) {
        start()
      }
    })
  }
}

const request = createRequest({ pool: 5 })
for (let i = 0; i < 10; i++) {
  request(`https://jsonplaceholder.typicode.com/todos/${i + 1}`)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })
}
