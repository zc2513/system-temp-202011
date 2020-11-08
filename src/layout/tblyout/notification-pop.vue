<template>
  <!-- 系统通知弹出层 -->
  <el-popover
    placement="bottom"
    width="320"
    trigger="hover"
    popper-class="notification-pop fl-y-sb"
  >
    <el-tabs v-model="activeName" class="el-tabs-cls" stretch @tab-click="handleClick">
      <el-tab-pane label="系统消息" name="sys" />
      <el-tab-pane label="公告通知" name="tz" />
    </el-tabs>
    <div class="fl1 con-list">
      <ul>
        <li v-for="(i,t) in notData" :key="t">{{ i.titile }}</li>
      </ul>
    </div>
    <div class="bottom flcc c-56">
      <span class="cursor" @click="$router.push('/notification/list')">查看所有信息</span>
    </div>
    <svg-icon slot="reference" icon-class="cMsg" class="cursor f24" />
  </el-popover>

</template>

<script>
import { listByUser } from '@/api/notification'
export default {
    data() {
        return {
            activeName: 'sys',
            notData: [],
            sysMsgList: [],
            anntMsgList: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(type) {
            listByUser().then(res => {
                this.anntMsgList = res.result.anntMsgList
                this.sysMsgList = res.result.sysMsgList
                this.notData = res.result.sysMsgList
            })
        },
        handleClick(e) {
            if (e.index === '1') {
                this.notData = this.anntMsgList
            } else {
                this.notData = this.sysMsgList
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-pop{
    width: 320px;
    height: 368px;
    background: #FFFFFF;
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    .el-tabs-cls{
    ::v-deep{
            .el-tabs__header{
                margin: 0;
            }
            .el-tabs__nav{
                .el-tabs__item{
                    padding: 0 24px;
                    height: 50px;
                    line-height: 50px;
                    color: #5F6266;
                    &.is-active{
                        color: #6666FF;
                    }
                }
                .el-tabs__active-bar{
                    background-color: #6666FF;
                }
            }
            .el-tabs__nav-wrap::after{
                background-color:#F4F7FA;
            }
        }
    }
    .bottom{
        width: 320px;
        height: 40px;
        background: #fafafa;
        border-radius: 0px 0px 6px 6px;
    }
    .con-list{
        ul{
            padding: 0 16px;
            height: 280px;
            overflow-y: auto;

            li{
                width: 100%;
                height: 20px;
                line-height: 20px;
                padding-left: 10px;
                position: relative;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 14px;
                color: #5f6266;
                margin-top: 16px;
                cursor: pointer;
                &::after{
                    content: '';
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: #FF5633;
                    left: 0;
                    top: 50%;
                    transform: translate(0,-50%);
                }
            }
        }
    }
}
</style>
<style lang="scss">
.notification-pop{
    &.el-popover{
        padding: 0;
    }
}

</style>
