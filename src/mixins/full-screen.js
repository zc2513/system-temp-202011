// 隐藏左侧菜单项配置
export default {
    props: {
        isfull: {
            type: Boolean,
            default: true
        }
    },
    created() {
        if (this.isfull) this.$store.dispatch('app/toggleLeft', 0)
    },
    beforeDestroy() {
        if (this.isfull) this.$store.dispatch('app/toggleLeft', 1)
    }
}
