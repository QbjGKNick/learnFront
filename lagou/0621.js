function ajax(url, options) {
    return fetch(url, options)
}
function createRequest(params) {
    const max = params.pool  //最大并发数
    let id = 0
    const waitQuenu = [] //等待执行的ajax队列
    const workQuenu = [] //正在执行的ajax队列
    return function (url, options) {
        return new Promise((resolve, reject) => {
            waitQuenu.push({
                task: () => {
                    return ajax(url, options)
                },
                //保证while循环时task能找到当前task所对应promise的resolve,reject方法
                changeStatus: {
                    resolve,
                    reject
                },
                id: id++
            })
            const loopTask = () => {
                while (workQuenu.length < max && waitQuenu.length > 0) {
                    const topQuenu = waitQuenu.shift()
                    workQuenu.push(topQuenu)
                    topQuenu.task().then(res => {
                        topQuenu.changeStatus.resolve(res)
                    }).catch(err => {
                        topQuenu.changeStatus.reject(err)
                    }).finally(() => {
                        const idx = workQuenu.findIndex(item => item.id === topQuenu.id)
                        workQuenu.splice(idx, 1) //请求完出队
                        loopTask() //重新检查队列，不足max继续去waitQuenu找对应请求入队执行
                    })
                }
            }
            loopTask()
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
