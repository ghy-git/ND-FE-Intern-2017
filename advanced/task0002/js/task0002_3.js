window.onload = task0002_3()

// Tool区域
function init (element, innerList) {
  for (let i = 0, len = innerList.length; i < len; i++) {
    if (i % 4 === 0) {
      innerList[i].style.left = (innerList[i].offsetLeft + 5) + 'px'
      innerList[i].style.top = innerList[i].offsetTop + 'px'
      innerList[i].style.position = 'absolute'
      innerList[i].index = i
      innerList[i].style.backgroundColor = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
    } else {
      innerList[i].style.left = (innerList[i].offsetLeft + 5) + 'px'
      innerList[i].style.top = (innerList[i - 1].offsetTop + innerList[i].offsetHeight) + 'px'
      innerList[i].style.position = 'absolute'
      innerList[i].index = i
      innerList[i].style.backgroundColor = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
    }
  }
}

function task0002_3 () {
  const shell = $('#shell')[0]
  const shell_left = $('#shell_left')[0]
  const shell_right = $('#shell_right')[0]
  const innerList = shell.getElementsByClassName('inner')
  let zIndex = 2
  init(shell, innerList)

  function delegateListern (ev) {
    const oEvent = ev || event
    const disX = oEvent.clientX - this.offsetLeft
    const disY = oEvent.clientY - this.offsetTop

    zIndex++
    this.style.zIndex = zIndex // 修改层级
    const that = this
    addEvent(document, 'mousemove', onmousemove)
    addEvent(document, 'mouseup', onmouseup)

    // 在点击拖拽时，在原位置创建一个li
    const createActive = document.createElement('div')
    createActive.style.left = (that.offsetLeft) + 'px'
    createActive.style.top = that.offsetTop + 'px'
    createActive.className = 'create-active'
    createActive.style.position = 'absolute'
    that.parentNode.appendChild(createActive)

    // 保存创建div的位置
    const originalLeft = parseInt(createActive.style.left)
    const originalTop = parseInt(createActive.style.top)
    const createActivePar = createActive.parentNode
    // 拖拽时透明度改变
    that.style.opacity = '0.5'
    // 鼠标移动
    function onmousemove (ev) {
      const oEvent = ev || event
      let dragL = oEvent.clientX - disX
      let dragT = oEvent.clientY - disY

      // 边界限制
      const winWidth = document.body.clientWidth || document.documentElement.clientWidth
      const winHeight = document.body.clientHeight || document.documentElement.clientHeight
      // console.log(winWidth + ',' + winHeight)
      if (dragL < -400) {
        dragL = -400
      } else if (dragL >= (winWidth - that.offsetWidth)) {
        dragL = winWidth - that.offsetWidth - that.offsetWidth / 2
      }
      if (dragT < -40) {
        dragT = -40
      } else if (dragT >= (winHeight - that.offsetHeight)) {
        dragT = winHeight - that.offsetHeight
      }

      that.style.left = dragL + 'px'
      that.style.top = dragT + 'px'

      for (let i = 0, len = innerList.length; i < len; i++) {
        removeClass(innerList[i], 'active')
      }

      const oNear = findNearest(that)
      // 移动时碰撞上的情况
      if (oNear) {
        addClass(oNear, 'active')
      }
    }
      /**
       * 鼠标抬起删除事件
       */
    function onmouseup () {
      removeEvent(document, 'mousemove', onmousemove)
      removeEvent(document, 'mouseup', onmouseup)
      const oNear = findNearest(that)

      // 鼠标抬起，碰撞到的情况
      if (oNear) {
          // 如果碰撞不发生在同一父级中
        if (that.parentNode !== oNear.parentNode) {
          oNear.parentNode.insertBefore(that, oNear)
          that.style.left = oNear.style.left
          that.style.top = oNear.style.top
          const oNearLi = oNear.parentNode.getElementsByClassName('inner')
          const thatLi = createActivePar.getElementsByClassName('inner')

          // 添加过去后处理位置
          for (let i = getIndex(that) + 1, len = oNearLi.length; i < len; i++) {
            oNearLi[i].style.left = that.style.left
            oNearLi[i].style.top = that.offsetHeight + oNearLi[i].offsetTop + 'px'
          }

          // 处理原位置。
          for (let j = 0, thatLen = thatLi.length; j < thatLen; j++) {
            if (j === 0) {
              thatLi[0].style.left = createActivePar.offsetLeft + 1 + 'px'
              thatLi[0].style.top = createActivePar.offsetTop + 1 + 'px'
            } else {
              thatLi[j].style.left = thatLi[j - 1].style.left
              thatLi[j].style.top = that.offsetHeight + thatLi[j - 1].offsetTop + 'px'
            }
          }
        } else {
          // 碰撞发生在同一父级的情况
          // 交换位置
          that.style.left = oNear.style.left
          that.style.top = oNear.style.top
          oNear.style.left = originalLeft + 'px'
          oNear.style.top = originalTop + 'px'
        }
      } else {
        if (that.parentNode === shell_left) {
          appChild(that, shell_right)
        } else {
          appChild(that, shell_left)
        }
      }
      createActive.parentNode.removeChild(createActive)
      that.style.opacity = '1'
    }

    function appChild(obj, parent) {
      // 碰撞对面父级元素的情况
      if (hitDetection(obj, parent)) {
        const oLi = parent.getElementsByClassName('inner')
        const len = oLi.length
        parent.appendChild(obj)
        // 新父元素内没有li的情况
        if (len) {
          obj.style.left = oLi[0].style.left
          obj.style.top = oLi[len - 1].offsetTop + oLi[0].offsetHeight + 'px'
        } else {
          obj.style.left = parent.offsetLeft + 1 + 'px'
          obj.style.top = parent.offsetTop + 1 + 'px'
        }

        // 处理原位置。
        const thatLi = createActivePar.getElementsByClassName('inner')
        for (let j = 0, thatLen = thatLi.length; j < thatLen; j++) {
          if (j === 0) {
            thatLi[0].style.left = createActivePar.offsetLeft + 1 + 'px'
            thatLi[0].style.top = createActivePar.offsetTop + 1 + 'px'
          } else {
            thatLi[j].style.left = thatLi[j - 1].style.left
            thatLi[j].style.top = that.offsetHeight + thatLi[j - 1].offsetTop + 'px'
          }
        }
      } else {
        obj.style.left = originalLeft + 'px'
        obj.style.top = originalTop + 'px'
      }
    }
  }



  // 事件代理
  delegateEventDiv (shell, 'inner', 'mousedown', delegateListern)

  function hitDetection (obj1, obj2) {
    // 对象1的相关值
    const l1 = obj1.offsetLeft
    const r1 = obj1.offsetLeft + obj1.offsetWidth
    const t1 = obj1.offsetTop
    const b1 = obj1.offsetTop + obj1.offsetHeight
    // 对象2的相关值
    const l2 = obj2.offsetLeft
    const r2 = obj2.offsetLeft + obj2.offsetWidth
    const t2 = obj2.offsetTop
    const b2 = obj2.offsetTop + obj2.offsetHeight

    if (l1 > r2 || r1 < l2 || b1 < t2 || t1 > b2) {
      return false
    } else {
      return true
    }
  }
  // 获取两点直线的距离
  function getDis (obj1, obj2) {
    const a = obj1.offsetLeft - obj2.offsetLeft
    const b = obj1.offsetTop - obj2.offsetTop
    return Math.sqrt(a * a + b * b)
  }
  // 获取距离最近的元素
  function findNearest (obj) {
    let iMin = 99999999
    let iMinIndex = -1
    for (let i = 0, len = innerList.length; i < len; i++) {
      if (obj === innerList[i]) {
        continue
      }

      if (hitDetection(obj, innerList[i])) {
        const dis = getDis(obj, innerList[i])

        if (iMin > dis) {
          iMin = dis
          iMinIndex = i
        }
        if (iMinIndex === -1) {
          return null
        } else {
          return innerList[iMinIndex]
        }
      }
    }
  }
}

