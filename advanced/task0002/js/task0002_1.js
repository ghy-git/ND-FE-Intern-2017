// (function task2_1() {
//   const input = $('#input')[0]
//   const outList = $('#list')[0]
//   const butt = $('#butt')[0]
//   $.click(butt, function () {
//     const text = trim(input.value)
//     const list = text.split(/,|，/)
//     const uniqArrayList = uniqArray(list)
//     console.log(list)
//     console.log(uniqArrayList)
//     for (let i = 0, len = uniqArrayList.length; i < len; i++) {
//       const listValue = trim(uniqArrayList[i])
//       outList.innerHTML += '<div>' + listValue + '</div>'          // 使用innerHtml避免appendChild
//     }
//   })
// })() // 匿名函数会自动执行

// 第二阶段
(function task2_1() {
  const input = $('#input')[0]
  const outList = $('#list')[0]
  const butt = $('#butt')[0]
  const error = $('#error')[0]

  $.click(butt, function () {
    // 清除前一个点击事件的checkbox内容
    outList.innerHTML = ''
    const text = trim(input.value)
    const list = text.split(/\n|\s+|,|，|、|;|；/)    // 没找到全角半角空格 就用\s代替
    const uniqArrayList = uniqArray(list)
    const len = uniqArrayList.length
    if (len > 10 || len <= 0) {
      error.style.display = 'inline-bloke'
    } else {
      for (let i = 0; i < len; i++) {
        error.style.display = 'none'
        const listValue = trim(uniqArrayList[i])
        if (i % 3 === 0){
          outList.innerHTML += '<br/>'
        }
        outList.innerHTML += '<label>' + "<input type='checkbox'>" + listValue + '</label>'
      }
    }
  })
})()  // 匿名函数会自动执行 比window.onload好用
