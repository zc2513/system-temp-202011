
<script>
/**
 * @description 创建警告圆点
 * @on  {getVal} 发送给当前组件的方法
 */
export default {
    name: 'ZCircle',
    functional: true,
    props: {
        warns: {
            type: Array,
            default: _ => [
                { num: 0, type: 'a' },
                { num: 1, type: 'b' },
                { num: 3, type: 'c' },
                { num: 8, type: 'd' }
            ]
        },
        size: {
            type: [Number, String],
            default: 20
        }
    },
    render(h, context) {
        const { size, warns } = context.props
        const filterColor = function(item) {
            let name
            switch (item.type) {
                case 'b': name = 'green'; break
                case 'c': name = 'red'; break
                case 'd': name = 'yellow'; break
                default: name = 'gay'
            }
            return name
        }

        const span = function(item) {
            return h('span',
                {
                    class: ['circle-box flcc', warns.length <= 1 ? '' : 'mr10', filterColor(item)],
                    style: { width: `${size}px`, height: `${size}px` },
                    on: {
                        click: function(event) {
                            if (!context.listeners.getVal) return
                            context.listeners.getVal(item)
                        }
                    }
                },
                item.num || '')
        }

        return h('div', { class: ['circle flcc'] }, warns.map(item => span(item)))
    }
}
</script>

<style lang="scss" scoped>
.circle{
    &-box{ border-radius: 50%;  color: #FFF; font-size: 12px;}
    .gay{ background-color: #999999;color: #333; }
    .red{ background-color: #F00; }
    .green{ background-color: #42b983; }
    .yellow{ background-color:#f3b846;color: #333; }
}
</style>
