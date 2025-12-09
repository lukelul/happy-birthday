// ============================================
// MEMORY DATA STRUCTURE
// ============================================
// Easy to edit: Add new memories here!
// Each memory needs: id, color, photo (URL or path), and text

// Helper function to get photo path (tries .jpg first, then .heic)
function getPhotoPath(num) {
    return `images/${num}.jpg`; // Will try .heic as fallback in image loading
}

// Helper function to try loading image with different extensions
function tryLoadImage(img, basePath) {
    // Prioritize JPG and PNG since most photos are converted, then HEIC as fallback
    const extensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.HEIC', '.heic'];
    let currentIndex = 0;
    let isLoaded = false;
    
    function tryNext() {
        if (isLoaded) return; // Already loaded successfully
        
        if (currentIndex >= extensions.length) {
            // All extensions failed, show placeholder
            img.style.display = 'none';
            const placeholder = img.nextElementSibling;
            if (placeholder && (placeholder.classList.contains('image-placeholder') || placeholder.classList.contains('memory-card-placeholder') || placeholder.classList.contains('memory-detail-placeholder') || placeholder.classList.contains('memory-photo-placeholder'))) {
                placeholder.style.display = 'flex';
            }
            return;
        }
        
        // Strip any existing extension and try with new extension
        const base = basePath.replace(/\.(jpg|heic|JPG|HEIC|jpeg|JPEG|png|PNG)$/i, '');
        const path = base + extensions[currentIndex];
        img.src = path;
        currentIndex++;
    }
    
    img.onerror = tryNext;
    img.onload = () => {
        if (!isLoaded) {
            isLoaded = true;
            img.style.display = 'block';
            const placeholder = img.nextElementSibling;
            if (placeholder && (placeholder.classList.contains('image-placeholder') || placeholder.classList.contains('memory-card-placeholder') || placeholder.classList.contains('memory-detail-placeholder') || placeholder.classList.contains('memory-photo-placeholder'))) {
                placeholder.style.display = 'none';
            }
        }
    };
    
    tryNext();
}

const memories = [
    {
        id: 1,
        color: "#F9A8D4", // Soft pink
        photos: [getPhotoPath(1)], // Photo 1
        text: "I remember this was the first time we called all the way back in January and I was super happy so I screenshotted and saved it."
    },
    {
        id: 2,
        color: "#A5F3FC", // Soft blue
        photos: [getPhotoPath(2)], // Photo 2
        text: "This was one of my most memorable chat moments with you lol, I think this was the exact moment I started gaining feelings."
    },
    {
        id: 3,
        color: "#C4B5FD", // Soft purple
        photos: [getPhotoPath(3)], // Photo 3
        text: "This was when I went to Mecha in Calgary, it was really fun. A lot of my friends expected you to also come but you didn't which was sad, but that only made me more excited for Worlds. I still remember the first night we were on call and when we arrived at the Airbnb we couldn't get in because the locks froze, and you were super sick but you still stayed up for me. It's funny because in the past you would always stay up later than I would and I would always fall asleep first."
    },
    {
        id: 4,
        color: "#FCD34D", // Soft yellow
        photos: [getPhotoPath(4), getPhotoPath(5), getPhotoPath(6)], // Photos 4-6
        text: "This was one of the times we played Minecraft. I remember I found this map that was fun to explore and we ran around and found the highest building to climb on and I placed a sign up there so you wouldn't know, and you thought it was already there lol."
    },
    {
        id: 5,
        color: "#FCA5A5", // Soft coral
        photos: [getPhotoPath(21), getPhotoPath(22), getPhotoPath(23), getPhotoPath(24), getPhotoPath(25)], // Photos 21-25
        text: "Our first laugh together… That moment when we both couldn't stop giggling, and I realized how much joy you bring into my life."
    },
    {
        id: 6,
        color: "#93C5FD", // Soft sky blue
        photos: [getPhotoPath(26), getPhotoPath(27), getPhotoPath(28), getPhotoPath(29), getPhotoPath(30)], // Photos 26-30
        text: "The surprise you planned for me… Your thoughtfulness and the way you care about making me happy means everything to me."
    },
    {
        id: 7,
        color: "#86EFAC", // Soft green
        photos: [getPhotoPath(31), getPhotoPath(32), getPhotoPath(33), getPhotoPath(34), getPhotoPath(35)], // Photos 31-35
        text: "The day we tried that new restaurant… Your excitement about trying new foods together made every meal an adventure."
    },
    {
        id: 8,
        color: "#FBBF24", // Soft amber
        photos: [getPhotoPath(36), getPhotoPath(37), getPhotoPath(38), getPhotoPath(39), getPhotoPath(40)], // Photos 36-40
        text: "Our first road trip… Singing along to our favorite songs, getting lost, and making memories that will last forever."
    },
    {
        id: 9,
        color: "#F0ABFC", // Soft fuchsia
        photos: [getPhotoPath(41), getPhotoPath(42), getPhotoPath(43), getPhotoPath(44), getPhotoPath(45)], // Photos 41-45
        text: "That time we stayed up all night talking… When the sun rose, I realized I never wanted those conversations to end."
    },
    {
        id: 10,
        color: "#60A5FA", // Soft indigo
        photos: [getPhotoPath(46), getPhotoPath(47), getPhotoPath(48), getPhotoPath(49)], // Photos 46-49
        text: "The first time you made me breakfast… It wasn't perfect, but it was made with love, and that made it perfect to me."
    },
    {
        id: 11,
        color: "#F87171", // Soft rose
        photos: [getPhotoPath(50), getPhotoPath(51), getPhotoPath(52), getPhotoPath(53)], // Photos 50-53
        text: "Dancing in the living room to our favorite song… Just the two of us, lost in the moment and each other."
    },
    {
        id: 12,
        color: "#34D399", // Soft emerald
        photos: [getPhotoPath(54), getPhotoPath(55), getPhotoPath(56), getPhotoPath(57), getPhotoPath(58)], // Photos 54-58
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
const memoryPhotosWrapper = document.getElementById('memory-photos-wrapper');
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
        if (!isPhysicsInitialized) {
            physicsUpdateRunning = false;
            return;
        }
        
        // Continue physics even when jar scene is inactive, but only update visuals when active
        const isJarSceneActive = jarScene.classList.contains('active');
        
        // Get current container dimensions (in case of resize)
        const containerRect = marblesContainer.getBoundingClientRect();
        const jarHeight = containerRect.height || 360;
        
        // Calculate delta time - cap it to prevent large jumps when tab becomes active
        let delta = currentTime - lastTime;
        if (delta > 1000) delta = 16; // Cap at ~60fps if tab was inactive
        lastTime = currentTime;
        
        // Always update physics engine (even when scene is inactive)
        Engine.update(engine, delta);
        
        // Only update visual positions when jar scene is active
        if (isJarSceneActive) {
            // Get current container dimensions (in case of resize)
            const containerRect = marblesContainer.getBoundingClientRect();
            const jarHeight = containerRect.height || 360;
            
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
                    marble.style.display = ''; // Ensure marble is visible
                }
            });
        }
        
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
    // First, switch to memory scene (but keep it hidden initially)
    jarScene.classList.remove('active');
    memoryScene.classList.add('active');
    
    // Show revealed marble animation
    revealedMarble.classList.remove('hidden');
    
    // Set memory content data (but keep it hidden)
    // Clear existing photos
    if (memoryPhotosWrapper) {
        memoryPhotosWrapper.innerHTML = '';
    }
    
    // Load all photos
    const photos = memory.photos || [];
    if (photos.length > 0) {
        photos.forEach((photoPath, index) => {
            const img = document.createElement('img');
            img.className = 'memory-photo-item';
            img.alt = `Memory ${memory.id} - Photo ${index + 1}`;
            
            const placeholder = document.createElement('div');
            placeholder.className = 'memory-photo-placeholder';
            placeholder.style.display = 'none';
            placeholder.innerHTML = '<span>💕</span>';
            
            memoryPhotosWrapper.appendChild(img);
            memoryPhotosWrapper.appendChild(placeholder);
            
            // Try loading image with fallback extensions
            if (photoPath) {
                tryLoadImage(img, photoPath);
            } else {
                img.style.display = 'none';
                placeholder.style.display = 'flex';
            }
        });
    } else {
        // No photos, show placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'memory-photo-placeholder';
        placeholder.style.display = 'flex';
        placeholder.innerHTML = '<span>💕</span>';
        memoryPhotosWrapper.appendChild(placeholder);
    }
    
    memoryText.textContent = memory.text;
    
    // Ensure memory content is hidden initially
    memoryContent.classList.add('hidden');
    memoryContent.classList.remove('show');
    backBtn.classList.add('hidden');
    
    // After marble expands, show memory content
    setTimeout(() => {
        revealedMarble.classList.add('hidden');
        
        // Now show memory content (scene is already switched)
        memoryContent.classList.remove('hidden');
        memoryContent.classList.add('show');
        backBtn.classList.remove('hidden');
        
        // Reset for next use
        isAnimating = false;
        insertCoinBtn.disabled = false;
        
        // Don't remove 'popping' class here - keep it until we return to jar
        // This prevents the popped marble from reappearing
        marbleElements.forEach(marble => {
            marble.classList.remove('swirling');
            // Keep 'popping' class - will be removed when returning to jar
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
        
        // Restore the popped marble and ensure all marbles are visible
        // Remove 'popping' class from any marbles that were popped and reset their position
        setTimeout(() => {
            const containerRect = marblesContainer.getBoundingClientRect();
            const jarHeight = containerRect.height || 360;
            
            marbleElements.forEach((marble, index) => {
                // Make sure marble is visible
                marble.style.display = '';
                
                if (marble.classList.contains('popping')) {
                    // Remove popping class and reset the marble's position
                    marble.classList.remove('popping');
                    if (marbleBodies[index]) {
                        const jarWidth = containerRect.width || 280;
                        const jarCenterX = jarWidth / 2;
                        
                        // Reset position to top of jar and let it fall
                        Body.setPosition(marbleBodies[index], {
                            x: jarCenterX + (Math.random() - 0.5) * 100,
                            y: 50 + Math.random() * 50
                        });
                        Body.setVelocity(marbleBodies[index], {
                            x: (Math.random() - 0.5) * 0.5,
                            y: 2 + Math.random() * 2
                        });
                        
                        // Update visual position immediately
                        marble.style.left = (marbleBodies[index].position.x - 20) + 'px';
                        marble.style.bottom = (jarHeight - marbleBodies[index].position.y - 20) + 'px';
                    }
                } else {
                    // For marbles that weren't popped, restore their visual position from physics
                    if (marbleBodies[index]) {
                        const body = marbleBodies[index];
                        const x = body.position.x;
                        const y = body.position.y;
                        
                        // Update visual position immediately
                        marble.style.left = (x - 20) + 'px';
                        marble.style.bottom = (jarHeight - y - 20) + 'px';
                        marble.style.transform = `rotate(${body.angle}rad)`;
                    }
                }
            });
        }, 50);
        
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
        memoryCard.setAttribute('data-memory-id', memory.id);
        memoryCard.style.cursor = 'pointer';
        
        // Get first photo from photos array
        const firstPhoto = memory.photos && memory.photos.length > 0 ? memory.photos[0] : '';
        const photoCount = memory.photos ? memory.photos.length : 0;
        
        memoryCard.innerHTML = `
            <div class="memory-card-marble" style="background-color: ${memory.color}; color: ${memory.color};"></div>
            <div class="memory-card-content">
                <div class="memory-card-photo-frame">
                    <img src="${firstPhoto}" alt="Memory ${memory.id}" class="memory-card-photo" data-photo-base="${firstPhoto ? firstPhoto.replace(/\.(jpg|heic|JPG|HEIC|jpeg|JPEG|png|PNG)$/i, '') : ''}">
                    <div class="memory-card-placeholder" style="display: none;">
                        <span>💕</span>
                    </div>
                    ${photoCount > 1 ? `<div class="photo-count-badge">${photoCount} photos</div>` : ''}
                </div>
                <div class="memory-card-text">
                    <p>${memory.text}</p>
                </div>
            </div>
        `;
        
        // Try loading image with fallback extensions
        const cardPhoto = memoryCard.querySelector('.memory-card-photo');
        if (cardPhoto && firstPhoto) {
            tryLoadImage(cardPhoto, firstPhoto);
        }
        
        // Add click event to show detailed view
        memoryCard.addEventListener('click', () => {
            showMemoryDetail(memory);
        });
        
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
    // Close any open detail view
    const detailView = document.getElementById('memory-detail-view');
    if (detailView) {
        detailView.classList.remove('active');
    }
}

/**
 * Show detailed view of a memory
 */
function showMemoryDetail(memory) {
    let detailView = document.getElementById('memory-detail-view');
    
    // Create detail view if it doesn't exist
    if (!detailView) {
        detailView = document.createElement('div');
        detailView.id = 'memory-detail-view';
        detailView.className = 'memory-detail-view';
        detailView.innerHTML = `
            <div class="memory-detail-overlay"></div>
            <div class="memory-detail-content">
                <button class="memory-detail-close">×</button>
                <div class="memory-detail-marble"></div>
                <div class="memory-detail-photos-container">
                    <!-- Photos will be dynamically added here -->
                </div>
                <div class="memory-detail-text">
                    <p></p>
                </div>
            </div>
        `;
        document.body.appendChild(detailView);
        
        // Close button event
        const closeBtn = detailView.querySelector('.memory-detail-close');
        const overlay = detailView.querySelector('.memory-detail-overlay');
        
        closeBtn.addEventListener('click', () => {
            detailView.classList.remove('active');
        });
        
        overlay.addEventListener('click', () => {
            detailView.classList.remove('active');
        });
    }
    
    // Update content
    const marble = detailView.querySelector('.memory-detail-marble');
    const text = detailView.querySelector('.memory-detail-text p');
    const photoContainer = detailView.querySelector('.memory-detail-photos-container');
    
    marble.style.backgroundColor = memory.color;
    marble.style.color = memory.color;
    text.textContent = memory.text;
    
    // Clear existing photos
    photoContainer.innerHTML = '';
    
    // Load all photos - filter out duplicate paths (same photo number with different extensions)
    const photos = memory.photos || [];
    // Get unique photo numbers (remove extension variations)
    const uniquePhotos = [];
    const seen = new Set();
    
    photos.forEach(photoPath => {
        if (!photoPath) return;
        // Extract photo number (e.g., "images/1.jpg" -> "1")
        const match = photoPath.match(/images\/(\d+)/);
        if (match) {
            const photoNum = match[1];
            if (!seen.has(photoNum)) {
                seen.add(photoNum);
                uniquePhotos.push(photoPath);
            }
        }
    });
    
    if (uniquePhotos.length > 0) {
        uniquePhotos.forEach((photoPath, index) => {
            const photoWrapper = document.createElement('div');
            photoWrapper.className = 'memory-detail-photo-wrapper';
            
            const img = document.createElement('img');
            img.className = 'memory-detail-photo';
            img.alt = `Memory ${memory.id} - Photo ${index + 1}`;
            
            const placeholder = document.createElement('div');
            placeholder.className = 'memory-detail-placeholder';
            placeholder.style.display = 'none';
            placeholder.innerHTML = '<span>💕</span>';
            
            photoWrapper.appendChild(img);
            photoWrapper.appendChild(placeholder);
            photoContainer.appendChild(photoWrapper);
            
            // Try loading image with fallback extensions
            tryLoadImage(img, photoPath);
        });
    } else {
        // No photos, show placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'memory-detail-placeholder';
        placeholder.style.display = 'flex';
        placeholder.innerHTML = '<span>💕</span>';
        photoContainer.appendChild(placeholder);
    }
    
    // Show detail view
    detailView.classList.add('active');
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
 * Note: Image loading is now handled by tryLoadImage function for all images
 */

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

// ============================================
// TAB VISIBILITY HANDLING
// ============================================

/**
 * Handle tab visibility changes to ensure marbles remain visible
 */
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && jarScene.classList.contains('active')) {
        // Tab became visible and jar scene is active
        // Ensure marbles are visible and physics is running
        setTimeout(() => {
            const containerRect = marblesContainer.getBoundingClientRect();
            const jarHeight = containerRect.height || 360;
            
            marbleElements.forEach((marble, index) => {
                if (marble && !marble.classList.contains('popping') && marbleBodies[index]) {
                    // Make sure marble is visible
                    marble.style.display = '';
                    
                    // Update visual position from physics
                    const body = marbleBodies[index];
                    const x = body.position.x;
                    const y = body.position.y;
                    
                    marble.style.left = (x - 20) + 'px';
                    marble.style.bottom = (jarHeight - y - 20) + 'px';
                    marble.style.transform = `rotate(${body.angle}rad)`;
                }
            });
            
            // Ensure physics update is running
            if (!physicsUpdateRunning && isPhysicsInitialized) {
                startPhysicsUpdate();
            }
        }, 100);
    }
});

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
        
        // Move jar visually (but don't affect marble physics)
        const translateX = mouseX * 20;
        const translateY = mouseY * 20;
        jar.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${jarTiltY * 5}deg) rotateY(${jarTiltX * 5}deg)`;
        
        // Keep gravity constant - marbles don't move with mouse
        if (engine && isPhysicsInitialized) {
            engine.world.gravity.x = 0;
            engine.world.gravity.y = 1.5; // Constant downward gravity
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
