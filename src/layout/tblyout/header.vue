<template>
  <div class="header flc-y">
    <div class="leftLogo flcc">
      <img src="@/assets/imgs/layout/header.png" alt="">
    </div>
    <div class="flsb fl1 flc-y">
      <Breadcrumb separator-class="el-icon-arrow-right" />
      <div class="flc-y">
        <div class="mr33">应届生管理系统</div>
        <div class="mr3">届：</div>
        <div class="mr33">
          <el-select v-model="period" placeholder="请选择">
            <el-option
              v-for="item in periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select></div>
        <svg-icon icon-class="cUser" class="mr33 cursor f24" />
        <notificationPop class="mr33" />
        <svg-icon icon-class="cBack" class="mr33 cursor f24" @click="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import notificationPop from './notification-pop'
export default {
    components: { Breadcrumb, notificationPop },
    data() {
        return {
            periods: [
                {
                    value: '2020',
                    label: '2020届'
                }, {
                    value: '2019',
                    label: '2019届'
                }, {
                    value: '2018',
                    label: '2018届'
                }
            ],
            period: '2020'
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    padding-left: 16px;
    height: 72px;
    background: #6666FF;
    color: #FFF;
    box-shadow: 0px 2px 10px 0px rgba(106, 100, 138, 0.1);
    .leftLogo{
        width: 264px;
    }
    .mr33{
        margin-right: 33px;
    }
}
</style>
