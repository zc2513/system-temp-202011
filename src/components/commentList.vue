
<template>
  <div class="comment-box">
    <div class="line" />
    <div v-if=" comments.length>0" class="plr24 mb15" style="color:#4E5C7A;"> 全部评论</div>
    <ul class="plr24">
      <li
        v-for="(item,key) of comments"
        :key="key"
        :class="{'noborder':key===comments.length-1}"
        class="flc-y"
      >
        <div class="flc-y mr15">
          <img :src="require(`@/assets/imgs/comment/${ImgType(key)}.png`)" width="56px" height="56px" alt="">
        </div>
        <div class="fl1">
          <div>
            <span style="color:#4E5C7A;">{{ item.realname }}</span>
            <span class="f12 ml10" style="color:#B2BFD8;">{{ item.createDate }}</span>
          </div>
          <div class="f14 mt10 content" style="color:#778092;">
            <span>{{ item.commentContent }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import { loadComment } from '@/api/project'

export default {
    name: 'CommentList',
    props: {
        arr: {
            type: Array,
            default: _ => new Array(5)
        },
        reportid: {
            type: String,
            // required: true, //临时注释防止出错
            default: '1'
        }

    },
    data() {
        return {
            comments: []
        }
    },
    created() {
        //  this.loadComment()
    },
    methods: {
        ImgType(type) {
            const arr = ['tutor', 'coach', 'manager', 'Mgr', 'teacher']
            return arr[type]
        },
        async init(data) {
            console.log(data, 9999)
            this.loadComment(data)
            // 发送请求拿到用户数据
        },
        async show(data) {
            await this.init(data)
            this.dialogVisible = true
        },
        loadComment(data) {
            // 加载数据 若传入参数1则加载第一页的内容
            var params = {
                reportId: data
            } // 查询条件
            console.log(' 评论 id 00000000000', params)

            this.fetching = true
            this.comments = []
            loadComment(params).then((res) => {
                if (res.success) {
                    // if (res.result.records.lenght > 0) {
                    // const data = res.result.records.map((element) => ({
                    //   text: element.carno,
                    //   value: element.carno,
                    // }))
                    console.log(' 查询得评论列表', this.comments)
                    this.comments = res.result
                    // }
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.fetching = false
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.comment-box{
    background-color: #fff;
    .line{
        height: 1px;
        background: #E0E4EB;
        margin-bottom: 48px;
    }
    li{
        height: 134px;
        border-bottom: 1px solid  #E0E4EB;
        .content{
            max-height: 40px;
            line-height: 20px;
            overflow: hidden;
            // overflow-y: auto;
        }
    }
    .noborder{ border: 0; }
}
</style>
