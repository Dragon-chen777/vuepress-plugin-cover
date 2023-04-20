<template>
  <div v-if="isShow" id="noxone-cover" ref="noxone-cover" :class="{ 'enableClose': enableClose,'mobile': isMobile }" :style="globalSty"
       class="noxone-cover">
    <div id="text" class="text"></div>
    <div id="text-copy" class="text-copy" v-html="textArr[0]"></div>
    <div v-if="enableClose && isFontLoaded" class="nextTip pulsate-bck" v-html="nextTip"></div>
    <div v-if="!enableClose && isFontLoaded" class="skipTip pulsate-bck" @click="close('noxoneCoverDestroyed')"
         v-html="skipTip"></div>
    <template v-if="isShowMeteors && enableClose">
      <div class="meteor meteor1"></div>
      <div class="meteor meteor2"></div>
      <div class="meteor meteor3"></div>
      <div class="meteor meteor4"></div>
      <div class="meteor meteor5"></div>
    </template>
    <img v-if="bgImg" :src="bgImg" class="bg">
  </div>
</template>
<script>
import Typed from '../lib/typed.js'

const {setAnimation, Bus} = require('../util')
let _typed = null
export default {
  name: 'Cover',
  data() {
    return {
      isMobile: false,
      isFontLoaded: false,
      isShow: true,
      isFadeOut: false,
      enableClose: false,
      textBoxW: 'auto',
      textBoxH: 'auto',
      nextTip: NOXONE_COVER_CONFIG.nextTip,
      skipTip: NOXONE_COVER_CONFIG.skipTip,
      isShowMeteors: NOXONE_COVER_CONFIG.isShowMeteors,
      bgImg: '',
      fontSize: NOXONE_COVER_CONFIG.fontSize,
      randomContent: NOXONE_COVER_CONFIG.main[Math.random() * NOXONE_COVER_CONFIG.main.length | 0] // 随机内容
    }
  },
  computed: {
    textArr() {
      let ret = []
      if (NOXONE_COVER_CONFIG.typeMode === 'default') {
        let s = ''
        for (let line of this.randomContent.content) {
          if (line.startsWith('title:')) { // 以title:开头即为标题
            line = `<div class="title">${line.slice(6)}</div>`
          }
          s += `${line}<br>`
        }
        ret.push(s)
        return ret
      }
      return ret
    },
    globalSty() {
      return {
        // 可配置
        '--bg-color': this.randomContent.bgColor,
        '--bg-mobile-color': this.randomContent.bgColorMobile,
        '--text-font-color': NOXONE_COVER_CONFIG.fontColor,
        '--text-font-size': this.fontSize + NOXONE_COVER_CONFIG.pixels,
        '--text-font-weight': NOXONE_COVER_CONFIG.fontWeight,
        '--text-line-height': this.fontSize * 1.5 + NOXONE_COVER_CONFIG.pixels,
        '--text-writing-mode': NOXONE_COVER_CONFIG.writingMode,
        '--text-font-align': NOXONE_COVER_CONFIG.fontAlign,
        '--text-border-color': NOXONE_COVER_CONFIG.textBorderColor,
        '--text-border-size': NOXONE_COVER_CONFIG.textBorderSize,
        // 自适应
        '--text-box-w': this.textBoxW + NOXONE_COVER_CONFIG.pixels,
        '--text-box-h': this.textBoxH + NOXONE_COVER_CONFIG.pixels,
      }
    },
  },
  methods: {
    typeText() {
      let _this = this
      _typed = new Typed('#text', {
        strings: _this.textArr,
        typeSpeed: NOXONE_COVER_CONFIG.typeSpeed,
        showCursor: false,
        onComplete() {
          if (NOXONE_COVER_CONFIG.isAutoClose) return _this.close('noxoneCoverDestroyedAuto') // 自动关闭
          _this.enableClose = true
          _this.$refs['noxone-cover'].onclick = () => _this.close('noxoneCoverDestroyed') // 点击关闭
        },
      })
    },
    initTextBox() {
      const {offsetWidth, offsetHeight} = document.getElementById('text-copy')
      this.textBoxW = offsetWidth*1.1
      this.textBoxH = offsetHeight
    },
    close(eventName) {
      _typed.destroy()
      this.isFadeOut = true
      setAnimation(this.$refs['noxone-cover'], 'text-blur-out' || NOXONE_COVER_CONFIG.closeAnimation, () => {
        this.isShow = false
        document.body.style.overflow = 'visible'
        window.noxone.Bus.$emit(eventName)
      })
    }
  },
  beforeMount() {
    window.noxone = window.noxone || {}
    if (!window.noxone.Bus) window.noxone.Bus = new Bus()
    console.log('%c noxoneCover已成功加载~，欢迎访问作者博客：https://dragon-chen777.github.io/NOxONE/', 'color: #00a1d6')

    console.log(this.randomContent)
    if (NOXONE_COVER_CONFIG.isShowOnce && sessionStorage.getItem('isNoxoneCoverShowed')) return
    sessionStorage.setItem('isNoxoneCoverShowed', true)

    this.isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    this.bgImg = this.isMobile ? this.randomContent.bgImgMobile : this.randomContent.bgImg
    if (this.isMobile) { // 适配处理
      this.fontSize *= 0.75

    }
  },
  mounted() {
    if (NOXONE_COVER_CONFIG.isShowOnce && sessionStorage.getItem('isNoxoneCoverShowed')) return this.isShow = false
    document.body.style.overflow = 'hidden'

    document.fonts.ready.then(() => {
      this.isFontLoaded = true
      setTimeout(() => {
        // 正确获取text-copy的宽高（vue的mounted钩子有这个bug）
        this.initTextBox()
        this.typeText()
      }, 500)
    })
  },
}
</script>

<style lang="stylus" scoped>
@require '../assets/css/animista.css'
@font-face
  font-family NOXONE_FONT1
  src url('../assets/fonts/font.min.ttf')

.bg
  position absolute
  top 0
  right 0
  width 100vw
  height 100vh

#noxone-cover
  font-family NOXONE_FONT1 !important
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  height 100vh
  width 100vw
  display flex
  align-items center
  justify-content center
  background-color var(--bg-color)
  user-select none
  z-index 999999999
  cursor url('https://dragon-chen777.github.io/assets/cursors/1/default.cur') , auto
#noxone-cover.enableClose
  cursor url('https://dragon-chen777.github.io/assets/cursors/1/select.cur') , auto !important
#noxone-cover.mobile
  background-color: var(--bg-mobile-color)

.text
  z-index 1
  width var(--text-box-w)
  height var(--text-box-h)
  color var(--text-font-color)
  font-size var(--text-font-size)
  font-weight var(--text-font-weight)
  writing-mode var(--text-writing-mode)
  line-height var(--text-line-height)
  text-align var(--text-font-align)
  text-shadow calc(-1 * var(--text-border-size)) 0 var(--text-border-color),
  var(--text-border-size) 0 var(--text-border-color),
  0 var(--text-border-size) var(--text-border-color),
  0 calc(-1 * var(--text-border-size)) var(--text-border-color)

  /deep/.title
    text-align right
    font-size calc(var(--text-font-size) * 7 / 12)
    margin-top calc(var(--text-font-size) * 7 / 12)
.text-copy
  font-size var(--text-font-size)
  font-weight var(--text-font-weight)
  writing-mode var(--text-writing-mode)
  line-height var(--text-line-height)
  text-align var(--text-font-align)
  text-shadow calc(-1 * var(--text-border-size)) 0 var(--text-border-color),
  var(--text-border-size) 0 var(--text-border-color),
  0 var(--text-border-size) var(--text-border-color),
  0 calc(-1 * var(--text-border-size)) var(--text-border-color)
  position absolute
  opacity 0

  /deep/.title
    text-align right
    font-size calc(var(--text-font-size) * 7 / 12)
    margin-top calc(var(--text-font-size) * 7 / 12)
@keyframes test {
  0%, 100% {
    opacity 0
  }
}

.nextTip, .skipTip
  z-index 1
  color var(--text-font-color)
  font-size calc(1 * var(--text-font-size))
  font-weight var(--text-font-weight)
  text-shadow calc(-1 * var(--text-border-size)) 0 var(--text-border-color),
  var(--text-border-size) 0 var(--text-border-color),
  0 var(--text-border-size) var(--text-border-color),
  0 calc(-1 * var(--text-border-size)) var(--text-border-color)
  position fixed
  right 20px
  cursor url('https://dragon-chen777.github.io/assets/cursors/1/select.cur') , auto !important

.skipTip
  top 20px
  cursor pointer

.nextTip
  bottom 20px

// 流星

.meteor {
  z-index 1
  pointer-events: none;
  position: absolute;
  width: 6px;
  height: 6px;
  opacity: 0;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 5px 5px #636262;
}

.meteor:after {
  content: "";
  display: block;
  border: 0px solid #fff;
  border-width: 4px 150px 4px 150px;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.3);
  transform: rotate(-45deg) translate3d(1px, 1px, 0);
  transform-origin: 0% 0%;
}

.meteor1 {
  top: 2vh;
  left: 30vw;
  animation: meteorflashing 2s infinite linear 1s;
}

.meteor2 {
  top: 22vh;
  left: 80vw;
  background: rgb(234, 0, 255);
  animation: meteorflashing 2s infinite linear 1s;
}

.meteor3 {
  top: 30vh;
  left: 40vw;
  animation: meteorflashing 3s infinite linear 2s;
}

.meteor4 {
  top: 10vh;
  left: 50vw;
  animation: meteorflashing 3s infinite linear 1s;
}

.meteor5 {
  top: 50vh;
  right: 2vw;
  animation: meteorflashing 3s infinite linear 3s;
}

@keyframes meteorflashing {
  0% {
    opacity: 0;
    transform: scale(0) translate3d(0, 0, 0);
  }
  50% {
    opacity: 1;
    transform: scale(1) translate3d(-200px, 200px, 0);
  }
  100% {
    opacity: 0;
    transform: scale(1) translate3d(-500px, 500px, 0);
  }
}

@keyframes textCopy {
  0%, 100% {
  }
}
</style>
