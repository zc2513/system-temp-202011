<template>
  <el-dialog :title="title" width="50%" :visible.sync="visible">
    <el-row class="rowclass">
      <el-col :span="8">
        <span>计划类型</span>
        <span style="margin: 16px">{{ planType }}</span>
      </el-col>
      <el-col :span="8">
        <span>制定人员</span>
        <span style="margin: 16px">{{ form.createUser }}</span>
      </el-col>
      <el-col :span="8">
        <span>执行人员</span>
        <span style="margin: 16px">{{ form.planUser }}</span>
      </el-col>
    </el-row>
    <el-row class="rowclass">
      <el-col :span="8">
        <span>所属地区</span>
        <span style="margin: 16px">{{ form.areaName }}</span>
      </el-col>
      <el-col :span="8">
        <span>组别</span>
        <span
          style="margin: 16px"
        >{{ form.departName }} {{ form.groupName }}</span>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item
            label="开始日期"

            style="margin-left: 10px"
          >
            <el-date-picker
              v-model="form.startDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="结束日期"

            style="margin-left: 10px"
          >
            <el-date-picker
              v-model="form.endDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item
            label="计划标题"

            style="margin-left: 10px"
          >
            <el-input
              v-model="form.title"
              type="text"
              placeholder="请输入计划标题"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="技能类型" style="margin-left: 10px">
            <!-- <j-multi-select-tag v-model="skillTypes" dictCode="skillType" placeholder="请选择"></j-multi-select-tag> -->
            <el-select v-model="skillTypes" multiple size="large">
              <el-option
                v-for="item in skills"
                :key="item.id"
                :label="item.skillType"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item
            label="计划内容"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            style="margin-left: 10px"
          >
            <el-input
              v-model="form.planContent"
              type="textarea"
              placeholder="请输入计划内容"
              maxlength="200"
              rows="10"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import { saveSelfPlan, getSkillType } from '@/api/project'
export default {
    name: 'AddPlanModal',
    components: {

    },
    data() {
        return {
            visible: false,
            title: '新建计划',
            planType: null,
            planTime: null,
            planIndex: 0,
            dateFormat: 'YYYY年MM月DD日',
            RTCplan:
                '<h2 style="text-align: center;">请在这里输入计划内容</h2> ',

            skillTypes: [],
            // 评论相关
            discussContent: null,
            userInfo: {
                id: '12222',
                name: '张三',
                planType: '周计划',
                week: 47,
                city: '成都',
                dept: '二部',
                group: '第1小组'
            },

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }
                ]
            },

            confirmLoading: false,

            validatorRules: {},
            skills: null,
            form: {
                planType: 1,
                createType: 1,
                year: '2020',
                month: '10',
                week: '41',
                createUser: '管理员',
                createUserId: 'e9ca23d68d884d4ebb19d07889727dae',
                planUser: '刘玉田',
                planUserId: 'e3517f1ca22245e897077a25b5a8c328',
                areaId: '1',
                areaName: '西安',
                departId: '1',
                departName: '业务一部_STBU5',
                startDate: '2020-10-19',
                endDate: '2020-10-29',
                groupId: '2',
                groupName: '研发二组',
                title: '标题',
                planContent: '富文本内容',
                skillType: ['1', '2', '3'],
                status: 0,
                weekStart: '开始',
                weekEnd: '结束'
            }
        }
    },
    created() {
        this.getSkillType()
    },
    methods: {
        moment,
        add(record) {
            this.getSkillType()
            this.edit(record)
        },
        edit(record) {
            this.visible = true
        },
        close() {
            this.$emit('close')
            this.visible = false
        },
        handleOk() {
            const that = this
            const formData = Object.assign(this.form)

            formData.skillType = this.skillTypes
            // formData.planContent = this.jeditor.value
            // 时间格式化
            // formData.startDate = formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null
            // formData.endDate = formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null
            console.log(
                'formdata ====================================================',
                formData
            )
            saveSelfPlan(formData)
                .then(res => {
                    console.log('增加结果', res)
                    if (res.success) {
                        that.$message.success(res.message)
                        that.$emit('ok')
                    } else {
                        that.$message.warning(res.message)
                    }
                })
                .finally(() => {
                    that.confirmLoading = false
                    Object.assign(that.form, {})
                    that.form = {}
                    that.skillTypes = []
                    that.close()
                })
            this.close()
        },
        handleCancel() {
            this.close()
        },

        getSkillType() {
            const params = {}
            getSkillType(params)
                .then(res => {
                    console.log('技能数据', res)
                    if (res.success) {
                        this.skills = res.result
                    } else {
                        this.$error({
                            title: '查询失败',
                            content: res.message
                        })
                    }
                })
                .finally(() => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.rowclass {
    margin: 16px;
}
</style>
