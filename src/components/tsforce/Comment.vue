<template>
  <div>
    <el-form :model="form" ref="ruleForm" label-width="10px" class="demo-ruleForm">
      <el-form-item prop="comment">
        <el-row>
          <span>评论</span>
        </el-row>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="form.commentContent"
          maxlength="500"
          show-word-limit
          rows="5"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="24" :offset="22">
          <el-button @click="addPlanComment" type="primary">评论</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left:12px;margin-top: 12px; margin-bottom: 12px">
        <el-row style="margin-top: 12px; margin-bottom: 12px">
          <span>全部评论</span>
        </el-row>
        <el-row
          v-for="(d, index) in comments"
          :key="index"
          style="margin-top: 12px; margin-bottom: 12px"
        >
          <el-row>
            <el-col :span="2">
              <i class="el-icon-s-comment" style="width: 20px; heigth: 20px"></i>
            </el-col>
            <el-col :span="22">
              <el-row>
                <span style="font-size: 16px">{{ d.realname }}</span>
                <span style="font-size: 12px">{{ d.createDate }}</span>
              </el-row>
              <el-row>
                <span>{{ d.commentContent }}</span>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-divider></el-divider>
          </el-row>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import { loadComment,addPlanComment} from '@/api/porject'
export default {
  name: 'Comment',
  props: {
    commentType: {
      type: String,
      required: true,
      default: '1'
    },
    freshStudentReportId: {
      type: String,
      required: true,
      default: '1'
    },
    realname: {
      type: String,
      required: true,
      default: 'admin'
    },
    userId: {
      type: String,
      required: true,
      default: 'e9ca23d68d884d4ebb19d07889727dae'
    },
    username: {
      type: String,
      required: true,
      default: 'admin'
    }
  },
  components: {},
  data() {
    return {
      form: {
        commentContent: ''
      },

      createDate: moment(new Date()).format('yyyy-MM-DD hh:mm:ss'),
      comments: [],
      url: {
        addComment: 'com.thundersoft.studentreport/fstFreshStudentReportComment/add',
        list: 'com.thundersoft.studentreport/fstFreshStudentReportComment/listByReportId'
      },
      model: {},
      //校验规则
      rules: {
        comment: [{ required: true, message: '请输入评论内容', trigger: 'blur' }]
      }
    }
  },
  created(){
      this.loadData()
  },
  methods: {
    loadData() {
     
      //加载数据 若传入参数1则加载第一页的内容
      var params = {} //查询条件
      params.reportId = this.freshStudentReportId
     

      this.fetching = true
      this.comments = []
      loadComment(params).then((res) => {
        if (res.success) {

          // if (res.result.records.lenght > 0) {
          // const data = res.result.records.map((element) => ({
          //   text: element.carno,
          //   value: element.carno,
          // }))
          this.comments = res.result
          // }
        }
        if (res.code === 510) {
          Message.warning(res.message)
        }
        this.fetching = false
      })
    },
    addPlanComment() {
      var params = {
        commentContent: this.form.commentContent,
        commentType: this.commentType,
        createDate: this.createDate,
        freshStudentReportId: this.freshStudentReportId,
        realname: this.realname,
        userId: this.userId,
        username: this.username
      }
      console.log(' ======params==============================================', params)
      addPlanComment(params)
        .then(res => {
          if (res.success) {
            Message.success(res.message)
            this.$emit('ok')
            this.loadData()
            this.form.commentContent='';
          } else {
            Message.error(res.message)
          }
        })
        .finally(() => {})
    }
  }
}
</script>