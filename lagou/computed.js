function $watch(obj, data, key) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() { 
      return data[key]
    },
    set(val) { 
      data[key] = val
    }
  })
}

function $computed(obj, computed, key) {
  const getter = computed[key]
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      return getter.call(obj)
    }
  })
}

const vm = {
  data() {
    return {
      a: 1,
      b: 2
    }
  },
  computed: {
    aPlusb() {
      return this.a + this.b
    }
  }
}

// 1. 先将 data 上的数据绑定在 vm 上
const data = vm.data()
for (let key in data) {
  $watch(vm, data, key)
}

// 2. 
const { computed } = vm
for(let key in computed) {
  $computed(vm, computed, key)
}
console.log(vm.aPlusb);