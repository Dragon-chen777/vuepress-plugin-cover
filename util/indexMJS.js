const {
  resolve
} = require('path')

const Fontmin = require('fontmin')
const rename = require('gulp-rename')
const fontmin = new Fontmin()

function compressFont(entry, outputDir, fileName, text) {
  fontmin.src(entry)
    .use(rename(fileName))
    .dest(outputDir)
    .use(Fontmin.glyph({
      text
    }))
    .run(e => e && console.log('压缩字体文件错误：', e, `联系QQ：295286392`))
}
// compressFont( // 字体按需压缩
//   resolve(`../assets/fonts/font3.ttf`),
//   resolve('../assets/fonts'),
//   'font3.min.ttf',
//   '爱自己，是终身浪漫的开始To love oneself is the beginning of a life romance_'
// )
module.exports = {
  compressFont
}