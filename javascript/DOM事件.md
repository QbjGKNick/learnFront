# DOM事件类

#### 基本概念：DOM事件的级别

DOM0	element.onclick = function(){}

DOM2	element.addEventListener('click',function(){},false)

DOM3	element.addEventListener('keyup',funciton(){},false)

#### DOM事件模型

#### ![image-20190507181731356](/Users/jqb/Library/Application Support/typora-user-images/image-20190507181731356.png)

#### DOM事件流

![image-20190507181825217](/Users/jqb/Library/Application Support/typora-user-images/image-20190507181825217.png)

完整事件流分三阶段：

​	第一阶段：捕获

​	第二阶段：事件通过捕获到达目标元素就是目标阶段

​	第三阶段：目标元素再上传到window对象就是冒泡

#### 描述DOM事件捕获的具体流程

window—>document—>html标签—>body—>……—>目标元素

![image-20190507182735502](/Users/jqb/Library/Application Support/typora-user-images/image-20190507182735502.png)

怎么用js表示当前html节点 document.documentElement

#### Event对象的常见应用

Event.preventDefault()	// 阻止链接默认跳转行为

Event.stopPropagation()	// 阻止冒泡行为

Event.stopImmediatePropagation() // 使用场景按钮绑定两个事件A和B，A优先级高于B，按钮点击后只想触发A								// 而不像触发B，则使用它	

​								// 按钮绑定两个事件AB，在A响应函数中加入它，可以阻止B事件响应，								// 事件响应优先级

Event.currentTarget	// 当事件沿着DOM触发时事件的当前目标，它总是指向事件绑定的元素（父级元素）

​					   // 场景：一个for循环给dom注册了N多个事件，如何优化，事件代理，将子元素的事件      					   // 代理绑定到父元素上即可一次性解决

​					   // 事件委托

Event.target	// 表示当前被点击的元素

#### 自定义事件

```javascript
var eve = new Event('custome') // eve事件对象类似click
// ev是DOM节点
ev.addEventListener('custome', function() {
    console.log('custome')
})
ev.dispatchEvent(eve) // 触发自定义事件

var customEve = new CustomEvent('costomEve', obj) // costomEve事件名，obj接受一个自定义对象
// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });

// create and dispatch the event
var event = new CustomEvent("cat", {
  detail: {
    hazcheeseburger: true
  }
});
obj.dispatchEvent(event);
```

![image-20190507184918675](/Users/jqb/Library/Application Support/typora-user-images/image-20190507184918675.png)