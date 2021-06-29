// 题目一：
// 存在一个request(option, callback)函数用来进行ajax请求
// 请使用Promise实现一个retry(option, count)函数。


// 题目二：
// 全局有一个方法function ajax(url, option)，其返回一个Promise
// 由于浏览器存在最大的并发限制，因此需要你实现一个createRequest方法
// 要求：
// 1. 调用方式：const request = createRequest({ pool: 5 });
// 2. 当前这个request函数和ajax的调用方式完全一致（参数及返回值均同）
//    也就是表示在任何场景下，ajax和request均可以完全等价
// 3. 但两者表现不同，ajax会同时发起最大20个请求， request会在同一时刻最多并行pool个请求，例如：
// for(let i = 0; i < 20; i++){
//  ajax("/usr", {id: i}).then(console.log); /* 20个请求同时发起 */
//  request("/usr", {id: i}).then(console.log); /* 同一时刻至多pool个请求， */
// }