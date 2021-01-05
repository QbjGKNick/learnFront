/**
 * JS代码执行的环境
 * + 浏览器环境 window -> GO
 * + webview window -> GO
 * Node
 * + global -> GO 没有window
 */

// 利用JS的暂时性死区「基于typeof检测一个未被声明的变量，结果是undefined」：如果是在浏览器或者webview环境下运行JS，则A=window，
// 如果在Node环境下执行，则A=global或者当前模块
var A = typeof window !== "undefined" ? window : this;
// 回调函数：把一个函数作为实参值，传递给另外一个函数执行，在执行过程中，把传递的函数执行
var B = function (window, noGlobal) {
    // 浏览器环境下
    // window=window
    // noGlobal=undefined
    "use strict";

    var jQuery = function (selector, context) {
        // ...
    };

    // 浏览器环境下
    if (typeof noGlobal === "undefined") {
        // 把私有的方法暴露到全局对象上
        window.jQuery = window.$ = jQuery;
        // $() -> jQuery() -> 让闭包中的jQuery方法执行
    }
};

// 自执行函数
(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        // 当前运行JS的环境是支持CommonJS模块规范「node.js/webpack，浏览器默认不支持」
        // ...
    } else {
        // 浏览器或者webview环境
        // -> B(window)
        factory(global);
    }
})(A, B);

//=====================
(function () {
    function ModalPlugin() {
        // ...
    }

    // 暴露API：支持浏览器 && CommonJS
    if (typeof window !== "undefined") {
        window.M = window.ModalPlugin = ModalPlugin;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = ModalPlugin;
    }
})();
