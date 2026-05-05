/* ── Three.js 3D Cloud Scene ── */
const canvas = document.getElementById('cloudCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 35;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);
const sunLight = new THREE.DirectionalLight(0xfff4e0, 0.8);
sunLight.position.set(10, 20, 10);
scene.add(sunLight);

// Create a fluffy cloud group from overlapping spheres
function createCloud(scale) {
  const group = new THREE.Group();
  const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 });

  const puffs = [
    { p: [0,    0,    0],  r: 1.5 },
    { p: [2.0,  0.2,  0],  r: 1.2 },
    { p: [-2.0, 0.2,  0],  r: 1.2 },
    { p: [1.0,  1.0,  0],  r: 1.0 },
    { p: [-1.0, 1.0,  0],  r: 1.0 },
    { p: [0,    0.6,  1.0], r: 1.0 },
    { p: [0,    0.6, -1.0], r: 1.0 },
    { p: [0,    1.5,  0],  r: 0.8 },
  ];

  puffs.forEach(({ p, r }) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r * scale, 9, 9),
      mat.clone()
    );
    mesh.position.set(p[0] * scale, p[1] * scale, p[2] * scale);
    group.add(mesh);
  });

  return group;
}

// Populate scene with clouds
const clouds = [];
const NUM_CLOUDS = 18;

for (let i = 0; i < NUM_CLOUDS; i++) {
  const scale = 0.4 + Math.random() * 1.6;
  const cloud = createCloud(scale);
  cloud.position.set(
    (Math.random() - 0.5) * 90,
    (Math.random() - 0.5) * 22,
    -5 + (Math.random() - 0.5) * 20
  );
  cloud.userData.speed    = 0.015 + Math.random() * 0.04;
  cloud.userData.rotSpeed = (Math.random() - 0.5) * 0.002;
  scene.add(cloud);
  clouds.push(cloud);
}

// Gentle camera bob
let tick = 0;

function animate() {
  requestAnimationFrame(animate);
  tick += 0.005;
  camera.position.y = Math.sin(tick) * 1.5;

  clouds.forEach(cloud => {
    cloud.position.x += cloud.userData.speed;
    cloud.rotation.y  += cloud.userData.rotSpeed;
    if (cloud.position.x > 60) {
      cloud.position.x = -60;
      cloud.position.y = (Math.random() - 0.5) * 22;
    }
  });

  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ── Weather Maker ── */
let rainInterval = null;
let lightningTimer = null;

function setWeather(type) {
  const display   = document.getElementById('weather-display');
  const msg       = document.getElementById('weather-msg');
  const rainBox   = document.getElementById('rain-container');

  // Clean up previous state
  rainBox.innerHTML = '';
  if (rainInterval)    { clearInterval(rainInterval);  rainInterval   = null; }
  if (lightningTimer)  { clearTimeout(lightningTimer); lightningTimer = null; }
  display.className = 'weather-display';

  const setColor = hex => clouds.forEach(c => c.children.forEach(m => m.material.color.setHex(hex)));

  switch (type) {
    case 'sunny':
      display.classList.add('weather-sunny');
      msg.textContent = '☀️ Beautiful sunshine! Not a cloud in sight!';
      setColor(0xffffff);
      break;

    case 'cloudy':
      display.classList.add('weather-cloudy');
      msg.textContent = '☁️ Overcast skies — the clouds are rolling in…';
      setColor(0xdddddd);
      break;

    case 'rainy':
      display.classList.add('weather-rainy');
      msg.textContent = "🌧️ It's raining! The clouds are crying!";
      spawnRain(rainBox, 40);
      setColor(0xaaaaaa);
      break;

    case 'stormy':
      display.classList.add('weather-stormy');
      msg.textContent = '⛈️ STORM! Thunder and lightning!';
      spawnRain(rainBox, 80);
      scheduleLightning(display);
      setColor(0x666666);
      break;

    case 'night':
      display.classList.add('weather-night');
      msg.textContent = '🌙 Night clouds — mysterious and beautiful!';
      setColor(0x8899cc);
      break;
  }
}

function spawnRain(container, count) {
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left              = Math.random() * 100 + '%';
    drop.style.animationDuration = (0.35 + Math.random() * 0.55) + 's';
    drop.style.animationDelay    = (Math.random() * 2) + 's';
    drop.style.opacity           = 0.4 + Math.random() * 0.6;
    container.appendChild(drop);
  }
}

function scheduleLightning(container) {
  const flash = () => {
    container.classList.add('lightning');
    setTimeout(() => container.classList.remove('lightning'), 100);
    lightningTimer = setTimeout(flash, 1800 + Math.random() * 3000);
  };
  lightningTimer = setTimeout(flash, 800);
}

/* ── Cloud Quiz ── */
const QUESTIONS = [
  {
    q: 'What is the highest type of cloud?',
    opts: ['Cumulus', 'Noctilucent', 'Cirrus', 'Stratus'],
    ans: 1,
    exp: 'Noctilucent clouds form at about 80 km altitude — near the edge of space!'
  },
  {
    q: 'What are cirrus clouds made of?',
    opts: ['Water droplets', 'Dust particles', 'Ice crystals', 'Water vapour'],
    ans: 2,
    exp: 'Cirrus clouds form so high up they are made entirely of ice crystals!'
  },
  {
    q: 'How much does a typical cumulus cloud weigh?',
    opts: ['500 kg', '5,000 kg', '500,000 kg', '5,000,000 kg'],
    ans: 2,
    exp: 'A typical cumulus cloud weighs about 500,000 kg — equal to roughly 100 elephants!'
  },
  {
    q: 'Which cloud type produces thunderstorms?',
    opts: ['Cirrus', 'Stratus', 'Altocumulus', 'Cumulonimbus'],
    ans: 3,
    exp: 'Cumulonimbus are the giant storm clouds that produce thunder, lightning, and heavy rain!'
  },
  {
    q: 'What percentage of Earth is covered by clouds at any time?',
    opts: ['25%', '45%', '67%', '90%'],
    ans: 2,
    exp: 'About 67 % of Earth\'s surface is covered by clouds at any given moment!'
  },
  {
    q: 'What planet has clouds made of sulfuric acid?',
    opts: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    ans: 1,
    exp: 'Venus has thick clouds of sulfuric acid, making it incredibly hostile despite being Earth\'s neighbour!'
  },
  {
    q: 'How many cloud droplets make one raindrop?',
    opts: ['100', '10,000', '1,000,000', '1 billion'],
    ans: 2,
    exp: 'It takes about 1 million tiny cloud droplets to combine and form a single raindrop!'
  },
];

let currentQ = -1;
let score    = 0;

function nextQuestion() {
  currentQ++;
  if (currentQ >= QUESTIONS.length) { endQuiz(); return; }

  const q = QUESTIONS[currentQ];
  document.getElementById('quiz-question').textContent = `Q${currentQ + 1}: ${q.q}`;
  document.getElementById('quiz-feedback').textContent = '';

  const optsDiv = document.getElementById('quiz-options');
  optsDiv.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => checkAnswer(i, q, btn));
    optsDiv.appendChild(btn);
  });

  const nextBtn = document.querySelector('.quiz-btn');
  nextBtn.textContent  = 'Next Question ▶';
  nextBtn.style.display = 'none';
}

function checkAnswer(selected, q, btn) {
  document.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; });
  const feedback = document.getElementById('quiz-feedback');
  const allBtns  = document.querySelectorAll('.option-btn');

  if (selected === q.ans) {
    btn.classList.add('correct');
    feedback.textContent = `✅ Correct! ${q.exp}`;
    feedback.style.color = '#2ecc71';
    score++;
  } else {
    btn.classList.add('wrong');
    allBtns[q.ans].classList.add('correct');
    feedback.textContent = `❌ Not quite! ${q.exp}`;
    feedback.style.color = '#e74c3c';
  }

  const nextBtn = document.querySelector('.quiz-btn');
  nextBtn.style.display = 'inline-block';
}

function endQuiz() {
  document.getElementById('quiz-question').textContent =
    `Quiz complete! You scored ${score} / ${QUESTIONS.length}!`;
  document.getElementById('quiz-options').innerHTML = '';

  const feedback = document.getElementById('quiz-feedback');
  if (score === QUESTIONS.length) {
    feedback.textContent = '🌟 Perfect score! You\'re a cloud expert!';
  } else if (score >= Math.ceil(QUESTIONS.length * 0.7)) {
    feedback.textContent = '☁️ Great job! You really know your clouds!';
  } else {
    feedback.textContent = '🌧️ Keep learning — the sky\'s the limit!';
  }
  feedback.style.color = '#f39c12';

  const btn = document.querySelector('.quiz-btn');
  btn.textContent   = 'Play Again ↺';
  btn.style.display = 'inline-block';
  btn.onclick       = () => { currentQ = -1; score = 0; nextQuestion(); };
}
