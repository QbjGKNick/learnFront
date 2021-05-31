<script>
import Tinymce from '@cci/cp-tinymce'
import editorImage from './editorImage.vue'

const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr imagetools importcss insertdatetime link lists nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']
const toolbar = ['bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link charmap preview anchor pagebreak insertdatetime table emoticons forecolor backcolor fullscreen']

export default {
  name: 'tinymce',
  mixins: [Tinymce],
  components: { editorImage },
  props: {
    // 文件上传接口
    fileUpLoadUrl: {
      type: String,
      default: '/v1/file/normalUpload'
    },
    toolbar: {
      type: Array,
      default() {
        return toolbar
      }
    },
    plugins: {
      type: Array,
      default() {
        return plugins
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autoInit: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.loadLib()
      .then(() => {
        this.initTinymce()
      })
      .catch(() => {
        console.log('加载 cdn 失败')
      })
  },
  methods: {
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.data.fileUrl}" >`)
      })
      this.$emit('fileUpload', arr)
    },
    renderEditorImage() {
      return <editorImage color="#1890ff" class="editor-upload-btn" fileUpLoadUrl={ this.fileUpLoadUrl } readonly={ this.readonly } on-successCBK={ this.imageSuccessCBK }/>
    }
  }
}
</script>
