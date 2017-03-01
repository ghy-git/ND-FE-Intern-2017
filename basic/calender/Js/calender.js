function tool_git (id) {
  return document.getElementById(id)
}

function tool_isRN (year) {
  if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
    return 1
  } else {
    return 0
  }
}

function calender_init (year, mouth, date) {
  const init = new Date(year, mouth, date)
  const init_year = init.getFullYear()
  const init_mouth = init.getMonth() + 1
  const init_week = init.getDay()
  const init_day = init.getDate()
  const calenderTitle = {
    left_year_01: '<',
    left_year_02: '<',
    title_year: init_year,
    title_mouth: init_mouth,
    right_year_01: '>',
    right_year_02: '>'
  }
  const calenderType = {
    calender: 'calender',
    title: 'title',
    main: 'main',
    main_title: 'main_title',
    main_span: 'main_span',
    main_span_title: 'main_span_title',
    title_span: 'title_span',
    main_span_hide: 'main_span_hide'
  }
  const mouthTotal = [31, 28 + tool_isRN(init_year), 31, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31]

  const calender = {
    day_list: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    day_create: init_day,
    begin_date: init_week,
    begin_mouth: init_mouth,
    mouth_total: mouthTotal,
    row_number: Math.ceil((mouthTotal[init_mouth] + init_week) / 7),
    calender_title: calenderTitle,
    calender_type: calenderType
  }
  const calender_changed = {
    yearPrevent: function () {
      delet('allShell')
      calender_init(init_year - 1, init_mouth - 1, 1)
    },
    yearNext: function () {
      delet('allShell')
      calender_init(init_year + 1, init_mouth - 1, 1)
    },
    mouthPrevent: function () {
      delet('allShell')
      if (init_mouth === 1) {
        calender_init(init_year - 1, 11, 1)
      } else {
        calender_init(init_year, init_mouth - 2, 1)
        }
    },
    mouthNext: function () {
      delet('allShell')
      if (init_mouth === 12) {
        calender_init(init_year + 1, 0, 1)
      } else {
        calender_init(init_year, init_mouth, 1)
      }
    }
  }

  calender_create(calender)
  const mouth_prevent = document.getElementsByTagName('span')[1]
  const mouth_next = document.getElementsByTagName('span')[4]
  const year_prevent = document.getElementsByTagName('span')[0]
  const year_next = document.getElementsByTagName('span')[5]
  mouth_prevent.addEventListener('click', calender_changed.mouthPrevent)
  mouth_next.addEventListener('click', calender_changed.mouthNext)
  year_prevent.addEventListener('click', calender_changed.yearPrevent)
  year_next.addEventListener('click', calender_changed.yearNext)
}

function calender_create (calender) {
  const arrayList = []
  const bodyArray = []
  let count = 0
  let last = 0

  const doc_calender = tool_git('calender')
  const div_title = document.createElement('div')
  const div_main_title = document.createElement('div')
  const div_main_body_shell = document.createElement('div')
  const div_main_body_allShell = document.createElement('div')
  let div_main_body = document.createElement('div')

  // ����̧ͷ
  for (const element in calender.calender_title) {
    arrayList[element] = document.createElement('span')
    arrayList[element].innerHTML = calender.calender_title[element]
    arrayList[element].className = calender.calender_type.title_span
    div_title.appendChild(arrayList[element])
  }

  div_title.divID = 'div_title'
  div_main_body_allShell.appendChild(div_title)
  // ��������1-7
  for (let i = 0; i < 7; i++) {
    const span = document.createElement('span')
    span.innerHTML = calender.day_list[i]
    span.className = calender.calender_type.main_span_title
    span.font = 'verdana'
    div_main_title.appendChild(span)
  }

  div_main_title.className = calender.calender_type.main_title
  div_main_body_allShell.appendChild(div_main_title)
  // ������������
  for (let j = 0; j < calender.mouth_total[calender.begin_mouth - 1]; j++) {
    const span = document.createElement('div')
    span.innerHTML = j + 1
    span.className = calender.calender_type.main_span
    bodyArray.push(span)
  }

  for (let l = 0; l < calender.begin_date - 1; l++) {
    const span = document.createElement('div')
    span.innerHTML = calender.mouth_total[calender.begin_mouth - 1] - calender.begin_date + l
    span.className = calender.calender_type.main_span_hide
    div_main_body.appendChild(span)
  }

  for (let k = 0; k < calender.row_number; k++) {
    if (k === 0) {
      for (let m = calender.begin_date; m <= 7; m++) {
        div_main_body.appendChild(bodyArray[count++])
      }
      div_main_body.className = calender.calender_type.main
      div_main_body_shell.appendChild(div_main_body)
    } else {
      div_main_body = document.createElement('div')    // removechild()����
      for (let i = 0; i < 7; i++) {
        if (bodyArray[count] !== undefined) {
          div_main_body.appendChild(bodyArray[count++])
          last = i
        } else {
          const span = document.createElement('div')
          span.innerHTML = (i - last)
          span.className = calender.calender_type.main_span_hide
          div_main_body.appendChild(span)
        }
      }
      div_main_body.className = calender.calender_type.main
      div_main_body_shell.appendChild(div_main_body)
    }
  }
  div_main_body.className = calender.calender_type.main
  div_main_body_shell.appendChild(div_main_body)
  div_main_body_allShell.appendChild(div_main_body_shell)
  div_main_body_allShell.id = 'allShell'
  doc_calender.appendChild(div_main_body_allShell)
}

function delet (_id) {
  const doc = tool_git(_id)
  const parentNode = doc.parentNode
  parentNode.removeChild(doc)
}
window.onload = calender_init(new Date().getFullYear(), new Date().getMonth(), 1)
// window.onload = calender_init(2017,1,1)
