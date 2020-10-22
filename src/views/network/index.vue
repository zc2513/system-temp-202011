<template>
  <div class="netWork-box flcc">
    <img :src="url" alt="" @click="changeimg(active)">
  </div>
</template>

<script>
export default {
    name: 'Network',
    data() {
        return {
            url: require('../../assets/imgs/jdwl.png'),
            active: 1
        }
    }, methods: {
        changeimg(active) {
            if (active === 1) {
                this.url = require('../../assets/imgs/jdwl (2).png')
                this.active = 2
            }
            if (active === 2) {
                this.url = require('../../assets/imgs/jdwl.png')
                this.active = 1
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.netWork-box{
    height: 100%;
    cursor: pointer;
    img{
        height: 100%;
    }
}
</style>
