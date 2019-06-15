Page({
  timer: null,
  data: {
    second: 3,
    time: '25:00',
    status: 'start' // start、pause、end
  },
  onShow: function() {
    this.converTime()
    this.startTimer()
  },
  setTimer: function() {
    return setInterval(() => {
      this.data.second = this.data.second - 1
      this.converTime()
      if (this.data.second <= 0) {
        clearInterval(this.timer)
        wx.vibrateLong()
        this.setData({
          status: 'end'
        })
      }
    }, 1000)
  },
  startTimer: function() {
    this.setData({
      status: 'start'
    })
    this.timer = this.setTimer()
  },
  pauseTimer: function() {
    this.setData({
      status: 'pause'
    })
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  againTimer:function(){
    this.data.second = 1500
    this.converTime()
    wx.vibrateLong()
    this.startTimer()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  converTime: function() {
    let second = this.data.second
    let m = Math.floor(second / 60)
    let s = Math.floor(second % 60)
    if (s < 10) {
      s = '0' + s
    }
    if (m < 10) {
      m = '0' + m
    }
    this.setData({
      time: `${m}:${s}`
    })
  },
})