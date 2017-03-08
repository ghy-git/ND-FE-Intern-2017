// 判断是不是一个数组
function isArray (arr) {
  return arr instanceof Array
}

// 判断是不是函数
function isFunction (fn) {
  return fn instanceof Function
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
// cloneObject的一个工具类
function clsssType (obj) {
  if (obj === null) {
    return 'Null'
  } else if (obj === undefined) {
    return 'Undefined'
  } else {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }
}
function cloneObject (src) {
  let result
  const checked = clsssType(src)
  if (checked === 'Object') {
    result = {}
  } else if (checked === 'Array') {
    result = []
  } else {
    result = src
  }

  for (const o in src) {
    const middle = src[o]
    if (clsssType(middle) === 'Object') {
      result[o] = arguments.callee(middle)
    } else if (clsssType(middle) === 'Array') {
      result[o] = arguments.callee(middle)
    } else {
      result[o] = src[o]
    }
  }
  return result
}

function test () {
  const srcObj = {
    a: 1,
    b: {
      b1: ['hello', 'hi'],
      b2: 'JavaScript'
    }
  }
  const abObj = srcObj
  const tarObj = cloneObject(srcObj)

  srcObj.a = 2
  srcObj.b.b1[0] = 'Hello'
  console.log('---这是深度克隆测试---')
  console.log(abObj.a)
  console.log(abObj.b.b1[0])
  console.log(tarObj.a)    // 1
  console.log(tarObj.b.b1[0])   // 'hello'
}

// 数组部分
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray (arr) {
  const copayArr = []
  let copayIndex = 0
  for (let o = 0; o < arr.length; o++) {
    if (copayArr.indexOf(arr[o]) !== -1) {
      continue
    } else {
      copayArr[copayIndex] = arr[o]
      copayIndex++
    }
  }
  return copayArr
}

function uniqArrayTest () {
  const a = [1, 3, 5, 7, 5, 3]
  const b = uniqArray(a)
  console.log('--- uniqArrayTest ---')
  console.log(b) // [1, 3, 5, 7]
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
  return str.replace(/(^(\s )+)|((\s )+$)/g, '')
}

function trimTest () {
  console.log('--- trimTest ---')
  console.log(trim('  fsdfsdf   fsfds  '))
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 实现了一行输出以及两行输出
function fnList (item, index) {
  console.log(index + ':' + item)
}

function fnOneline (item) {
  let list = ''
  for (const o in item) {
    list = list + item[o] + ','
  }
  console.log(list)
}

function eachList (arr, fnList) {
  let index = 0
  for (const o in arr) {
    fnList(arr[o], index++)
  }
}

function eachOneline (arr, fnOneline) {
  let index = 0
  const arrOneline = []
  for (const o in arr) {
    arrOneline.push(index++ + ':' + arr[o])
  }
  fnOneline(arrOneline)
}

function eachListTest () {
  const arr = ['java', 'c', 'php']
  eachList(arr, fnList)
}

function eachOnelineTest () {
  const arr = ['java', 'c', 'php']
  eachOneline(arr, fnOneline)
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength (obj) {
  let total = 0
  for (const o in obj) {
    if (o !== null) {
      total++
    }
  }
  console.log('--- getObjectLengthTest ---')
  console.log(total)
}

function getObjectLengthTest () {
  const obj = {
    a: 1,
    b: 2,
    c: {
      c1: 3,
      c2: 4
    }
  }
  getObjectLength(obj)
}

// 正则表达式的用法
// 匹配邮箱地址 gao.hongyu3@foamail.com  1052879280@qq.com
function isEmail (emailStr) {
  const result = emailStr.match(/((\w*\.?\w+\d*)|(\w*\.?\w*\d+))+@((?!sss)\w)*\.(com|cn)/g)
  if (result === null) {
    console.log('没有匹配到')
  } else {
    console.log(result.toString())
  }
}

// 是否为手机号
function isMobilePhone (phone) {
  const reg = /^1\d{10}/g
  return reg.test(phone)
}

function isEmailTest () {
  const string = 'gao.hongyu3@@foxmail.com'
  isEmail(string)
}

// DOM部分
// 为element增加一个样式名为newClassName的新样式
// 这里是为element添加样式 但是会覆盖掉之前的
function gitId (id) {
  return document.getElementById(id)
}

function addClass (element, newClassName) {
  element.className += ' ' + newClassName
}

function addClassTest () {
  const ele = gitId('addClassTest')
  const clazz = 'addClassTest'
  addClass(ele, clazz)
  console.log('是否拥有' + ele.className + '属性:' + ele.hasAttribute('class'))
}

// 移除element中的样式oldClassName
function removeClass (element, oldClassName) {
  const string = element.className.split(' ')
  const index = string.indexOf(oldClassName)
  if (index > 0) {
    string.splice(index, 1)
  }
  element.className = string.join(' ')
}

function removeClassTest (id, oldClassName) {
  const ele = gitId(id)
  console.log('开始的class：' + ele.className)
  removeClass(ele, oldClassName)
  console.log('结束的class：' + ele.className)
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode (element, siblingNode) {
  return element.parentNode === siblingNode.parentNode
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition (element) {
  const r = element.getboundingClientRect()
  console.log(r.top + r.left)
  return r.top + r.left
}

// 实现一个简单的Query
// getElementById ---第一版 有逻辑错误 查属性有问题
// function idd (id, doc) {
//   return document.getElementById(id)
// }

// // getElementsByClassName
// function clazz (clazzName, doc) {
//   if (doc === null) {
//     return document.getElementsByClassName(clazzName)
//   } else {
//     return doc.getElementsByClassName(clazzName)
//   }
// }

// // getElementsByTagName
// function tagg (tag, doc) {
//   if (doc === null) {
//     return document.getElementsByTagName(tag)
//   } else {
//     return doc.getElementsByTagName(tag)
//   }
// }

// function $ (selector) {
//   const arr = selector.split(' ')
//   let doc = null
//   for (const o in arr) {
//     switch (arr[o].charAt(0)) {
//       case '#': { doc = idd(arr[o].substring(1), doc); console.log(doc + '---' + doc.id + '---' + doc.innerHTML) } break
//       case '.': { doc = clazz(arr[o].substring(1), doc).item(0); console.log(doc + '---' + doc.id + '---' + doc.innerHTML) } break
//       default : { doc = tagg(arr[o].substring(0), doc).item(0); console.log(doc + '---' + doc.id + '---' + doc.innerHTML) } break
//     }
//   }
//   return doc
// }

// getElementById ---第二版 实现所有功能
const indexaaa = 1
function action (selector, doc) {
  if (selector === undefined) {
    return doc
  }
  const elems = []
  let allChildren = []
  doc = (doc === undefined ? document : doc)
  switch (selector.charAt(0)) {
    case '#':
      elems.push(doc.getElementById(selector.substring(1)))
      break
    case '.':
     // console.log((doc[0].childNodes).length)
     // console.log(doc[0].childNodes)
      if ((doc[0].childNodes).length <= 3) {
        elems.push.apply(elems, doc[0].childNodes[1].getelemsByClassName(selector.substring(1)))
      } else {
        const classReg = new RegExp('\\b' + selector.substring(1) + '\\b')
        allChildren = doc[0].childNodes
        for (let i = 0, len = allChildren.length; i < len; i++) {
          if (classReg.test(allChildren[i].className)) {
            elems.push(allChildren[i])
            break
          }
        }
      }
      break
    case '[':
      if (selector.indexOf('=') === -1) {
        allChildren = doc[0].childNodes
        for (let i = 1, len = allChildren.length; i < len; i += 2) {
          if (allChildren[i].getAttribute(selector.slice(1, -1)) != null) {
            elems.push(allChildren[i])
            break
          }
        }
      } else {
        const index = selector.indexOf('=')
        allChildren = doc[0].childNodes
        for (let i = 1, len = allChildren.length; i < len; i += 2) {
          if (allChildren[i].getAttribute(selector.slice(1, index)) === selector.slice(index + 1, -1)) {
            elems.push(allChildren[i])
            break
          }
        }
      }
  }
  return elems
}
function $ (selector) {
  selector = selector.trim()
  const arr = selector.split(' ')
  let doc = action(arr[0], this.doc)
  for (let o = 0; o < arr[0].length - 1; o++) {
    doc = action(arr[o + indexaaa], doc)
  }
  console.log(doc[0].childNodes[1])     // 添加string后 就变成string了
  return doc
}


// 事件的学习
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent (element, event, listener) {
  if (element.addEventListener) {
    element.addEventListener(event, listener, true)
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, listener)
  } else {
    element['on' + event] = listener
  }
}

function removeEvent (element, event, listener) {
  if (element.removeEventListener) {
    element.removeEventListener(event, listener, true)
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, listener)
  } else {
    element['on' + event] = null
  }
}

// click绑定
function addClickEvent (element, listener) {
  addEvent(element, 'click', listener)
}
// Enter绑定
function addEnterEvent (element, listener) {
  addEvent(element, 'keydown', function (even) {
    const onEnter = even || window.event
    if (onEnter.keyCode === 13) {
      listener()
    }
  })
}

// 事件代理
function delegateEvent (element, tag, eventName, listener) {
  return addEvent(element, eventName, function (ev) {
    const onEvent = ev || event
    const target = onEvent.target || onEvent.srcElement
    if (target.tagName.toLowerCase() === tag) {
      listener.call(target, onEvent)
    }
  })
}
function delegateEventDiv (element, divClass, eventName, listener) {
  return addEvent(element, eventName, function (ev) {
    const onEvent = ev || event
    const target = onEvent.target || onEvent.srcElement
    if (target.className.toLowerCase() === divClass) {
      listener.call(target, onEvent)
    }
  })
}

// 变成$对象的方法
$.on = function (element, type, listener) {
  return addEvent(element, type, listener)
}
$.un = function (element, type, listener) {
  return removeEvent(element, type, listener)
}
$.click = function (element, listener) {
  return addClickEvent(element, listener)
}
$.enter = function (element, listener) {
  return addEnterEvent(element, listener)
}
$.delegate = function (ele, tag, eventName, listener) {
  return delegateEvent($(ele), tag, eventName, listener)
}

// BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
  const userAge = navigator.userAgent
  let message = userAge.match(/Chrome\/(\d+\.\d)/i)  // 为什么是实在[1]里面
  if (message) {
    console.log(message[1])
    return message[1]
  } else if (userAge.match(/Trident\/7.0/i)) {
    message = userAge.match(/rv:(\d+\.\d+)/i)
  } else {
    return -1
  }
  // console.log(userAge)
}

// 设置cookie
function setCookie (cookieName, cookieValue, expiredays) {
  const expiretime = new Date()
  expiretime.setDate(expiretime.getDate() + expiredays)
  document.cookie = cookieName + '=' + cookieValue + ';' + 'expires=' + expiretime
}
// 获取cookie值
function getCookie (cookieName) {
  const nameArr = document.cookie.split('; ')
  for (let i = 0; i < nameArr.length; i++) {
    const nameArrIn = nameArr[i].split('=')
    if (nameArrIn[0] === cookieName) {
      return nameArrIn[1]
    }
  }
  return 'not find cookieName:' + cookieName
}

//  获取当前元素在同级元素的索引
function getIndex (element) {
  const aBrother = element.parentNode.children
  for (let i = 0, len = aBrother.length; i < len; i++) {
    if (aBrother[i] === element) {
      return i
    }
  }
}


// util测试函数
function testString (element) {
  const str = '#adom .classa #aaa'
  document.get
  const spli = str.split(' ')
  document.writeln(spli)
  console.log(spli)
}
