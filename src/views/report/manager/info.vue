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
      <div>查看计汇报</div>
      <div class="cursor" style="color:#6666FF;" @click="dialogVisible=false">返回</div>
    </div>
    <div class="info-page-content fl">
      <div>
        <div class="info-con-left">
          <h4 class="f18">基本信息</h4>
          <div class="con-item fl f14 mb25">
            <div>研发经理</div>
            <div class="pl10">{{ formInline.realname }}</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>汇报类型</div>
            <div class="pl10">应届生培养月报</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>汇报组别</div>
            <div class="pl10">{{ formInline.newGroupName }}</div>
          </div>
          <div class="con-item fl f14 mb15">
            <div>汇报标题</div>
            <div class="pl10">{{ formInline.monthReportName }}</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>提交时间</div>
            <div class="pl10">{{ formInline.createTime }}</div>
          </div>
        </div>
      </div>

      <div class="info-con-right fl1 ml15 pb30">
        <z-header title="研发经理应届生培养月报" />

        <div class="student-info box mt15">
          <smallTitle title="应届生评分情况">
            <div slot="addTitle" class="ml20 cursor">
              <svg-icon v-popover:popover icon-class="way" />

              <el-popover
                ref="popover"
                placement="right"
                title="评分标准"
                width="230"
                trigger="hover"
              >
                <div class="hint c-56 f14">
                  <p>0分：完全不符合</p>
                  <p>1分：有一点符合</p>
                  <p>2分：较为符合</p>
                  <p>3分：基本符合</p>
                  <p>4分：完全符合</p>
                  <p>5分：非常符合甚至超出预期</p>
                </div>
              </el-popover>
            </div>

            <z-table
              :titles="titles"
              :btns="btn"
              :lists="jxlist"
              align="left"
              class="mt15"
            />

          </smallTitle>
          <smallTitle title="月报内容">
            <div>
              <div class="c-56 mb30">
                <p v-html="formInline.monthReportContent" />
              </div>
            </div>
          </smallTitle>
          <smallTitle title="汇报评论" style="padding-bottom:50px;">

            <Commentv2 :comment-param="commentParam" @ok="freshCommentList" />
            <!-- <div class="t-r mt15">
              <el-button size="mini" type="primary">提交</el-button>
            </div> -->
          </smallTitle>

          <commentList ref="clist" :reportid="formInline.id" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import smallTitle from '@/components/smallTitle'
import commentList from '@/components/commentList'
import datas from '@/assets/json/data'
import { list } from '@/api/mgrMonthReport'
import Commentv2 from '@/components/tsforce/Commentv2'
import { mapState } from 'vuex'

export default {
    components: { smallTitle, commentList, Commentv2 },
    data() {
        return {
            dialogVisible: false,
            textarea: '',
            titles: [
                { name: '序号', type: 'index' },
                { name: '工号', data: 'username' },
                { name: '姓名', data: 'realname' },
                { name: '基础活动', data: 'basicActivities' },
                { name: '软件编码', data: 'softwareCoding' },
                { name: '软件维护', data: 'softwareMaintenance' },
                { name: '软件验证', data: 'softwareVerification' },
                { name: '软件设计', data: 'softwareDesign' },
                { name: '软件需求', data: 'softwareDemand' },
                { name: '组别', data: 'newGroupName' },
                { name: '提交时间', data: 'createTime', type: 'time', time: '{y}-{m}-{d}' }
            ],
            tableData: datas.slice(0, 8),
            btn: false,
            formInline: {

            },
            commentParam: {
                commentType: 4

            },
            jxlist: []
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    methods: {

        async init(data) {
            console.log(data, 99666699)
            this.loadData(data)
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.clist.show(data.id)
            })

            // 发送请求拿到用户数据
        },
        async show(data) {
            if (data) {
                console.log('in 详情 show', data)
                Object.assign(this.formInline, data)
                this.commentParam.reportid = this.formInline.id
                this.commentParam.realname = this.formInline.realname
                this.commentParam.userId = this.formInline.userId
                this.commentParam.username = this.formInline.username
                this.commentParam.commentPeopleType = 3
            }
            await this.init(data)
        },
        loadData(data) {
            var param = {
                monthlyReportId: this.formInline.id,
                groupId: this.formInline.groupId
            }

            list(param).then(res1 => {
                console.log('编辑经理查询结过月报', res1)
                if (res1.success === true) {
                    this.jxlist = res1.result
                    if (this.jxlist.length > 0) {
                        this.jxlist.forEach(val => {
                            val.monthlyReportId = this.formInline.id
                            val.newGroupName = this.formInline.newGroupName
                            if (val.createTime == null) {
                                val.createTime = new Date()
                            }
                        })
                    }

                    console.log('编辑经理tir月报', this.jxlist)
                }
            })
        },
        freshCommentList() {
            this.$refs.clist.loadComment(this.formInline.id)
        }

    }
}
</script>

<style lang="scss">
.info-page{
    padding: 0 24px;
    background: #F5F7F9;
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
