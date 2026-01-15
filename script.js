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

// --- COPIAR DESDE AQUÍ ---

// Efecto 3D interactivo para el Logo Circular de WebYa
const logoContainer = document.querySelector('.glass-element.circle-logo');
const logoImg = document.querySelector('.hero-logo');

if (logoContainer && logoImg) {
    logoContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = logoContainer.getBoundingClientRect();
        
        // Calculamos la posición del ratón respecto al centro del logo
        const x = (e.clientX - left - width / 2) / 10;
        const y = (e.clientY - top - height / 2) / 10;

        // Aplicamos la rotación al contenedor y un ligero desplazamiento a la imagen interior (parallax)
        logoContainer.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-10px)`;
        logoImg.style.transform = `scale(1.1) translateX(${-x}px) translateY(${y}px)`;
    });

    logoContainer.addEventListener('mouseleave', () => {
        // Al salir, vuelve a la posición de la animación CSS "floatingLogo"
        logoContainer.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        logoImg.style.transform = `scale(1) translateX(0) translateY(0)`;
    });
}

// --- HASTA AQUÍ ---

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

// Manejo del Formulario de WhatsApp
const whatsappForm = document.getElementById('whatsapp-form');

if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página se recargue

        // 1. Obtener valores de los campos
        const nombre = document.getElementById('form-name').value;
        const servicio = document.getElementById('form-service').value;
        const mensaje = document.getElementById('form-message').value;
        
        // 2. Tu número de teléfono (sin el +)
        const telefono = "56934191842"; 

        // 3. Crear el mensaje codificado para URL
        const textoChat = `Hola WebYa! Mi nombre es *${nombre}*.%0AEstoy interesado en: *${servicio}*.%0A%0AMensaje: ${mensaje}`;

        // 4. Abrir WhatsApp en una nueva pestaña
        const url = `https://wa.me/${telefono}?text=${textoChat}`;
        window.open(url, '_blank');
        
        // 5. Opcional: Limpiar el formulario
        whatsappForm.reset();
    });
}

// Mantener el resto de tus animaciones de scroll y cursor que ya teníamos...