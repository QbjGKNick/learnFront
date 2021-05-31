
<script>
import Dialog from './Dialog.vue'
import Emitter from '@cci/cui/lib/mixins/emitter.js'
export default {
  mixins: [Dialog, Emitter],
  provide() {
    return {
      'Dialog': this
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.broadcast('ElForm', "visible", val)
      }
    }
  }
}
</script>
<style lang="scss">

.wrap-dialog{
  .el-dialog__header {
    border-bottom: 1px solid #dddfe7;
  }
  .el-dialog__body{
    padding: 20px 45px;
    max-height: 500px;
    overflow: auto;
    .el-form{
      width: 570px;
    }
    .el-select{
      width: 100%;
    }
    .el-input__inner{
      width: 100%;
    }
  }
  .el-dialog__footer{
    border-top: 1px solid #dddfe7;
    padding: 10px 45px 10px 0px;
    .c-button-list {
      justify-content: flex-end;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>

