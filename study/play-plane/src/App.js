// template -> render
import { defineComponent, h, ref, onMounted, onUnmounted } from "@vue/runtime-core";
export default defineComponent({
  setup() {
    const moveX = ref(200);
    const pageWidth = 750;
    const r = 50*2;
    let interval;
    const speed = 1;
    let direction = 1;
    onMounted(() =>{
      interval = setInterval(() =>{
        moveX.value += speed * direction;

        if (moveX.value > pageWidth - r) {
          direction = -1;
        }
        if (moveX.value < r) {
          direction = 1
        }
      })
    })

    onUnmounted(() =>{
      clearInterval(interval)
    })

    return {
      x: moveX
    }
  },
  render(ctx) {
    // 创建虚拟节点
    // <div x="20" y="20">开课吧nb</div>
    console.log(ctx.x, 'ctx:::::')
    const vnode = h("circle", { x: ctx.x, y: 400 });
    // const vnode = h("Container", [h("circle", { x: ctx.x, y: 200 })]);
    console.log(vnode);
    return vnode;
  },
});
