<template>
  <div class="list-page flcc">
    <div class="mian" :class="{'wf':!isfull}">
      <div class="tabs-box box">
        <el-tabs v-model="activeName" class="el-tabs-cls">
          <el-tab-pane label="全部消息" name="all" />
          <el-tab-pane label="公告通知" name="tz" />
          <el-tab-pane label="系统消息" name="sys" />
        </el-tabs>
        <div class="all-read-btn flcc cursor" @click="init('read')">
          全部已读
        </div>
      </div>
      <div class="box content-list mt15">
        <ul class="c-56">
          <li v-for="(item,key) in datas" :key="key">
            <div class="title" :class="{'active':!item.status}">
              【{{ item.msgCategory_dictText }}】
              {{ item.titile }}
              <span v-if="item.msgContent" class="cursor">《{{ item.msgContent }}》</span>
            </div>
            <div class="person">发布人：{{ item.sender }}</div>
            <div class="time">{{ item.sendTime }}</div>
          </li>
          <li v-if="datas.length>=10" class="flcc c-66f cursor">
            <div @click="init('more')">查看更多 <i class="el-icon-arrow-down" /> </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import fullScreen from '@/mixins/full-screen'
import { list, readAll } from '@/api/notification'
export default {
    name: 'NotificationList',
    mixins: [fullScreen],
    data() {
        return {
            activeName: 'all',
            datas: [],
            xtdatas: [],
            tzdatas: []
        }
    },
    watch: {
        activeName(newValue) {
            console.log(newValue)
            this.init(newValue)
        }
    },
    created() {
        this.initdata()
    },
    methods: {
        initdata() {
            // 请求数据
            list().then(res => {
                this.datas = res.result.records
                res.result.records.forEach((item, index) => {
                    if (item.msgCategory_dictText === '系统消息') {
                        this.xtdatas.push(item)
                    } else {
                        this.tzdatas.push(item)
                    }
                })
            })
        },
        init(type) {
            if (type === 'all') {
                this.datas = [...this.xtdatas, ...this.tzdatas]
            }
            if (type === 'tz') {
                this.datas = this.tzdatas
            }
            if (type === 'sys') {
                this.datas = this.xtdatas
            }
            if (type === 'read') {
                readAll().then(res => {
                    console.log(res)
                })
                console.log(999)
            }
            if (type === 'more') {
                this.datas = [...this.datas,
                    { status: true, type: '系统消息', title: 'XXX发布了应届生培训规则', des: '', person: 'HRXX', time: '2020-10-20 12:20:09' },
                    { status: false, type: '公告通知', title: 'XXX发布了应届生培训规则', des: '2020年10月3日工作汇报', person: 'HRXX', time: '2020-10-20 12:20:09' }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/styles/views/tabs-box.scss';

.list-page{
    width: 100%;
    height: 100%;
     .mian{
        position: relative;
        padding: 24px 40px 0;
        width: 80%;
        height: 96%;
        &.wf{
            width: 100%;
            height: 100%;
            padding: 0;
            .content-list{
                min-height:calc(100% - 93px);
                margin: 0;
            }
        }

        .all-read-btn{
            width: 88px;
            height: 32px;
            background: #FFFFFF;
            border-radius: 4px;
            border: 1px solid #6666FF;
            color: #6666FF;
            font-size: 14px;
            margin-right: 40px;
        }
        .content-list{
            min-height: calc(100% - 150px);
            margin-bottom: 50px;
            // overflow: hidden;
            ul{
                padding: 24px 32px;
                li{
                    margin-bottom: 50px;
                    line-height: 28px;
                    .person{
                        color: #909398;
                        padding-left: 8px;
                    }
                    .time{
                        color: #D0D3D9;
                        padding-left: 8px;
                    }
                    .title{
                        position: relative;
                        color: #5F6266;
                        &::after{
                            display: none;
                            content: '';
                            position: absolute;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background-color: #FF5633;
                            left: 0;
                            top: 50%;
                            transform: translate(-50%,-50%);
                        }
                        &.active::after{
                            display: block;
                        }
                    }
                    span{
                        color: #6666FF;
                    }

                }
            }
        }
    }
}

</style>
