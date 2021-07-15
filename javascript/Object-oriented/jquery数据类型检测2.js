var class2Type = {}
var toString = class2Type.toString // Object.prototype.toString 检测数据类型的
var hasOwn = class2Type.hasOwnProperty // Object.prototype.hasOwnProperty 检测是否私有属性的
var fnToString = hasOwn.toString // Function.prototype.toString 把函数转换为字符串
