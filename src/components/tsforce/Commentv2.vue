<template>
  <div>
    <el-form ref="ruleForm" :model="form" label-width="10px" class="demo-ruleForm">
      <el-form-item prop="comment">

        <el-input
          v-model="form.commentContent"
          type="textarea"
          placeholder="请输入内容"
          maxlength="500"
          show-word-limit
          rows="5"
        />
      </el-form-item>
      <el-row>
        <el-col :span="24" :offset="22">
          <el-button type="primary" @click="addPlanComment">评论</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import { addPlanComment } from '@/api/project'
import { mapState } from 'vuex'

export default {
    name: 'Commentv2',
    components: {},
    props: {
        commentParam: {
            type: Object,
            required: true
        }

    },
    data() {
        return {
            form: {
                commentContent: ''
            },

            createDate: moment(new Date()).format('yyyy-MM-DD hh:mm:ss'),
            comments: [],

            model: {},
            // 校验规则
            rules: {
                comment: [{ required: true, message: '请输入评论内容', trigger: 'blur' }]
            }
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    created() {

    },
    methods: {

        addPlanComment() {
            var params = {
                commentContent: this.form.commentContent,
                commentType: this.commentParam.commentType,
                freshStudentReportId: this.commentParam.reportid,
                realname: this.commentParam.realname,
                userId: this.commentParam.userId,
                username: this.commentParam.username,
                commentPeopleType: this.commentParam.commentPeopleType
            }
            console.log(' ======params==============================================', params)
            addPlanComment(params)
                .then(res => {
                    if (res.success) {
                        this.$message.success(res.message)
                        this.$emit('ok')
                        this.form.commentContent = ''
                    } else {
                        this.$message.error(res.message)
                    }
                })
                .finally(() => {})
        }
    }
}
</script>
