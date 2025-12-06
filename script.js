// ============================================
// MEMORY DATA STRUCTURE
// ============================================
// Easy to edit: Add new memories here!
// Each memory needs: id, color, photo (URL or path), and text

const memories = [
    {
        id: 1,
        color: "#F9A8D4", // Soft pink
        photo: "images/memory1.jpg", // Replace with your photo URL or path
        text: "Our first date at the coffee shop… The way you smiled when you saw me made my heart skip a beat. I knew right then that this was something special."
    },
    {
        id: 2,
        color: "#A5F3FC", // Soft blue
        photo: "images/memory2.jpg", // Replace with your photo URL or path
        text: "The time we explored downtown together… Walking hand in hand, discovering new places, and creating our own little adventures. Every moment felt like magic."
    },
    {
        id: 3,
        color: "#C4B5FD", // Soft purple
        photo: "images/memory3.jpg", // Replace with your photo URL or path
        text: "That rainy day we spent indoors, watching movies and talking for hours… Time seemed to stand still when I was with you."
    },
    {
        id: 4,
        color: "#FCD34D", // Soft yellow
        photo: "images/memory4.jpg", // Replace with your photo URL or path
        text: "The sunset we watched together… The sky painted in hues of pink and orange, but nothing was more beautiful than seeing it reflected in your eyes."
    },
    {
        id: 5,
        color: "#FCA5A5", // Soft coral
        photo: "images/memory5.jpg", // Replace with your photo URL or path
        text: "Our first laugh together… That moment when we both couldn't stop giggling, and I realized how much joy you bring into my life."
    },
    {
        id: 6,
        color: "#93C5FD", // Soft sky blue
        photo: "images/memory6.jpg", // Replace with your photo URL or path
        text: "The surprise you planned for me… Your thoughtfulness and the way you care about making me happy means everything to me."
    }
];

// ============================================
// DOM ELEMENTS
// ============================================

const jarScene = document.getElementById('jar-scene');
const memoryScene = document.getElementById('memory-scene');
const jar = document.getElementById('jar');
const marblesContainer = document.getElementById('marbles-container');
const insertCoinBtn = document.getElementById('insert-coin-btn');
const coinAnimation = document.getElementById('coin-animation');
const revealedMarble = document.getElementById('revealed-marble');
const memoryContent = document.getElementById('memory-content');
const memoryPhoto = document.getElementById('memory-photo');
const memoryText = document.getElementById('memory-text');
const backBtn = document.getElementById('back-btn');

// ============================================
// INITIALIZE MARBLES IN JAR
// ============================================

/**
 * Create and position marbles inside the jar
 * Each marble represents a memory
 */
function initializeMarbles() {
    marblesContainer.innerHTML = ''; // Clear existing marbles
    
    memories.forEach((memory, index) => {
        const marble = document.createElement('div');
        marble.className = 'marble';
        marble.style.backgroundColor = memory.color;
        marble.style.color = memory.color;
        
        // Random position inside jar (avoid edges)
        const x = Math.random() * 180 + 30; // 30 to 210px
        const y = Math.random() * 250 + 30; // 30 to 280px
        
        marble.style.left = x + 'px';
        marble.style.bottom = y + 'px';
        marble.setAttribute('data-memory-id', memory.id);
        
        marblesContainer.appendChild(marble);
    });
}

// Initialize marbles on page load
initializeMarbles();

// ============================================
// COIN INSERTION & JAR SHAKE
// ============================================

let isAnimating = false;

/**
 * Handle coin insertion button click
 */
insertCoinBtn.addEventListener('click', () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    isAnimating = true;
    insertCoinBtn.disabled = true;
    
    // Step 1: Coin drop animation
    playCoinDropAnimation();
    
    // Step 2: After coin drops, start jar shake and marble swirl
    setTimeout(() => {
        startJarShake();
    }, 800);
    
    // Step 3: After shaking, pop out a marble
    setTimeout(() => {
        popMarble();
    }, 2800);
});

/**
 * Play coin drop animation
 */
function playCoinDropAnimation() {
    coinAnimation.classList.remove('hidden');
    coinAnimation.classList.add('dropping');
    
    // Reset animation after it completes
    setTimeout(() => {
        coinAnimation.classList.remove('dropping');
        coinAnimation.classList.add('hidden');
    }, 800);
}

/**
 * Start jar shake animation and swirl marbles
 */
function startJarShake() {
    jar.classList.add('shaking');
    
    // Make all marbles swirl
    const marbles = marblesContainer.querySelectorAll('.marble');
    marbles.forEach(marble => {
        marble.classList.add('swirling');
    });
    
    // Remove shake class after animation
    setTimeout(() => {
        jar.classList.remove('shaking');
    }, 2000);
}

/**
 * Pop out a random marble and reveal memory
 */
function popMarble() {
    // Select random memory
    const randomIndex = Math.floor(Math.random() * memories.length);
    const selectedMemory = memories[randomIndex];
    
    // Find the marble with this memory ID
    const marbles = marblesContainer.querySelectorAll('.marble');
    const selectedMarble = Array.from(marbles).find(
        m => parseInt(m.getAttribute('data-memory-id')) === selectedMemory.id
    );
    
    if (selectedMarble) {
        // Make the selected marble pop out
        selectedMarble.classList.remove('swirling');
        selectedMarble.classList.add('popping');
        
        // Set revealed marble color
        revealedMarble.style.backgroundColor = selectedMemory.color;
        revealedMarble.style.color = selectedMemory.color;
        
        // After marble pops, transition to memory scene
        setTimeout(() => {
            revealMemory(selectedMemory);
        }, 1500);
    }
}

// ============================================
// MEMORY REVEAL
// ============================================

/**
 * Reveal the selected memory
 */
function revealMemory(memory) {
    // Show revealed marble animation
    revealedMarble.classList.remove('hidden');
    
    // After marble expands, show memory content
    setTimeout(() => {
        revealedMarble.classList.add('hidden');
        
        // Set memory content
        memoryPhoto.src = memory.photo;
        memoryPhoto.alt = `Memory ${memory.id}`;
        memoryText.textContent = memory.text;
        
        // Show memory content
        memoryContent.classList.remove('hidden');
        memoryContent.classList.add('show');
        backBtn.classList.remove('hidden');
        
        // Switch scenes
        jarScene.classList.remove('active');
        memoryScene.classList.add('active');
        
        // Reset for next use
        isAnimating = false;
        insertCoinBtn.disabled = false;
        
        // Reset marbles
        const marbles = marblesContainer.querySelectorAll('.marble');
        marbles.forEach(marble => {
            marble.classList.remove('swirling', 'popping');
        });
    }, 2000);
}

// ============================================
// BACK TO JAR
// ============================================

/**
 * Return to jar scene
 */
backBtn.addEventListener('click', () => {
    // Hide memory content
    memoryContent.classList.add('hidden');
    memoryContent.classList.remove('show');
    backBtn.classList.add('hidden');
    
    // Switch scenes
    memoryScene.classList.remove('active');
    jarScene.classList.add('active');
    
    // Reinitialize marbles for next use
    setTimeout(() => {
        initializeMarbles();
    }, 500);
});

// ============================================
// HANDLE MISSING IMAGES
// ============================================

/**
 * Handle missing image files gracefully
 */
memoryPhoto.addEventListener('error', function() {
    // Create a placeholder if image fails to load
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 100%;
        max-width: 500px;
        height: 300px;
        background: linear-gradient(135deg, #ffb3d9 0%, #e6ccff 100%);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-family: 'Poppins', sans-serif;
    `;
    placeholder.textContent = '💕 Memory Photo 💕';
    
    if (!this.parentElement.querySelector('.image-placeholder')) {
        placeholder.className = 'image-placeholder';
        this.parentElement.appendChild(placeholder);
    }
});

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

/**
 * Add subtle mouse tracking to jar (optional enhancement)
 */
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    if (!isAnimating && jarScene.classList.contains('active')) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        jar.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
});

// Reset jar position when mouse leaves
document.addEventListener('mouseleave', () => {
    jar.style.transform = 'translate(0, 0)';
});
