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
      <div>查看汇报</div>
      <div class="cursor" style="color:#6666FF;" @click="back">返回</div>
    </div>
    <div class="info-page-content fl">
      <div>
        <div class="info-con-left">
          <h4 class="f18">基本信息</h4>
          <div class="con-item fl f14 mb25">
            <div>应届生</div>
            <div class="pl10">{{ tsUserInfo.realName }}</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>汇报时间</div>
            <div class="pl10">{{ reportDate }}</div>
          </div>
          <div class="con-item fl f14 mb15">
            <div>组别</div>
            <div class="pl10"> {{ tsUserInfo.areaName }} /{{ tsUserInfo.dept[0].deptName }}/
              {{ tsUserInfo.dept[0].groupList[0].groupName }}</div>
          </div>
        </div>
      </div>

      <div class="info-con-right fl1 ml15 pb30">
        <z-header :title="`应届生${reportType}`" />
        <div class="name-tag flc-y">
          <el-tag v-for="(item, index) in reports" :disabled="false" :key="index" class="mr10" size="medium" :effect=" item.reportInfo == null ?'light': index === reportIndex ? 'dark' : 'plain' " @click="clickReport(index)">{{ item.realname }} </el-tag>
        </div>
        <div class="name-tag flc-y">
          <el-tag v-for="(item, index) in plans" :key="index" class="mr10" size="medium" :effect=" index === planIndex ? 'dark' : 'plain' " @click="clickPlan(index)">计划{{ index + 1 }} </el-tag>
        </div>
        <div>
          <div class="student-info box">
            <smallTitle title="汇报详情">
              <div>
                <span>{{ report.reportContent }}</span>
              </div>
            </smallTitle>

            <smallTitle title="汇报评论" style="padding-bottom:50px;">
              <el-input
                v-model="commentContent"
                type="textarea"
                placeholder="请输入内容"
                maxlength="500"
                rows="8"
                show-word-limit
              />
              <div class="t-r mt15">
                <el-button size="mini" type="primary" @click="addPlanComment">提交</el-button>
              </div>
            </smallTitle>
            <commentList ref="commentList" :reportid="report.id" />
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import smallTitle from '../../project/component/smallTitle'
import commentList from '@/components/commentList'
import { addPlanComment } from '@/api/project'
import { parseTime } from '@/utils/filter'
import { getSelfCutomPlan } from '@/api/project'
import { listReport, reportQueryById } from '@/api/report'

export default {
    components: { smallTitle, commentList },
    data() {
        return {
            dialogVisible: false,
            textarea: '',
            planIndex: 99,
            reportIndex: 0,
            reportType: '',
            planTime: '',
            commentType: '1',
            plans: null,
            commentContent: '',
            tsUserInfo: null,
            report: null

        }
    },
    methods: {
        async init(data) {
            this.tsUserInfo = data.tsUserInfo
            console.log(data, 888888)
            // 处理计划类型
            switch (data.reportType) {
                case 2:
                    this.reportType = '周报'
                    this.planTime = data.currentYear + '年第' + data.currentWeek + '周'
                    break
                case 3:
                    this.reportType = '月报'
                    this.planTime = data.currentYear + '年' + data.currentMonth + '月'
                    break
                case 1:
                    this.reportType = '日报'
                    this.reportDate = data.createDate
                    break

                default:
            }
            console.log(data, 9999)
            this.getUserPlan(data)
            this.getDayReport(data)
            // 发送请求拿到用户数据
        },
        async show(data) {
            await this.init(data)
            this.dialogVisible = true
        },

        getUserPlan(data) {
            var params = {
                // planUserId: this.tsUserInfo.userId,
                // year: parseTime(data.createDate, '{y}'),
                // month: parseTime(data.createDate, '{m}'),
                // day: parseTime(data.createDate, '{d}')
                planUserId: this.tsUserInfo.userId,
                year: parseTime(data.createDate, '{y}'),
                month: 10,
                day: 22
            } // 查询条件

            //       listp:'com.thundersoft.studentreport/fstFreshStudentPlan/queryListPlanInfo?planType=3&planUserId=e3517f1ca22245e897077a25b5a8c328&year=2020&month=10&week=&day=22',

            console.log('计划查询参数', params)

            this.fetching = true
            this.plans = []
            //  params={}
            getSelfCutomPlan(params).then((res) => {
                console.log('返回结果', res)
                if (res.success) {
                    console.log('正确返回结果', res)

                    this.plans = res.result
                    if (this.plans.length > 0) {
                        this.plans.forEach((val) => {
                            val.skillType = []
                            if (val.skillPlanlist.length > 0) {
                                var skills = val.skillPlanlist.map((val2) => {
                                    return val2.skillType
                                })
                                val.skillType = skills
                            }
                        })
                    }
                    console.log('---------------------------------计划查询结果--------------------------------', this.myWeekPlan)
                    // }
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.fetching = false
            })
        },

        getDayReport(data) {
            console.log('查看日报----------------------------参数', data)
            var params = {
                reportType: data.reportType,
                year: parseTime(data.createDate, '{y}'),
                groupId: data.userGroupId,
                month: parseTime(data.createDate, '{m}'),
                day: Number(parseTime(data.createDate, '{d}'))
                //    day: parseTime(data.createDate, '{d}')

            }
            console.log('刘宝正确返回结888888888888888888果参数---------------------=========', params)
            // 查询条件
            listReport(params).then((res) => {
                console.log('返回结果', res)
                if (res.success) {
                    console.log('日报确返回结果ffffffffffffffffff', res.result)

                    this.reports = res.result
                    this.reportUser = this.reports[0]
                    if (this.reportUser.reportInfo != null) {
                        this.report = this.reportUser.reportInfo
                    } else {
                        this.report = {
                            reportContent:"没有汇报"
                        }
                    }
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.fetching = false
            })
        },

        addPlanComment() {
            var params = {
                commentContent: this.commentContent,
                commentType: this.commentType,
                createDate: parseTime(new Date(), '{y}-{m}-{d}'),
                freshStudentReportId: this.reportid,
                realname: this.tsUserInfo.realName,
                userId: this.tsUserInfo.userId,
                username: this.tsUserInfo.userName
            }
            console.log(' ======params=============提交评论=================================', params)
            addPlanComment(params)
                .then(res => {
                    if (res.success) {
                        this.$message.success(res.message)
                        this.$refs.commentList.show()

                        this.commentContent = ''
                    } else {
                        this.$message.error(res.message)
                    }
                })
                .finally(() => {})
        },
        clickPlan(index) {
            console.log('点击了计划标签-------------------', this.plans)
            this.planIndex = index
            this.$emit('showPlan', { plan: this.plans[index], index: index })
        },
        clickReport(index) {
            console.log('点击了汇报标签-------------------', this.reports)
            this.reportIndex = index
        },
        back() {
            this.dialogVisible = false
            this.planIndex = 0
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
