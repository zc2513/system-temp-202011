
<template>
  <div>
    <el-button type="primary" size="mini" @click="$refs.lock.show()">查看计划</el-button>
    <el-button type="primary" size="mini" @click="type=1">评论样式</el-button>
    <el-button type="primary" size="mini" @click="explain('计划1')">计划抽屉</el-button>
    <el-button type="primary" size="mini" @click="explain('计划说明')">计划说明抽屉</el-button>
    <el-button type="primary" size="mini" @click="type=4">新建计划/新建应届生计划</el-button>

    <lock ref="lock" />
    <planDrawer ref="planDrawer" />
    <commentList v-if="type===1" class="mt20" />

  </div>

</template>

<script>
import lock from './info/lock'
import planDrawer from './info/planDrawer'
import commentList from '@/components/commentList'

export default {
    name: 'MyDemo',
    components: { lock, planDrawer, commentList },
    data() {
        return {
            type: 0
        }
    },
    methods: {
        explain(title) {
            this.$refs.planDrawer.show({ title })
        }
    }
}
</script>
<style lang='scss' scoped>

</style>
