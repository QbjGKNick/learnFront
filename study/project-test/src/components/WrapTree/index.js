import WrapTree from './src/WrapTree'

/* istanbul ignore next */
WrapTree.install = function(Vue) {
  Vue.component(WrapTree.name, WrapTree)
}

export default WrapTree
