<template>
  <div>
    <!-- <Nav title="招标投标情况书面总结报名"></Nav> -->
    <table>
      <tr>
        <td class="tdTit f12">中标结果公示发布时间</td>
        <td class="f12">2020-07-23  12：00</td>
        <td class="tdTit f12">中标通知书发出时间</td>
        <td class="f12">2020-07-23  12：00</td>
      </tr>
      <tr>
        <td class="tdTit f12">书面报告是否提交</td>
        <td class="f12">2020-07-23  12：00</td>
        <td class="tdTit f12">提交时间</td>
        <td class="f12">2020-07-23  12：00</td>
      </tr>
      <tr>
        <td class="tdTit f12">相关附件</td>
        <td colspan="3" class="f12">相关文件</td>
      </tr>
    </table>
  </div>
</template>

<script>
// import Nav from'./warnTit1'
export default {
    components: {
        // Nav
    }
}
</script>
<style lang="scss" scoped>
table tr{
        .tdTit{
            width: 25%;
            text-align: left;
            background:#ececec;
            font-weight: bold;
        }
        .trTit{
            text-align: left;
            background-color: rgba(188, 188, 188, 1);
            font-weight:600
        }
        td{
          padding:5px 10px;
        }
    }
table,table tr th, table tr td { border:1px solid #dedede; }
table {min-height: 28px;width:100%; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;}
@import '@/styles/views/listLayout.scss';
</style>
