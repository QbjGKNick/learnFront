import ScrollPane from '@cci/cp-scroll-pane'

/* istanbul ignore next */
ScrollPane.install = function(Vue) {
  Vue.component(ScrollPane.name, ScrollPane)
}
export default ScrollPane
