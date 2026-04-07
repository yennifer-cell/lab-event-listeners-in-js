// Changes the background color to a random RGB color
function changeBackgroundColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
}

// Resets the background color to default (white)
function resetBackgroundColor() {
  document.body.style.backgroundColor = ''
}

// Displays the key pressed by the user
function displayKeyPress(event) {
  const keyPressDisplay = document.getElementById('keyPressDisplay')
  if (keyPressDisplay) {
    keyPressDisplay.textContent = `Key pressed: ${event.key}`
  }
}

// Displays user input in real time
function displayUserInput() {
  const textInput = document.getElementById('textInput')
  const textInputDisplay = document.getElementById('textInputDisplay')

  if (textInput && textInputDisplay) {
    textInputDisplay.textContent = `You typed: ${textInput.value}`
  }
}

// Attaches all required event listeners
function setupEventListeners() {
  const changeColorButton = document.getElementById('changeColorButton')
  const resetColorButton = document.getElementById('resetColorButton')
  const textInput = document.getElementById('textInput')

  if (changeColorButton) {
    changeColorButton.addEventListener('click', changeBackgroundColor)
  }

  if (resetColorButton) {
    resetColorButton.addEventListener('dblclick', resetBackgroundColor)
  }

  document.addEventListener('keydown', displayKeyPress)

  if (textInput) {
    textInput.addEventListener('input', displayUserInput)
  }
}

module.exports = {
  changeBackgroundColor,
  resetBackgroundColor,
  displayKeyPress,
  displayUserInput,
  setupEventListeners,
}

   
