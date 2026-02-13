const questions = [
    "Are you having a good day so far? 😊",
    "Do you think I'm cool? 😎",
    "Wait... are you actually the cutest? ✨",
    "Are we the best couple ever? 💖",
    "Will you be my Valentine forever? 🌹"
];

const messages = ["Nope! 😜", "Try harder! 😂", "Too slow! 🏃‍♀️", "Not a chance! 💀", "Nice try! 🎯"];

let currentStep = 0;
let userName = "";

const entryScreen = document.getElementById('entry-screen');
const content = document.getElementById('content');
const success = document.getElementById('success');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const questionText = document.getElementById('questionText');
const messageText = document.getElementById('messageText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const buttonArea = document.getElementById('buttonArea');
const tauntSound = document.getElementById('tauntSound');
const victoryHeading = document.getElementById('victoryHeading');

// --- AUDIO UNLOCKER ---
// This ensures that the very first click on the page "activates" the sound
const unlockAudio = () => {
    tauntSound.play().then(() => {
        tauntSound.pause();
        tauntSound.currentTime = 0;
    }).catch(e => console.log("Audio waiting for interaction..."));
    window.removeEventListener('click', unlockAudio);
};
window.addEventListener('click', unlockAudio);

// Start Game and Capture Name
startBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();
    if (userName === "") {
        alert("Please enter your name to proceed! ❤️");
        return;
    }

    // Force wake up the audio on this specific click
    tauntSound.play().then(() => {
        tauntSound.pause();
        tauntSound.currentTime = 0;
    }).catch(() => {});

    entryScreen.classList.add('hidden');
    content.classList.remove('hidden');
});

yesBtn.addEventListener('click', () => {
    if (currentStep < questions.length - 1) {
        currentStep++;
        questionText.innerText = questions[currentStep];
        messageText.innerText = ""; 
        
        // Reset No button position for the next question
        noBtn.style.position = 'relative';
        noBtn.style.left = '0';
        noBtn.style.top = '0';
    } else {
        showSuccess();
    }
});

const teleportNoButton = () => {
    // Starts movement from "Wait... are you actually the cutest?"
     // Reset and Play sound
       if (currentStep >= 2) {
        // ONLY play if the sound isn't already playing
        if (tauntSound.paused) {
            tauntSound.play().catch(()=>{});
        }
        // Show random message
        messageText.innerText = messages[Math.floor(Math.random() * messages.length)];

        // Teleportation logic
        noBtn.style.position = 'absolute';
        const areaWidth = buttonArea.clientWidth;
        const areaHeight = buttonArea.clientHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Stay within the card boundaries
        const newX = Math.floor(Math.random() * (areaWidth - btnWidth));
        const newY = Math.floor(Math.random() * (areaHeight - btnHeight));

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    }
};

noBtn.addEventListener('mouseover', teleportNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // CRITICAL: Stops the tap from clicking the button
    teleportNoButton();
});

function showSuccess() {
    victoryHeading.innerText = `Yay! I Knew It, ${userName}! 🥰`;
    content.classList.add('hidden');
    success.classList.remove('hidden');
    
    // Continuous Sprinkles (Birthday style)
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        confetti({
            particleCount: 40,
            startVelocity: 30,
            spread: 360,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#ffd166', '#ffffff', '#06d6a0', '#118ab2']
        });
    }, 200);
}