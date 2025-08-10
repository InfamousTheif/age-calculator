const dayInput =  document.querySelector('#day')
const monthInput = document.querySelector('#month')
const yearInput = document.querySelector('#year')
const emptyDay = document.querySelector('.empty-day')
const emptyMonth = document.querySelector('.empty-month')
const emptyYear = document.querySelector('.empty-year')
const errorDay = document.querySelector('.error-day')
const errorMonth = document.querySelector('.error-month')
const errorYear = document.querySelector('.error-year')
const dateError = document.querySelector('.date-error')
const dayLabel = document.querySelector('.day-label')
const monthLabel = document.querySelector('.month-label')
const yearLabel = document.querySelector('.year-label')
const outputDay = document.querySelector('#o-day')
const outputMonth = document.querySelector('#o-month')
const outputYear = document.querySelector('#o-year')

const now = new Date();
let birthday;
let birthmonth;
let birthyear;
const currentYear = now.getFullYear();
const today = now.getDate()

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function daysInMonth (month, year) {
    const daysMax = new Date(year, month, 0).getDate();
    return daysMax
}


function inputHanlder(){
    for(const input of document.querySelectorAll('input')){
        input.addEventListener('keydown', function(e) {
        if (['.', 'e', 'E', '+', '-'].includes(e.key) && e.key.length === 1) { // Check length to allow control keys
            e.preventDefault();
        }
        })
    }
}

function inputValidation(birthday, birthmonth, birthyear){
    if(!birthmonth){
        errorMonth.style.display = 'none';
        emptyMonth.style.display = 'block';
        monthLabel.classList.add('error-label');
        monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
    }else if(birthmonth > 12 || birthmonth < 0 ){
        emptyMonth.style.display = 'none';
        errorMonth.style.display = 'block';
        monthLabel.classList.add('error-label');
        monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
    }else {
        emptyMonth.style.display = 'none';
        errorMonth.style.display = 'none';
        monthLabel.classList.remove('error-label');
        monthInput.style.borderColor = 'hsl(0, 0%, 86%)';
    }

    if(!birthyear){
        errorYear.style.display = 'none';
        emptyYear.style.display = 'block';
        yearLabel.classList.add('error-label');
        yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
    }else if(birthyear > currentYear || birthyear < 1920 ){
        emptyYear.style.display = 'none';
        errorYear.style.display = 'block';
        yearLabel.classList.add('error-label');
        yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
    } else {
        emptyYear.style.display = 'none';
        errorYear.style.display = 'none';
        yearLabel.classList.remove('error-label');
        yearInput.style.borderColor = 'hsl(0, 0%, 86%)';
    }

    const dayMax = daysInMonth(birthmonth, birthyear);
    if(!birthday){
        errorDay.style.display = 'none';
        emptyDay.style.display = 'block';
        dayLabel.classList.add('error-label');
        dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
    }else if(birthday > dayMax || birthday < 0 ){
        emptyDay.style.display = 'none';
        errorDay.style.display = 'block';
        dayLabel.classList.add('error-label');
        dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
    } else {
        emptyDay.style.display = 'none';
        errorDay.style.display = 'none';
        dayLabel.classList.remove('error-label');
        dayInput.style.borderColor = 'hsl(0, 0%, 86%)';
    }

    if((0 < birthmonth < 12) && (1920 < birthyear < currentYear) && (birthday > dayMax || birthday < 0)){
        errorDay.style.display = 'none';
        errorMonth.style.display = 'none';
        errorYear.style.display = 'none';
        dateError.style.display = 'block';
    }else {
        dateError.style.display = 'none';
    }
}

function displayBirthday(birthday, birthmonth, birthyear){
    if(!birthday || !birthmonth || !birthyear){
        outputDay.innerHTML = '--';
        outputMonth.innerHTML = '--';
        outputYear.innerHTML = '--';
        return;
    }

    const dayMax = daysInMonth(birthmonth, birthyear);
    if((birthmonth > 12 || birthmonth < 0)  || (birthyear > currentYear || birthyear < 1920 ) || (birthday > dayMax || birthday < 0 )){
        outputDay.innerHTML = '--';
        outputMonth.innerHTML = '--';
        outputYear.innerHTML = '--';
        return;
    }

    const birthdate = new Date(`${birthyear}/${birthmonth}/${birthday}`)
    if(birthdate > now){
        dateError.style.display = 'block';
        return;
        // if the user enters a future date, an error occurs.
    }else {
        dateError.style.display = 'none';
    }
    let yearDiff = now.getFullYear() - birthdate.getFullYear();
    let monthDiff = now.getMonth() - birthdate.getMonth();
    if(monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdate.getDate())){
        yearDiff-=1;
        // if the birthday is not yet reached, the year is decreased by 1.
        // I did this because the calculated year is the diffrence between the birthyear and the current year, disregarding the users birthday.
    }

    let calcBirthYear = (now - birthdate)/ (1000 * 60 * 60 * 24 * 365) // a calculated birthyear. Going from ms(original) to s to m to h to days to years.
    let calcBirthMonth = Math.floor((calcBirthYear - yearDiff)*12)
    // using the yearDiff to subtract the whole number from the calcBirthYear, since they're the equal. Then multplying the result by 12 to get the number of months, before rounding it down to the nearest integer.
    let calcBirthDay;
    if(((now.getDate() - birthdate.getDate()) < 0 && monthDiff <= 0) || (now.getDate() - birthdate.getDate()) < 0 ){
        calcBirthMonth-=1;
        const newDate = new Date().setMonth((now.getMonth()-1),birthday);
        // creating a new date that uses the birthday and the a month before the current month, but its year is the one we're currently in.
        calcBirthDay = Math.round((now - newDate)/(1000 * 60 * 60 * 24))
        // calculating the birthday by subtracting the current date with the new date
    }else{
        calcBirthDay = now.getDate() - birthdate.getDate();
        // subtracting the current date with the birthdate to get the days passed
    }

    if(monthDiff === 0 && calcBirthDay < 0){
        calcBirthYear-=1;
        // if the birthday is not yet reached, the year is decreased by 1.
        // I did this because the calculated year is the diffrence between the birthyear and the current year, disregarding the users birthday.
        if(calcBirthYear < 0){
            calcBirthYear+=1
        }// incase the difference between the years is zero.
        const newDate = new Date().setMonth((birthmonth - 1),birthday);
        // a new date that consists of the current year; the month before the birthmonth and the birthday
        calcBirthDay = daysInMonth(birthmonth,currentYear) - Math.round((newDate - now)/(1000 * 60 * 60 * 24));
        // subtracting the result of (newDate - now) from the maximum amount of days in the birthmonth to get the number of days that passed during the birthmonth
    }

    outputDay.innerHTML = `${calcBirthDay}`;
    outputMonth.innerHTML = `${calcBirthMonth}`;
    outputYear.innerHTML = `${Math.floor(calcBirthYear)}`;
}


function birthdateHandler(){
    for(const input of document.querySelectorAll('input')){
        input.addEventListener('keyup', e => {
            birthday = dayInput.value;
            birthmonth = monthInput.value;
            birthyear = yearInput.value;
            inputValidation(birthday,birthmonth, birthyear);
            displayBirthday(birthday, birthmonth, birthyear);
        })

        input.addEventListener('click', e => {
            birthday = dayInput.value;
            birthmonth = monthInput.value;
            birthyear = yearInput.value;
            inputValidation(birthday,birthmonth, birthyear);
            displayBirthday(birthday, birthmonth, birthyear);
        })
    }
}

inputHanlder()
birthdateHandler()

