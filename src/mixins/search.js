import { getUserInfo } from '@/api/calendar'
import { getDicYear, getProjProgressList } from '@/api/common'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            total: 0,
            tableData: [],
            baseParams: {
                pageNo: 1,
                pageSize: 10
            },
            Dic: { // ---字典表
                years: [], // 年度
                citys: require('@/assets/json/citys.json'), // 省市级联
                Progress: [] // 项目进度
            },
            searchData: {
                periodId: null
            }

        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    watch: {
        content(newValue) {
            console.log(newValue)
        }
    },
    created() {
        this.getDic()
    },
    methods: {

        getPageData(pageIndex) {
            this.baseParams.pageNo = pageIndex
            this.init()
        },
        pagesizes(pageSize) {
            this.baseParams.pageNo = 1
            this.baseParams.pageSize = pageSize
            this.init()
        },
        getSearchData(data) {
            this.searchData = data
            this.init()
        },
        // 获取字典表
        getDic() {
            // 获取年月
            console.log('用户信息', this.userInfo)
            // getDicYear().then(res => { this.Dic.years = res.Data })
            // getProjProgressList().then(res => { this.Dic.Progress = res.Data })
        }
    }
}
