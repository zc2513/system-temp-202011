<template>
  <!-- 计划详情/查看计划 -->
  <el-dialog
    custom-class="info-page"
    fullscreen
    width="30%"
    :modal="false"
    :visible.sync="dialogVisible"
    :show-close="false"
  >
    <div slot="title" class="info-page-title flc-y flsb">
      <div>查看计划</div>
      <div class="cursor" style="color:#6666FF;" @click="dialogVisible=false">返回</div>
    </div>
    <div class="info-page-content fl">
      <div>
        <div class="info-con-left">
          <h4 class="f18">基本信息</h4>
          <div class="con-item fl f14 mb25">
            <div>区域</div>
            <div class="pl10">{{ plan.areaName }}</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>阶段</div>
            <div class="pl10">{{ plan.stageName }}</div>
          </div>
          <div v-if="plan.stageType === 1" class="con-item fl f14 mb25">
            <div>计划类型</div>
            <div class="pl10">区域计划</div>
          </div>
          <div v-if="plan.stageType === 2" class="con-item fl f14 mb25">
            <div>计划类型</div>
            <div class="pl10">部门计划({{ plan.departName }})</div>
          </div>
          <div v-if="plan.stageType === 3" class="con-item fl f14 mb25">
            <div>计划类型</div>
            <div class="pl10">小组计划({{ plan.departName }}/{{ plan.groupName }})</div>
          </div>

          <div class="con-item fl f14 mb25">
            <div>提交人</div>
            <div class="pl10">{{ plan.createUser }}({{ plan.createRole }})</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>计划时间</div>
            <div class="pl10">{{ plan.createTime }}</div>
          </div>
        </div>
      </div>

      <div class="info-con-right fl1 ml15 pb30">
        <z-header :title="plan.stageName + '---'+ ( plan.stageType === 1 ?'区域计划（'+plan.planTitle+')' :( plan.stageType === 2 ?'部门计划（'+plan.planTitle+')':'小组计划（'+plan.planTitle+')') )" />
        <div class="student-info box mt15">
          <smallTitle title="计划详情">
            <div>
              <h4 class="f22 t-c mt20 mb30">{{ plan.planTitle }}</h4>
              <div class="c-56 mb30">
                <p v-html="plan.planContent" />

              </div>
            </div>
          </smallTitle>
          <smallTitle title="计划评论" style="padding-bottom:50px;">
            <Commentv2 :comment-param="commentParam" @ok="freshCommentList" />
          </smallTitle>
          <commentList ref="clist" :reportid="plan.id" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import smallTitle from '../component/smallTitle'
import commentList from '@/components/commentList'
import Commentv2 from '@/components/tsforce/Commentv2'
import { mapState } from 'vuex'

export default {
    components: { smallTitle, commentList, Commentv2 },
    props: {
        type: {
            type: [String, Number],
            default: '1'
        }
    },
    data() {
        return {
            dialogVisible: false,
            textarea: '',
            plan: {},
            commentParam: {
                commentType: 3

            }
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    methods: {
        async init(data) {
            if (data) {
                console.log(data, 9999)
                Object.assign(this.plan, data)
                this.commentParam.reportid = this.plan.id
                this.commentParam.realname = this.userInfo.realname
                this.commentParam.userId = this.userInfo.id
                this.commentParam.username = this.userInfo.username
                this.commentParam.commentPeopleType = 3
            }

            // 发送请求拿到用户数据
        },
        async show(data) {
            await this.init(data)
            this.dialogVisible = true
        },
        freshCommentList() {
            this.$refs.clist.loadComment(this.plan.id)
        }
    }
}
</script>

<style lang="scss">
.info-page{
    padding: 0 24px;
    background: #F5F7F9;
    .el-dialog__header,.el-dialog__body{  padding: 0; }
    .info-page-title{
        height: 72px;
        color:#4E5C7A;
    }
    .info-con-left{
        width: 336px;
        background: #FFFFFF;
        border-radius: 10px;
        padding: 24px;
        color: #303133;
        h4{
            height: 56px;
            line-height: 56px;
        }
        .con-item{
            >div:first-of-type{
                color: #5F6266;
                width: 60px;
            }
        }
    }
    .info-con-right{
        .name-tag{//标签
            height: 80px;
            .el-tag{
                border: 1px solid #E0E4EB;
                border-radius: 4px;
                color: #5F6266;
            }
            .el-tag--dark{
                color: #FFF;
            }
            .disabled{
                background: #F4F7FA;
                color: #909398;
            }
        }
        .student-info{
            padding-top: 40px;
            .skill-tag {
                .el-tag{
                    background: #F4F7FA;
                    border-radius: 4px;
                    color: #5F6266;
                    border: 0;
                }
            }
        }

    }
}
</style>
