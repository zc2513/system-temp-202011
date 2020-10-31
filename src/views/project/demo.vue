
<template>
  <div>
    <el-card style="margin-bottom:10px">
      <SelectStudent user-id="e3517f1ca22245e897077a25b5a8c328" @seache="seache" />
      <el-select v-model="value1" multiple filterable="filterable" reserve-keyword="reserveKeyword" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-card>

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      fullscreen
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import SelectStudent from '@/components/tsforce/SelectStudent.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'MyDemo',
    components: {
        SelectStudent
    },
    data() {
        return {
            dialogVisible: false,
            // 标注
            rsc: require('@/assets/planicon.png'),
            symbols: [

                {
                    iconColor: '#A2F07B',
                    style: {},
                    title: '已提交人数',
                    iconText: ''
                },
                {
                    iconColor: '#FF785F',
                    style: {},
                    title: '全员提交',
                    iconText: ''
                }

            ],
            currentWeek: null,
            currentSeason: null,
            currentMonth: 10,
            currentDay: null,
            currentYear: 2020,
            tsUserInfo: null,
            seasonNo: null,
            weekNo: null,
            systemEnv: {
                // currentYear,
                // currentSeason,
                // currentMonth,
                // currentDay,
                // currentWeek,
                // tsUserInfo,
                // userInfo,
            },
            groupDay: [],
            groupWeek: [],
            groupMonth: [],
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
            filterable: true,
            reserveKeyword: true
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo']),
        ...mapGetters(['token'])
    },
    created() {
        console.log('查询用户', this.userInfo)
    },

    methods: {
        seache(orgs, users) {
            console.log('组件使用', orgs, users)
        }

    }
}
</script>
<style lang='scss'  scoped>
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
</style>
