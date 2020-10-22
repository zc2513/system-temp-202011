import { getDicYear, getProjProgressList } from '@/api/common'
export default {
    data() {
        return {
            total: 0,
            tableData: [],
            baseParams: {
                pageIndex: 1,
                pageSize: 10
            },
            Dic: { // ---字典表
                years: [], // 年度
                citys: require('@/assets/json/citys.json'), // 省市级联
                Progress: [] // 项目进度
            },
            searchData: {}
        }
    },
    created() {
        this.getDic()
    },
    methods: {
        getPageData(pageIndex) {
            this.baseParams.pageIndex = pageIndex
            this.init()
        },
        pagesizes(pageSize) {
            this.baseParams.pageIndex = 1
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
            getDicYear().then(res => { this.Dic.years = res.Data })
            getProjProgressList().then(res => { this.Dic.Progress = res.Data })
        }
    }
}
