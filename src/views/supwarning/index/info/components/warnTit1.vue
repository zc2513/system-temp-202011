<template>
  <div class="fls flc">
    <p class="vl" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['title']
}
</script>

<style lang="scss" scoped>
.vl{
    width: 2px;
    height:18px;
    background:black;
    display: block;
}
.title{
    margin:auto 12px;
    font-size: 13px;
    font-weight:900;
}
</style>
