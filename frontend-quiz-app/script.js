/**
 * Lógica del quiz: carga de datos, estado y actualización de nodos (sin generar toda la UI por innerHTML).
 * La estructura vive en index.html; aquí solo textos, clases, atributos y visibilidad.
 */

const SUBJECT_ICON_BG = {
  HTML: 'bg-orange-50',
  CSS: 'bg-green-100',
  JavaScript: 'bg-blue-50',
  Accessibility: 'bg-purple-100',
}

const IMAGES = {
  sunLight: 'images/icon-sun-light.svg',
  sunDark: 'images/icon-sun-dark.svg',
  moonLight: 'images/icon-moon-light.svg',
  moonDark: 'images/icon-moon-dark.svg',
}

const LETTER =
  'option-letter flex h-10 w-10 shrink-0 items-center justify-center rounded-md ' +
  'text-lg font-medium leading-none transition-all min-[768px]:h-14 min-[768px]:w-14 min-[768px]:rounded-xl min-[768px]:text-[28px]'

let data = null

const state = {
  screen: 'start',
  quiz: null,
  score: 0,
  questionNum: 1,
  selectedOption: null,
  error: false,
  submitted: false,
}

/** @type {ReturnType<typeof getEl> | null} */
let el = null

function getEl() {
  return {
    appInner: document.getElementById('app-inner'),
    loadFailed: document.getElementById('load-failed'),
    headerSubject: document.getElementById('header-subject'),
    headerIconWrap: document.getElementById('header-subject-icon-wrap'),
    headerIcon: document.getElementById('header-subject-icon'),
    headerTitle: document.getElementById('header-subject-title'),
    headerTheme: document.getElementById('header-theme-group'),
    iconSun: document.getElementById('icon-sun'),
    iconMoon: document.getElementById('icon-moon'),
    themeToggle: document.getElementById('theme-toggle'),
    themeKnob: document.getElementById('theme-knob'),
    screenStart: document.getElementById('screen-start'),
    screenQuiz: document.getElementById('screen-quiz'),
    screenScore: document.getElementById('screen-score'),
    quizHeading: document.getElementById('quiz-heading'),
    quizQuestion: document.getElementById('quiz-question-text'),
    quizProgressBar: document.getElementById('quiz-progress-bar'),
    btnSubmit: document.getElementById('btn-quiz-submit'),
    quizError: document.getElementById('quiz-error'),
    scoreIconWrap: document.getElementById('score-subject-icon-wrap'),
    scoreIcon: document.getElementById('score-subject-icon'),
    scoreTitle: document.getElementById('score-subject-title'),
    scoreValue: document.getElementById('score-value'),
    scoreOutOf: document.getElementById('score-out-of'),
    options: () => document.querySelectorAll('#quiz-options .quiz-option'),
  }
}

function isDark() {
  return document.documentElement.classList.contains('dark')
}

function initTheme() {
  const t = localStorage.getItem('theme')
  if (t === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}

function updateThemeUI() {
  if (!el) return
  const dark = isDark()
  el.iconSun.src = dark ? IMAGES.sunLight : IMAGES.sunDark
  el.iconMoon.src = dark ? IMAGES.moonLight : IMAGES.moonDark
  el.themeKnob.className = [
    'aspect-square h-full rounded-full bg-white transition-transform duration-200',
    dark ? 'translate-x-3 min-[768px]:translate-x-5' : 'translate-x-0',
  ].join(' ')
  el.themeToggle.setAttribute('aria-pressed', String(dark))
}

function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  updateThemeUI()
}

function applySubjectToDom(wrap, icon, title, quiz) {
  const ring = SUBJECT_ICON_BG[quiz.title] || 'bg-stone-200'
  wrap.className = `${ring} flex h-10 w-10 shrink-0 items-center justify-center rounded-md min-[768px]:h-14 min-[768px]:w-14 min-[768px]:rounded-lg`
  icon.src = quiz.icon
  title.textContent = quiz.title
}

function showView(name) {
  if (!el) return
  state.screen = name
  if (name === 'start') {
    el.screenStart.classList.remove('hidden')
    el.screenQuiz.classList.add('hidden')
    el.screenScore.classList.add('hidden')
    el.headerSubject.classList.add('hidden')
    el.headerSubject.setAttribute('aria-hidden', 'true')
    el.headerTheme.classList.add('ml-auto')
  } else if (name === 'quiz') {
    el.screenStart.classList.add('hidden')
    el.screenQuiz.classList.remove('hidden')
    el.screenScore.classList.add('hidden')
    el.headerSubject.classList.remove('hidden')
    el.headerSubject.setAttribute('aria-hidden', 'false')
    el.headerTheme.classList.remove('ml-auto')
  } else {
    el.screenStart.classList.add('hidden')
    el.screenQuiz.classList.add('hidden')
    el.screenScore.classList.remove('hidden')
    el.headerSubject.classList.remove('hidden')
    el.headerSubject.setAttribute('aria-hidden', 'false')
    el.headerTheme.classList.remove('ml-auto')
  }
  if (name === 'quiz') {
    paintQuiz()
  } else if (name === 'score') {
    applySubjectToDom(el.scoreIconWrap, el.scoreIcon, el.scoreTitle, state.quiz)
    el.scoreValue.textContent = String(state.score)
    el.scoreOutOf.textContent = `out of ${state.quiz.questions.length}`
  }
  updateThemeUI()
}

function paintQuiz() {
  if (!el || !state.quiz) return
  const qList = state.quiz.questions
  const current = qList[state.questionNum - 1]
  if (!current) return
  const total = qList.length
  const progress = (state.questionNum / total) * 100

  el.quizHeading.textContent = `Question ${state.questionNum} of ${total}`
  el.quizQuestion.textContent = current.question
  el.quizProgressBar.style.width = `${progress}%`

  state.error = false
  el.quizError.classList.add('hidden')
  el.quizError.classList.remove('flex')

  el.options().forEach((btn, i) => {
    const label = btn.querySelector('.option-label')
    const opt = current.options[i]
    if (label) label.textContent = opt
  })

  const submitLabel =
    state.submitted && state.questionNum >= total ? 'See Results' : state.submitted ? 'Next Question' : 'Submit Answer'
  const dis = state.selectedOption === null && !state.submitted
  el.btnSubmit.textContent = submitLabel
  el.btnSubmit.disabled = dis
  el.btnSubmit.setAttribute('aria-label', submitLabel)

  styleOptionRows(current)
}

function styleOptionRows(current) {
  if (!el) return
  const { submitted } = state
  const sub = state.selectedOption

  const SHADOW = 'shadow-[0_16px_40px_rgba(143,160,193,0.14)] dark:shadow-[0_16px_40px_rgba(49,62,81,0.14)]'

  el.options().forEach((btn, i) => {
    const isSel = sub === i
    const isCorrect = current.options[i] === current.answer
    const letter = btn.querySelector('.option-letter')
    const cIcon = btn.querySelector('.icon-correct')
    const wIcon = btn.querySelector('.icon-wrong')

    const showCheck = submitted && isCorrect
    const showCross = submitted && isSel && !isCorrect

    if (cIcon) cIcon.classList.toggle('hidden', !showCheck)
    if (wIcon) wIcon.classList.toggle('hidden', !showCross)

    let border = 'border-[3px] border-transparent'
    if (submitted) {
      if (isSel && isCorrect) border = 'border-[3px] border-[#2FD887]'
      else if (isSel && !isCorrect) border = 'border-[3px] border-[#EE5454]'
    } else if (isSel) {
      border = 'border-[3px] border-[#A729F5]'
    }

    const group = submitted ? '' : ' group'
    const ptr = submitted ? 'cursor-default' : 'cursor-pointer'
    const hover = submitted ? '' : ' hover:border-[#A729F5]'

    btn.className = [
      `quiz-option${group}`,
      'flex w-full items-center justify-between gap-2 rounded-xl',
      border,
      'bg-white p-4 text-left',
      'min-[768px]:rounded-3xl min-[1440px]:p-6',
      SHADOW,
      ptr,
      hover,
      'dark:bg-[#3B4D66]',
    ]
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    btn.setAttribute('aria-pressed', String(isSel))
    if (submitted) {
      btn.setAttribute('disabled', '')
    } else {
      btn.removeAttribute('disabled')
    }

    if (!letter) return
    if (submitted && isSel && isCorrect) {
      letter.className = `${LETTER} bg-[#2FD887] text-white`
    } else if (submitted && isSel && !isCorrect) {
      letter.className = `${LETTER} bg-[#EE5454] text-white`
    } else if (isSel) {
      letter.className = `${LETTER} bg-[#A729F5] text-white`
    } else if (submitted) {
      letter.className = `${LETTER} bg-[#F4F6FA] text-[#626C7F]`
    } else {
      letter.className = `${LETTER} bg-[#F4F6FA] text-[#626C7F] group-hover:bg-[#A729F5] group-hover:text-white`
    }
  })
}

function onStartQuiz(index) {
  if (!data?.quizzes[index]) return
  state.quiz = data.quizzes[index]
  state.score = 0
  state.questionNum = 1
  state.selectedOption = null
  state.submitted = false
  state.error = false
  applySubjectToDom(el.headerIconWrap, el.headerIcon, el.headerTitle, state.quiz)
  showView('quiz')
}

function onSelectOption(index) {
  if (state.screen !== 'quiz' || !state.quiz) return
  if (state.submitted) return
  state.selectedOption = index
  state.error = false
  el.quizError.classList.add('hidden')
  el.quizError.classList.remove('flex')
  paintQuiz()
}

function onSubmitQuiz() {
  if (state.screen !== 'quiz' || !state.quiz) return
  const total = state.quiz.questions.length
  const current = state.quiz.questions[state.questionNum - 1]
  if (!current) return

  if (state.selectedOption === null) {
    state.error = true
    el.quizError.classList.remove('hidden')
    el.quizError.classList.add('flex')
    return
  }
  el.quizError.classList.add('hidden')
  el.quizError.classList.remove('flex')
  state.error = false

  if (state.submitted) {
    if (state.questionNum < total) {
      state.questionNum += 1
      state.selectedOption = null
      state.submitted = false
      paintQuiz()
    } else {
      showView('score')
    }
    return
  }

  const pick = current.options[state.selectedOption]
  if (pick === current.answer) {
    state.score += 1
  }
  state.submitted = true
  paintQuiz()
}

function onPlayAgain() {
  state.quiz = null
  state.score = 0
  state.questionNum = 1
  state.selectedOption = null
  state.submitted = false
  state.error = false
  showView('start')
}

function onAppClick(e) {
  const t = e.target
  if (!(t instanceof Element)) return

  const startBtn = t.closest('.start-pick')
  if (startBtn && startBtn.getAttribute('data-quiz-index') != null) {
    onStartQuiz(parseInt(startBtn.getAttribute('data-quiz-index'), 10))
    return
  }

  const optBtn = t.closest('.quiz-option')
  if (optBtn && state.screen === 'quiz' && !optBtn.hasAttribute('disabled')) {
    const idx = parseInt(optBtn.getAttribute('data-option-index'), 10)
    if (!Number.isNaN(idx)) onSelectOption(idx)
    return
  }

  if (t.id === 'btn-quiz-submit' || t.closest('#btn-quiz-submit')) {
    e.preventDefault()
    onSubmitQuiz()
  } else if (t.id === 'btn-play-again' || t.closest('#btn-play-again')) {
    onPlayAgain()
  }
}

function bind() {
  if (!el) return
  const app = document.getElementById('app')
  if (app) {
    app.addEventListener('click', onAppClick)
  }
  const toggle = el.themeToggle
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      setTheme(!isDark())
    })
  }
}

async function init() {
  el = getEl()
  if (!el.appInner) return

  initTheme()
  updateThemeUI()
  bind()

  try {
    const res = await fetch('data/data.json', { cache: 'no-cache' })
    data = await res.json()
  } catch {
    el.loadFailed?.classList.remove('hidden')
    el.appInner.classList.add('hidden')
    return
  }

  showView('start')
  updateThemeUI()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
