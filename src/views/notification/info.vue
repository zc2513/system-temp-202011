<template>
  <div class="notification-info flcc">
    <div class="mian f14">
      <el-button type="text" class="btn c-54 f16" @click="$router.go(-1)">返回</el-button>
      <h4 class="t-c f24">  {{ notinfoData.titile }} </h4>
      <p class="t-c c-56 mt10">发布时间：{{ notinfoData.updateTime }}</p>
      <div class="content c-56" v-html="notinfoData.msgContent" />
    </div>
  </div>
</template>

<script>
import fullScreen from '@/mixins/full-screen'
import { getInfo } from '@/api/notification'
export default {
    name: 'NotificationInfo',
    mixins: [fullScreen],
    data() {
        return {
            notinfoData: {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            // 详情数据请求
            getInfo({ id: this.$route.query.id }).then(res => {
                this.notinfoData = res.result
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-info{
    background: #F4F7FA;
    // height: 100%;
    margin-top: 24px;
    .mian{
        position: relative;
        background: #FFFFFF;
        padding: 24px 40px 0;
        width: 80%;
        h4{color:#303133;}
        .btn{
            position: absolute;
            right: 30px;
            top: 0;
        }
        .content{
            margin-top: 50px;
            padding-bottom: 50px;
            p{
                line-height: 30px;
            }
        }
    }
}
</style>
