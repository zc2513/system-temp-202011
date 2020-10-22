import defaultSettings from '@/settings'

const title = defaultSettings.title || '配置文件未设置标题'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return ` ${title} - ${pageTitle}`
    }
    return `${title}`
}
