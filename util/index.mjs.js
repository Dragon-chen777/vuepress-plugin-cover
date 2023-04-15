const Fontmin = require('fontmin')
const rename = require('gulp-rename')
const fontmin = new Fontmin()

function compressFont(entry, outputDir, fileName, text) {
  fontmin.src(entry)
    .use(rename(fileName))
    .dest(outputDir)
    .use(Fontmin.glyph({text}))
    .run(e => e && console.log('压缩字体文件错误：', e, `联系QQ：295286392`))
}

module.exports = {
  compressFont
}
