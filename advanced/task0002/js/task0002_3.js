window.onload = task0002_3()

// Tool区域
// mouseup 控制变量
let token = 0
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

function isHit (obj1, obj2) {
  const lleft_1 = obj1.offsetLeft
  const right_1 = obj1.offsetLeft + obj1.offsetWidth
  const top_1 = obj1.offsetTop
  const bottom_1 = obj1.offsetTop + obj1.offsetHeight
  const lleft_2 = obj2.offsetLeft
  const right_2 = obj2.offsetLeft + obj2.offsetWidth
  const top_2 = obj2.offsetTop
  const bottom_2 = obj2.offsetTop + obj2.offsetHeight

  if (lleft_1 > right_2 || right_1 < lleft_2 || bottom_1 < top_2 || top_1 > bottom_2) {
    return false
  } else {
    return true
  }
}

// 搜索最近的元素
function findNear (obj) {
  let min = 99999999
  let minIndex = 100
  const innerList = $('#shell')[0].getElementsByClassName('inner')
  for (let i = 0, len = innerList.length; i < len; i++) {
    if (obj === innerList[i]) {
      continue
    } else if (isHit(obj, innerList[i])) {
      const x = obj.offsetLeft - innerList[i].offsetLeft
      const y = obj.offsetTop - innerList[i].offsetTop
      const distance = Math.sqrt(x * x + y * y)
      if (min > distance) {
        min = distance
        minIndex = i
      }
      if (minIndex === 100) {
        return null
      } else {
        return innerList[minIndex]
      }
    }
  }
}

function insertDiv (obj, parent, createDiv) {
  if (isHit(obj, parent)) {
    const innerList = parent.getElementsByClassName('inner')
    const length = innerList.length
    parent.appendChild(obj)
    // 新父元素内没有div的情况
    if (length) {
      obj.style.left = innerList[0].style.left
      obj.style.top = innerList[length - 1].offsetTop + innerList[0].offsetHeight + 'px'
    } else {
      obj.style.left = parent.offsetLeft + 1 + 'px'
      obj.style.top = parent.offsetTop + 1 + 'px'
    }

    // 处理原位置。
    const thatInnerList = createDiv.parentNode.getElementsByClassName('inner')
    for (let j = 0, thatLen = thatInnerList.length; j < thatLen; j++) {
      if (j === 0) {
        thatInnerList[0].style.left = createDiv.parentNode.offsetLeft + 1 + 'px'
        thatInnerList[0].style.top = createDiv.parentNode.offsetTop + 1 + 'px'
      } else {
        thatInnerList[j].style.left = thatInnerList[j - 1].style.left
        thatInnerList[j].style.top = obj.offsetHeight + thatInnerList[j - 1].offsetTop + 'px'
      }
    }
    token = 1
  }
}

function createDiv (tag, ele) {
  const creatediv = document.createElement(tag)
  creatediv.style.left = (ele.offsetLeft) + 'px'
  creatediv.style.top = ele.offsetTop + 'px'
  creatediv.className = 'createDiv'
  creatediv.style.position = 'absolute'
  ele.parentNode.appendChild(creatediv)
  ele.style.opacity = '0.5'
  return creatediv
}

function getMeIndex (element) {
  const list = element.parentNode.children
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i] === element) {
      return i
    }
  }
}

// 主函数
function task0002_3 () {
  const shell = $('#shell')[0]
  const shell_left = $('#shell_left')[0]
  const shell_right = $('#shell_right')[0]
  const innerList = shell.getElementsByClassName('inner')
  let zIndex = 2
  init(shell, innerList)

  function delegateListern (ev) {
    const oEvent = ev || event     // 增减浏览器兼容性！！！
    const inDivX = oEvent.clientX - this.offsetLeft
    const inDivY = oEvent.clientY - this.offsetTop
    zIndex++
    this.style.zIndex = zIndex
    const that = this
    addEvent(document, 'mousemove', onmousemove)
    addEvent(document, 'mouseup', onmouseup)
    const creatediv = createDiv('div', that)
    const createdivLeft = parseInt(creatediv.style.left)
    const createdivTop = parseInt(creatediv.style.top)
    const createdivPar = creatediv.parentNode

    // 监听函数
    function onmousemove (ev) {
      const oEvent = ev || event

      const dragL = oEvent.clientX - inDivX
      const dragT = oEvent.clientY - inDivY
      that.style.left = dragL + 'px'
      that.style.top = dragT + 'px'

      // 动画效果添加
      for (let i = 0, len = innerList.length; i < len; i++) {
        removeClass(innerList[i], 'move')
      }
      const isNear = findNear(that)
      if (isNear) {
        addClass(isNear, 'move')
      }
    }

    // 监听函数
    function onmouseup () {
      removeEvent(document, 'mousemove', onmousemove)
      removeEvent(document, 'mouseup', onmouseup)

      // 清除动画效果
      for (let i = 0, len = innerList.length; i < len; i++) {
        removeClass(innerList[i], 'move')
      }
      const isNear = findNear(that)
      // if (isNear) {
      //   addClass(isNear, 'move')

      if (isNear) {
        if (that.parentNode !== isNear.parentNode) {
          isNear.parentNode.insertBefore(that, isNear)    // 执行insertBefore这个函数之后 原来位置的删除了 所以不用再次删除that 否则会出事
          const isNearLi = isNear.parentNode.getElementsByClassName('inner')
          const thatLi = createdivPar.getElementsByClassName('inner')

          // 处理isNear这边的位置绘制
          that.style.left = isNear.style.left
          that.style.top = isNear.style.top
          for (let i = getMeIndex(that) + 1, len = isNearLi.length; i < len; i++) {
            isNearLi[i].style.left = that.style.left
            isNearLi[i].style.top = that.offsetHeight + isNearLi[i].offsetTop + 'px'
          }

          // 处理原来这边的位置绘制
          for (let j = 0, thatLen = thatLi.length; j < thatLen; j++) {
            if (j === 0) {
              thatLi[0].style.left = createdivPar.offsetLeft + 1 + 'px'
              thatLi[0].style.top = createdivPar.offsetTop + 1 + 'px'
            } else {
              thatLi[j].style.left = thatLi[j - 1].style.left
              thatLi[j].style.top = that.offsetHeight + thatLi[j - 1].offsetTop + 'px'
            }
          }
        } else {
          that.style.left = isNear.style.left
          that.style.top = isNear.style.top
          isNear.style.left = createdivLeft + 'px'
          isNear.style.top = createdivTop + 'px'
        }
        token = 1
      } else {
        if (that.parentNode === shell_left) {
          insertDiv(that, shell_right, creatediv)
        } else {
          insertDiv(that, shell_left, creatediv)
        }
      }
      if (token === 0) {
        that.style.left = parseInt(creatediv.style.left) + 'px'
        that.style.top = parseInt(creatediv.style.top) + 'px'
      }
      creatediv.parentNode.removeChild(creatediv)
      that.style.opacity = '1'
    }
  }
  // 事件代理
  delegateEventDiv (shell, 'inner', 'mousedown', delegateListern)
}
