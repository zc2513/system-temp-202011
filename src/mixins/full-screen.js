export default {
    created() {
        this.$store.dispatch('app/toggleLeft', 0)
    },
    beforeDestroy() {
        this.$store.dispatch('app/toggleLeft', 1)
    }
}
