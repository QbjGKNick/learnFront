// extend: 给JQ的原型和对象扩展方法
//    + $.extend({ xxx: function... })  向JQ对象上扩展方法【工具类的方法】
//    + $.fn.extend({ xxx: function... })  向JQ原型上扩展方法【供实例调用 -> JQ插件】

// JQ插件 -> 把实现某个功能的方法扩展到JQ的原型上，这样我们可以基于JQ的选择器【JQ实例对象】获取想要操作的元素，
// 继而调用自己扩展的方法，实现对元素的相关操作，从而实现对应的功能和需求

/* $.extend({
  AAA: function () {
    // this-> jQuery
  }
})

$.AAA()

$.fn.extend({
  BBB: function () {
    // this -> jQuery实例对象
  }
})

$('body').BBB() */

jQuery.extend = jQuery.fn.extend = function () {
  var options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target

    // Skip the boolean and the target
    target = arguments[i] || {}
    i++
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        copy = options[name]

        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if (name === '__proto__' || target === copy) {
          continue
        }

        // Recurse if we're merging plain objects or arrays
        if (
          deep &&
          copy &&
          (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          src = target[name]

          // Ensure proper type for the source value
          if (copyIsArray && !Array.isArray(src)) {
            clone = []
          } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
            clone = {}
          } else {
            clone = src
          }
          copyIsArray = false

          // Never move original objects, clone them
          target[name] = jQuery.extend(deep, clone, copy)

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
}
