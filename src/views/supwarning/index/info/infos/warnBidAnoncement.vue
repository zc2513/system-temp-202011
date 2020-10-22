<template>
  <!-- 预警-资格预审公告 -->
  <div class="warningDetail project_ele">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-if="pageCode==='0008'" title="资格预审公告发布规范性" name="1">
        <div>
          <div v-if="PageData.WarnData">
            <p class="f12 bg-ec bor flsb ali-center">
              <span>检查内容：资格预审公告发布规范性</span><span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" />
            </p>
            <p class="f12 redTip">
              <span>预警提示：{{ PageData.WarnData.Remark }}</span>
            </p>
          </div>
          <div v-if="PageData.Data">
            <div class="con flsb item">
              <p><span>资格预审公告URL：</span><a :href="PageData.Data.Url" target="_blank">{{ PageData.Data.Url }}</a></p>
              <p class="wid100"><span>公告内容：</span></p>
            </div>
            <div class="bidd-dec">
              <p v-html="PageData.Data.NoticeContent" />
            </div>
            <div class="ml5 item">
              <p class="mt20 mb10"><span>信息来源：</span></p>
              <el-timeline reverse>
                <el-timeline-item
                  v-for="(activity, index) in PageData.Data.DataSource"
                  :key="index"
                  :timestamp="activity.Time"
                >
                  {{ activity.Name }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item v-if="pageCode==='0001'" title="资格预审文件发售期合理性" name="1">
        <div>
          <div v-if="PageData.WarnData">
            <p class="f12 bg-ec bor flsb ali-center">
              <span>检查内容：资格预审文件发售期合理性</span><span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" />
            </p>
            <p class="f12 redTip">
              <span>预警提示：{{ PageData.WarnData.Remark }}</span>
            </p>
          </div>
          <div v-if="PageData.Data">
            <div class="con flsb item">
              <p><span>资格预审文件获取开始时间：</span>{{ PageData.Data.SDocGetStartTime }}</p>
              <p><span>资格预审文件获取截止时间：</span>{{ PageData.Data.SDocGetEndTime }}</p>
              <p><span>资格预审文件发售期：</span>{{ PageData.Data.SalePeriod }}天</p>
            </div>
            <div class="ml5 item">
              <p class="mt20 mb10"><span>信息来源：</span></p>
              <el-timeline reverse>
                <el-timeline-item
                  v-for="(activity, index) in PageData.Data.DataSource"
                  :key="index"
                  :timestamp="activity.Time"
                >
                  {{ activity.Name }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getWarnDetailForSection } from '@/api/supwarning'
export default {
    props: {
        listsData: {
            type: Object,
            default: _ => {}
        }
    },
    data() {
        return {
            warnText: '1、未在项目所在地省级发布媒介发布；2、公示有效期少于3天',
            context: '发布规范性',
            activeNames: ['1', '2'],
            // fashouqiData: {},
            // guifanData: {},
            pageCode: '',
            PageData: {}
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
            const { code, warningIds } = data
            getWarnDetailForSection({ warningIds }).then(res => {
                this.PageData = res.Data.map(e => {
                    e.Data.Data.DataSource = JSON.parse(e.Data.Data.DataSource)
                    return e.Data
                })[0]
                this.pageCode = code
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/views/supervise/pack/bidinfo/infos/info.scss';
</style>
