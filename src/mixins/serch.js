export default {
    data() {
        return {
            total:200,
            baseData: {
                pageNo: 1,
                pageSize: 10
            },
            querySearch: {

            }
        }
    }，
    methods: {
        getSize(size) {
            console.log(size, 111111111)
            this.baseData.pageSize = size
            this.init()
        },
        getPage(page) {
            console.log(page, 2222222222222)
            this.baseData.pageNo = page
            this.init()
        },
        getSearch(e) {
            this.querySearch = e
            this.init()
        }
    },
}
