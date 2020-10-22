
<template>
  <div class="content-box-cls">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :stripe="stripe"
      :data="lists"
      :border="border"
      :max-height="tableHeight"
      :show-header="showHeader"
      highlight-current-row
      @select="handleSelect"
      @row-click="selectTableData"
      @select-all="selectAll"
      @row-dblclick="dblclick"
    >
      <!-- 展示列 -->
      <template v-for="(item,index) in titles">
        <!-- 多选框 -->

        <el-table-column v-if="item.type==='selection'" :key="index" type="selection" width="55" :align="align" />
        <slot v-else-if="item.type==='slot'" />
        <el-table-column v-else-if="item.type==='index'" :key="index" type="index" :label="item.name" :align="align" />
        <el-table-column v-else :key="index" :align="align" :label="item.name">
          <template v-if="item.des" slot="header">
            <div>{{ item.name }}</div>
            <div style="color:#F00;">{{ item.des }}</div>
          </template>
          <template slot-scope="{row}">
            <template v-if="item.type==='switch'">
              <el-switch v-model="row[item.data]" active-color="#409EFF" inactive-color="#ccc" @click.native.stop="isUse(row)" />
            </template>
            <template v-else-if="item.type==='light'">
              <z-circle :warns="row[item.data]" />
            </template>
            <template v-else-if="item.type==='percent'">
              <span class="war">{{ row[item.data].nums }}</span> / <span class="f14">{{ row[item.data].nume }}</span>
            </template>
            <template v-else>{{ row[item.data] }}</template>
          </template>
        </el-table-column>
      </template>

      <!-- 按钮项 -->
      <el-table-column
        v-if="btns"
        fixed="right"
        :label="btns.title"
        :min-width="btns.width"
        :align="align"
      >
        <template slot-scope="{row}">
          <template v-for="(ele,y) in btns.btnlist" class="btnCzBox">
            <el-button
              :key="y"
              :style="ele.style? ele.style:''"
              :type="ele.type"
              :size="ele.size||'mini'"
              :icon="ele.icon"
              :circle="ele.circle"
              :plain="ele.plain"
              :disabled="disableType(row,ele.con)"
              :class="ele.className ? ele.className:classType(row,ele)"
              @click.stop="operate(ele.con||ele.icon,row)"
            >{{ ele.con }}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <br>
  </div>
</template>
<script>
/*  方法注释：.
    {
        handleSelect    --- 选择框方法      (返回触发事件本身 与 选中行数据)
        selectTableData --- 点击行方法      (返回触发事件本身 与 选中行数据)
        selectAll       --- 全选框方法      (返回触发事件本身 与 选中数据)
        dblclick        --- 双击方法        (返回触发事件本身 与 当前双击行数据)
        operate         --- 操作按钮方法    (返回点击的按钮本身参数 与 按钮当前行数据)
        selectData      --- 自定义参数      (存储当前点击的参数和数据)
    }
*/
/** @props  接收参数  其余属性使用element-ui原生属性
 *  @titles 标题部分，与遍历数组有展示数据关系
 *          {type 参数} 备注:switch->则显示switch开关 light->则显示红绿灯 selection->显示多选框 index->序号 slot->支持任意位置插入元素
 *          {des}   描述字段（默认标红，暂不支持设置颜色）
 *  @lists  遍历数组
 *  @btns   操作按钮 不传则不显示 传入则按照props下规则使用
 *  @loading 是否开启加载动画
 *  @border 是否使用border
 *  @align {left/center/right} 对齐方式
 */
import datas from '@/assets/json/data'
import Sortable from 'sortablejs'
export default {
    props: {
        stripe: {
            type: Boolean,
            default: true
        },
        maxHeight: {
            type: [Number, String],
            default: '_'
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        align: { // left/center/right
            type: String,
            default: 'center'
        },
        lists: {
            type: Array,
            default: () => datas.slice(0, 8)
        },
        isSort: {
            type: Boolean,
            default: false
        },
        titles: {
            type: Array,
            default: function() {
                return [
                    { type: 'index' },
                    { name: '姓名', data: 'producer' },
                    { name: '订单状态', data: 'state', type: 'switch' },
                    { name: '单位编号', data: 'cNumber' },
                    { name: '预警情况', data: 'warns', type: 'light' },
                    { name: '订单金额', data: 'total' },
                    { name: '支付方式', data: 'payMethod', type: 'slot' },
                    { type: 'selection' },
                    { name: '登记时间', data: 'ctime' }
                ]
            }
        },
        btns: {
            type: [Object, Boolean],
            default: function() {
                return {
                    // ----------------------------按钮项配置/不传则不展示
                    title: '操作',
                    width: '120', // 按钮项宽度
                    btnlist: [
                        {
                            icon: 'el-icon-zoom-in', // 使用字体图标为按钮
                            circle: true, // 控制按钮是否为圆形   false/true  默认false
                            type: 'primary', // 按钮模式
                            size: 'small', // 按钮大小medium / small / mini 默认为mini
                            style: {
                                color: '#fff', // 文字颜色
                                backgroundColor: '#e2e2e2', // 按钮背景色
                                borderColor: '#e2e2e2'
                            }
                        },
                        {
                            con: '删除',
                            type: 'success',
                            confirm: true,
                            style: {
                                color: '#fff',
                                backgroundColor: '#f00',
                                borderColor: '#f00'
                            }
                        },
                        {
                            con: '共存',
                            icon: 'el-icon-check',
                            type: 'primary',
                            size: 'small',
                            style: {
                                color: '#00c',
                                backgroundColor: '#999',
                                borderColor: '#999'
                            }
                        }
                    ]
                }
            }
        }
    },
    data() {
        return {
            selectData: null, // 点击状态数据记录
            tableHeight: '_'
        }
    },
    created() {
        this.tableHeight = this.maxHeight
    },
    mounted() {
        this.resizeHeight()
        window.onresize = () => this.resizeHeight()
        if (this.isSort) this.setSort()
    },
    methods: {
        setSort() {
            const el = document.querySelector('.el-table__body-wrapper tbody')
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost', // drop占位符的类名
                setData: function(dataTransfer) {
                    dataTransfer.setData('Text', '')
                    // 避免Firefox bug https://github.com/RubaXa/Sortable/issues/1012
                },
                onEnd: evt => {
                    const targetRow = this.lists.splice(evt.oldIndex, 1)[0]
                    this.lists.splice(evt.newIndex, 0, targetRow)
                }
            })
        },
        handleSelect(selection, row) { // 表单行数据获取
            this.radio(row, 'select框')
        },
        selectTableData(row) {
            this.radio(row, '行')
        },
        dblclick(row) {
            this.radio(row, '双击') // 走 第三次点击 所以还是选中
        },
        operate(item, row) { // 按钮
            this.$emit('sendVal', { type: item, data: row })
        },
        radio(row, type) {
            if (this.titles.some(e => e.type && e.type === 'selection')) {
                // 点击状态封装 处理当前点击事件并存储，在下次点击时清除其它 （行单选方法 存储行数据）
                if (this.selectData && this.selectData === row) {
                    this.$refs.multipleTable.toggleRowSelection(row, false)
                    this.$refs.multipleTable.setCurrentRow()
                    this.selectData = null
                } else {
                    this.selectData = row
                    this.$refs.multipleTable.clearSelection() // 清空多选框的所有选中状态
                    this.$refs.multipleTable.toggleRowSelection(row, true) // 选中当前点击项
                    this.$refs.multipleTable.setCurrentRow(row) // 选中当前行的背景状态
                }
                this.$emit('sendVal', { type: type, data: this.selectData })
            } else {
                this.$emit('sendVal', { type: type, data: row })
            }
        },
        selectAll(selection) {
            // 选中所有触发
            if (selection.length === 0) {
                // 取消全选 清空行样式
                this.$refs.multipleTable.setCurrentRow()
                this.selectData = null
            } else {
                this.selectData = [...selection]
            }
            this.$emit('sendVal', { type: '全选', data: this.selectData })
        },
        isUse(row) {
            this.$emit('sendVal', { type: 'switch', data: row })
        },
        disableType(v, c) {
            if ((v.WarnLevel === 'Normal' || v.DoneState === '已忽略' || v.DoneState === '标记完成') && (c === '忽略' || c === '标记完成')) {
                return true
            }
            // ---禁用状态验证
            return false
        },
        classType(v, ele) {
            // ---按钮样式
            return ele
        },
        resizeHeight() {
            const { className, clientHeight, children } = this.$parent.$el
            if (className.includes('list-box')) {
                this.tableHeight = (clientHeight - children[0].clientHeight - 110) + 'px'
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.content-box-cls {
    ::v-deep {
        .el-button [class*="el-icon-"] + span {
            margin: 0;
        }
        .btnCzBox {
            display: flex;
            justify-content: center;
            align-items: center;
        }

    }
    .war{
        font-size: 14px;
        color:red;
        font-weight: 700;
    }
}
</style>
<style>
.sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #F00!important;
}
.sortable-drag{
    background-color: #CCC !important;
}

</style>
