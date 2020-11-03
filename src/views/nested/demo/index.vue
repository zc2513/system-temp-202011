<template>
  <div style="padding:40px;">
    <editor v-model="content" />

    <div class="flcc">
      <notificationPop />
    </div>

  </div>
</template>

<script>
import editor from '@/components/editor'
import notificationPop from '@/layout/tblyout/notification-pop'
export default {
    components: { editor, notificationPop },
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
