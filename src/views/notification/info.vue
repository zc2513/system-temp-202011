<template>
  <div class="notification-info flcc">
    <div class="mian f14">
      <el-button type="text" class="btn c-54 f16" @click="$router.go(-1)">返回</el-button>
      <h4 class="t-c f24">  公司制度更新通知 </h4>
      <p class="t-c c-56 mt10">发布时间：2020年10月12日 11:30</p>
      <div class="content c-56">
        <p>一、bai为加强考勤管理，维护工作秩序，提高工du作效率，特制定本制zhi度。</p>
        <p>二、公司员工必须自觉遵dao守劳动纪律，遵守公司行政管理制度，按时上下班，不迟到，不早退，工作时间不得擅自离开工作岗位，外出办理业务前，须经本部门负责人同意。</p>
        <p>三、周一至周六为工作日，周日为休息日。公司机关周日和夜间值班由办公室统一安排，因工作需要周日或夜间加班的，由各部门负责人填写加班审批表，报分管领导批准后执行。节日值班由公司统一安排。</p>
        <p>四、严格请、销假制度。员工因私事请假1天以内的(含1天)，由部门负责人批准;3天以内的(含3天)，由副总经理批准;3天以上的，报总经理批准。副总经理和部门负责人请假，一律由总经理批准。请假员工事毕向批准人销假。未经批准而擅离工作岗位的按旷工处理。</p>
        <p>五、上班时间开始后5分钟至30分钟内到班者，按迟到论处;超过30分钟以上者，按旷工半天论处。提前30分钟以内下班者，按早退论处;超过30分钟者，按旷工半天论处。</p>
        <p>六、1个月内迟到、早退累计达3次者，扣发5天的基本工资;累计达3次以上5次以下者，扣发10天的基本工资;累计达5次以上10次以下者，扣发当月15天的基本工资;累计达10次以上者，扣发当月的基本工资。</p>
        <p>七、旷工半天者，扣发当天的基本工资、效益工资和奖金;每月累计旷工1天者，扣发5天的基本工资、效益工资和奖金，并给予一次警告处分;每月累计旷工2天者，扣发10天的基本工资、效益工资和奖金，并给予记过1次处分;</p>
        <p>八、工作时间禁止打牌、下棋、串岗聊天等做与工作无关的事情。如有违反者当天按旷工1天处理;当月累计2次的，按旷工2天处理;当月累计3次的，按旷工3天处理。</p>
        <p>九、参加公司组织的会议、培训、学习、考试或其他团队活动，如有事请假的，必须提前向组织者或带队者请假。未经批准擅自不参加的，视为旷工，按照本制度第七条规定处理。</p>
      </div>
    </div>
  </div>
</template>

<script>
import fullScreen from '@/mixins/full-screen'
export default {
    name: 'NotificationInfo',
    mixins: [fullScreen],
    created() {
        this.init()
    },
    methods: {
        init() {
            // 详情数据请求
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-info{
    background: #F4F7FA;
    height: 100%;
    .mian{
        position: relative;
        background: #FFFFFF;
        padding: 24px 40px 0;
        width: 80%;
        min-height: 96%;
        h4{color:#303133;}
        .btn{
            position: absolute;
            right: 30px;
            top: 0;
        }
        .content{
            margin-top: 50px;
            p{
                line-height: 30px;
            }
        }
    }
}
</style>
