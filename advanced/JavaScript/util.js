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
  console.log(tarObj.b.b1[0])   // "hello"
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
  return str.replace(/(^\s*)|(\s*gitId)/g, '')
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
  const reg = /^1\d{10}gitId/
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

// 事件的学习
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
  element.addEventListener(event, listener)
}

// util测试函数
function testString (element) {
  const str = '#adom .classa #aaa'
  document.get
  const spli = str.split(' ')
  document.writeln(spli)
  console.log(spli)
}
