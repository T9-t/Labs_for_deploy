const cups = Array.from(document.querySelectorAll('.cup'));
const candies = cups.map(c => c.querySelector('.candy'));
let secretIndex = Math.floor(Math.random() * 3);
let canClick = true;
const scareBox = document.getElementById('scareBox');
const scareText = document.getElementById('scareText');
const scareEmoji = document.getElementById('scareEmoji');
const confettiLayer = document.getElementById('confettiLayer');
const winPanel = document.getElementById('winPanel');
const playAgainBtn = document.getElementById('playAgain');
const container = document.getElementById('ghostContainer');
let rounds = 0;

function updateCandyVisibility() {
  candies.forEach((c, idx) => {
    c.style.display = (idx === secretIndex) ? 'block' : 'none';
  });
}

function shuffleCups() {
  const old = secretIndex;
  let next = Math.floor(Math.random() * 3);
  let tries = 0;
  while (next === old && tries < 5) {
    next = Math.floor(Math.random() * 3);
    tries++;
  }
  secretIndex = next;
  updateCandyVisibility();

  cups.forEach((cup) => {
    cup.addEventListener('click', () => {
      cup.classList.add('selected');
    });

    const dx = (Math.random() - 0.5) * 18;
    const rot = (Math.random() - 0.5) * 8;
    cup.style.transition = 'transform 180ms ease';
    cup.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
    setTimeout(() => { cup.style.transform = 'translateX(0) rotate(0deg)'; }, 180);
  });
}

function showWin() {
  canClick = false;
  winPanel.style.display = 'block';
  spawnConfetti(120);
}

function spawnConfetti(count) {
  const colors = ['#f44336','#ff9800','#ffd166','#4caf50','#a014c4'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-20px';
    piece.style.width = (6 + Math.random() * 6) + 'px';
    piece.style.height = (10 + Math.random() * 10) + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    piece.style.animationDuration = (1.2 + Math.random()*1.2) + 's';
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 2500);
  }
}

function resetGame() {
  secretIndex = Math.floor(Math.random() * 3);
  updateCandyVisibility();

  winPanel.style.display = 'none';
  confettiLayer.innerHTML = '';
  canClick = true;
      
  shuffleCups();
  cups.forEach((cup) => {
    cup.classList.remove('selected'); 
  });
}

cups.forEach((cup, idx) => {
  cup.addEventListener('click', () => {
    if (!canClick) return;
    rounds++;

    if (idx === secretIndex) {
      showWin();
    } else {
      for (let i = 0; i < 8; i++) {
        createGhost();
      }
    }
  });
});

function createGhost() {
  const ghost = document.createElement('div');
  ghost.classList.add('ghost');
      
  const img = document.createElement('img');
  img.src = 'grost.png';
  ghost.appendChild(img);

  const padding = 10;
  const randomLeft = Math.random() * (100 - padding * 2) + padding;
  ghost.style.left = `${randomLeft}vw`;

  const duration = Math.random() * 1.5 + 1.2;
  
  const waveDuration = Math.random() * 1.5 + 1.5;
  ghost.style.animationDuration = `${duration}s, ${waveDuration}s`;

  container.appendChild(ghost);

  setTimeout(() => {
    ghost.remove();
  }, duration * 1000); 
}

playAgainBtn.addEventListener('click', resetGame);
updateCandyVisibility();
shuffleCups();