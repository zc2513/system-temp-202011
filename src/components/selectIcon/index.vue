<template>
  <!-- iconfont 下拉选择框，依赖icons图标库 -->
  <el-select
    v-model="value"
    placeholder="请选择图标"
    class="icon-el-select"
    popper-class="icon-select-class"
    clearable
    :popper-append-to-body="false"
    @change="(e)=>{ this.$emit('input', e) }"
  >
    <el-option
      v-for="(item,key) in icons"
      :key="key"
      :label="item"
      :value="item"
    >
      <div class="option-item">
        <div>{{ item }}</div>
        <div>
          <svg-icon :icon-class="item" />
        </div>
      </div>
    </el-option>
  </el-select>
</template>

<script>
import { svgNames } from '@/icons/index'
export default {
    data() {
        return {
            icons: svgNames,
            value: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.icon-el-select{
    width: 100%;
    .icon-select-class{
        .el-select-dropdown__item{
            .option-item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100%;
            }
        }
    }
}
</style>
