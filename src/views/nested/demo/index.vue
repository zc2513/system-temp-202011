<template>
  <div style="padding:40px;">
    <editor v-model="content" />

    <div class="flcc">
      <notificationPop />
    </div>

    <div class="mt30 fl flc-y flw">
      <span style="width:100px;">组人员选择</span>
      <z-groud-person v-model="ids" />
      <div class="wfull f12">
        数据回显需要后台返回的数据包含父及id
      </div>
    </div>

    <div class="mt30 mt30">
      <z-upfile v-model="fileList" multiple limit="5" />
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor'
import notificationPop from '@/layout/tblyout/notification-pop'

import zUpfile from '@/components/z-upfile'

export default {
    components: { editor, notificationPop, zUpfile },
    data() {
        return {
            content: '<p>范德萨发fdsfkldjafkldsjfldjsflk</p>',
            ids: [],
            fileList: []
        }
    },
    watch: {
        content(newValue) {
            console.log(newValue)
        },
        ids(newValue) {
            console.log(newValue, '选中的值')
        },
        fileList(newValue) {
            console.log(newValue, '上传接收的文件')
        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style lang="scss"  >

</style>
