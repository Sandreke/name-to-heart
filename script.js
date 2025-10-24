// Heart data - exact pattern from original file
const heartPattern = [
    "          @@@@@@@@@@               @@@@@@@@@@@",
    "      @@@@@@@@@@@@@@@@@          @@@@@@@@@@@@@@@@@",
    "   @@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@",
    "  @@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@",
    " @@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@",
    " @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    " @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "              @@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "                @@@@@@@@@@@@@@@@@@@@@@@@",
    "                  @@@@@@@@@@@@@@@@@@@@",
    "                     @@@@@@@@@@@@@@@",
    "                        @@@@@@@@@",
    "                          @@@@@",
    "                            @ "
];

// Global variables
let currentName = '';
let isAnimating = false;

// DOM Elements
const nombreInput = document.getElementById('nombreInput');
const formarBtn = document.getElementById('formarBtn');
const inputSection = document.getElementById('inputSection');
const heartSection = document.getElementById('heartSection');
const heartContainer = document.getElementById('heartContainer');
const finalMessage = document.getElementById('finalMessage');
const loverNameSpan = document.querySelector('.lover-name');

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createMatrixEffect();
    setupEventListeners();
    
    // Focus on input
    nombreInput.focus();
});

// Event Listeners
function setupEventListeners() {
    formarBtn.addEventListener('click', handleFormarCorazon);
    
    nombreInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleFormarCorazon();
        }
    });
    
    nombreInput.addEventListener('input', function() {
        if (this.value.trim()) {
            formarBtn.disabled = false;
            formarBtn.style.opacity = '1';
        } else {
            formarBtn.disabled = true;
            formarBtn.style.opacity = '0.5';
        }
    });
}

// Main function
async function handleFormarCorazon() {
    if (isAnimating) return;
    
    currentName = nombreInput.value.trim() || 'Amor';
    isAnimating = true;
    
    // Hide input section and header
    inputSection.classList.add('hidden');
    document.querySelector('.terminal-header').classList.add('hidden');
    
    // Show result section (with fixed loading)
    heartSection.classList.remove('hidden');
    
    // Wait a bit
    await sleep(2000);
    
    // Animate heart line by line like terminal
    await animateHeartTerminal();
    
    // Show final message
    loverNameSpan.textContent = ', Sofía! ♥';
    finalMessage.classList.remove('hidden');
    
    isAnimating = false;
}

// Function to animate heart like terminal (line by line)
async function animateHeartTerminal() {
    const heartLines = createHeartLines();
    heartContainer.innerHTML = '';
    
    for (let i = 0; i < heartLines.length; i++) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'heart-line-terminal';
        lineDiv.textContent = heartLines[i];
        heartContainer.appendChild(lineDiv);
        
        // Pause like terminal (300ms like in Python)
        await sleep(300);
    }
}

// Function to create heart lines
function createHeartLines() {
    const letters = currentName.split('');
    let letterIndex = 0;
    
    return heartPattern.map(line => {
        return line.replace(/@/g, () => {
            const letter = letters[letterIndex % letters.length];
            letterIndex++;
            return letter;
        });
    });
}


// Function to create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 15000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 1500);
    
    // Create some initial hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 500);
    }
}

// Function to create matrix effect
function createMatrixEffect() {
    const matrixContainer = document.querySelector('.matrix-effect');
    
    function createMatrixLine() {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = '-20px';
        line.style.color = 'rgba(255, 0, 0, 0.1)';
        line.style.fontSize = '12px';
        line.style.fontFamily = 'monospace';
        line.style.whiteSpace = 'nowrap';
        line.textContent = generateRandomString();
        
        matrixContainer.appendChild(line);
        
        // Animate the line
        let position = -20;
        const interval = setInterval(() => {
            position += 2;
            line.style.top = position + 'px';
            
            if (position > window.innerHeight + 20) {
                clearInterval(interval);
                if (line.parentNode) {
                    line.parentNode.removeChild(line);
                }
            }
        }, 50);
    }
    
    // Create lines periodically
    setInterval(createMatrixLine, 2000);
    
    // Create some initial lines
    for (let i = 0; i < 5; i++) {
        setTimeout(createMatrixLine, i * 400);
    }
}

// Function to generate random string
function generateRandomString() {
    const chars = '01';
    let result = '';
    for (let i = 0; i < Math.random() * 20 + 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Helper function for sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initial button validation
nombreInput.addEventListener('input', function() {
    if (this.value.trim()) {
        formarBtn.disabled = false;
        formarBtn.style.opacity = '1';
    } else {
        formarBtn.disabled = true;
        formarBtn.style.opacity = '0.5';
    }
});

// Initial button state
formarBtn.disabled = true;
formarBtn.style.opacity = '0.5';