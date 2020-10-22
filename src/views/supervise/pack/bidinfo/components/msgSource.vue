<template>
  <!-- '来源'样式公共组件 -->
  <div class="source">
    <img src="@/assets/imgs/sourceline/dashed.png" class="dashed" alt="">
    <img src="@/assets/imgs/sourceline/dotted.png" class="dotted" alt="">
    <div v-for="(item,index) in list" :key="index" class="item">
      <div class="fls names">
        <p v-for="(i,s) in item" :key="s" class="fls"><em />{{ i.Name }}</p>
      </div>
      <p v-if="index+1!=list.length" class="line" />
    </div>
  </div>
</template>
<script>
export default {
    name: 'MsgSource',
    props: {
        dataList: {
            type: Array,
            default: _ => []
        }
    },
    data() {
        return {
            list: []
        }
    },
    watch: {
        dataList: {
            handler(v) {
                this.init()
            },
            immediate: true
        }
    },
    methods: {
        init() {
            const arr = [
                [
                    {
                        Name: '西安市水利工程建设项目电子招标投标公共平台（西安市公共资源交易平台）'
                    }
                ],
                [
                    {
                        Name: '陕西省招标与采购网（陕西省招标投标公告服务平台）'
                    }
                ],
                [
                    {
                        Name: '中国招标投标公共服务平台'
                    },
                    {
                        Name: '陕西省综合监督管理平台'
                    },
                    {
                        Name: '陕西省水利厅监督管理平台'
                    }
                ],
                [
                    {
                        Name: '水利部水利工程建设项目电子招标投标行政监督平台'
                    },
                    {
                        Name: '全国公共资源交易平台'
                    }
                ],
                [
                    {
                        Name: '国务院办公厅电子政务办互联网+监管平台'
                    }
                ]
            ]
            const arrAll = []
            this.dataList.forEach((element, index, length) => {
                if (index < this.dataList.length - 3) {
                    const arr = [{ Name: element.Name }]
                    arrAll.push(arr)
                }
            })
            const list = arrAll.concat(arr).reverse()
            this.list = list
        }
    }
}
</script>
<style lang="scss" scoped>
.source{
    position: relative;
    .dashed, .dotted{
        position: absolute;
        left: 10px;
        height: 68px;
    }
    .dashed{
        top: 100px;
        height: 68px;
        width: 334px;
    }
    .dotted{
        top: 185px;
        width: 385px;
    }
}
.item{
    color: black;
    em{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border:1px solid #d2d2d2;
        display: block;
        background: none;
        margin-right: 10px;
    }
    .names{
        p{
            line-height: 16px;
            margin-right: 36px;
        }
    }
    .line{
        width: 2px;
        height: 70px;
        background: #040404;
        margin-left: 6px;
        margin-top: -1px;
    }
}
</style>
