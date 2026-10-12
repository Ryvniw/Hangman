const alphabet = document.getElementById('alphabet')
const wordDisplay = document.getElementById('random-word')
const wrongDisplay = document.getElementById('wrong')
const hangmanImage = document.getElementById('images')
const progressFill = document.getElementById('progress-fill')
const message = document.getElementById('game-message')
const resetButton = document.getElementById('resgame')

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const words = ['pinecone', 'anime', 'game', 'music', 'money']
const maxMistakes = 7
let word = ''
let guessed = new Set()
let mistakes = 0
let finished = false

function chooseWord() {
  return words[Math.floor(Math.random() * words.length)].toUpperCase()
}

function renderWord() {
  wordDisplay.replaceChildren(...word.split('').map(letter => {
    const tile = document.createElement('span')
    const found = guessed.has(letter)
    tile.className = `word-letter${found ? ' found' : ''}`
    tile.textContent = found ? letter : ''
    tile.setAttribute('aria-label', found ? letter : 'нууц үсэг')
    return tile
  }))
}

function finish(won) {
  finished = true
  message.className = `game-message ${won ? 'win' : 'lose'}`
  message.textContent = won ? 'Яг зөв! Чи нууц үгийг оллоо 🎉' : `Энэ удаа биш ээ — нууц үг ${word} байлаа.`
  alphabet.querySelectorAll('button').forEach(button => { button.disabled = true })
}

function guess(letter, button) {
  if (finished || guessed.has(letter)) return
  guessed.add(letter)
  button.disabled = true

  if (word.includes(letter)) {
    button.classList.add('correct')
  } else {
    mistakes += 1
    button.classList.add('incorrect')
    hangmanImage.src = `./${mistakes}.jpg`
    hangmanImage.alt = `Дүүжлүүрийн зураг — ${mistakes} алдаа`
  }

  wrongDisplay.textContent = `Алдаа ${mistakes}`
  progressFill.style.width = `${(mistakes / maxMistakes) * 100}%`
  renderWord()

  if ([...word].every(character => guessed.has(character))) finish(true)
  else if (mistakes >= maxMistakes) finish(false)
}

function startGame() {
  word = chooseWord()
  guessed = new Set()
  mistakes = 0
  finished = false
  alphabet.replaceChildren()
  wrongDisplay.textContent = 'Алдаа 0'
  progressFill.style.width = '0%'
  hangmanImage.src = './0.jpg'
  hangmanImage.alt = 'Дүүжлүүрийн зураг — алдааны тоогоор өөрчлөгдөнө'
  message.className = 'game-message'
  message.textContent = 'Амжилт хүсье! 🍀'

  letters.forEach(letter => {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = letter
    button.setAttribute('aria-label', `${letter} үсгийг сонгох`)
    button.addEventListener('click', () => guess(letter, button))
    alphabet.appendChild(button)
  })

  renderWord()
}

resetButton.addEventListener('click', startGame)
startGame()
