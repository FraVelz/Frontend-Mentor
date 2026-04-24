const form = document.querySelector('form')
const input = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')
const main = document.querySelector('main')
const successView = document.querySelector('.success-view')
const dismissBtn = document.querySelector('.dismiss-btn')

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(value) {
  if (!value) return

  const isValid = regex.test(value.trim())
  errorMsg.textContent = isValid ? '' : 'Valid email required'
  return isValid
}

input.addEventListener('blur', () => {
  validate(input.value)
})

input.addEventListener('input', () => {
  if (errorMsg.textContent) {
    validate(input.value)
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const isValid = validate(input.value)

  if (isValid) {
    main.style.display = 'none'
    successView.classList.add('active')
    input.value = ''
  }
})

dismissBtn.addEventListener('click', () => {
  main.style.display = 'flex'
  successView.classList.remove('active')
})
