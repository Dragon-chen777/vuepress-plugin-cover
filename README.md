---
highlight: tomorrow-night
---
## 0. vuepress-plugin-cover介绍
这是我封装的第二个vuepress插件，可以为你的博客首屏定制一个开场白封面，

就像下面展示的那样

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e94a443dfa6946bf8cb5e506a9acac16~tplv-k3u1fbpfcp-watermark.image?)

或者你也可以配个好看的底图，就像这样

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac49294f0b2f4fd8b2c2043eb9f23f5a~tplv-k3u1fbpfcp-watermark.image?)

文案会有一个打字的效果，是基于一个有趣的js字体动效库[typedjs](https://github.com/mattboldt/typed.js/)实现的，具体的效果，可以进我博客看看~

喏，这里我博客的传送门👉 [点击传送](http://localhost:8080/NOxONE/)

另外，喜欢的话，可以动动您的小拇指进入我的[Github项目仓库](https://github.com/Dragon-chen777/vuepress-plugin-cover)，在右上角点个⭐，谢谢啦~

那么废话不多说，步入正题

## 1. 安装
```js
npm i @noxone/vuepress-plugin-cover
```
## 2. 配置
```js
// config.js
module.exports = {
  plugins: [
    [
      '@noxone/vuepress-plugin-cover',
      {
        bgImg: 'https://xxx', // pc端横屏背景图，默认不显示背景图片，若您想的话可以传入图片url（为了与文字百搭，默认显示纯色背景，因为找合适的配图太困难了＞﹏＜）
        bgImgMobile: 'https://xxx', // 移动端竖屏背景图
        bgColor: '#333', // pc端背景底色
        bgColorMobile: '#333', // 移动端背景底色
        main: [ // 文案数组，默认每次会随机展示一个文案
          {
            content:[
              '我想，',
              '在这个世界上,',
              '虽然没有最美好的相遇，',
              '但却应该有为了相遇或重逢，',
              '所做的最美好的努力。',
              `title:—— 勒 · 克莱齐奥 《流浪的星星》` // 'title:' 作为标题标记
            ]
            // bgImg
            // bgImgMobile
            // bgColor
            // bgColorMobile
          },
          // { ... } 下一个文案 
        ],
        pixels: 'px', // 字体像素单位 
        fontSize: 36, // 字体36px 
        fontWeight: 500, // 自己猜 
        fontColor: '#fff', // 自己猜 
        fontAlign: 'center', // 自己猜 
        textBorderColor: '#000', // 字体边框色 
        textBorderSize: '1px', // 字体边框大小 
        writingMode: 'horizontal-tb', // 书写模式，可选值：vertical-lr | vertical-rl | horizontal-tb 
        typeSpeed: 100, // 打字速度 
        isAutoClose: false, // 打字结束自动关闭，默认需要点击后关闭 
        nextTip: 'NEXT >', // 下一步提示文字（将作为v-html传入，意味着您也可以传入一个标签，例如<img style="width:200;height:200" src="https://xxx">） 
        skipTip: 'SKIP >', // 跳过提示文字（也是作为v-html传入） 
        closeAnimation: 'text-blur-out', // 关闭淡出动画类 
        isShowMeteors: true, // 打字结束显示流星 
        fontFamily: '云峰静龙行.ttf', // 字体，内置了三种：三极行楷简体-粗.ttf | 云峰寒蝉体.ttf | 云峰静龙行.ttf，你也可以添加，在项目的assets/fonts文件夹下添加ttf格式的字体文件即可
        isShowOnce: false, // 默认每次刷新当前页面始终显示cover组件，若您不想的话可以设置true
      }
    ]
  ]
}

```
##### 以下是默认配置
```js
const DEFAULT_CONFIG = {
  bgImg: '', // 定义全局默认pc端背景图，不传的话就不显示背景图，若main数组项里单个定义会被覆盖，即优先级：main[i].bgImg > bgImg
  bgImgMobile: '', // 全局默认移动端背景图，优先级：main[i].bgImgMobile > main[i].bgImg > bgImgMobile > bgImg
  bgColor: '#333', // 全局pc端背景色，优先级：main[i].bgColor > bgColor
  bgColorMobile: '', // 全局默认移动端背景色，优先级：main[i].bgColorMobile > main[i].bgColor > bgColorMobile > bgColor
  main: [ // 之所以定义main，是为了考虑随机文案的需求，数组项定义当前当前的文案和背景
    {
      bgImg: '', // pc端背景图，默认不显示背景图片，若您想的话可以传入图片url（为了与文字百搭，默认显示纯色背景，因为找合适的配图太困难了＞﹏＜）
      bgImgMobile: '', // 移动端背景图（不传的话默认与pc端保持一致，但还是推荐pc和移动端背景图区别设置，因为屏幕分辨率不同）
      bgColor: '', // pc端默认背景色,取全局
      bgColorMobile: '', // 移动端默认背景色与pc端保持一致
      // 优先级覆盖源代码如下：
      // item.bgImg = item.bgImg || CONFIG.bgImg
      // item.bgImgMobile = item.bgImgMobile || item.bgImg
      // item.bgColor = item.bgColor || CONFIG.bgColor
      // item.bgColorMobile = item.bgColorMobile || item.bgColor
      content: [ // 文案
        '我想，',
        '在这个世界上,',
        '虽然没有最美好的相遇，',
        '但却应该有为了相遇或重逢，',
        '所做的最美好的努力。',
        `title:—— 勒 · 克莱齐奥 《流浪的星星》` // 'title:' 作为标题标记
      ]
    },
    {
      bgImg: '',
      bgImgMobile: '',
      bgColor: '',
      bgColorMobile: '',
      content: [
        '一定要爱着点什么，',
        '恰似草木对光阴的钟情。',
        `title:—— 汪曾祺 《人间草木》`
      ],
    },
    {
      bgImg: '',
      bgImgMobile: '',
      bgColor: '',
      bgColorMobile: '',
      content: [
        '人生如梦，',
        '我投入了的却是真情，',
        '世界先爱了我，',
        '我不能不爱它。',
        `title:—— 汪曾祺 《人间草木》`
      ]
    },
    {
      bgImg: '',
      bgImgMobile: '',
      bgColor: '',
      bgColorMobile: '',
      content: [
        '爱自己，',
        '是终身浪漫的开始',
        `title:—— 奥斯卡 · 王尔德 《理想的丈夫》`
      ]
    },
  ],

  pixels: 'px', // 字体像素单位
  fontSize: 36, // 字体36px
  fontWeight: 500, // 自己猜
  fontColor: '#fff', // 自己猜
  fontAlign: 'center', // 自己猜
  textBorderColor: '#000', // 字体边框色
  textBorderSize: '1px', // 字体边框大小
  writingMode: 'horizontal-tb', // 书写模式，默认从上到下，可选值：vertical-lr | vertical-rl | horizontal-tb
  typeMode: 'default', // 目前默认只有default值，后续可能会拓展新功能

  typeSpeed: 100, // 打字速度
  isAutoClose: false, // 打字结束自动关闭，默认需要点击后关闭
  nextTip: 'NEXT >', // 下一步提示文字（将作为v-html传入，意味着您也可以传入一个标签，例如<img style="width:200;height:200" src="https://xxx">）
  skipTip: 'SKIP >', // 跳过提示文字（也是作为v-html传入）
  closeAnimation: 'text-blur-out', // 关闭淡出动画类
  isShowMeteors: true, // 打字结束显示流星
  fontFamily: '云峰静龙行.ttf', // 字体
  isShowOnce: false, // 默认每次刷新当前页面始终显示cover组件，若您不想的话可以设置true
}
```
## 3. 补充
我在cover组件中向全局`window`挂载了`noxone`对象，并定义了[Bus](https://github.com/Dragon-chen777/NOxONE/blob/master/vuepress-plugin-cover/util/index.js)事件订阅发布管理器
```html
// cover.vue

<script>
const {Bus} = require('../util')
export default {
  beforeMount() {
    window.noxone = window.noxone || {} // 挂载noxone在window上
    if (!window.noxone.Bus) window.noxone.Bus = new Bus() // 挂载Bus
    // ...
  }
}
</script>
```
在点击按钮关闭组件时，会发布一个组件销毁事件即`window.noxone.Bus.$emit(noxoneCoverDestroyedAuto)`

与此同时，您可以通过`window.noxone.Bus.$on(noxoneCoverDestroyedAuto, cb)`的方式订阅此事件，以作后续回调事件

我在[noxoneMusic组件](https://www.npmjs.com/package/@noxone/vuepress-plugin-music-player)中就订阅了该事件，从而就巧妙实现了用户一进入博客首页就自动播放音乐的需求，为什么说巧妙呢？ 那是因为浏览器默认禁止媒体标签自动播放，要自动播放必须要有交互事件发生

代码如下
```html
// noxoneMusicPlayer.vue

<script>
export default {
  beforeMount() {
   window.noxone.$on('noxoneCoverDestroyedAuto',() => {
     this.playMusic()
   })
  }
}
</script>
```
