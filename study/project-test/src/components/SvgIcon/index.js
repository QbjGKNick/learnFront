import SvgIcon from '@cci/cp-svg-icon'

/* istanbul ignore next */
SvgIcon.install = function(Vue) {
    Vue.component(SvgIcon.name, SvgIcon)
}

export default SvgIcon