<template>
  <div class="circle-box flcc" :style="{width:size+'px',height:size+'px',background:color,...styleObj}">
    <slot />
  </div>
</template>

<script>
export default {
    name: 'Circle',
    props: {
        styleObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        size: {
            type: [String, Number],
            default: 32
        },
        color: {
            type: String,
            default: '#999'
        }
    }
}
</script>

<style lang="scss" scoped>
.circle-box{
    border-radius: 50%;
    color: #FFF;
}
</style>
