<template>
  <div class="hfull" style="background:#ccc;">
    案例页面
    <button @click="showDialogVisible = true">弹窗</button>
    <el-dialog
      title="新建计划"
      :visible.sync="showDialogVisible"
      width="30%"
    >
      <!-- <div slot="title">
          <span>新建计划</span>
      </div>   -->
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="green fl-y-sb" style="height:100px;">
      <div class="yellow" style="height:40px;">1</div>
      <div class="blue fl1">2</div>
      <div class="red">3</div>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            showDialogVisible: false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
