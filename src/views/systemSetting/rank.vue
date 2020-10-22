<template>
  <!-- 数量级别设置 -->
  <el-form ref="ruleForm" :model="ruleForm" label-width="50px" class="rank-page">
    <el-form-item v-for="(item,key) in ruleForm.model" :key="key" :label="item.Level+'级'" prop="model">
      <el-row>
        <el-col :span="11">
          <el-input v-model="item.BeginNum" />
        </el-col>
        <el-col :span="2" class="t-c">-</el-col>
        <el-col :span="11">
          <el-input v-model="item.EndNum" />
        </el-col>
      </el-row>
    </el-form-item>
    <div class="t-c">
      <el-button class="w-30" type="primary" @click="save">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import { getDataLevelList, saveDataLevel } from '@/api/systemSetting'
export default {
    name: 'Rank',
    data() {
        return {
            ruleForm: { model: [] }
        }
    },
    created() {
        getDataLevelList().then(res => {
            this.ruleForm.model = res.Data
        })
    },
    methods: {
        save() {
            if (!this.ruleForm.model.every(e => e.BeginNum && e.EndNum)) {
                return this.$notify.error({ title: '错误', message: '输入框不能为空', offset: 80 })
            }
            saveDataLevel(this.ruleForm).then(res => {
                this.$notify({ title: '成功', message: '保存成功', type: 'success', offset: 80 })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.rank-page{
    width: 50%;
    max-width: 500px;
    min-width: 325px;
    margin: 0 auto;
    margin-top: 10vh;
}
</style>
