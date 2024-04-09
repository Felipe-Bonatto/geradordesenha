const inputPassword = document.getElementById('password')
const passwordLength = document.getElementById('password-length')
passwordLength.value = 16
var upperCaseCheck = document.getElementById('uppercase-check')
var numberCheck = document.getElementById('number-check')
var symbolCheck = document.getElementById('symbol-check')
var indicatorBar = document.getElementById('indicator-bar')

const generatePassword = function() {
    let chars = 'abcdefghjklmnpqrstuvwxyz'
    let upperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    let numberChars = '123456789'
    let symbolChars = '?!@&*()[]'

    if(upperCaseCheck.checked) {
        chars += upperCaseChars
    }
    if(numberCheck.checked) {
        chars += numberChars
    }
    if(symbolCheck.checked) {
        chars += symbolChars
    }

    let password = ''

    for (let i = 0; i < passwordLength.value; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputPassword.value = password
    calculateQuality()
    calculateFontSize()
}

const calculateQuality = function () {
    // Marh.round = arredonda valores
    // calculo = texto 0.25 + upperCaseCheck 0.15 + numberCheck 0.25 + symbolCheck 0.35 = 100%
    let percent = Math.round((passwordLength.value / 60) * 25 + 
    (upperCaseCheck.checked ? 15 : 0) +
    (numberCheck.checked ? 25 : 0) + (symbolCheck.checked ? 35 : 0))

    indicatorBar.style.width = `${percent}%`

    if (percent > 69) {
        // safe
        indicatorBar.classList.remove('critical')
        indicatorBar.classList.remove('warning')
        indicatorBar.classList.add('safe')
    }
    else if (percent > 50 && percent <= 69) {
        //warning
        indicatorBar.classList.remove('safe')
        indicatorBar.classList.remove('critical')
        indicatorBar.classList.add('warning')
    }else {
        //critical
        indicatorBar.classList.remove('safe')
        indicatorBar.classList.remove('warning')
        indicatorBar.classList.add('critical')
    }
}

const calculateFontSize = function () {
    if (passwordLength.value > 45) {
        inputPassword.classList.remove('fontSmall')
        inputPassword.classList.remove('fontMedia')
        inputPassword.classList.add('fontBig')
    }else if ( passwordLength.value > 35) {
        inputPassword.classList.remove('fontSmall')
        inputPassword.classList.remove('fontBig')
        inputPassword.classList.add('fontMedia')
    }else if (passwordLength.value > 22) {
        inputPassword.classList.remove('fontBig')
        inputPassword.classList.remove('fontMedia')
        inputPassword.classList.add('fontSmall')
    }else {
        inputPassword.classList.remove('fontBig')
        inputPassword.classList.remove('fontMedia')
        inputPassword.classList.remove('fontSmall')
    }
}

const copy = function() {
    navigator.clipboard.writeText(inputPassword.value)
}

passwordLength.addEventListener('input', function() {
    document.getElementById('password-length-text').innerText = passwordLength.value
    generatePassword()
})

upperCaseCheck.addEventListener('click', generatePassword)
numberCheck.addEventListener('click', generatePassword)
symbolCheck.addEventListener('click', generatePassword)

document.getElementById('copy-1').addEventListener('click', copy)
document.getElementById('copy-2').addEventListener('click', copy)

document.getElementById('alterar').addEventListener('click', generatePassword)

generatePassword()