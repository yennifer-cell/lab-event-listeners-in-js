/**
 * Dynamic User Interface - Interactive Event Handlers
 * Handles button clicks, key presses, and text input events
 */

// Global variables for tracking interactions
let clickCount = 0;
let keyCount = 0;
let inputCount = 0;
let currentColorIndex = 0;

// Array of background colors for cycling
const backgroundColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#10ac84', '#ee5a24', '#0984e3', '#a29bfe', '#fd79a8'
];

// DOM Elements
const colorBtn = document.getElementById('colorBtn');
const keyDisplay = document.getElementById('keyDisplay');
const textInput = document.getElementById('textInput');
const inputDisplay = document.getElementById('inputDisplay');
const interactiveBtn = document.getElementById('interactiveBtn');
const interactiveInput = document.getElementById('interactiveInput');
const interactionLog = document.getElementById('interactionLog');
const clickCountDisplay = document.getElementById('clickCount');
const keyCountDisplay = document.getElementById('keyCount');
const inputCountDisplay = document.getElementById('inputCount');

/**
 * Changes the background color of the page when button is clicked
 */
function changeBackgroundColor() {
    const newColor = backgroundColors[currentColorIndex];
    document.body.style.backgroundColor = newColor;
    document.body.classList.add('color-change');
    
    // Update color index for next click
    currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
    
    // Update click count
    clickCount++;
    updateStats();
    
    // Log the interaction
    logInteraction(`Background changed to ${newColor}`);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        document.body.classList.remove('color-change');
    }, 500);
    
    console.log(`Background color changed to: ${newColor}`);
}

/**
 * Resets the background color to white on double-click
 */
function resetBackgroundColor() {
    document.body.style.backgroundColor = '#f4f4f4';
    currentColorIndex = 0;
    
    // Log the interaction
    logInteraction('Background color reset to default');
    
    console.log('Background color reset to default');
}

/**
 * Displays the key pressed by the user
 * @param {KeyboardEvent} event - The keyboard event object
 */
function displayKeyPress(event) {
    const key = event.key;
    const keyCode = event.code;
    const isSpecialKey = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(key);
    
    // Create display text based on key type
    let displayText;
    if (key === ' ') {
        displayText = 'SPACEBAR';
    } else if (key === 'Enter') {
        displayText = 'ENTER';
    } else if (key === 'Backspace') {
        displayText = 'BACKSPACE';
    } else if (key === 'Escape') {
        displayText = 'ESCAPE';
    } else if (isSpecialKey) {
        displayText = key.toUpperCase();
    } else {
        displayText = key.length === 1 ? key.toUpperCase() : key;
    }
    
    // Update the display
    keyDisplay.textContent = `Key Pressed: "${displayText}" (${keyCode})`;
    keyDisplay.classList.add('key-pressed');
    
    // Update key count
    keyCount++;
    updateStats();
    
    // Log the interaction
    logInteraction(`Key pressed: ${displayText}`);
    
    // Remove animation class
    setTimeout(() => {
        keyDisplay.classList.remove('key-pressed');
    }, 300);
    
    console.log(`Key pressed: ${key} (${keyCode})`);
}

/**
 * Displays real-time user input as they type
 */
function displayUserInput() {
    const inputValue = textInput.value;
    
    if (inputValue.trim() === '') {
        inputDisplay.textContent = 'Your input will appear here...';
        inputDisplay.style.fontStyle = 'italic';
        inputDisplay.style.color = '#7f8c8d';
    } else {
        inputDisplay.textContent = `You typed: "${inputValue}"`;
        inputDisplay.style.fontStyle = 'normal';
        inputDisplay.style.color = '#2c3e50';
    }
    
    // Update input count
    inputCount = inputValue.length;
    updateStats();
    
    console.log(`User input: ${inputValue}`);
}

/**
 * Handles interactive button clicks with enhanced functionality
 */
function handleInteractiveButton() {
    const inputValue = interactiveInput.value;
    const timestamp = new Date().toLocaleTimeString();
    
    // Create different responses based on input
    let response;
    if (inputValue.trim() === '') {
        response = 'Button clicked with no input';
        // Change button color temporarily
        interactiveBtn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
    } else {
        response = `Button clicked with input: "${inputValue}"`;
        // Change button color based on input length
        if (inputValue.length > 10) {
            interactiveBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        } else {
            interactiveBtn.style.background = 'linear-gradient(135deg, #8e44ad, #9b59b6)';
        }
    }
    
    // Log the interaction with timestamp
    logInteraction(`${response} at ${timestamp}`);
    
    // Reset button color after 1 second
    setTimeout(() => {
        interactiveBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    }, 1000);
    
    // Update click count
    clickCount++;
    updateStats();
    
    console.log(response);
}

/**
 * Handles interactive input with real-time effects
 */
function handleInteractiveInput() {
    const inputValue = interactiveInput.value;
    const wordCount = inputValue.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Change input border color based on content
    if (inputValue.length === 0) {
        interactiveInput.style.borderColor = '#ddd';
    } else if (inputValue.length < 5) {
        interactiveInput.style.borderColor = '#e74c3c';
    } else if (inputValue.length < 15) {
        interactiveInput.style.borderColor = '#f39c12';
    } else {
        interactiveInput.style.borderColor = '#27ae60';
    }
    
    // Log significant input milestones
    if (inputValue.length > 0 && inputValue.length % 10 === 0) {
        logInteraction(`Reached ${inputValue.length} characters in interactive input`);
    }
    
    // Update input count
    inputCount += 1; // Count each keystroke
    updateStats();
    
    console.log(`Interactive input: ${inputValue} (${wordCount} words)`);
}

/**
 * Logs interactions to the interaction log display
 * @param {string} message - The interaction message to log
 */
function logInteraction(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logItem = document.createElement('li');
    logItem.textContent = `${timestamp}: ${message}`;
    
    // Add to the beginning of the log
    interactionLog.insertBefore(logItem, interactionLog.firstChild);
    
    // Limit log to 10 items
    if (interactionLog.children.length > 10) {
        interactionLog.removeChild(interactionLog.lastChild);
    }
    
    // Highlight new entry
    logItem.style.backgroundColor = '#3498db';
    logItem.style.color = 'white';
    setTimeout(() => {
        logItem.style.backgroundColor = '#ecf0f1';
        logItem.style.color = '#2c3e50';
    }, 1000);
}

/**
 * Updates the statistics display
 */
function updateStats() {
    clickCountDisplay.textContent = clickCount;
    keyCountDisplay.textContent = keyCount;
    inputCountDisplay.textContent = inputCount;
}

/**
 * Initializes all event listeners when the page loads
 */
function initializeEventListeners() {
    // Background color change - single click
    colorBtn.addEventListener('click', changeBackgroundColor);
    
    // Background color reset - double click
    colorBtn.addEventListener('dblclick', resetBackgroundColor);
    
    // Key press detection - document level
    document.addEventListener('keydown', displayKeyPress);
    
    // Real-time text input display
    textInput.addEventListener('input', displayUserInput);
    
    // Interactive button functionality
    interactiveBtn.addEventListener('click', handleInteractiveButton);
    
    // Interactive input functionality
    interactiveInput.addEventListener('input', handleInteractiveInput);
    
    // Additional event listeners for enhanced interactivity
    
    // Mouse enter/leave effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Focus/blur effects for inputs
    const inputs = document.querySelectorAll('.text-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Window resize event for responsive adjustments
    window.addEventListener('resize', function() {
        logInteraction('Window resized');
    });
    
    // Page visibility change detection
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            logInteraction('Page became hidden');
        } else {
            logInteraction('Page became visible');
        }
    });
    
    console.log('All event listeners initialized successfully');
    logInteraction('Application initialized - Ready for interaction!');
}

/**
 * Additional utility functions for enhanced functionality
 */

/**
 * Clears all interaction logs
 */
function clearInteractionLog() {
    interactionLog.innerHTML = '';
    logInteraction('Interaction log cleared');
}

/**
 * Resets all statistics
 */
function resetStats() {
    clickCount = 0;
    keyCount = 0;
    inputCount = 0;
    updateStats();
    logInteraction('Statistics reset');
}

/**
 * Exports interaction data (for potential future use)
 */
function exportInteractionData() {
    const data = {
        clickCount,
        keyCount,
        inputCount,
        timestamp: new Date().toISOString(),
        interactions: Array.from(interactionLog.children).map(li => li.textContent)
    };
    
    console.log('Interaction Data:', data);
    logInteraction('Interaction data exported to console');
    return data;
}

// Initialize everything when the DOM is fully loaded
.addEventListener('DOMContentLoaded', initializeEventListeners);

// Make functions available globally for potential external use
window.UIFunctions = {
    changeBackgroundColor,
    resetBackgroundColor,
    displayKeyPress,
    displayUserInput,
    clearInteractionLog,
    resetStats,
    exportInteractionData
};
