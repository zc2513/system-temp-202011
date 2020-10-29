<template>
  <div>
    <el-row>
      <span>hello2</span>
    </el-row>

    <!-- <el-card>

      <el-row>
        <el-col :span="2">
          <img :src="src">
        </el-col>
        <el-col :span="18">
          <el-row style="margin:20px">
            <span>{{ title }}</span>
          </el-row>
          <el-row style="margin:20px">
            <el-col v-for=" item in symbols" :key="item.title" :span="4">
              <el-row>
                <el-col :span="4">  <z-circle size="20" :color="item.iconColor" />{{ item.iconText }}</el-col>
                <el-col :span="10"><span>{{ item.itile }}</span></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
     -->
  </div>
</template>

<script>
export default {
    name: 'Symbol',
    props: {
        src: {
            type: String,
            required: true,
            default: '@/assets/planicon.png'
        },
        title: {
            type: String,
            required: true,
            default: '标注说明'
        },
        symbols: {
            type: Array,
            required: true,
            default: () => [
                {
                    iconColor: '#A2F07B',
                    style: {},
                    title: '已提交',
                    iconText: ''
                },
                {
                    iconColor: '#A2F088',
                    style: {},
                    title: '未提交',
                    iconText: ''
                }
            ]
        }
    },
    data() {
        return {

        }
    },
    created() {
    }

}
</script>
