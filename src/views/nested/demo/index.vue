<template>
  <div class="hfull" style="padding:40px;">
    <editor v-model="content" />
  </div>
</template>

<script>
import editor from '@/components/editor'
export default {
    components: { editor },
    data() {
        return {
            content: '<p>范德萨发fdsfkldjafkldsjfldjsflk</p>'
        }
    },
    watch: {
        content(newValue) {
            console.log(newValue)
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

</style>
