const questions = [
    "Are you having a good day so far? 😊",
    "Do you think I'm cool? 😎",
    "Wait... are you actually the cutest person alive? ✨",
    "Are we the best couple ever? 💖",
    "Will you be my Valentine forever? 🌹"
];

let currentStep = 0;
const questionText = document.getElementById('questionText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const buttonArea = document.getElementById('buttonArea');

// Progression logic
yesBtn.addEventListener('click', () => {
    if (currentStep < questions.length - 1) {
        currentStep++;
        questionText.innerText = questions[currentStep];
        
        // Reset No button position if it moved
        noBtn.style.position = 'relative';
        noBtn.style.left = '0';
        noBtn.style.top = '0';
    } else {
        showSuccess();
    }
});

// The "Chase" logic - starts from question 3 (index 2)
const moveNoButton = () => {
    if (currentStep >= 2) {
        noBtn.style.position = 'absolute';
        
        // Get dimensions of the container
        const areaWidth = buttonArea.clientWidth;
        const areaHeight = buttonArea.clientHeight;
        const btnWidth = noBtn.clientWidth;
        const btnHeight = noBtn.clientHeight;

        // Calculate random position inside the buttonArea
        const newX = Math.random() * (areaWidth - btnWidth);
        const newY = Math.random() * (areaHeight - btnHeight);

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    }
};

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents clicking on mobile
    moveNoButton();
});

function showSuccess() {
    document.getElementById('content').classList.add('hidden');
    document.getElementById('success').classList.remove('hidden');
    
    // Confetti explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ff758f']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ff758f']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}