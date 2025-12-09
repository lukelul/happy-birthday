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
    },
    {
        id: 7,
        color: "#86EFAC", // Soft green
        photo: "images/memory7.jpg",
        text: "The day we tried that new restaurant… Your excitement about trying new foods together made every meal an adventure."
    },
    {
        id: 8,
        color: "#FBBF24", // Soft amber
        photo: "images/memory8.jpg",
        text: "Our first road trip… Singing along to our favorite songs, getting lost, and making memories that will last forever."
    },
    {
        id: 9,
        color: "#F0ABFC", // Soft fuchsia
        photo: "images/memory9.jpg",
        text: "That time we stayed up all night talking… When the sun rose, I realized I never wanted those conversations to end."
    },
    {
        id: 10,
        color: "#60A5FA", // Soft indigo
        photo: "images/memory10.jpg",
        text: "The first time you made me breakfast… It wasn't perfect, but it was made with love, and that made it perfect to me."
    },
    {
        id: 11,
        color: "#F87171", // Soft rose
        photo: "images/memory11.jpg",
        text: "Dancing in the living room to our favorite song… Just the two of us, lost in the moment and each other."
    },
    {
        id: 12,
        color: "#34D399", // Soft emerald
        photo: "images/memory12.jpg",
        text: "The way you look at me when you think I'm not watching… Those moments remind me how lucky I am to have you."
    }
];

// ============================================
// DOM ELEMENTS
// ============================================

const jarScene = document.getElementById('jar-scene');
const memoryScene = document.getElementById('memory-scene');
const galleryScene = document.getElementById('gallery-scene');
const jar = document.getElementById('jar');
const marblesContainer = document.getElementById('marbles-container');
const insertCoinBtn = document.getElementById('insert-coin-btn');
const viewAllBtn = document.getElementById('view-all-btn');
const coinAnimation = document.getElementById('coin-animation');
const revealedMarble = document.getElementById('revealed-marble');
const memoryContent = document.getElementById('memory-content');
const memoryPhoto = document.getElementById('memory-photo');
const memoryText = document.getElementById('memory-text');
const backBtn = document.getElementById('back-btn');
const galleryBackBtn = document.getElementById('gallery-back-btn');
const galleryMemories = document.getElementById('gallery-memories');

// ============================================
// PHYSICS ENGINE SETUP
// ============================================

const { Engine, Render, World, Bodies, Body, Events, Composite } = Matter;

let engine;
let marbleBodies = [];
let marbleElements = [];
let jarBounds = [];
let isPhysicsInitialized = false;

/**
 * Initialize physics engine and create jar boundaries
 */
function initializePhysics() {
    if (isPhysicsInitialized && engine) {
        // Clean up existing physics
        World.clear(engine.world, false);
        Engine.clear(engine);
        marbleBodies = [];
        marbleElements = [];
        jarBounds = [];
    }
    
    // Create engine
    engine = Engine.create();
    engine.world.gravity.y = 1.5; // Increased gravity strength (downward)
    engine.world.gravity.x = 0; // No horizontal gravity by default
    engine.world.gravity.scale = 0.001; // Scale for Matter.js
    
    // Increase gravity effect - make it stronger
    engine.timing.timeScale = 1.5; // Speed up physics slightly
    
    // Get jar container dimensions dynamically
    const containerRect = marblesContainer.getBoundingClientRect();
    
    // Jar dimensions (relative to container) - use actual container size
    const jarWidth = containerRect.width || 280; // Width of marbles container (matches jar-glass)
    const jarHeight = containerRect.height || 360; // Height of marbles container (matches jar-glass)
    const jarCenterX = jarWidth / 2;
    const jarBottom = jarHeight;
    const jarRadius = jarWidth / 2; // Radius of curved bottom (half the width)
    
    // Create jar boundaries
    // Left wall
    const leftWall = Bodies.rectangle(0, jarHeight / 2, 2, jarHeight, {
        isStatic: true,
        render: { visible: false }
    });
    
    // Right wall
    const rightWall = Bodies.rectangle(jarWidth, jarHeight / 2, 2, jarHeight, {
        isStatic: true,
        render: { visible: false }
    });
    
    // Curved bottom (using multiple small segments to approximate curve)
    const bottomSegments = [];
    const segmentCount = 25; // Number of segments for smooth curve
    for (let i = 0; i < segmentCount; i++) {
        const angle = (Math.PI / segmentCount) * i;
        const nextAngle = (Math.PI / segmentCount) * (i + 1);
        
        // Calculate positions for this segment
        const x1 = jarCenterX + Math.cos(angle) * jarRadius;
        const y1 = jarBottom - jarRadius + Math.sin(angle) * jarRadius;
        const x2 = jarCenterX + Math.cos(nextAngle) * jarRadius;
        const y2 = jarBottom - jarRadius + Math.sin(nextAngle) * jarRadius;
        
        // Create segment between these two points
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const segmentLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const segmentAngle = Math.atan2(y2 - y1, x2 - x1);
        
        const segment = Bodies.rectangle(midX, midY, segmentLength, 4, {
            isStatic: true,
            angle: segmentAngle,
            render: { visible: false }
        });
        bottomSegments.push(segment);
    }
    
    jarBounds = [leftWall, rightWall, ...bottomSegments];
    World.add(engine.world, jarBounds);
    
    isPhysicsInitialized = true;
}

/**
 * Create and position marbles with physics
 * Each marble represents a memory
 */
function initializeMarbles() {
    // Always reset physics to ensure clean state
    if (isPhysicsInitialized && engine) {
        // Clean up existing physics completely
        World.clear(engine.world, false);
        Engine.clear(engine);
    }
    
    marblesContainer.innerHTML = ''; // Clear existing marbles
    marbleBodies = [];
    marbleElements = [];
    physicsUpdateRunning = false; // Reset physics update flag
    
    // Initialize physics (will recreate if needed)
    initializePhysics();
    
    // Get actual container dimensions
    const containerRect = marblesContainer.getBoundingClientRect();
    const jarWidth = containerRect.width || 280;
    const jarHeight = containerRect.height || 360;
    const jarCenterX = jarWidth / 2;
    
    memories.forEach((memory, index) => {
        // Create visual marble element
        const marble = document.createElement('div');
        marble.className = 'marble';
        marble.style.backgroundColor = memory.color;
        marble.style.color = memory.color;
        marble.setAttribute('data-memory-id', memory.id);
        marblesContainer.appendChild(marble);
        
        // Create physics body
        const marbleSize = 20; // Radius in pixels
        // Spawn across full jar width (with margin for marble size)
        const spawnWidth = jarWidth - (marbleSize * 2);
        const startX = marbleSize + Math.random() * spawnWidth; // Random x across full width
        const startY = 50 + Math.random() * 100; // Start near top
        
        const marbleBody = Bodies.circle(startX, startY, marbleSize, {
            restitution: 0.3, // Bounciness (lower = less bouncy, more realistic)
            friction: 0.5,
            frictionAir: 0.01, // Lower air resistance so they fall faster
            density: 0.001,
            render: { visible: false }
        });
        
        // Store memory data in body
        marbleBody.memoryId = memory.id;
        marbleBody.memory = memory;
        
        // Give marbles an initial downward velocity to get them falling
        Body.setVelocity(marbleBody, {
            x: (Math.random() - 0.5) * 0.5, // Small random horizontal velocity
            y: 2 + Math.random() * 2 // Downward velocity to start falling
        });
        
        marbleBodies.push(marbleBody);
        marbleElements.push(marble);
        
        World.add(engine.world, marbleBody);
    });
    
    // Start physics update loop
    startPhysicsUpdate();
}

/**
 * Update visual marbles based on physics positions
 */
let physicsUpdateRunning = false;

function startPhysicsUpdate() {
    if (physicsUpdateRunning) return; // Prevent multiple loops
    physicsUpdateRunning = true;
    
    let lastTime = performance.now();
    
    function update(currentTime) {
        if (!isPhysicsInitialized || !jarScene.classList.contains('active')) {
            requestAnimationFrame(update);
            return;
        }
        
        // Get current container dimensions (in case of resize)
        const containerRect = marblesContainer.getBoundingClientRect();
        const jarHeight = containerRect.height || 360;
        
        // Calculate delta time
        const delta = currentTime - lastTime;
        lastTime = currentTime;
        
        // Update physics engine with proper timing
        Engine.update(engine, delta);
        
        // Sync visual marbles with physics bodies
        marbleBodies.forEach((body, index) => {
            if (marbleElements[index] && !marbleElements[index].classList.contains('popping')) {
                const marble = marbleElements[index];
                const x = body.position.x;
                const y = body.position.y;
                
                // Convert physics coordinates to CSS (container is positioned relative)
                // Physics Y=0 is at top, CSS bottom=0 is at bottom, so we flip
                marble.style.left = (x - 20) + 'px'; // Subtract half marble size (40px / 2)
                marble.style.bottom = (jarHeight - y - 20) + 'px'; // Flip Y axis and subtract half size
                marble.style.transform = `rotate(${body.angle}rad)`;
            }
        });
        
        requestAnimationFrame(update);
    }
    
    update(performance.now());
}

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
    // Get coin slot position
    const coinSlot = document.querySelector('.coin-slot');
    if (!coinSlot) return;
    
    const slotRect = coinSlot.getBoundingClientRect();
    const slotCenterX = slotRect.left + slotRect.width / 2;
    const slotTop = slotRect.top;
    const slotCenterY = slotRect.top + slotRect.height / 2;
    
    // Position coin above the slot (start position)
    const startY = slotTop - 80; // Start 80px above the slot
    const endY = slotCenterY; // End at center of slot
    
    // Calculate the distance to travel
    const distance = endY - startY;
    
    // Set initial position
    coinAnimation.style.left = slotCenterX + 'px';
    coinAnimation.style.top = startY + 'px';
    coinAnimation.style.transform = 'translate(-50%, 0)';
    coinAnimation.style.width = '40px';
    coinAnimation.style.height = '40px';
    coinAnimation.style.borderRadius = '50%';
    coinAnimation.style.opacity = '1';
    
    // Create keyframe animation dynamically
    const keyframes = [
        {
            top: startY + 'px',
            transform: 'translate(-50%, 0) rotateY(0deg)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            opacity: 1
        },
        {
            top: (startY + distance * 0.5) + 'px',
            transform: 'translate(-50%, 0) rotateY(360deg)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            opacity: 1
        },
        {
            top: (startY + distance * 0.8) + 'px',
            transform: 'translate(-50%, 0) rotateY(540deg)',
            width: '45px',
            height: '12px',
            borderRadius: '6px',
            opacity: 0.8
        },
        {
            top: endY + 'px',
            transform: 'translate(-50%, 0) rotateY(720deg)',
            width: '45px',
            height: '6px',
            borderRadius: '3px',
            opacity: 0
        }
    ];
    
    coinAnimation.classList.remove('hidden');
    
    // Use Web Animations API for dynamic keyframes
    const animation = coinAnimation.animate(keyframes, {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
    });
    
    animation.onfinish = () => {
        coinAnimation.classList.add('hidden');
    };
}

/**
 * Start jar shake animation and add physics forces to marbles
 */
function startJarShake() {
    jar.classList.add('shaking');
    
    // Store original transform
    const originalTransform = jar.style.transform || '';
    
    // Apply random forces to marbles for shake effect
    marbleBodies.forEach((body, index) => {
        const forceX = (Math.random() - 0.5) * 0.02;
        const forceY = (Math.random() - 0.5) * 0.02;
        Body.applyForce(body, body.position, { x: forceX, y: forceY });
    });
    
    // Continue shaking for 2 seconds
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
        // Apply forces to marbles
        marbleBodies.forEach((body) => {
            const forceX = (Math.random() - 0.5) * 0.015;
            const forceY = (Math.random() - 0.5) * 0.015;
            Body.applyForce(body, body.position, { x: forceX, y: forceY });
        });
        
        // Visual shake effect on jar
        const shakeX = (Math.random() - 0.5) * 8;
        const shakeY = (Math.random() - 0.5) * 8;
        const shakeRotate = (Math.random() - 0.5) * 3;
        jar.style.transform = `${originalTransform} translate(${shakeX}px, ${shakeY}px) rotate(${shakeRotate}deg)`;
        
        shakeCount++;
        if (shakeCount >= 20) { // 20 intervals = ~2 seconds
            clearInterval(shakeInterval);
            jar.classList.remove('shaking');
            // Restore original transform
            jar.style.transform = originalTransform;
        }
    }, 100);
}

/**
 * Pop out a random marble and reveal memory
 */
function popMarble() {
    // Select random memory
    const randomIndex = Math.floor(Math.random() * memories.length);
    const selectedMemory = memories[randomIndex];
    
    // Find the marble body and element with this memory ID
    const marbleIndex = marbleBodies.findIndex(
        body => body.memoryId === selectedMemory.id
    );
    
    if (marbleIndex !== -1) {
        const marbleBody = marbleBodies[marbleIndex];
        const marbleElement = marbleElements[marbleIndex];
        
        // Apply upward force to pop the marble
        Body.applyForce(marbleBody, marbleBody.position, { 
            x: (Math.random() - 0.5) * 0.03, 
            y: -0.05 
        });
        
        // Make the selected marble pop out visually
        marbleElement.classList.add('popping');
        
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
        
        // Reset marbles (physics will handle positioning)
        marbleElements.forEach(marble => {
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
if (backBtn) {
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Back button clicked'); // Debug log
        
        // Hide memory content
        if (memoryContent) {
            memoryContent.classList.add('hidden');
            memoryContent.classList.remove('show');
        }
        if (backBtn) {
            backBtn.classList.add('hidden');
        }
        
        // Switch scenes
        if (memoryScene) {
            memoryScene.classList.remove('active');
        }
        if (jarScene) {
            jarScene.classList.add('active');
        }
        
        // Restore the popped marble instead of reinitializing all marbles
        // Remove 'popping' class from any marbles that were popped and reset their position
        setTimeout(() => {
            marbleElements.forEach((marble, index) => {
                if (marble.classList.contains('popping')) {
                    marble.classList.remove('popping');
                    // Reset the marble's position in physics (let it fall back into jar)
                    if (marbleBodies[index]) {
                        const containerRect = marblesContainer.getBoundingClientRect();
                        const jarWidth = containerRect.width || 280;
                        const jarHeight = containerRect.height || 360;
                        const jarCenterX = jarWidth / 2;
                        const marbleSize = 20;
                        
                        // Reset position to top of jar and let it fall
                        Body.setPosition(marbleBodies[index], {
                            x: jarCenterX + (Math.random() - 0.5) * 100,
                            y: 50 + Math.random() * 50
                        });
                        Body.setVelocity(marbleBodies[index], {
                            x: (Math.random() - 0.5) * 0.5,
                            y: 2 + Math.random() * 2
                        });
                    }
                }
            });
        }, 100);
        
        // Ensure physics update is running
        if (!physicsUpdateRunning && isPhysicsInitialized) {
            startPhysicsUpdate();
        }
    });
} else {
    console.error('Back button not found!');
}

// ============================================
// VIEW ALL MEMORIES GALLERY
// ============================================

/**
 * Show gallery with all memories
 */
function showGallery() {
    // Clear existing gallery content
    galleryMemories.innerHTML = '';
    
    // Create memory cards for each memory
    memories.forEach((memory, index) => {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';
        memoryCard.style.borderColor = memory.color;
        
        memoryCard.innerHTML = `
            <div class="memory-card-marble" style="background-color: ${memory.color}; color: ${memory.color};"></div>
            <div class="memory-card-content">
                <div class="memory-card-photo-frame">
                    <img src="${memory.photo}" alt="Memory ${memory.id}" class="memory-card-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="memory-card-placeholder" style="display: none;">
                        <span>💕</span>
                    </div>
                </div>
                <div class="memory-card-text">
                    <p>${memory.text}</p>
                </div>
            </div>
        `;
        
        galleryMemories.appendChild(memoryCard);
    });
    
    // Switch to gallery scene
    jarScene.classList.remove('active');
    galleryScene.classList.add('active');
}

/**
 * Hide gallery and return to jar
 */
function hideGallery() {
    galleryScene.classList.remove('active');
    jarScene.classList.add('active');
}

// Event listeners for gallery
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        showGallery();
    });
}

if (galleryBackBtn) {
    galleryBackBtn.addEventListener('click', () => {
        hideGallery();
    });
}

// Initialize physics and marbles on page load
window.addEventListener('DOMContentLoaded', () => {
    // Wait for Matter.js to be fully loaded
    if (typeof Matter === 'undefined') {
        console.error('Matter.js not loaded!');
        return;
    }
    
    initializePhysics();
    // Wait a bit for the scene to be ready
    setTimeout(() => {
        initializeMarbles();
    }, 200);
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

// ============================================
// MOUSE TRACKING & JAR TILT
// ============================================

let mouseX = 0;
let mouseY = 0;
let jarTiltX = 0;
let jarTiltY = 0;

/**
 * Update jar position and tilt based on mouse movement
 * This affects the gravity direction for marbles
 */
document.addEventListener('mousemove', (e) => {
    if (!isAnimating && jarScene.classList.contains('active')) {
        // Calculate mouse position relative to center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        mouseX = (e.clientX - centerX) / window.innerWidth;
        mouseY = (e.clientY - centerY) / window.innerHeight;
        
        // Limit tilt amount
        jarTiltX = Math.max(-0.5, Math.min(0.5, mouseX * 0.5));
        jarTiltY = Math.max(-0.5, Math.min(0.5, mouseY * 0.5));
        
        // Move jar visually
        const translateX = mouseX * 20;
        const translateY = mouseY * 20;
        jar.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${jarTiltY * 5}deg) rotateY(${jarTiltX * 5}deg)`;
        
        // Update gravity direction based on jar tilt
        if (engine && isPhysicsInitialized) {
            engine.world.gravity.x = jarTiltX * 0.4;
            engine.world.gravity.y = 1.5 + jarTiltY * 0.4; // Base gravity of 1.5
        }
    }
});

// Reset jar position and gravity when mouse leaves
document.addEventListener('mouseleave', () => {
    jar.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
    jarTiltX = 0;
    jarTiltY = 0;
    
    if (engine && isPhysicsInitialized) {
        engine.world.gravity.x = 0;
        engine.world.gravity.y = 1.5; // Reset to base gravity
    }
});

// ============================================
// CLICK SPARKLE ANIMATION
// ============================================

/**
 * Create sparkle animation at click position
 */
document.addEventListener('click', (e) => {
    // Don't create sparkles on button clicks or interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        return;
    }
    
    // Create multiple sparkle particles
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'click-sparkle';
        
        // Calculate angle and distance for particle direction
        const angle = (360 / particleCount) * i;
        const distance = 30 + Math.random() * 20;
        const radians = (angle * Math.PI) / 180;
        const endX = Math.cos(radians) * distance;
        const endY = Math.sin(radians) * distance;
        
        // Position at click location
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        
        // Set animation end position
        sparkle.style.setProperty('--end-x', endX + 'px');
        sparkle.style.setProperty('--end-y', endY + 'px');
        sparkle.style.animationDelay = (i * 0.03) + 's';
        
        // Add to body
        document.body.appendChild(sparkle);
        
        // Remove after animation completes
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});
