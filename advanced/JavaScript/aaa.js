let indexaaa = 1
function $$ (selector, doc) {
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
function Q (selector) {
  selector = selector.trim()
  const arr = selector.split(' ')
  let doc = $$(arr[0], this.doc)
  for (let o = 0; o < arr[0].length - 1; o++) {
    doc = $$(arr[o + indexaaa], doc)
  }
  console.log(doc[0].childNodes[1])     //添加string后 就变成string了
  return doc
}
