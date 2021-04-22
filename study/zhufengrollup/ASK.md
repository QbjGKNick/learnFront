这个库也是用js编写的吗？node
1
老师帮忙发下依赖命令
+1
这个课可以录播一下吗
cjs es6 有什么区别
cjs module.exports require 动态
es6 module export import  静态
上次用rollup打包一个库，使用() => import('xx.js') 貌似实现不了懒加载打包
rollup 适合打包库
rollup配合lerna使用   写库很爽的
default 导出的是不是就不会 tree-shaking 了
想对比下webpack的
一开始装的那些库是在哪找的。官网么
老师以前讲过的课在哪里可以看呀
有没有发现最难的是不知道用什么依赖
只在babel官网上面看见过一些依赖包
这么多人在观看吗
\n在后面吗？
rollup内部就是用magic-string实现的吗
同问



怎么自动为参数提供这种注释的 @param vs默认功能
同问
刚刚好像一瞬间
ide配置下就行了
有插件配置
vscode插件
什么插件
document this
同问
enter上有call吗，没看到
没有this的时候 可以不用call
现在是遍历ast语法树，如果是操作或者是编辑ast语法的话，还要使用到types的库吧
该发言可能违规，仅老师可见
熬，是这个call啊，还以为是enter上还有个call方法
所以干嘛不用esprima  acorn居然连walk都没有吗---
是现在要手写walk    acorn有自己的walk
acorn-walk
学一下walk的写法不香麽
强啊
应该用for 遍历把
val  -》 value
这是识别import关键字把



这是识别import关键字把
+2 -2
为什么
webpack遍历也是这样吗
哈哈
这种思路很重要
学习越难越好？头发掉了公司却用不上
rollup跟webpack都使用acorn，是有什么必要性吗，为什么不用babel
函数的执行作用域链不是浏览器底层自动创建的吗
要是用var就更精彩了，变量提升
acorn 和babel的区别是什么？
功能是一样的
acorn小巧
babel功能更强大，更易用，但是体积比较大比较重
老师一会休息一会 憋了一波尿
同问
作用域和执行上下文的区别
这个应该叫模拟执行上下文更合适，作用域链是内部的[[scope]]属性
Execute={
    VO
    scopeChain;
}
scope可以用单链表实现吗 可以
妙啊
这是不是找文件名字
妙哇
tree-shaking找的是啥
函数没调用 是不是也会被删除 是的
怎么判断是带有副作用的 无法shaking的
好多课的感觉



在源码中的位置
location
好前卫啊，之前留着位置索引 现在用上了
为什么要截取   直接读取源代码字符串不就行了
start是留着干这个用的吗
相当于拿到每一行代码内容了
专门
这就是在读取源代码字符串呀
不是magic的start 和end吗
magicstring的性能更高吗，为啥不直接用字符串slice等原生方法
其实最好可以边写边打印一下
辣鸡
该发言可能违规，仅老师可见
封装好了用起来方便吧
module里面的code不就是源代码的字符串吗
拿到每一行
那是所有的，你要拿到每一行的
不是吧   我代码也可以全部写一行呀
对 然后要分析每一行 有import的 就去深度遍历读取导入的模块
parse应该做了处理
不是你写一行就显示一行
code是读取的绝对路径的源文件
作用域链查找是如何实现变量提升的？
通过变量标识符呀   var和function  都会被提升
另外弄了一个文件 然后把用到的copy过去
老师的vscode左边一排下面几个插件都是干嘛的啊
没用到的 自然就被删除了
类的没有使用的方法应该是删不了吧
很合理
我以为还要构建依赖图呢
对 class内部无法分割 所以整体copy过去了
遍历ast不是也可以查找哪些变量和方法被使用，为啥要通过作用域链去分析
class 里面的就狠了呀
自己没有 可以找继承的  用ast不好找继承的属性和方法
递归
老师可以一边讲一遍输出一下吗
都要忘记每个里面是啥了
只有姜大神的课才会那样
别急，后面老师会总结回顾总体流程
标记
逐渐迷失
哈哈哈哈
正常
writeFile
你不是一个人
哈哈哈
我去。。。。。
大概思路理清
writeFile忘了写outputFilePath了
该发言可能违规，仅老师可见
光速结局
new MagicString.Bundle() 咋没印象了。。。
好像每一步看懂了，但是脑子里根本没个整体印象，前面的又忘了。。
已经忘记magic-string的作用了
anysis中magicString.start写错了
clone没有呢
expandStatement单条那再看下
writeFile忘了写outputFilePath了
该发言可能违规，仅老师可见
都忘得差不多了
一次写完。
这功力服了
clone在哪里写的
太牛了
start和end这里写错了
是的
clone是谁身上的没看你写过啊
 编译后不用分模块吗
写点复杂的
老师怎么这么厉害
引入的没做呀





我感觉要自己看代码才能劣迹
理解
画个图讲解下思路呢
正式学员看的课件  怎么感觉和老师你这个课件不大一样
好像找不到公开课的课件
我也找了半天今天的课件，没找到
class的tree shaking一般会先做作用域提升
class a{
  b = () => console.log(1)
}
先处理成
var $a$b = () => console.log(1)
new MagicString(code, {filename: path})
 这参数 filename 撒用
该发言可能违规，仅老师可见
跟webpack的打包差距还挺大的
分析函数是不是目前还没没用到，给statement加了一个_source不清楚有什么作用
source用来写入文件好像
最后的地方为啥要clone呀
expand那块可以再看看嘛，怎么防止语句重复引入
tree-shaking还没搞呢
_include
张老师，下回课能一起讲一下插件开发吗
噢，用到了_source， 没注意
能不能搞复杂一点再打包看看效果
噢是哦
这个_source对象不是自己构建的吗，怎么会有clone
能将一下思路吗



能将一下思路吗
后面的treeshaking是不是根据那些没有使用到的代码,
 把ast语法树上对应的节点删除掉，然后再根据ast重新生成一下代码，最后重复老师今天晚上讲的流程呢
有什么用
_source:{}里也没看见clone函数呢
在看下开始执行打包的地方
复杂的还没讲吧
下次能讲下插件怎么设计的吗
sir 开个 umi 插件的课 讲个request插件 嘿嘿
函数挂在原型上是不是不利于tree-sharing
引入库 讲吗
作用是什么？
老师，函数挂在原型上是不是不利于tree-sharing
_source的就是magic-string?是的
开发中作用是什么？
A依赖B和C，B和C又依赖D文件怎么处理？
应用是什么场景
那个展开代码是打平数组的功能吗
expandAllStatement那个
干到1点
不怕
相同的语句的statement是同一个对象？
statement其实就是一个节点对象
小白:相同的语句的statement是同一个对象？是的





会重复读到这个标志位吗
张老师今天的内容讲不完还要加一次课吗 下周二继续
下节课就能讲完吗
感觉还有好多
是在ast上标记和记录源码，最后把用到的ast节点的被标记的记录的源码拼接起来 是这个意思
递归引入怎么办
辛苦老师
谢谢老师老师辛苦了
求分享源码  再自己走几遍
广告不来一波？
下次啥时候
老师
下节课还有链接吗~
老师辛苦
感谢老师，老师辛苦了

