// Mendaftarkan Plugin
gsap.registerPlugin(ScrollTrigger);

// --- ANIMASI 1: INTRO (Goodbye 2024) ---
// Saat di-scroll, tulisan '2024' akan meledak/hilang ke atas
gsap.to(".intro-content", {
    scrollTrigger: {
        trigger: ".intro",
        start: "top top", // Mulai saat bagian atas intro ketemu bagian atas layar
        end: "bottom top", // Selesai saat bagian bawah intro ketemu bagian atas layar
        scrub: 1 // Animasi mengikuti kecepatan scroll (smooth)
    },
    y: -200, // Geser ke atas
    opacity: 0, // Fade out
    scale: 0.8 // Mengecil
});


// --- ANIMASI 2: TRANSISI (Pinned Section) ---
// Layar akan tertahan di section putih ini
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".transition-section",
        start: "center center", // Mulai saat tengah section di tengah layar
        end: "+=1500", // Tahan selama 1500px scroll
        scrub: 1, // Smooth scrubbing
        pin: true // PINNING: Kunci layar (efek ihatetomatoes banget)
    }
});

// Urutan animasi di dalam timeline
tl.to(".message", {
    y: 0,
    opacity: 1,
    stagger: 0.5, // Muncul bergantian dengan jeda 0.5 detik (scroll distance)
    duration: 1
})
    .to(".circle", {
        scale: 5, // Lingkaran membesar memenuhi layar
        opacity: 0,
        duration: 2
    })
    .to(".message", {
        opacity: 0,
        y: -50,
        duration: 1
    });


// --- ANIMASI 3: FINAL (Hello 2025) ---
gsap.to(".year-new", {
    scrollTrigger: {
        trigger: ".final",
        start: "top center", // Saat section final masuk setengah layar
        end: "center center",
        scrub: 1
    },
    scale: 1.2, // Membesar (Pop up)
    opacity: 1,
    rotation: 360 // Berputar sedikit biar keren
});

// Parallax effect untuk Kembang Api
gsap.to(".firework", {
    scrollTrigger: {
        trigger: ".final",
        start: "top bottom",
        end: "bottom top",
        scrub: 2 // Lebih lambat (efek parallax)
    },
    y: -100 // Bergerak ke atas perlahan saat scroll
});