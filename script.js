// Preloader: Desaparece cuando la página carga completamente
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('loaded');
        document.body.style.overflow = 'auto';
    }, 1000);
});
document.body.style.overflow = 'hidden';

// Cursor Custom: Sigue al mouse (solo en desktop)
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if(window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        // Usamos requestAnimationFrame para suavidad extrema
        requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            follower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
        });
    });
}

// Navbar Scroll: Cambia el fondo al bajar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Reveal Animations: Activa elementos al entrar en el viewport
const revealOnScroll = () => {
    const elements = document.querySelectorAll('.reveal, .reveal-side');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        // Activación un poco antes de llegar al centro
        if (rect.top < viewHeight - 100) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Ejecución inicial

// Efecto 3D en las tarjetas (Fundadores y Servicios)
const cards3D = document.querySelectorAll('.founder-card, .service-card');
cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width/2) / 15;
        const y = (e.clientY - top - height/2) / 15;
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    });
});

// NUEVO: Smooth Scroll para navegación interna
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});