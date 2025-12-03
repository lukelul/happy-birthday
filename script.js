// ============================================
// TIME LOCK & EST CONVERSION
// ============================================

// Unlock date: December 13, 2025 at 12:00 AM EST
// EST is UTC-5, so Dec 13, 2025 00:00 EST = Dec 13, 2025 05:00 UTC
const UNLOCK_DATE_UTC = new Date('2025-12-13T05:00:00Z'); // 12:00 AM EST in UTC

/**
 * Get current time in EST
 * EST is UTC-5 (Eastern Standard Time, not EDT)
 * In December, there's no daylight saving, so it's always UTC-5
 */
function getCurrentTimeEST() {
    const now = new Date();
    // Convert to UTC milliseconds
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    // EST is UTC-5, so subtract 5 hours (5 * 60 * 60 * 1000 ms)
    const estTime = new Date(utcTime - (5 * 60 * 60 * 1000));
    return estTime;
}

/**
 * Check if the unlock time has been reached
 * Compares current UTC time with unlock UTC time
 */
function isUnlocked() {
    const now = new Date();
    return now >= UNLOCK_DATE_UTC;
}

// ============================================
// DOM ELEMENTS
// ============================================

const envelope = document.getElementById('envelope');
const landingScreen = document.getElementById('landing-screen');
const textScreen = document.getElementById('text-screen');
const mapScreen = document.getElementById('map-screen');
const unlockMessage = document.getElementById('unlock-message');
const confettiContainer = document.getElementById('confetti-container');

// ============================================
// 3D MOUSE TRACKING
// ============================================

/**
 * Track mouse movement anywhere on page and apply 3D rotation to envelope
 */
function setup3DMouseTracking() {
    if (!envelope) return;
    
    // Track mouse position relative to viewport center
    let targetRotateY = 0;
    let targetRotateX = 0;
    let currentRotateY = 0;
    let currentRotateX = 0;
    
    document.addEventListener('mousemove', (e) => {
        // Don't apply 3D rotation if envelope is opening or shaking
        if (envelope.classList.contains('opening') || envelope.classList.contains('shaking')) {
            return;
        }
        
        // Calculate mouse position relative to viewport center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate target rotation angles (max 25 degrees for more noticeable effect)
        // Normalize based on viewport size
        targetRotateY = (mouseX / window.innerWidth) * 25;
        targetRotateX = -(mouseY / window.innerHeight) * 25;
    });
    
    // Smooth animation loop for gradual rotation
    function animateRotation() {
        // Smooth interpolation for gradual movement
        const smoothing = 0.1;
        currentRotateY += (targetRotateY - currentRotateY) * smoothing;
        currentRotateX += (targetRotateX - currentRotateX) * smoothing;
        
        // Apply 3D transform
        if (!envelope.classList.contains('opening') && !envelope.classList.contains('shaking')) {
            envelope.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
        }
        
        requestAnimationFrame(animateRotation);
    }
    
    // Start animation loop
    animateRotation();
    
    // Reset rotation when mouse leaves the page
    document.addEventListener('mouseleave', () => {
        targetRotateY = 0;
        targetRotateX = 0;
    });
}

// Initialize 3D mouse tracking
setup3DMouseTracking();

// ============================================
// ENVELOPE INTERACTIONS
// ============================================

/**
 * Show shake animation for early clicks
 */
function showEarlyClickAnimation() {
    envelope.classList.add('shaking');
    
    setTimeout(() => {
        envelope.classList.remove('shaking');
    }, 500);
}

/**
 * Create confetti explosion
 */
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff69b4', '#ff99cc', '#ffb3d9', '#ff80b3', '#ff66b3', '#ff1493'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const randomX = (Math.random() - 0.5) * 2; // -1 to 1
        confetti.style.setProperty('--random-x', randomX);
        confetti.style.left = '50%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s ease-out forwards`;
        confettiContainer.appendChild(confetti);
    }
    
    // Clean up confetti after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

/**
 * Handle envelope click
 */
function handleEnvelopeClick() {
    if (!isUnlocked()) {
        showEarlyClickAnimation();
        return;
    }
    
    // Envelope is unlocked - proceed with opening animation
    // Temporarily disable 3D mouse tracking during opening
    envelope.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    envelope.classList.add('opening');
    
    // Create confetti after a short delay
    setTimeout(() => {
        createConfetti();
    }, 300);
    
    // Transition to text screen after envelope opens
    setTimeout(() => {
        landingScreen.classList.remove('active');
        setTimeout(() => {
            textScreen.classList.add('active');
            startTextSequence();
        }, 1000);
    }, 1000);
}

// Add click listener to envelope
envelope.addEventListener('click', handleEnvelopeClick);

// ============================================
// TEXT SEQUENCE ANIMATION
// ============================================

const textLines = [
    { id: 'text-line-1', duration: 2500 },
    { id: 'text-line-2', duration: 2500 },
    { id: 'text-line-3', duration: 2500 },
    { id: 'text-line-4', duration: 2500 }
];

/**
 * Animate text lines sequentially
 */
function startTextSequence() {
    let currentIndex = 0;
    
    function showNextLine() {
        if (currentIndex >= textLines.length) {
            // All lines shown, transition to map
            setTimeout(() => {
                textScreen.classList.remove('active');
                setTimeout(() => {
                    mapScreen.classList.add('active');
                    startMapAnimation();
                }, 1000);
            }, 1000);
            return;
        }
        
        const line = document.getElementById(textLines[currentIndex].id);
        line.classList.remove('hidden');
        line.classList.add('show');
        
        // Fade out after duration
        setTimeout(() => {
            line.classList.remove('show');
            line.classList.add('hidden');
            
            // Wait for fade out, then show next line
            setTimeout(() => {
                currentIndex++;
                showNextLine();
            }, 1000);
        }, textLines[currentIndex].duration);
    }
    
    // Start showing lines after a brief delay
    setTimeout(() => {
        showNextLine();
    }, 500);
}

// ============================================
// MAP ANIMATION
// ============================================

const cityDots = [
    { id: 'calgary-dot', name: 'Calgary' },
    { id: 'dallas-dot', name: 'Dallas' },
    { id: 'toronto-dot-1', name: 'Toronto' },
    { id: 'toronto-dot-2', name: 'Toronto' },
    { id: 'nyc-dot', name: 'New York City' }
];

const cityTooltip = document.getElementById('city-tooltip');

/**
 * Animate city dots appearing one by one
 */
function startMapAnimation() {
    cityDots.forEach((city, index) => {
        setTimeout(() => {
            const dot = document.getElementById(city.id);
            dot.classList.add('visible');
            dot.setAttribute('data-city-name', city.name);
            
            // Add click and hover listeners
            dot.addEventListener('click', () => handleCityClick(city.name, dot));
            dot.addEventListener('mouseenter', (e) => showCityTooltip(city.name, e));
            dot.addEventListener('mouseleave', hideCityTooltip);
        }, index * 1000);
    });
}

/**
 * Handle city dot click
 * This is structured for easy extension later
 */
function handleCityClick(cityName, dotElement) {
    // Placeholder for future interactions
    console.log(`Clicked on ${cityName}`);
    // You can add specific interactions here later
}

/**
 * Show tooltip on hover (desktop)
 */
function showCityTooltip(cityName, event) {
    const dot = event.target;
    const bbox = dot.getBBox();
    cityTooltip.textContent = cityName;
    cityTooltip.setAttribute('x', bbox.x + bbox.width / 2);
    cityTooltip.setAttribute('y', bbox.y - 15);
    cityTooltip.setAttribute('opacity', '1');
}

/**
 * Hide tooltip
 */
function hideCityTooltip() {
    cityTooltip.setAttribute('opacity', '0');
}

// Handle mobile tap events
cityDots.forEach(city => {
    const dot = document.getElementById(city.id);
    if (dot) {
        dot.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const tooltip = document.createElement('div');
            tooltip.textContent = city.name;
            tooltip.style.position = 'fixed';
            tooltip.style.background = 'rgba(255, 105, 180, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '8px';
            tooltip.style.fontSize = '14px';
            tooltip.style.fontFamily = 'Poppins, sans-serif';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '1000';
            tooltip.style.left = e.touches[0].clientX + 'px';
            tooltip.style.top = (e.touches[0].clientY - 40) + 'px';
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    }
});

// ============================================
// INITIALIZATION
// ============================================

// Update unlock message based on current time
function updateUnlockMessage() {
    if (isUnlocked()) {
        unlockMessage.textContent = 'Click to open! 💕';
        envelope.style.cursor = 'pointer';
    } else {
        const now = new Date();
        const timeUntil = UNLOCK_DATE_UTC - now;
        const days = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
            unlockMessage.textContent = `This gift unlocks on December 13th, 2025 at 12:00 AM EST. (${days} day${days > 1 ? 's' : ''} remaining)`;
        } else if (hours > 0) {
            unlockMessage.textContent = `This gift unlocks on December 13th, 2025 at 12:00 AM EST. (${hours} hour${hours > 1 ? 's' : ''} remaining)`;
        } else {
            unlockMessage.textContent = `This gift unlocks on December 13th, 2025 at 12:00 AM EST. (${minutes} minute${minutes > 1 ? 's' : ''} remaining)`;
        }
    }
}

// Update message on load and periodically
updateUnlockMessage();
setInterval(updateUnlockMessage, 60000); // Update every minute

