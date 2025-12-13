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
        text: "This was when I went to Mecha in Calgary, it was really fun. A lot of my friends expected you to also come but you didn't which was sad, but that only made me more excited for Worlds. I still remember the first night we were on call and when we arrived at the Airbnb we couldn't get in because the locks froze, and you were super sick but you still stayed up for me. It's funny because in the past you would always stay up later than I would and I would always fall asleep first. We also exchanged Valentine gifts since that was around this time and that's when you wrote me that letter lol, I can still remember opening the gifts in my room so vividly. This was also the first time I ever tried poutine, you kept saying how good McDonald's poutine was, so I had to get poutine. We went to a breakfast poutine place and I got this salmon poutine, weird order it was kinda mid lol. Anyway you were my first valentine and I was your first. Mecha was also when you started liking me, I also started really liking you here."
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
        photos: [getPhotoPath(15)], // Photo 15
        text: "This was during Worlds, we would sneak into this top area in the Omni hotel and cuddle lol. I was so happy and was trying to get away from the competition to go be with you."
    },
    {
        id: 6,
        color: "#93C5FD", // Soft sky blue
        photos: [getPhotoPath(16)], // Photo 16
        text: "This was in your hotel at Worlds when we went on the balcony and looked out the window and just laid there and talked and cuddled."
    },
    {
        id: 7,
        color: "#86EFAC", // Soft green
        photos: [getPhotoPath(7), getPhotoPath(8), getPhotoPath(9)], // Photos 7-9
        text: "This was my most vivid memory of anticipation to meet you. After so many late night talks and calls about the future we were finally going to meet in person that day in Dallas. I still remember I woke up so early that day, went to the store to get flowers and a lot of stuff, and then spent so long looking at myself in the mirror. Then your plane got delayed lol. And then when I got to your hotel it was raining but we didn't care. I still remember how fast my heart pounded when we were just separated by that door the first time."
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
        photos: [getPhotoPath(10), getPhotoPath(11)], // Photos 10-11
        text: "This was when we went to the Dallas aquarium. I've lived in Dallas for a big portion of my life but I never got to go so this was my first time going too. I remember when we got there we couldn't find the entrance for so long lol, and then we went up this path that we thought was the exit but was the entrance. Inside we took photos in the water tunnel and it was so fun. When we were leaving it was raining so hard so we had to run to my car but we still both got drenched."
    },
    {
        id: 11,
        color: "#F87171", // Soft rose
        photos: [getPhotoPath(12)], // Photo 12
        text: "Then we ended up going to the mall after and we just walked around for a bit. Whatever we did I felt so fulfilled and happy on the inside."
    },
    {
        id: 12,
        color: "#34D399", // Soft emerald
        photos: [getPhotoPath(13)], // Photo 13
        text: "This was the photo we took together in the dome for opening ceremony. I remember we sat in the very back but still got recognized by people."
    },
    {
        id: 13,
        color: "#A78BFA", // Soft violet
        photos: [getPhotoPath(14)], // Photo 14
        text: "This was when we walked around outside the convention center during a lunch break and took photos outside together. It was super hot outside especially in those Stussy hoodies lol."
    },
    {
        id: 14,
        color: "#F472B6", // Soft pink
        photos: [getPhotoPath(17)], // Photo 17
        text: "This was the BBQ we ate at Worlds on the last day."
    },
    {
        id: 15,
        color: "#818CF8", // Soft indigo
        photos: [getPhotoPath(18)], // Photo 18
        text: "This was when we went up on Reunion Tower in Dallas after Worlds. Maybe we'll see each other again sometime."
    },
    {
        id: 16,
        color: "#34D399", // Soft emerald
        photos: [getPhotoPath(19)], // Photo 19
        text: "This was the second time we met. I just got to my hotel and you got out of school. I got you flowers and I even brought my fav cookies and flower lol. I'm bringing some cookies to Paris just in case... The whole plane ride I was so excited to get off and see you."
    },
    {
        id: 17,
        color: "#FBBF24", // Soft amber
        photos: [getPhotoPath(20)], // Photo 20
        text: "We went to eat at this restaurant. I got steak and you got pizza and I remember your pizza had salami on it and it was sooo salty so I had to eat a lot of it."
    },
    {
        id: 18,
        color: "#60A5FA", // Soft blue
        photos: [getPhotoPath(21), getPhotoPath(22)], // Photos 21-22
        text: "This was the first time in Toronto when we went on a ferry to go onto the island. I remember when waiting we sat on this wooden bench and you took one of these photos."
    },
    {
        id: 19,
        color: "#A78BFA", // Soft violet
        photos: [getPhotoPath(23), getPhotoPath(24)], // Photos 23-24
        text: "This was when we took the ferry to go onto the island. The wind was super bad so our hair was getting cooked but finally on the way back we got some good photos."
    },
    {
        id: 20,
        color: "#F87171", // Soft rose
        photos: [getPhotoPath(25), getPhotoPath(26)], // Photos 25-26
        text: "I remember you were sick during this time so we even went out to buy you medicine lol and this was some food that we ate."
    },
    {
        id: 21,
        color: "#FCD34D", // Soft yellow
        photos: [getPhotoPath(27)], // Photo 27
        text: "This was the second day I was in Toronto for the first time, we went to downtown."
    },
    {
        id: 22,
        color: "#86EFAC", // Soft green
        photos: [getPhotoPath(28)], // Photo 28
        text: "We were tired and waiting for our reservation inside the YYZ tower so we sat down and look at how cute we were lol."
    },
    {
        id: 23,
        color: "#C4B5FD", // Soft purple
        photos: [getPhotoPath(29), getPhotoPath(30)], // Photos 29-30
        text: "This was when we ate together on top of the YYZ tower. It was so cool I remember it would spin. We got this sparkling water that I didn't know had alcohol in it and I called it an acquired taste lmao. I will never forget."
    },
    {
        id: 24,
        color: "#F0ABFC", // Soft fuchsia
        photos: [getPhotoPath(31), getPhotoPath(32)], // Photos 31-32
        text: "We took some really cute photos together on the YYZ tower after eating and we took an Uber back lol so expensive but it was so worth it."
    },
    {
        id: 25,
        color: "#F9A8D4", // Soft pink
        photos: [getPhotoPath(33)], // Photo 33
        text: "This was after my internship in China and I remember we still called every day even though we had a 12 or 13 hour time difference. And after my internship I flew across the world to come see you. I flew for over 20 hours but I was so excited I couldn't even sleep because I knew I was going to see you soon."
    },
    {
        id: 26,
        color: "#A5F3FC", // Soft blue
        photos: [getPhotoPath(34)], // Photo 34
        text: "This was the first whole day of the last time I was in Toronto. It was July 4th and we went to watch the fireworks at the falls and it was so pretty. It was so fun I love road trips."
    },
    {
        id: 27,
        color: "#C4B5FD", // Soft purple
        photos: [getPhotoPath(35)], // Photo 35
        text: "This was also during when we went to watch the fireworks with your parents. I remember we ate at this restaurant next to the falls and after we finished eating we started throwing food down over the balcony when no one was looking."
    },
    {
        id: 28,
        color: "#FCD34D", // Soft yellow
        photos: [getPhotoPath(36)], // Photo 36
        text: "This was when we went to a photo booth together. Makes me feel like we are such a normal couple and not LDR."
    },
    {
        id: 29,
        color: "#FCA5A5", // Soft coral
        photos: [getPhotoPath(37), getPhotoPath(38)], // Photos 37-38
        text: "We ate malatang and BBQ but we didn't finish the malatang lol. I still remember we left it in your Tesla and said we would eat it later or something."
    },
    {
        id: 30,
        color: "#93C5FD", // Soft sky blue
        photos: [getPhotoPath(39), getPhotoPath(40), getPhotoPath(41)], // Photos 39-41
        text: "Just more together photos going through Chinatowns and plazas together this summer in Markham. Made me feel so hopeful for the future and we were so in love."
    },
    {
        id: 31,
        color: "#86EFAC", // Soft green
        photos: [getPhotoPath(42), getPhotoPath(43)], // Photos 42-43
        text: "Some more yummy meals we ate. First one was the super expensive Brazilian BBQ I thought it was ok and you thought it was so expensive which was true lol. Second one was the breakfast we had. Tbh Markham/Toronto is so nice I would have no problem moving there in the future with you if I could and we were together."
    },
    {
        id: 32,
        color: "#FBBF24", // Soft amber
        photos: [getPhotoPath(44), getPhotoPath(45)], // Photos 44-45
        text: "This was a photo of us eating together at that breakfast place. I remember there was a bug behind you so then we swapped places. Second photo is more KBBQ we ate! I love KBBQ and the corn and cheese on this was so delicious."
    },
    {
        id: 33,
        color: "#F0ABFC", // Soft fuchsia
        photos: [getPhotoPath(46)], // Photo 46
        text: "This was after we both dyed our hair together in the hotel lol. I remember we went to an Asian mall and got hair dye and came back and like tried to dye it twice but it didn't really show on my hair. I think it showed on yours pretty faintly though. It looked really nice."
    },
    {
        id: 34,
        color: "#60A5FA", // Soft indigo
        photos: [getPhotoPath(47)], // Photo 47
        text: "This was the first time we went karaoking together and it was the first time I went to karaoke. It was so fun I wish we had that around my area and I could go too. I love how you sing you sing so well that's one thing I like so much about you I can never forget your voice. Your voice is so cute omg."
    },
    {
        id: 35,
        color: "#F87171", // Soft rose
        photos: [getPhotoPath(48)], // Photo 48
        text: "This was when we went to the lake together. The water was kinda cold but it was really fun. I remember I got to fly my drone around and we sat on this bench and I illegally drank some beer."
    },
    {
        id: 36,
        color: "#34D399", // Soft emerald
        photos: [getPhotoPath(49)], // Photo 49
        text: "This was after we went to that lake and beach. We went to the mall and I got this pair of black pants that you really like and I also got this watch that I still wear today. It has our initials L A engraved on the back."
    },
    {
        id: 37,
        color: "#A78BFA", // Soft violet
        photos: [getPhotoPath(50)], // Photo 50
        text: "This was when your parents got mad that you weren't studying enough and spent too much time in my hotel, so we decided to bring our date to the library and wrote essays and got work done. This was also when I launched robocoaching."
    },
    {
        id: 38,
        color: "#F472B6", // Soft pink
        photos: [getPhotoPath(51)], // Photo 51
        text: "This was when we went to eat hotpot. I remember we sat next to each other and told each other about our pasts and people we talked to and grew closer. I really don't want you to just become a person on my dating resume..."
    },
    {
        id: 39,
        color: "#818CF8", // Soft indigo
        photos: [getPhotoPath(52)], // Photo 52
        text: "This might be my favorite memory. This was the afternoon before I had to leave and we hung out in the park around your house and we biked around. I haven't biked in so long before this I basically completely forgot so it was so fun to fail and learn with you on my side. That's why I like our relationship so much and why I value it so much, because we are always failing and coming back together to learn with each other. This moment made me wish with my whole soul that we were actually living in the same neighborhood, maybe in another life."
    },
    {
        id: 40,
        color: "#FCD34D", // Soft yellow
        photos: [getPhotoPath(53)], // Photo 53
        text: "This was when we interviewed that MIT professor about the rescue robot lol. I remember you were shining so bright that day."
    },
    {
        id: 41,
        color: "#C4B5FD", // Soft purple
        photos: [getPhotoPath(54)], // Photo 54
        text: "This was the last time we met so far. We both traveled out to Jersey to volunteer at the Highlander SIG and it felt like we were traveling together and it was so much fun. We got to spend a lot of time together it was so amazing even though it was still short."
    },
    {
        id: 42,
        color: "#FCA5A5", // Soft coral
        photos: [getPhotoPath(55)], // Photo 55
        text: "Photo we took together in front of the signature event venue sign. We look so good together lol."
    },
    {
        id: 43,
        color: "#86EFAC", // Soft green
        photos: [getPhotoPath(56)], // Photo 56
        text: "This was when we went to NYC after the first day we were at the SIG. This was really fun actually even though I was tired. If I could go back I wish I would've stayed in the city for longer with you. I think moving on I would live my life more and spend more time doing stuff that I couldn't do if I went back or I couldn't go back to do again."
    },
    {
        id: 44,
        color: "#93C5FD", // Soft sky blue
        photos: [getPhotoPath(57)], // Photo 57
        text: "This was the last time we were at the airport together. It felt like we were traveling together but we couldn't go back to the same place. I wish I could've brought you back to Austin or I could've went home with you to Markham but that's just how life is I guess. I wish we could still travel in the future together but I don't know anymore after everything and I feel so hurt."
    },
    {
        id: 45,
        color: "#F9A8D4", // Soft pink
        photos: [getPhotoPath(58)], // Photo 58
        text: "This is the last photo. This was your birthday gift to me and I thought it was really amazing and I loved it so I thought it was only fair that I make one that also takes a lot of time and effort and means a lot to the both of us. So I made this memory jar because I believe all of these memories are incredibly important."
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
 * Restore marbles visibility and positions
 * Call this when returning to jar scene
 */
function restoreMarbles() {
    if (!isPhysicsInitialized) {
        return;
    }
    
    // Check if marbles exist in DOM, if not, reinitialize
    const existingMarbles = marblesContainer.querySelectorAll('.marble');
    if (existingMarbles.length === 0 && memories.length > 0) {
        // Marbles were removed, reinitialize them
        console.log('Marbles missing, reinitializing...');
        initializeMarbles();
        return;
    }
    
    // Ensure we have the same number of marbles as memories
    if (marbleElements.length !== memories.length) {
        console.log('Marble count mismatch, reinitializing...');
        initializeMarbles();
        return;
    }
    
    setTimeout(() => {
        const containerRect = marblesContainer.getBoundingClientRect();
        const jarHeight = containerRect.height || 360;
        
        marbleElements.forEach((marble, index) => {
            if (!marble) return;
            
            // Check if marble is still in DOM
            if (!marblesContainer.contains(marble)) {
                // Marble was removed from DOM, need to recreate
                console.log(`Marble ${index} missing from DOM, will reinitialize`);
                return;
            }
            
            // Make sure marble is visible
            marble.style.display = '';
            marble.style.visibility = 'visible';
            marble.style.opacity = '1';
            
            if (marbleBodies[index]) {
                const body = marbleBodies[index];
                const x = body.position.x;
                const y = body.position.y;
                
                // Update visual position immediately
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
                    
                    // Ensure marble is in DOM and visible
                    if (!marblesContainer.contains(marble)) {
                        // Marble was removed, recreate it
                        marblesContainer.appendChild(marble);
                    }
                    
                    const x = body.position.x;
                    const y = body.position.y;
                    
                    // Convert physics coordinates to CSS (container is positioned relative)
                    // Physics Y=0 is at top, CSS bottom=0 is at bottom, so we flip
                    marble.style.left = (x - 20) + 'px'; // Subtract half marble size (40px / 2)
                    marble.style.bottom = (jarHeight - y - 20) + 'px'; // Flip Y axis and subtract half size
                    marble.style.transform = `rotate(${body.angle}rad)`;
                    marble.style.display = ''; // Ensure marble is visible
                    marble.style.visibility = 'visible';
                    marble.style.opacity = '1';
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
            
            // Also call restoreMarbles to ensure everything is visible
            restoreMarbles();
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
    
    // Restore marbles visibility when returning to jar
    // Use a longer delay to ensure scene transition is complete
    setTimeout(() => {
        restoreMarbles();
    }, 150);
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
// Removed mouse tracking to prevent marbles from disappearing

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
