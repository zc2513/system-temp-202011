<template>
  <!-- 消息查看 -->
  <div class="hfull notification-cls">
    <list :isfull="false" />

    <add ref="add" />
  </div>
</template>

<script>
import list from './list'
import add from './add'
export default {
    name: 'Lockover',
    components: { add, list },
    data() {
        return {

        }
    },
    created() {
        this.init()
    },
    methods: {
        init(type) {

            // 拉取页面初始化数据
        },
        look() {
            this.$router.push({
                path: 'info'
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
