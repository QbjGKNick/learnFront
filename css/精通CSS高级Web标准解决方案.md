# 基础知识

## 加载 js `async和defer` 区别

```html
<head>
  <!-- 异步加载，但下载完后立即执行 -->
  <script src="/scripts/core.js" async></script>
  <!-- 异步加载，但在HTML解析后执行 -->
  <script src="/scripts/core.js" defer></script>
</head>
```

# 可见格式化模型

## 盒模型

- 内容
- 内边距(padding)
- 边框(border)
- 外边距(margin)

CSS 规定，上下方位的内、外边距，仍然基于`包含块`的`宽度`来计算，包含块就是其父元素，但有时候也不一定

### 匿名盒子（anonymouse block box）

`除了使用:first-line伪元素来添加有限的排版和颜色相关的样式之外，不能给匿名块盒子或匿名行盒子应用样式`

- 绝对定位 relative
- 绝对定位 absolute
- 固定定位 fixed
- 浮动 float
