// --- KONFIGURASI ---
// Kecepatan lari background (Saya turunkan sedikit biar pas dengan layangan yang slow)
const SCROLL_SPEED = 5;

// --- SELECTORS ---
const sceneryLayer = document.getElementById('scenery-layer');
const cloudLayer = document.getElementById('cloud-layer');
const kite = document.getElementById('kite');
const kid = document.getElementById('kid');

const sceneryPool = [];

// --- 1. SPAWNING SYSTEM ---
function createScenery(type, xPos) {
    const el = document.createElement('div');
    el.classList.add('scenery-obj', type);

    const scale = gsap.utils.random(0.8, 1.5);

    if (type === 'tree') {
        el.innerHTML = `<div class="leaves"></div><div class="trunk"></div>`;
        gsap.set(el, { scale: scale, transformOrigin: "bottom center" });

        // Daun bergoyang lebih pelan
        gsap.to(el.querySelector('.leaves'), {
            rotation: 8, duration: gsap.utils.random(2.5, 4),
            yoyo: true, repeat: -1, ease: "sine.inOut"
        });
    }
    else if (type === 'grass') {
        const color = gsap.utils.random(["#66BB6A", "#43A047", "#81C784"]);
        el.style.borderBottomColor = color;
    }
    else if (type === 'cloud') {
        el.style.width = gsap.utils.random(100, 200) + 'px';
        el.style.height = gsap.utils.random(40, 80) + 'px';
        el.style.top = gsap.utils.random(5, 30) + '%';
        el.style.opacity = gsap.utils.random(0.6, 0.9);
    }

    if (type === 'cloud') cloudLayer.appendChild(el);
    else sceneryLayer.appendChild(el);

    sceneryPool.push({
        element: el,
        x: xPos,
        type: type,
        speedFactor: type === 'cloud' ? 0.2 : 1.0
    });
}

// Inisialisasi
for (let i = 0; i < window.innerWidth * 1.5; i += 200) createScenery('tree', i);
for (let i = 0; i < window.innerWidth * 1.5; i += 40) createScenery('grass', i);
for (let i = 0; i < window.innerWidth * 1.5; i += 250) createScenery('cloud', i);


// --- 2. ANIMASI KARAKTER ---
gsap.set(kid, { x: window.innerWidth * 0.15 });

const runTl = gsap.timeline({ repeat: -1, yoyo: true });
runTl.to(".left-leg", { rotation: 50, duration: 0.25, ease: "power1.inOut" }, "start") // Sedikit diperlambat (0.2 -> 0.25)
    .to(".right-arm", { rotation: -50, duration: 0.25, ease: "power1.inOut" }, "start")
    .to(".right-leg", { rotation: -50, duration: 0.25, ease: "power1.inOut" }, "start")
    .to(".left-arm", { rotation: 50, duration: 0.25, ease: "power1.inOut" }, "start");

gsap.to(".kid", { y: -15, duration: 0.125, yoyo: true, repeat: -1, ease: "sine.inOut" });


// --- 3. ANIMASI LAYANGAN (SLOW MOTION) ---
// Posisi Dasar
const baseKiteX = window.innerWidth * 0.75;
const baseKiteY = window.innerHeight * 0.25;

// A. Gerakan Maju-Mundur (X)
// Sebelumnya duration: 2.5, sekarang 5 detik (Sangat lembut)
gsap.to(kite, {
    x: baseKiteX + 60,
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
});

// B. Gerakan Naik-Turun (Y)
// Sebelumnya duration: 1.8, sekarang 4 detik
gsap.to(kite, {
    y: baseKiteY - 50,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
});

// C. Rotasi / Miring Kiri-Kanan
// Sebelumnya duration: 3, sekarang 6 detik
gsap.to(kite, {
    rotation: 8, // Sudut kemiringan diperkecil sedikit biar lebih tenang
    duration: 6,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
});

// D. Ekor Layangan (Wiggle)
// Diperlambat sedikit agar tidak seperti kejang
gsap.to(".tail-bit", {
    x: 15, rotation: 30, duration: 0.25, stagger: 0.1,
    yoyo: true, repeat: -1, ease: "sine.inOut"
});


// --- 4. GAME LOOP ---
gsap.ticker.add(() => {
    sceneryPool.forEach(obj => {
        obj.x -= SCROLL_SPEED * obj.speedFactor;

        if (obj.x < -200) {
            obj.x = window.innerWidth + gsap.utils.random(50, 200);
        }
        gsap.set(obj.element, { x: obj.x });
    });
});