let currentColorIndex = 0;

/**
 * Changes the background color of the page when the button is clicked
 */
function changeBackgroundColor() {
    const color = colors[currentColorIndex];
    document.body.style.backgroundColor = color;
    
    // Move to next color for next click
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    
    return color;
}

/**
 * Resets the background color to default (empty string)
 * This clears any inline background color style
 */
function resetBackgroundColor() {
    document.body.style.backgroundColor = '';
    currentColorIndex = 0;
}

/**
 * Displays the key pressed by the user
 * Updates the key press display element
 * @param {KeyboardEvent} event - The keyboard event object
 */
function displayKeyPress(event) {
    const key = event.key.toUpperCase();
    const keyDisplay = document.getElementById('keyDisplay');
    
    if(keyDisplay) {
        keyDisplay.textContent = `Key pressed: ${key}`;
    }
}

/**
 * Displays real-time user input as they type
 * Updates the input display element
 */
function displayUserInput() {
    const textInput = document.getElementById('textInput');
    const inputDisplay = document.getElementById('inputDisplay');
    
    if(textInput && inputDisplay) {
        const inputValue = textInput.value;
        
        if (inputValue.trim() === '') {
            inputDisplay.textContent = 'Your input will be displayed here.';
        } else {
            inputDisplay.textContent = `You typed: ${inputValue}`;
        }
    }
}

/**
 * Initialize all event listeners when the DOM is loaded
 */
function initializeEventListeners() {
    // Get DOM elements
    const colorBtn = document.getElementById('colorBtn');
    const textInput = document.getElementById('textInput');
    
    // Add event listeners only if elements exist
    if(colorBtn) {
        // Single click to change background color
        colorBtn.addEventListener('click', changeBackgroundColor);
        
        // Double click to reset background color
        colorBtn.addEventListener('dblclick', resetBackgroundColor);
    }
    
    // Key press detection on document
    document.addEventListener('keydown', displayKeyPress);
    
    // Real-time input display
    if(textInput) {
        textInput.addEventListener('input', displayUserInput);
    }
}

// Initialize when DOM is ready
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
    initializeEventListeners();
}

// Export functions for testing
if(typeof module !== 'undefined' && module.exports) {
    module.exports = {
        changeBackgroundColor,
        resetBackgroundColor,
        displayKeyPress,
        displayUserInput,
        initializeEventListeners
    };
}
