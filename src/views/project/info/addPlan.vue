<template>

  <el-dialog
    :visible.sync="showDialogVisible"
    width="60%"
    class="addPlan"
  >
    <div slot="title" class="flc-y dialog-header">
      <span class="mr15 f16">新建计划</span>
      <svg-icon icon-class="ask" class="cursor" @click="$emit('planHelp',{id:666,title:'计划说明'})" />
    </div>
    <div class="main">
      <div class="card fl">
        <div v-for="(item,index) in personInfo" :key="index" class="list">
          <div><span>计划类型</span><span>{{ item.type }}</span></div>
          <div><span>计划时间</span><span>{{ item.time }}</span></div><br>
          <div><span>应届生</span><span>{{ item.submitPerson }}</span></div>
          <div><span>地区</span><span>{{ item.area }}</span></div>
          <div><span>组别</span><span>{{ item.group }}</span></div>
        </div>
      </div>
      <div class="skill fl mb20">
        <span class="mt5">技能类型</span>
        <el-select v-model="value1" multiple filterable reserve-keyword placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="plan fl">
        <span class="mt5">计划内容</span>
        <el-input
          v-model="areaText"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="showDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            showDialogVisible: false,
            personInfo: [
                {
                    id: 1,
                    type: '日计划',
                    time: '2020-10-10',
                    submitPerson: '张益达',
                    area: '成都',
                    group: '成都 二部 第一小组'
                }
            ],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '龙须面2'
            }, {
                value: '选项3',
                label: '龙须面1'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value1: [],
            areaText: ''
        }
    },
    methods: {
        show(data) {
            this.showDialogVisible = true
        }
    }
}
</script>

<style lang="scss" scoped>
.addPlan {
    ::v-deep {
        .el-dialog__header {
            padding: 0;
            text-indent: 24px;
        }
        .el-dialog__footer {
            border-top: 1px solid #E0E4EB;
        }
        .el-select {
            width: 100%;
        }
    }
    .dialog-header  {
        height: 54px;
        color: #303133;
        border-bottom: 1px solid #E0E4EB;
    }
    .main {
        .card {
            .list {
                div {
                    width: 220px;
                    display: inline-block;
                    margin-bottom: 22px;
                    span {
                        color: #303133;
                    }
                    >span:nth-of-type(1) {
                        display: inline-block;
                        width: 80px;
                        text-align: right;
                        margin-right: 10px;
                        color: #5F6266;
                    }
                }
            }
        }
        .skill,.plan {
            span {
                display: inline-block;
                width: 90px;
                text-align: right;
                margin-right: 10px;
            }
        }
    }
}
</style>
