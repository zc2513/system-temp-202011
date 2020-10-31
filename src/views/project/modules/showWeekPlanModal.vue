<template>
  <el-dialog :visible.sync="dialogFormVisible" top="5vh" width="80%">
    <div slot="title" style="margin-top: -10px">
      <el-row :gutter="20">
        <el-col :span="2">
          <span>{{ title }}</span>
        </el-col>
        <el-col :span="2" :offset="20">
          <el-link type="primary" @click="dialogFormVisible = false">返回</el-link>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="6">
        <student-info :ts-user-info="tsUserInfo" :type="planType" :plan-time="planTime" />
      </el-col>
      <el-col :span="18">
        <el-card style="margin-left: 16px">
          <el-row :gutter="20">
            <span v-if="planType === '周计划' || planType === '月计划'">导师制定的计划</span>
            <span v-else>我的自定义计划</span>
          </el-row>
        </el-card>
        <el-button
          v-for="(item, index) in myWeekPlan"
          :key="index"
          style="margin-left: 16px; margin-top: 12px; margin-bottom: 12px"
          :span="6"
          :type="index == planIndex ? focus : ''"
          @click="clickPlan(index)"
        >计划{{ index + 1 }}</el-button>
        <template v-for="(item, index) in myWeekPlan">
          <el-row v-if="myWeekPlan.length>0" :key="item.id" :gutter="20">
            <el-col :span="24">
              <el-card v-if="index === planIndex" class="box-card" style="margin-top: 4px; margin-left: 16px">
                <div slot="header" class="clearfix">
                  <el-row :gutter="20">
                    <el-col :span="10">
                      <el-row>
                        <span>计划标题</span>
                      </el-row>
                      <el-row>{{ item.title }}</el-row>
                    </el-col>
                    <el-col :span="14">
                      <el-row>
                        <span>计划时间</span>
                      </el-row>
                      <el-row>{{ moment(item.startDate).format('YYYY-MM-DD') }} ~
                        {{ moment(item.endDate).format('YYYY-MM-DD') }}</el-row>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <el-row :gutter="20" style="margin-top: 12px; margin-bottom: 12px">
                    <el-col :span="10">
                      <el-row>
                        <span>技能类型</span>
                      </el-row>
                      <el-row style="margin-top: 6px; margin-bottom: 12px">
                        <el-tag v-for="(tag, key) in item.skillType" :key="key" style="margin-right: 16px">{{
                          tag
                        }}</el-tag>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" style="margin-top: 12px; margin-bottom: 12px">
                    <el-col :span="24">
                      <el-row>
                        <span>计划详情</span>
                      </el-row>
                      <el-row style="margin-top: 12px; margin-bottom: 12px">
                        <!-- <span> {{ item.planContent }}</span> -->
                        <p v-html="item.planContent" />
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24" style="margin-top: 12px; margin-bottom: 12px">
                    <comment
                      :reportid="item.id"
                      :comment-type="commentType"
                      :realname="tsUserInfo.realName"
                      :user-id="tsUserInfo.userId"
                      :username="tsUserInfo.userName"
                    />
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </template>

        <el-row v-if=" !myWeekPlan.length>0" :gutter="20">
          <el-col :span="24">
            <el-card class="box-card" style="margin-top: 4px; margin-left: 16px">

              <div>
                <span>无计划</span>

              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>-->
  </el-dialog>
</template>

<script>
import moment from 'moment'
import Comment from '../../../components/tsforce/Comment.vue'
import StudentInfo from '../../../components/tsforce/StudentInfo.vue'
import { getSelfCutomPlan } from '@/api/project'
import { parseTime } from '@/utils/filter'

export default {
    name: 'ShowWeekPlanModal',
    components: {
        Comment,
        StudentInfo
    },
    props: {},
    data() {
        return {
            dialogFormVisible: false,
            title: '查看计划',
            planType: null,
            planTime: null,
            planIndex: 0,
            // 评论相关
            discussContent: null,
            tsUserInfo: {},
            commentType: '1',

            focus: 'primary',
            normal: '',
            formLabelWidth: '120px',

            comment: {},
            myWeekPlan: []
        }
    },
    created() {},
    methods: {
        moment,
        loadData(planType, param) {
            console.log('查询计划的条件-----------', param)
            var params = {} // 查询条件
            if (planType === '1') {
                // 周计划   TODO 这才是正确得 执行人是当前用户
                //  params.planUserId = this.tsUserInfo.userId
                // 这个出结果，但是是错的，周计划得创建人不要应该是应届生
                params.createUserId = this.tsUserInfo.userId
                params.week = param.week
                //  params.day = systemEnv.currentDay
            } else if (planType === '2') {
                // 月计划 TODO 这才是正确得 执行人是当前用户
                // params.planUserId = this.tsUserInfo.userId
                // 这个出结果，但是是错的，月计划得创建人不要应该是应届生
                params.createUserId = this.tsUserInfo.userId
                params.month = param.month
            } else {
                params.createUserId = this.tsUserInfo.userId
                params.day = parseTime(param.day, '{d}')

                params.month = param.currentMonth
            }
            params.planType = planType
            // params.planTime = this.planTime
            // params.planUserId = this.tsUserInfo.userId
            // params.year = moment(this.planTime).format('yyyy')
            params.year = param.currentYear

            // &year=2020&month=10&week=&day=22
            // com.thundersoft.studentreport/fstFreshStudentPlan/queryListPlanInfo?
            // planType=3
            // &createUserId=e9ca23d68d884d4ebb19d07889727dae
            // &planUserId=e3517f1ca22245e897077a25b5a8c328
            // &year=2020
            // &month=10
            // &week=
            // &day=22
            //       listp:'com.thundersoft.studentreport/fstFreshStudentPlan/queryListPlanInfo?planType=3&planUserId=e3517f1ca22245e897077a25b5a8c328&year=2020&month=10&week=&day=22',

            console.log('计划查询参数', params)

            this.fetching = true
            this.myWeekPlan = []
            //  params={}
            getSelfCutomPlan(params).then((res) => {
                console.log('返回结果', res)
                if (res.success) {
                    console.log('正确返回结果', res)

                    this.myWeekPlan = res.result
                    if (this.myWeekPlan.length > 0) {
                        this.myWeekPlan.forEach((val) => {
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

        close() {
            this.$emit('close')
            this.planIndex = 0
            this.visible = false
        },
        handleOk() {},
        handleCancel() {
            this.close()
        },
        submmit() {},
        clickPlan(e) {
            console.log('点了计划', e)
            this.planIndex = e
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
