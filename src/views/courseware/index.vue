<template>
  <el-calendar class="calendar-box">
    <template slot="dateCell" slot-scope="{date, data}">
      <div :class="data.isSelected ? 'is-selected' : ''" class="fl-y-sb date-celc" style="height:100%;">
        <div class="top">{{ data.day.split('-')[2] }}</div>
        <div class="bottom">{{ countSave(data.day.split('-')[2]) }}</div>
        <!-- <div class="bottom">
          <z-circle size="20" color="#FF785F" />
        </div> -->
        <div class="date-mode fl-y-sb" @click.stop="e=>e">
          <div class="flc-y">
            <span @click.stop="add(data.day.split('-')[2])">新增</span>
          </div>
          <div class="flc-y">
            <span @click.stop="lock(data.day.split('-')[2])">查看</span>
          </div>
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
    name: 'Courseware',
    data() {
        return {
            value: new Date(),
            arr: [
                { day: 27, count: 5 },
                { day: 2, count: 2 },
                { day: 5, count: 0 }
            ]
        }
    },
    methods: {
        countSave(day) {
            const str = this.arr.filter(e => e.day === Number(day))[0]
            return str ? str.count : 0
        },
        add(val) {
            console.log(val)
        },
        lock(val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.calendar-box{
    ::v-deep{
        .el-calendar__header{
            display: none;
        }
        .date-celc{
            position: relative;
            .date-mode{
                display: none;
                height: 100%;
                >div{
                    height: 50%;
                    justify-content: flex-end;
                    color: #ccc;
                    span{
                        display: inline-block;
                        padding: 0 15px;
                        &:hover{
                            color: #FFF;
                        }
                    }
                }
            }
            &:hover{
                .date-mode{
                    display: block;
                    position: absolute;
                    right: 0;
                    left:0;
                    top: 0;
                    bottom: 0;
                    border-radius: 10px;
                    background-image: linear-gradient( to right,rgba(255,255,255,.2), #9198e5);

                }
            }
        }
    }
}
.over{ //已完成
    color: #A2F07B;
}
.ing{ //ing
    color:  #FF785F;
}

.is-selected {
    color: #000;
}
</style>
