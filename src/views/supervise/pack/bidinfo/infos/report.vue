<template>
  <div class="list-box">
    <div class="content-box">
      <table border="1">
        <tr>
          <td colspan="4" class="trTit">1.招标投标情况总结</td>
        </tr>
        <tr>
          <td class="tdTit">报告名称</td>
          <td colspan="3" />
        </tr>
        <tr>
          <td class="tdTit">来源平台</td>
          <td />
          <td class="tdTit" />
          <td />
        </tr>
        <tr>
          <td class="tdTit">提交时间</td>
          <td />
          <td class="tdTit">交易平台数据验证责任人姓名</td>
          <td />
        </tr>
        <tr>
          <td class="tdTit">相关附件</td>
          <td colspan="3" />
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.content-box{
    margin-top: 10px;
    // border-top: 1px solid ;
    table tr{
        .tdTit{
            width: 25%;
            text-align: left;
            background:#ececec;
        }
        .trTit{
            text-align: left;
            background-color: rgba(188, 188, 188, 1);
            font-weight:600
        }
        td{
          padding:5px 10px;
          font-size: 12px;
        }
    }
}
table,table tr th, table tr td { border:1px solid #dedede; }
table {min-height: 28px;width:100%; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;}

</style>
