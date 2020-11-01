
<template>
  <!-- 计划抽屉 -->
  <el-drawer
    :visible.sync="drawer"
    class="drawer-box"
    :append-to-body="true"
    :modal-append-to-body="false"
    size="640px"
  >
    <div slot="title">
      编辑
      <svg-icon v-popover:popover icon-class="way" class="cursor" />
      <el-popover
        ref="popover"
        placement="right"
        title="评分标准"
        width="230"
        trigger="hover"
      >
        <div class="hint c-56 f14">
          <p>0分：完全不符合</p>
          <p>1分：有一点符合</p>
          <p>2分：较为符合</p>
          <p>3分：基本符合</p>
          <p>4分：完全符合</p>
          <p>5分：非常符合甚至超出预期</p>
        </div>
      </el-popover>
    </div>
    <div class="fl-y-sb hfull">
      <!-- <div class="hint c-56 f14">
        评分标准
        <p>0分：完全不符合</p>
        <p>1分：有一点符合</p>
        <p>2分：较为符合</p>
        <p>3分：基本符合</p>
        <p>4分：完全符合</p>
        <p>5分：非常符合甚至超出预期</p>
      </div> -->
      <div class="flcc hfull">
        <el-form ref="ruleForm" :model="formInline" :rules="rules" style="margin-bottom:100px;" class="form-box" label-width="100px">
          <el-form-item label="姓名:" class="ml10"> 张三 </el-form-item>
          <el-form-item label="工号:" class="ml10"> 03 </el-form-item>
          <el-form-item label="组别:" class="ml10"> 成都 二部 第一小组 </el-form-item>
          <el-form-item label="基础活动:" class="ml10" prop="activity">
            <div class="fl">
              <el-input v-model="formInline.activity" maxlength="1" />
              <span style="width:30px;" class="t-c">  分</span>
            </div>
          </el-form-item>
          <el-form-item label="软件编码:" class="ml10" prop="code">
            <div class="fl">
              <el-input v-model="formInline.code" maxlength="1" />
              <span style="width:30px;" class="t-c">  分</span>
            </div>
          </el-form-item>
          <el-form-item label="软件维护:" class="ml10" prop="maintain">
            <div class="fl">
              <el-input v-model="formInline.maintain" maxlength="1" />
              <span style="width:30px;" class="t-c">  分</span>
            </div>
          </el-form-item>
          <el-form-item label="软件验证:" class="ml10" prop="verify">
            <div class="fl">
              <el-input v-model="formInline.verify" maxlength="1" />
              <span style="width:30px;" class="t-c">  分</span>
            </div>
          </el-form-item>
          <el-form-item label="软件设计:" class="ml10" prop="design">
            <div class="fl">
              <el-input v-model="formInline.design" maxlength="1" />
              <span style="width:30px;" class="t-c">  分</span>
            </div>
          </el-form-item>
          <el-form-item label="软件需求:" class="ml10" prop="need">
            <div class="fl">
              <el-input v-model="formInline.need" maxlength="1" />
              <span style="width:30px;" class="t-c">  分</span>
            </div>
          </el-form-item>
        </el-form>

      </div>
      <div class="footer flc-y fle">
        <el-button type="primary" class="mr30" style="width:120px;" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
    name: 'PlankDrawer',
    data() {
        return {
            drawer: false,
            formInline: {
                activity: '',
                code: '',
                maintain: '',
                verify: '',
                design: '',
                need: ''
            },
            rules: {
                activity: [
                    { required: true, message: '基础活动不能为空' },
                    { type: 'number', message: '必须为数字值' }
                ],
                code: [
                    { required: true, message: '软件编码不能为空' },
                    { type: 'number', message: '必须为数字值' }
                ],
                maintain: [
                    { required: true, message: '软件维护不能为空' },
                    { type: 'number', message: '必须为数字值' }
                ],
                verify: [
                    { required: true, message: '软件验证不能为空' },
                    { type: 'number', message: '必须为数字值' }
                ],
                design: [
                    { required: true, message: '软件设计不能为空' },
                    { type: 'number', message: '必须为数字值' }
                ],
                need: [
                    { required: true, message: '软件需求不能为空' },
                    { type: 'number', message: '必须为数字值' }
                ]
            }
        }
    },
    methods: {
        show() {
            this.drawer = true
        },
        submitForm(status) {
            console.log(this.formInline)
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$message('待接口')
                    this.drawer = false
                } return false

                // 通过逻辑处理
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.drawer-box{
    color: #5F6266;
    .footer{
        height: 80px;
        border-top:1px solid #E0E4EB;
    }
    ::v-deep{
        .el-form-item__label{
            color: #5F6266;
            font-weight: 400;
        }
        .el-textarea{
            width: 300px;
        }
    }
    .hint{
        position: absolute;
        top: 100px;
        left: 10px;
        width: 180px;
        line-height: 20px;
    }
}
</style>
