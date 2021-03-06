const {
  addPomodoro,
  updatePomodoro
} = require('../../api/pomodoro.js')
Component({
  timer: null,
  data: {
    time: '25:00',
    status: 'initial', // initial、start、pause、end
    second: 1500,
    pageShow: false
  },
  methods: {
    onLoad() {},
    onShow() {
      this.data.pageShow = true
      this.getTabBar().init();
      this.converTime()
    },
    onHide() {
      this.data.pageShow = false
    },
    setTimer() {
      return setTimeout(() => {
        this.data.second = this.data.second - 1
        this.converTime()
        if (this.data.second <= 0) {
          updatePomodoro(this.data['pomodoro-id'], {
            description: '',
            aborted: false
          })
          clearTimeout(this.timer)
          wx.vibrateLong()
          this.setData({
            status: 'end'
          })
          this.getTabBar().showTabbar()
        } else {
          this.timer = this.setTimer()
        }
      }, 10)
    },
    startTimer() {
      if (this.data.status === 'initial' || this.data.status === 'end') {
        addPomodoro()
          .then(res => {
            let pomodoro = res.data.resource
            this.data['pomodoro-id'] = pomodoro.id
          })
      }
      this.setData({
        status: 'start'
      })
      this.getTabBar().hideTabbar()
      this.timer = this.setTimer()
    },
    pauseTimer() {
      this.setData({
        status: 'pause'
      })
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    againTimer() {
      this.data.second = 150000
      this.converTime()
      this.startTimer()
    },
    converTime() {
      let second = this.data.second / 100
      let m = Math.floor(second / 60)
      let s = Math.floor(second % 60)
      if (s < 10) {
        s = '0' + s
      }
      if (m < 10) {
        m = '0' + m
      }
      if (this.data.time !== `${m}:${s}`) {
        if (this.data.pageShow) {
          this.setData({
            time: `${m}:${s}`
          })
        } else {
          this.data.time = `${m}:${s}`
        }
      }

    },
    giveUpPomodoro() {
      this.pauseTimer()
      updatePomodoro(this.data['pomodoro-id'], {
        description: '',
        aborted: true
      }).then(res => {
        let data = {
          status: 'initial',
          second: 150000
        }
        this.setData(data)
        this.converTime()
        this.getTabBar().showTabbar()
      })
    }
  }

})