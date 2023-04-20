const {resolve} = require('path')
const {compressFont} = require('./util/indexMJS.js')
const DEFAULT_NOXONE_COVER_CONFIG = require('./bin/defaultConfig.js')

module.exports = (config, ctx) => ({
  define() {
    const NOXONE_COVER_CONFIG = {...DEFAULT_NOXONE_COVER_CONFIG, ...config}
    for (let i = 0; i < NOXONE_COVER_CONFIG.main.length; i++) { // 优先级覆盖逻辑
      let item = NOXONE_COVER_CONFIG.main[i]
      if (!item.content || !item.content.length) {
        console.error('noxoneCover：', 'main数组中存在某数组项的content字段未定义或数组为空!')
        return
      }
      let { bgImg, bgImgMobile, bgColor, bgColorMobile } = item
      item.bgImg = bgImg || NOXONE_COVER_CONFIG.bgImg
      item.bgImgMobile = bgImgMobile || bgImg || NOXONE_COVER_CONFIG.bgImgMobile || NOXONE_COVER_CONFIG.bgImg
      item.bgColor = bgColor || NOXONE_COVER_CONFIG.bgColor
      item.bgColorMobile = bgColorMobile || bgColor || NOXONE_COVER_CONFIG.bgColorMobile || NOXONE_COVER_CONFIG.bgColor
    }
    compressFont( // 字体按需压缩
      resolve(__dirname, `assets/fonts/${NOXONE_COVER_CONFIG.fontFamily}`),
      resolve(__dirname, 'assets/fonts'),
      'font.min.ttf',
      NOXONE_COVER_CONFIG.main.map(item => item.content.join('')).join('')
      + NOXONE_COVER_CONFIG.nextTip
      + NOXONE_COVER_CONFIG.skipTip
      + 'NOxONE'
    )
    console.log(NOXONE_COVER_CONFIG)

    return {
      NOXONE_COVER_CONFIG
    }
  },
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'Cover'
})
