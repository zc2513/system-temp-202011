<template>
  <!-- 文件上传 部分统一处理 -->
  <el-upload
    ref="upload"
    :action="action"
    :on-change="OnChange"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :auto-upload="false"
    :multiple="multiple"
    :show-file-list="showFileList"
    :drag="drag"
    :list-type="listType"
    :limit="Number(limit)"
    :accept="accept"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
  </el-upload>
</template>

<script>

/** @description 接收参数描述
 * {multiple}   是否多选
 * {drag}       是否拖拽
 * {showFileList} 是显示选中项
 * {listType}   选按钮样式类型
 * {accept}     接收文件类型
 * {limit}      最大接收文件个数
 * {action}     直接上传文件地址
 * @returns 返回选中文件列表
 */
// 默认不实施上传
export default {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        drag: {
            type: Boolean,
            default: false
        },
        showFileList: {
            type: Boolean,
            default: true
        },
        listType: {
            type: String,
            default: 'text'
        },
        accept: {
            type: String,
            default: '_'
        },
        limit: {
            type: [Number, String],
            default: '_'
        },
        value: {
            type: [Array, Object, String],
            default: '_'
        },
        action: {
            type: String,
            default: '' // https://jsonplaceholder.typicode.com/posts/
        }
    },
    data() {
        return {
            fileList: [
                // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
            ]
        }
    },
    watch: {
        value: {
            handler(newValue) {
                console.log('file回显值--未处理', newValue)
            // 处理后 成为fileList数据格式 赋值生效
            },
            immediate: true
        }
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit()
        },
        handleRemove(file, fileList) {
            console.log(file, fileList, '移除功能')
            this.$emit('input', fileList)
        },
        handlePreview(file) {
            console.log(file, '预览功能')
        },
        OnChange(file, fileList) {
            console.log(fileList, '上传改变组件')
            this.$emit('input', fileList)
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
