const urlArr = [
  'http://jsonplaceholder.typicode.com/posts/1',
  'http://jsonplaceholder.typicode.com/posts/2',
  'http://jsonplaceholder.typicode.com/posts/3',
  'http://jsonplaceholder.typicode.com/posts/4',
  'http://jsonplaceholder.typicode.com/posts/5',
  'http://jsonplaceholder.typicode.com/posts/6',
  'http://jsonplaceholder.typicode.com/posts/7',
  'http://jsonplaceholder.typicode.com/posts/8',
  'http://jsonplaceholder.typicode.com/posts/9',
  'http://jsonplaceholder.typicode.com/posts/10'
]

function loadDate(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.responseText)
    }
    xhr.onerror = function () {
      reject('error')
    }

    xhr.open('GET', url)
    xhr.send()
  })
}

/**
 * 异步任务并发 + 报错重试
 * 10个任务 并发数是3个
 */
function sendRequest(urlArr, limit = 3) {
  // Promise.all()
  return new Promise((resolve, reject) => {
    const len = urlArr.length
    let counter = 0
    let data = []
    // 全局开关
    let isStop = false

    const start = () => {
      if (isStop) {
        return
      }
      const task = urlArr.shift()
      if (task) {
        loadDate(task)
          .then((result) => {
            data.push(result)
            if (counter == len - 1) {
              // 最后一个
              resolve(data)
            } else {
              counter++
              start()
            }
          })
          .catch((error) => console.log(error))
      }
    }

    // while (limit > 0) {
    //   setTimeout(() => {
    //     // 模拟延迟
    //     start();
    //   }, Math.random() * 2000);

    //   limit -= 1;
    // }
  })
}

let result = sendRequest(urlArr, 3)
console.log(result)
