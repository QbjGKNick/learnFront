<template>
  <div class="upload-container">
    <c-button icon="el-icon-upload" :disabled="readonly" size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传图片
    </c-button>
    <c-dialog :visible.sync="dialogVisible" :modalAppendToBody="false">
      <c-upload class="editor-slide-upload" :action="fileUpLoadUrl" :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload">
        <c-button size="small" type="primary">点击上传</c-button>
      </c-upload>
      <c-button @click="handleUploadReset">取 消</c-button>
      <c-button type="primary" @click="handleSubmit">确 定</c-button>
    </c-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'editorImage',
  props: {
    fileUpLoadUrl: {
      type: String,
      default: '/v1/file/normalUpload'
    },
    color: {
      type: String,
      default: '#1890ff'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    handleUploadReset() {
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.handleUploadReset()
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].data = response.data
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      const fileNameAndType = file.name.split('.')
      const fileType = fileNameAndType[fileNameAndType.length - 1]
      const imgTypes = ['jpg', 'jpeg', 'png', 'tif', 'bmp', 'gif', 'svg', 'webp', 'pcx', 'tga', 'exif', 'fpx',
        'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'epx', 'ai', 'hdri', 'raw', 'wmf', 'flic', 'emf', 'ico']
      if (!imgTypes.includes(fileType.toLowerCase())) {
        this.$message('上传文件不是图片，请重新选择！')
        return false
      } else {
        // eslint-disable-next-line
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function() {
            _self.listObj[fileName] = { hasSuccess: false, file: file, uid: file.uid, width: this.width, height: this.height }
          }
          resolve(true)
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
