
<template>
  <div>
    <el-button type="primary" size="mini" @click="$refs.lock.show()">查看计划</el-button>
    <el-button type="primary" size="mini" @click="type=1">评论样式</el-button>
    <el-button type="primary" size="mini" @click="explain( {title:'计划1'})">计划抽屉</el-button>
    <el-button type="primary" size="mini" @click="explain({title:'计划说明'})">计划说明抽屉</el-button>
    <el-button type="primary" size="mini" @click="addPlanShow">新建计划/新建应届生计划</el-button>

    <lock ref="lock" />
    <planDrawer ref="planDrawer" />
    <commentList v-if="type===1" class="mt20" />
    <addPlan ref="addPlan" @planHelp="explain" />

  </div>

</template>

<script>
import lock from './info/lock'
import planDrawer from './info/planDrawer'
import addPlan from './info/addPlan'
import commentList from '@/components/commentList'

export default {
    name: 'MyDemo',
    components: { lock, planDrawer, commentList, addPlan },
    data() {
        return {
            type: 0
        }
    },
    methods: {
        explain({ title, id }) {
            this.$refs.planDrawer.show({ title })
        },
        addPlanShow() {
            this.$refs.addPlan.show()
        }
    }
}
</script>
<style lang='scss' scoped>

</style>
