<template>
  <div style="padding:40px;">
    <editor v-model="content" />

    <div class="flcc">
      <notificationPop />
    </div>
    <div class="mt30">
      <el-cascader :options="datas" :props="{multiple: true }" />
      <el-cascader :props="{lazy: true,lazyLoad}" />

      <br>
      <el-cascader :options="datas">
        <template slot-scope="{ node, data }">
          <div :class="{'last':node.isLeaf}">
            <span>{{ data.label }}</span>
            {{ node.isLeaf }}
            <div v-if="node.isLeaf" class="check">
              6666
            </div>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </div>
        </template>
      </el-cascader>
    </div>

    <div>

      <z-page :total="total" :page-size="baseData.pageSize" :current-page="baseData.pageNo" @pagesend="getPage" @pagesizes="getSize" />
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor'
import notificationPop from '@/layout/tblyout/notification-pop'

import { queryArearDeptGroupById, queryUserBaseByGroupId } from '@/api/common'
import { mapState } from 'vuex'
import serachSave from '@/mixins/search'
export default {
    components: { editor, notificationPop },
    mixins: [serachSave],
    data() {
        return {
            content: '<p>范德萨发fdsfkldjafkldsjfldjsflk</p>',
            datas: [],
            pageSize: 10

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
        this.init()
    },
    methods: {
        init() {
            const data = {
                ...this.baseData,
                ...this.querySearch
            }
            console.log(data)
            // queryArearDeptGroupById({ userId: this.userInfo.id }).then(res => {
            //     if (res.code === 200) {
            //         this.datas = res.result.map(item => {
            //             return {
            //                 value: item.areaId,
            //                 label: item.areaName,
            //                 children: item.dept.map(ele => {
            //                     return {
            //                         value: ele.deptId,
            //                         label: ele.deptName,
            //                         children: ele.groupList.map(e => {
            //                             return {
            //                                 value: e.groupId,
            //                                 label: e.groupName
            //                             }
            //                         })
            //                     }
            //                 })
            //             }
            //         })
            //     }
            // })
        },
        lazyLoad(node, resolve) { // 行业分类 加载项
            const { level } = node
            console.log(node)
            let nodes = []
            if (level === 0) {
                queryArearDeptGroupById({ userId: this.userInfo.id }).then(res => {
                    if (res.code === 200) {
                        this.datas = res.result.map(item => {
                            return {
                                value: item.areaId,
                                label: item.areaName,
                                children: item.dept.map(ele => {
                                    return {
                                        value: ele.deptId,
                                        label: ele.deptName,
                                        children: ele.groupList.map(e => {
                                            return {
                                                value: e.groupId,
                                                label: e.groupName
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        nodes = this.datas.map(e => {
                            return {
                                value: e.value,
                                label: e.label,
                                leaf: false
                            }
                        })
                        resolve(nodes)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss"  >
.check{
    background-color: #ccc;
    position: absolute;
    right: 0;
    top: 0;
}
</style>
