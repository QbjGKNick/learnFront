/*
 * 向内置类的原型拓展方法
 *    + 内置类的原型上提供了很多内置方法，但是这些方法不一定完全满足业务需求，此时需要我们自己扩展一些方法
 *    【优势】
 *    + 调用起来方便
 *    + 可以实现链式方法
 *    + 限制调取方法的类型，必须是指定类的实例
 *    + 扩展的方法，各个模块【其他成员】都可以直接调用
 *    + ...
 *    【弊端】
 *    + 自己扩展的方法，容易覆盖内置的方法（解决：自己设定的方法名要设置前缀 myUnique）
 *      Array.prototype={...} 这样操作是无效的，也怕你一行代码，把数组方法全干没了
 *    + 基于for in 遍历的时候，会把自己扩展到原型上的方法也遍历到
 */
/* function unique(arr) {
  let obj = {}
  for (let i = 0; i < arr.length; ++i) {
    const item = arr[i]
    if (obj.hasOwnProperty(item)) {
      arr.slice(i, 1)
      i--
      continue
    }
    obj[item] = item
  }
  return arr
} */

Array.prototype.unique = function unique() {
  // this: 一般都是当前要操作的实例（也就是要操作的数组）
  let obj = {}
  let self = this
  for (let i = 0; i < self.length; ++i) {
    const item = self[i]
    if (obj.hasOwnProperty(item)) {
      self.slice(i, 1)
      i--
      continue
    }
    obj[item] = item
  }
  return self
}
let arr = [10, 20, 30, 20, 40, 10, 30, 20, 40]
arr = unique(arr)
arr
  .sort((a, b) => a - b)
  .reverse()
  .push('nick') // 执行完sort返回的是排序后的数组【原始数组也是变的】...执行完成
// push返回的是新增后素组的长度【不能再调数组方法了】 => “链式写法”：执行完成一个方法，返回的结果是某个实例，则可以继续调用这个实例所属类原型上的方法...
console.log(arr)
