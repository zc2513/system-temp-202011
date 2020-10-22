<template>
  <!-- 预警-中标结果 -->
  <div class="warning">
    <div>
      <p class="item-tit flsb flc-y">
        <span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckItemName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
        <span class="detailBtn" @click="detail()">查看详情>></span>
      </p>
      <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="" name="1" class="collapseBG">
          <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckItemName }}</span>
          <table>
            <thead>
              <tr>
                <th class="tit-bg">序号</th>
                <th class="tit-bg">中标候选人排名</th>
                <th class="tit-bg">中标候选人名称</th>
                <th class="tit-bg">是否评委推荐名单</th>
                <th class="tit-bg">是否中标人</th>
                <th class="tit-bg">主体信用</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in PageData.Data.Data" :key="index">
                <td>{{ index+1 }}</td>
                <td>{{ item.Sort }}</td>
                <td>{{ item.WinName }}</td>
                <td>{{ item.IsReCommend ?'√':'' }}</td>
                <td>{{ item.IsWinner ?'√':'' }}</td>
                <td>{{ item.Credit }}</td>
              </tr>
            </tbody>
          </table>
        </el-collapse-item>
        <el-collapse-item title="" name="2" class="collapseBG">
          <span slot="title" class="collapse-title"><span />信息来源</span>
          <msgSource :data-list="dataSource" />
        </el-collapse-item>
      </el-collapse>
      <div>
        <!-- <table v-if="PageData.Files?PageData.Files[0]:0">
          <thead>
            <tr>
              <th>文件名称</th>
              <th>上传时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ PageData.Files.name }}</td>
              <td>{{ PageData.Files.time }}</td>
              <td>查看/删除</td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getWarnDetailForSection } from '@/api/supwarning'
import msgSource from '@/views/supervise/pack/bidinfo/components/msgSource'
export default {
    components: {
        msgSource
    },
    props: {
        listsData: {
            type: Object,
            default: _ => {}
        },
        bidSectioncode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            activeNames: ['1', '2'],
            PageData: {},
            sourse: [],
            dataSource: []
        }
    },
    watch: {
        listsData: {
            handler(v) {
                this.init(v)
            },
            immediate: true
        }
    },
    methods: {
        init(data) {
            const { code, warningIds } = data // 相关参数
            console.log(code, warningIds)
            getWarnDetailForSection({ warningIds }).then(res => {
                console.log(res)
                const PageData = res.Data[0].Data
                this.PageData = PageData
                this.dataSource = JSON.parse(res.Data[0].Data.Data.BullData.DataSource)
                console.log(this.dataSource)
                // res.Data[0].Data.Data.BullData.DataSource = JSON.parse(res.Data[0].Data.Data.BullData.DataSource)
                // this.PageData = res.Data[0].Data
                // console.log(res)
                // this.pageCode = code
            })
        },
        detail() {
            this.$router.push({ path: '/supervise/bidinfo', query: { SId: this.$route.query.SId, bidSectionCodes: this.$route.query.bidSectionCodes, pageType: 'bidding' }})
        }
    }
}
</script>
<style lang="scss" scoped>
@import './info.scss'
</style>
