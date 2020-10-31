
<template>
  <div>
    <el-button type="primary" size="mini" @click="type=1">查看计划</el-button>
    <el-button type="primary" size="mini" @click="type=2">计划抽屉</el-button>
    <el-button type="primary" size="mini" @click="type=3">评论样式</el-button>
    <el-button type="primary" size="mini" @click="type=4">新建计划/新建应届生计划</el-button>

    <lock v-if="type===1" />
    <planDrawer v-if="type===2" />
    <commentList v-if="type===3" class="mt20" />

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
    }
}
</script>
<style lang='scss' scoped>

</style>
