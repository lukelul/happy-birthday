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
    
    // Get jar container dimensions
    const jarRect = jar.getBoundingClientRect();
    const containerRect = marblesContainer.getBoundingClientRect();
    
    // Jar dimensions (relative to container)
    const jarWidth = 240; // Width of marbles container
    const jarHeight = 320; // Height of marbles container
    const jarCenterX = jarWidth / 2;
    const jarBottom = jarHeight;
    const jarRadius = 120; // Radius of curved bottom
    
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
    marblesContainer.innerHTML = ''; // Clear existing marbles
    marbleBodies = [];
    marbleElements = [];
    
    // Initialize physics if not already done
    if (!isPhysicsInitialized) {
        initializePhysics();
    }
    
    const jarWidth = 240;
    const jarHeight = 320;
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
        const startX = jarCenterX + (Math.random() - 0.5) * 100; // Random x near center
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
    
    const jarHeight = 320; // Height of marbles container
    let lastTime = performance.now();
    
    function update(currentTime) {
        if (!isPhysicsInitialized || !jarScene.classList.contains('active')) {
            requestAnimationFrame(update);
            return;
        }
        
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
    coinAnimation.classList.remove('hidden');
    coinAnimation.classList.add('dropping');
    
    // Reset animation after it completes
        setTimeout(() => {
        coinAnimation.classList.remove('dropping');
        coinAnimation.classList.add('hidden');
    }, 800);
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
        
        // Reinitialize marbles for next use
        setTimeout(() => {
            initializeMarbles();
        }, 500);
    });
} else {
    console.error('Back button not found!');
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
