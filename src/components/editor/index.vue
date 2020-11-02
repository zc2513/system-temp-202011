<template>
  <div class="hfull">
    <el-upload
      v-show="false"
      ref="uploadImg"
      class="uploadImg"
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      :on-success="handleSuccess"
      accept=".jpg,.jpeg,.bmp,.gif,.png"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      class="editor-box"
      :options="editorOption"
      :style="{height:height+'px'}"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    components: { quillEditor },
    props: {
        value: {
            type: String,
            default: ''
        },
        height: {
            type: [String, Number],
            default: 280
        }
    },
    data() {
        return {
            content: '',
            editorOption: {
                placeholder: '',
                readyOnly: false, // 是否只读
                theme: 'snow', // 主题 snow/bubble
                syntax: true, // 语法检测
                modules: {
                    toolbar: {
                        container: [
                        // ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                            ['bold', 'italic', 'underline'], // 加粗 斜体 下划线 删除线
                            // ['blockquote', 'code-block'], // 引用  代码块
                            // [{ header: 1 }, { header: 2 }], // 1、2 级标题
                            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                            // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                            // [{ indent: '-1' }, { indent: '+1' }], // 缩进
                            // [{ 'direction': 'rtl' }], // 文本方向
                            // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                            // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                            // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                            // [{ font: [] }], // 字体种类
                            [{ align: [] }] // 对齐方式
                            // ['clean'], // 清除文本格式
                            // ['link', 'image', 'video'] // 链接、图片、视频
                            // ['link', 'image'] // 链接、图片、视频
                        ], // 工具菜单栏配置, // 工具栏
                        handlers: {
                            'image': (value) => {
                                console.log(value)
                                if (value) {
                                    console.dir(this.$refs.myQuillEditor)
                                    document.querySelector('.uploadImg .el-upload .el-upload__input').click()
                                    // document.querySelector('.ivu-upload .ivu-btn').click()
                                } else {
                                    this.quill.format('image', false)
                                }
                            }
                        }
                    }
                }
            },
            fileList: []
        }
    },
    watch: {
        value: {
            handler(val) {
                this.content = val
            },
            immediate: true
        }
    },
    // computed: {
    //     quill() {
    //         return this.$refs.myTextEditor.myQuillEditor
    //     }
    // },
    methods: {
        // 值发生变化
        onEditorChange({ editor, html, text }) {
            this.content = html
            this.$emit('input', html)
        },
        onEditorBlur(editor) {},
        // 获得焦点
        onEditorFocus(editor) {},
        // 开始
        onEditorReady(editor) {},

        handleSuccess(res) {
            const quill = this.$refs.myQuillEditor.quill
            if (res) {
            // 获取光标所在位置
                const length = quill.getSelection().index
                // 插入图片，res为服务器返回的图片链接地址
                quill.insertEmbed(length, 'image', res)
                // 调整光标到最后
                quill.setSelection(length + 1)
            } else {
            // 提示信息，需引入Message
                this.$message.error('图片插入失败')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.editor-box{
    ::v-deep{
        .ql-toolbar.ql-snow , .ql-container.ql-snow{
            border-color: #E0E4EB;
        }
        .ql-container.ql-snow{
           height:  calc(100% - 42px);
        }
    }
}
</style>
