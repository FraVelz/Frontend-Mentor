const password = document.getElementById('password')
const copiedText = document.getElementById('copied-text')
const copyBtn = document.querySelector('#result-div svg')

const lengthInput = document.getElementById('length')
const lengthText = document.getElementById('length-text')

const uppercaseOption = document.getElementById('uppercase')
const lowercaseOption = document.getElementById('lowercase')
const numbersOption = document.getElementById('numbers')
const symbolsOption = document.getElementById('symbols')

const strengthText = document.getElementById('strength-text')
const strengthBars = document.querySelectorAll('.strength-bar')
const generateBtn = document.getElementById('generate-btn')

const STRENGTH_BAR_BASE = 'strength-bar h-full w-2.5 border-2 border-grey-200'

function resetStrengthBars() {
  strengthBars.forEach((bar) => {
    bar.className = STRENGTH_BAR_BASE
  })
}

function updateStrength() {
  resetStrengthBars()
  let poolSize = 0

  if (uppercaseOption.checked) poolSize += 26
  if (lowercaseOption.checked) poolSize += 26
  if (numbersOption.checked) poolSize += 10
  if (symbolsOption.checked) poolSize += 23

  const length = lengthInput.value

  if (poolSize == 0 || length == 0) {
    strengthText.innerText = ''
    return
  }

  const entropy = length * Math.log2(poolSize)

  if (entropy < 28) {
    strengthText.innerText = 'TOO WEAK'
    strengthBars[0].classList.add('border-none', 'bg-red-500')
  } else if (entropy < 42) {
    strengthText.innerText = 'WEAK'
    strengthBars[0].classList.add('border-none', 'bg-orange-400')
    strengthBars[1].classList.add('border-none', 'bg-orange-400')
  } else if (entropy < 64) {
    strengthText.innerText = 'MEDIUM'
    strengthBars[0].classList.add('border-none', 'bg-yellow-300')
    strengthBars[1].classList.add('border-none', 'bg-yellow-300')
    strengthBars[2].classList.add('border-none', 'bg-yellow-300')
  } else {
    strengthText.innerText = 'STRONG'
    strengthBars[0].classList.add('border-none', 'bg-green-200')
    strengthBars[1].classList.add('border-none', 'bg-green-200')
    strengthBars[2].classList.add('border-none', 'bg-green-200')
    strengthBars[3].classList.add('border-none', 'bg-green-200')
  }
}

copyBtn.addEventListener('click', () => {
  password.select()
  password.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(password.value)
  copiedText.classList.remove('opacity-0', 'invisible', 'scale-90')
  copiedText.classList.add('opacity-100', 'visible', 'scale-100')
})

lengthInput.addEventListener('input', () => {
  lengthText.innerText = lengthInput.value
  updateStrength()
})

uppercaseOption.addEventListener('change', updateStrength)
lowercaseOption.addEventListener('change', updateStrength)
numbersOption.addEventListener('change', updateStrength)
symbolsOption.addEventListener('change', updateStrength)

generateBtn.addEventListener('click', () => {
  const charPool = []

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?'

  if (uppercaseOption.checked) charPool.push(...uppercaseChars)

  if (lowercaseOption.checked) charPool.push(...lowercaseChars)

  if (numbersOption.checked) charPool.push(...numberChars)

  if (symbolsOption.checked) charPool.push(...symbolChars)

  if (charPool.length === 0) {
    alert('Please select at least one character type!')
    return
  }

  const length = lengthInput.value
  let generatedPassword = ''

  for (let i = 0; i < length; i++) {
    generatedPassword += charPool[Math.floor(Math.random() * charPool.length)]
  }

  password.value = generatedPassword
  copiedText.classList.add('opacity-0', 'invisible', 'scale-90')
  copiedText.classList.remove('opacity-100', 'visible', 'scale-100')
})
