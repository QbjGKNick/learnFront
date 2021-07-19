;(function () {
  var class2Type = {}
  var toString = class2Type.toString // Object.prototype.toString 检测数据类型的
  var hasOwn = class2Type.hasOwnProperty // Object.prototype.hasOwnProperty 检测是否私有属性的
  var fnToString = hasOwn.toString // Function.prototype.toString 把函数转换为字符串
  var ObjectFunctionString = fnToString.call(Object) // => "function Object() { [native code] }"
  var getProto = Object.getPrototypeOf // 获取当前对象的原型链__proto__

  /**
   * 建立数据类型检测的映射表
   * [objectArray]: "array"
   * [objectBoolean]: "boolean"
   * [objectDate]: "date"
   * [objectError]: "error"
   * [objectFunction]: "function"
   * [objectNumber]: "number"
   * [objectObject]: "object"
   * [objectRegExp]: "regexp"
   * [objectString]: "string"
   * [objectSymbol]: "symbol"
   */
  var mapType = [
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Object',
    'Error',
    'Symbol',
    'BigInt'
  ]
  mapType.forEach(function (name) {
    class2Type['[object' + name + ']'] = name.toLowerCase()
  })
  console.log(class2Type)

  // 检测数据类型的办法
  function toType(obj) {
    if (obj == null) {
      // 传递的是 null/undefined
      return obj + ''
    }
    // Support: Android <= 2.3 only (functionish RegExp)
    // 基于字面量方式创造的基本数据类型，直接基于typeof检测即可【性能要高一些】
    // 剩余的基于Object.prototype.toString.call的方式来检测，把获取的值到映射表中匹配，匹配结果是字符串对应的数据类型
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2Type[toString.call(obj)] || 'object'
      : typeof obj
  }

  // 检测是否为函数
  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    // 【DOM对象】（元素 文本 注释 document）具备nodeType，值是1 3 8 9
    // typeof obj.nodeType !== "number"：防止在部分浏览器中，检测<object>元素对象结果也是“function”，
    // 但是它的nodeType=1，处理浏览器兼容问题
    return typeof obj === 'function' && typeof obj.nodeType !== 'number'
  }

  // 检测是否为window对象
  var isWindow = function isWindow(obj) {
    // window.window = window 符合这个条件的就是window对象
    return obj != null && obj === obj.window
  }

  // 检测是否为数组或者类数组
  var isArrayLike = function isArrayLike(obj) {
    // length存储的是对象的length属性值或者是false
    // type存储的是检测的数据类型
    var length = !!obj && 'length' in obj && obj.length,
      type = toType(obj)

    // window.length=0 && Function.prototype.length = 0
    if (isFunction(obj) || isWindow(obj)) {
      return false
    }

    // type === 'array' 数组
    // length === 0 空的类数组
    // 最后一个条件判断的是非空的类数组【有length属性，并且最大索引在对象中】
    return (
      type === 'array' ||
      length === 0 ||
      (typeof length === 'number' && length > 0 && length - 1 in obj)
    )
  }

  // 检测是否为存粹的对象，例如：{}
  var isPlainObject = function isPlainObject(obj) {
    var proto, Ctor

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    // 不存在或者基于toString检测结果都不是[object Object]，那么一定不是纯粹的对象
    if (!obj || toString.call(obj) !== '[object Object]') {
      return false
    }

    // 获取当前值的原型链【直属类的原型链】
    proto = getProto(obj)

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    // Object.create(null):这样创造的对象没有__proto__
    if (!proto) {
      return true
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    // Ctor存储原型对象上的constructor属性，没有这个属性就是false
    Ctor = hasOwn.call(proto, 'constructor') && proto.constructor

    // 条件成立说明原型上的构造函数是Object：obj就是Object的一个实例，并且obj.__proto__ === Object.prototype
    return (
      typeof Ctor === 'function' &&
      fnToString.call(Ctor) === ObjectFunctionString
    )
  }

  var isEmptyObject = function isEmptyObject(obj) {
    // var name
    // for (name in obj) {
    //   return false
    // }
    // return true

    if (obj == null) return false
    // 排除非对象
    if (typeof obj !== 'object') return false

    // 是一个对象【纯粹对象或者特殊的对象都可以】
    var keys = Object.keys(obj)
    // 为了防止IE11不兼容这个属性
    if (hasOwn.call(Object, 'getOwnPropertySymbols')) {
      // 兼容这个属性的情况下，我们再去拼接
      keys = keys.concat(Object.getOwnPropertySymbols(obj))
    }
    return keys.length === 0
  }

  // 检测是否为数字
  var isNumberic = function isNumberic(obj) {
    var type = toType(obj)
    return (type === 'number' || type === 'string') && !isNaN(+obj)
  }

  var each = function each(obj, callback) {
    var length, i = 0
    // isArrayLike:检测是否为数组或者类数组
    if (isArrayLike(obj)) {
        length = obj.length
        for (; i < length; i++) {
            // 每一轮循环都去执行回调函数
            //      + 传递实参：索引/当前项
            //      + 改变THIS：当前项
            //      + 接收返回值：如果回调函数返回false，则结束循环
            var result = callback.call(obj[i], i, obj[i])
            if (result === false) {
                break
            }
        }
    } else {
        /* // 对象
        for (i in obj) {
            // for in遍历问题
            //      + 1.遍历到原型上自己扩展的公共的属性
            //      + 2.顺序
            //      + 3.无法找到symbol的属性
            if (callback.call(obj[i], i, obj[i] === false)) {
                break
            }
        } */
        var keys = Object.getOwnPropertyNames(obj)
        typeof Symbol !== 'undefined' ? keys = keys.concat(Object.getOwnPropertySymbols(obj)) : null
        for (; i < keys.length; i++) {
            var key = keys[i]
            var result = callback.call(obj[key], key, obj[key])
            if (result === false) {
                break
            }
        }
    }

    return obj
  }

  /* 对象的深浅合并
   *  [合并的规律]
   *    A->obj1 B->obj2
   *    A/B都是对象：迭代B，依次替换A
   *    A不是对象，B是对象：B替换A
   *    A是对象，B不是对象：依然以A的值为主
   *    A/B都不是对象，B替换A
   */
  var shallowMerge = function shallowMerge(obj1, obj2) {
    var isPlain1 = isPlainObject(obj1),
        isPlain2 = isPlainObject(obj2)
    if (!isPlain1) return obj2
    if (!isPlain2) return obj1
    each(obj2, function (key, value) {
      obj1[key] = value
    })
    return obj1
  }

  var deepMerge = function deepMerge(obj1, obj2) {
    var isPlain1 = isPlainObject(obj1),
        isPlain2 = isPlainObject(obj2)
    if (!isPlain1 || !isPlain2) return shallowMerge(obj1, obj2)
    each(obj2, function (key, value) {
      obj1[key] = deepMerge(obj1[key], value)
    })
    return obj1
  }

  var utils = {
    toType: toType,
    isFunction: isFunction,
    isWindow: isWindow,
    isArrayLike: isArrayLike,
    isPlainObject: isPlainObject,
    isEmptyObject: isEmptyObject,
    isNumberic: isNumberic,
    each: each,
    shallowMerge: shallowMerge,
    deepMerge: deepMerge
  }

  // 暴露到外部
  if (typeof window !== 'undefined') {
    window._ = window.utils = utils
  }
  if (typeof module === 'object' && typeof module.exports === 'object') {
    moduel.exports = utils
  }
})()
