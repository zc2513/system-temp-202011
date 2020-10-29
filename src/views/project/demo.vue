
<template>
  <div>
    <el-card style="margin-bottom:10px">
      <SelectStudent user-id="e3517f1ca22245e897077a25b5a8c328" @seache="seache" />
    </el-card>
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
            groupMonth: []
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
