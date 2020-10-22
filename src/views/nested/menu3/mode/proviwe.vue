<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    {{ list }}
    <span>这是一段信息{{ datas }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        list: Object
    },
    data() {
        return {
            dialogVisible: false,
            datas: {}
        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        show(prams) {
            this.datas = prams
            this.dialogVisible = true
        }
    }
}
</script>
