'use strict'


const textsDate = document.querySelectorAll('.wrap-text__text'),
      wrapDays = document.querySelector('.wrap-days'),
      btnToday = document.querySelector('.today'),
      btnNext = document.querySelector('.next'),
      btnBack = document.querySelector('.back'),
      daysWeek = document.querySelectorAll('.day-name'),
      body = document.querySelector('body'),
      btnSelect = document.querySelector('.inputs-wrap__btn'),
      inputs = document.querySelectorAll('.inputs-wrap__inp'),
      otherMonth = document.querySelectorAll('.other-manth__name'),
      video = document.querySelectorAll('.video-wrap__video'),
      fullScreen = document.querySelector('.full-screen')
;

const date = new Date();
let yearNow = date.getFullYear();
let monthNow = date.getMonth();
let dayNow = date.getDate();

function addClass(month, num1, num2, num3,  newClass, el) {
  if(month == num1 || month == num2 || month == num3) {
    el.classList.add(newClass)
  } else {
    el.classList.remove(newClass)
  };
};

function addClassInp(month, num1, num2, num3,  newClass, arr) {

  for(let el of arr) {
      if(month == num1 || month == num2 || month == num3) {
        el.classList.add(newClass)
    } else {
      el.classList.remove(newClass)
    }
  } 
}

function palyFuncs(month = date.getMonth()) {
  addClass(month, 5, 6, 7, 'summer', fullScreen) // summer
  addClass(month, 8, 9, 10,  'autumn' , fullScreen) // autumn
  addClass(month, 11, 0, 1,  'winter', fullScreen) // winter
  addClass(month, 2, 3, 4,  'spring', fullScreen) // spring

  addClass(month, 8, 9, 10,  'btn-autumn', btnToday)  // autumn
  addClass(month, 8, 9, 10,  'btn-autumn', btnSelect) // autumn

  addClass(month, 11, 0, 1,  'btn-winter', btnToday)  // winter
  addClass(month, 11, 0, 1,  'btn-winter', btnSelect) // winter

  addClass(month, 5, 6, 7,   'btn-summer', btnToday) // summer
  addClass(month, 5, 6, 7,   'btn-summer', btnSelect) // summer

  addClass(month, 2, 3, 4,  'btn-spring', btnToday)  // spring
  addClass(month, 2, 3, 4,  'btn-spring', btnSelect) // spring

  addClassInp(month, 2, 3, 4,  'inp-spring', inputs) // spring
  addClassInp(month, 8, 9, 10,  'inp-autumn', inputs) // autumn
  addClassInp(month, 5, 6, 7,  'inp-summer', inputs) // summer
  addClassInp(month, 11, 0, 1,  'inp-winter', inputs) // winter

};

// главная ф-ция постоения календаря
function createMonth(year, month, day) {

  const newDate = new Date(year, month + 1 , 0); // Общая дата с кл-вом дней в месяце
  const countDays = newDate.getDate();  // кл-во дней в месяце
  const firstNumberOnMonth = new Date(year , month , 1); // Общая дата с  первым числом месяца
  const firstDay = firstNumberOnMonth.getDay() // первое число месяца

  const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
                    'September', 'October', 'November', 'December']
  ;

  let arrMonth = [];
  fullMonth:for(let j = 0; j < daysWeek.length; j++) {

    if(daysWeek[j].dataset.num != firstDay) arrMonth.push('')

    if(daysWeek[j].dataset.num  == firstDay) {
      
      for(let i = 1; i <= countDays; i++) {
        arrMonth.push(i)
        if(i == countDays) break fullMonth
      }
    } 
  };

  for (let i = 0; i < arrMonth.length; i++) {
    const span = document.createElement('span');
    span.classList.add('day-num');
    span.textContent = arrMonth[i]

    if (span.textContent == day) span.classList.add('day-now')

    textsDate[0].textContent = monthsName[newDate.getMonth()];
    textsDate[1].textContent = newDate.getFullYear();

    if((newDate.getMonth() - 1) < 0) {
      otherMonth[0].textContent = monthsName[11];   
    } else {
    otherMonth[0].textContent = monthsName[newDate.getMonth() - 1]
    }

    if((newDate.getMonth() + 1) > 11) {
      otherMonth[1].textContent = monthsName[0];   
    } else {
    otherMonth[1].textContent = monthsName[newDate.getMonth() + 1]
    }

    wrapDays.append(span)
  }; 
};

// проверка пустоты инпута 
function checkEmpty(arrInp) {
  for(let inp of arrInp) {
    if(inp.value == '') {
      inp.classList.add('error')
    } else {
      inp.classList.remove('error')
    }
  }
}

// проверка инпута на длину символов
function chechInputLength(inp, lenMax , lenMin) {
  if(inp.value.length > lenMax || inp.value.length < lenMin) {
    inp.classList.add('error')
    console.log(inp.value.length)
  } else {
    inp.classList.remove('error')
  }
}

// проверка кол-во дней и месяцев
function checkCount(inp, numMax, numMin) {
  if(inp.value > numMax || inp.value < numMin) {
    inp.classList.add('error')
  } else {
    inp.classList.remove('error')
  }
}

function removeError(arrInp) {
  for(let inp of arrInp) {
    inp.classList.remove('error');
    inp.value = '';
  }
}

//-------------------------------------------------------------------

createMonth(yearNow, monthNow, dayNow)
palyFuncs()

//кнопка предыдущий месяц
btnBack.addEventListener('click' , () => {
  monthNow--;
  
  if(monthNow < 0 ) {
    monthNow = 11;
    yearNow--;
  };

  wrapDays.textContent = '';
  createMonth(yearNow, monthNow);
  palyFuncs(monthNow);
  removeError(inputs);

});

//кнопка следующего месяца
btnNext.addEventListener('click' , () => {
  monthNow++;

  if(monthNow > 11) {
    monthNow = 0;
    yearNow++
  }

  wrapDays.textContent = '';
  createMonth(yearNow, monthNow);
  palyFuncs(monthNow);
  removeError(inputs);

})

// кнопка Today
btnToday.addEventListener('click' , () => {
  wrapDays.textContent = '';
  createMonth(date.getFullYear(), date.getMonth(), date.getDate())

  palyFuncs();
  removeError(inputs);
})

// кнопка выбора даты
btnSelect.addEventListener('click' , function chooseDate()  {

  checkEmpty(inputs)
  
  chechInputLength(inputs[0], 4 , 4);
  chechInputLength(inputs[1], 2 , 1);
  chechInputLength(inputs[2], 2 , 1 );
  
  checkCount(inputs[1], 12, 1);
  checkCount(inputs[2], 31, 1);
 
  if(!inputs[0].classList.contains('error') && !inputs[1].classList.contains('error') && !inputs[2].classList.contains('error')) {

    wrapDays.textContent = '';
    const selectDate = new Date(inputs[0].value, inputs[1].value , inputs[2].value)
    createMonth(selectDate.getFullYear(), selectDate.getMonth() - 1, selectDate.getDate())
    palyFuncs(inputs[1].value - 1)

    for(let inp of inputs) {
      inp.value = '';
    }
  } 
})









