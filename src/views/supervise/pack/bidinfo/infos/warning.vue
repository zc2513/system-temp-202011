<template>
  <div class="list-box">
    <div class="content-box">
      <p class="tit f12"><i class="el-icon-info mr10 ml10" />当前存在<em>{{ warningNum }}</em>预警</p>
      <z-table :titles="titles" :btns="btn" @sendVal="getVal" />
      ...
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            warningNum: 0,
            titles: [
                { name: '序号', data: 'organizationName' },
                { name: '监督节点', data: 'markCode' },
                { name: '检查内容', data: 'cName' },
                { name: '预警说明', data: 'markCode' },
                { name: '预警级别', data: 'markCode', type: 'light' },
                { name: '预警时间', data: 'markCode' },
                { name: '处理状态', data: 'markCode' }
            ],
            btn: {
                title: '操作',
                width: 130,
                btnlist: [
                    { con: '忽略', type: 'text' },
                    { con: '下达指令', type: 'text' },
                    { con: '标记完成', type: 'text' }
                ]
            },
            dialogVisible: false
        }
    },
    methods: {
        getVal(val) {
            this.$router.push({
                path: '/supervise/info',
                query: { id: 123123 }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content-box{
    margin-top: 10px;
    // border-top: 1px solid ;
    .tit{
        color: #666666;
        width: 100%;
        line-height: 38px;
        height: 38px;
        background: inherit;
        background-color: rgba(230, 247, 255, 1);
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(186, 231, 255, 1);
        border-radius: 0px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        em{
            font-style: normal;
            color:$red;
        }
    }
}
@import '@/styles/views/listLayout.scss';
</style>
