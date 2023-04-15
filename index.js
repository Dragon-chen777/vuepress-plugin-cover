const {resolve} = require('path')
const {compressFont} = require('./util/index.mjs')
const DEFAULT_CONFIG = require('./bin/defaultConfig')

module.exports = (config, ctx) => ({
  define() {
    const CONFIG = {...DEFAULT_CONFIG, ...config}
    for (let i = 0; i < CONFIG.main.length; i++) { // 优先级覆盖逻辑
      let item = CONFIG.main[i]
      if (!item.content || !item.content.length) {
        console.error('noxoneCover：', 'main数组中存在某数组项的content字段未定义或数组为空!')
        return
      }
      let { bgImg, bgImgMobile, bgColor, bgColorMobile } = item
      item.bgImg = bgImg || CONFIG.bgImg
      item.bgImgMobile = bgImgMobile || bgImg || CONFIG.bgImgMobile || CONFIG.bgImg
      item.bgColor = bgColor || CONFIG.bgColor
      item.bgColorMobile = bgColorMobile || bgColor || CONFIG.bgColorMobile || CONFIG.bgColor
    }
    compressFont( // 字体按需压缩
      resolve(__dirname, `assets/fonts/${CONFIG.fontFamily}`),
      resolve(__dirname, 'assets/fonts'),
      'font.min.ttf',
      CONFIG.main.map(item => item.content.join('')).join('') + CONFIG.nextTip + CONFIG.skipTip
    )
    return {
      CONFIG
    }
  },
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'Cover'
})
