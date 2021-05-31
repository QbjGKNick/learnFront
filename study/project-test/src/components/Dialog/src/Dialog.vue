<template>
  <transition name="dialog-fade">
    <div class="wrap-dialog el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div
        class="el-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered">
            <slot>

            </slot>
        </div>
        <div class="el-dialog__footer"  v-bind:class= "{nofooter:nofooter}">
          <slot name="footer">
            <c-form ref="form">
              <c-form-item class="submit-btn">
                <c-button type="primary" @click="handleBtnSubmit"><i class="el-icon-circle-check mr5"></i>保存</c-button>
                <c-button @click="handleBtnCancel"><i class="el-icon-circle-close mr5"></i>取消</c-button>
              </c-form-item>
            </c-form>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Dialog } from '@cci/cui'
export default {
  mixins: [Dialog],
  props: {
    onOpen: Function,
    nofooter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    handleBtnCancel() {
      this.$emit('cancle')
      this.hide()
    },
    handleBtnSubmit() {
      this.$emit('submit')
    }
  }
}
</script>
<style lang="scss">
.nofooter{
  display: none
}
</style>
