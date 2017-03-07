function mainlock () {
  const input = $('#input')[0]
  const butt = $('#butt')[0]
  const timeOut = $('#timeOut')[0]
  const getTime = trim(input.value).match(/(^[0-9]{4})-([0-9]{2})-([0-9]{2}$)/g)
  if (getTime !== 0) {
    const getTimearr = getTime[0].split('-')
    const gTime = new Date(getTimearr[0], getTimearr[1] - 1, getTimearr[2])
    const nowTime = new Date()
    const poorTime = parseInt((gTime.getTime() - nowTime.getTime()) / 1000)
    const date = parseInt(poorTime / (60 * 60 * 24))
    const hour = parseInt(poorTime / (60 * 60) % 24)
    const minute = parseInt(poorTime / 60 % 60)
    const seconds = parseInt(poorTime % 60)
    if (poorTime <= 0) {
      timeOut.innerHTML = '时间到or已经过了'
    } else {
      timeOut.innerHTML = '距离' + gTime.getFullYear() + '年' + gTime.getMonth() + '月' + gTime.getDate() + '日' + '还有' + date + '天' + hour + '时' + minute + '分' + seconds+'秒'
    }
  }
}

(function task2_2() {
  $.click($('#butt')[0], function () {
    mainlock()
  })
})() // 匿名函数会自动执行 比window.onload好用 但不会一直刷新
setInterval(mainlock, 1000)  // setInterval这个函数需要传递参数
