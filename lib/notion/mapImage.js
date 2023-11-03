import BLOG from '@/blog.config'

/**
 * Notion图片映射处理有emoji的图标
 * @param {*} img
 * @param {*} value
 * @returns
 */
const mapImgUrl = (img, block, type = 'block') => {
  let ret = null
  if (!img) {
    return ret
  }
  // 相对目录，则视为notion的自带图片
  if (img.startsWith('/')) ret = BLOG.NOTION_HOST + img

  // 书签的地址本身就是永久链接，无需处理
  if (!ret && block?.type === 'bookmark') {
    ret = img
  }

  // notion永久图床地址
  const isNotionImg = ret.indexOf('secure.notion-static.com') > 0 || ret.indexOf('prod-files-secure') > 0
  const isImgBlock = BLOG.IMG_URL_TYPE === 'Notion' || type !== 'block'
  if (isNotionImg && isImgBlock) {
    ret = BLOG.NOTION_HOST + '/image/' + encodeURIComponent(ret) + '?table=' + type + '&id=' + block.id
  }


  // 剩余的是第三方图片url或emoji
  if (!ret) {
    ret = img
  }

  return ret
}

export { mapImgUrl }
