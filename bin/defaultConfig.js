module.exports = {
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
