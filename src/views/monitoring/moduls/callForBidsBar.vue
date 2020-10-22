<template>
  <bidsBar
    :loading="loading"
    :bar-data="barData"
  />
</template>

<script>
import bidsBar from '@/components/echarts/bar'
import { getScreenRegionBid } from '@/api/monitoring'
export default {
    components: { bidsBar },
    data() {
        return {
            barData: null,
            loading: false
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.loading = true
            getScreenRegionBid({ type: 0 }).then((res) => {
                const { Data } = res
                this.barData = {
                    setXAxis: {
                        data: [
                            { data: Data.map(e => e.RegionName) }
                        ]
                    },
                    setSeries: [
                        { type: 'line', data: Data.map(e => e.TotalPrice), name: '中标金额' },
                        { type: 'bar', data: Data.map(e => e.SectionCount), name: '项目数', color: '#1373fe', barWidth: 12, barGap: '50%' },
                        { type: 'bar', data: Data.map(e => e.TenProjectCount), name: '标段数', color: '#20c8db', barWidth: 12, barGap: '50%' }
                    ],
                    setLegend: {
                        itemHeight: 10,
                        data: [
                            { name: '中标金额', icon: 'pin' },
                            { name: '项目数', icon: 'rect' },
                            { name: '标段数', icon: 'rect' }
                        ]
                    }
                }
                // this.loading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
