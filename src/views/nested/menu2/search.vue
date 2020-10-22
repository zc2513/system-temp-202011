<template>
  <el-form :inline="true" :model="formData" size="small" class="demo-form-inline mt15">
    <el-form-item label="名称">
      <el-input v-model="formData.name" clearable placeholder="名称" />
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker
        v-model="times"
        type="daterange"
        align="right"
        unlink-panels
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="changeDate"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100px;" round @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: '',
                startclass: '',
                endclass: ''
            },
            times: '',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('search', this.formData)
        },
        changeDate(time) {
            this.formData.startclass = time ? time[0] : ''
            this.formData.endclass = time ? time[1] : ''
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
