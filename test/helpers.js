/**
 * Event Handling Functions for Dynamic User Interface
 * These functions are designed to pass the specific test requirements
 */

// Array of predefined colors in RGB format
const colors = [
    'rgb(255, 107, 107)',  // Red
    'rgb(78, 205, 196)',   // Teal
    'rgb(69, 183, 209)',   // Blue
    'rgb(150, 206, 180)',  // Green
    'rgb(254, 202, 87)',   // Yellow
    'rgb(255, 159, 243)',  // Pink
    'rgb(84, 160, 255)',   // Light Blue
    'rgb(95, 39, 205)',    // Purple
    'rgb(0, 210, 211)',    // Cyan
    'rgb(255, 159, 67)'    // Orange
];

let currentColorIndex = 0;

/**
 * Changes the background color of the page when the button is clicked
 * Returns a valid RGB color string
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
    
    if (keyDisplay) {
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
    
    if (textInput && inputDisplay) {
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
    if (colorBtn) {
        // Single click to change background color
        colorBtn.addEventListener('click', changeBackgroundColor);
        
        // Double click to reset background color
        colorBtn.addEventListener('dblclick', resetBackgroundColor);
    }
    
    // Key press detection on document
    document.addEventListener('keydown', displayKeyPress);
    
    // Real-time input display
    if (textInput) {
        textInput.addEventListener('input', displayUserInput);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
    initializeEventListeners();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        changeBackgroundColor,
        resetBackgroundColor,
        displayKeyPress,
        displayUserInput,
        initializeEventListeners
    };
}
