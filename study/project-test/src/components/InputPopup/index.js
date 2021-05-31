/*
 * Created on Tue May 22 2018
 * Author: Hu Fei
 * Email: feige_hu@foxmail.com
 *
 * Copyright (c) 2018 HF
 */
import InputPopup from '@cci/cp-input-popup'

/* istanbul ignore next */
InputPopup.install = function(Vue) {
  Vue.component(InputPopup.name, InputPopup)
}

export default InputPopup

