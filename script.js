// Preloader: Desaparece cuando la página carga completamente
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
        }
    }, 1000);
});
// Bloquear scroll inicial
document.body.style.overflow = 'hidden';

// Cursor Custom: Sigue al mouse (solo en desktop)
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (window.innerWidth > 1024 && cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            follower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
        });
    });
}

// Navbar Scroll: Cambia el fondo al bajar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Reveal Animations
const revealOnScroll = () => {
    const elements = document.querySelectorAll('.reveal, .reveal-side');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        if (rect.top < viewHeight - 100) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Efecto 3D en las tarjetas
const cards3D = document.querySelectorAll('.founder-card, .service-card, .product-card');
cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 15;
        const y = (e.clientY - top - height / 2) / 15;
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    });
});

// Efecto 3D interactivo para el Logo Circular
const logoContainer = document.querySelector('.glass-element.circle-logo');
const logoImg = document.querySelector('.hero-logo');

if (logoContainer && logoImg) {
    logoContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = logoContainer.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 10;
        const y = (e.clientY - top - height / 2) / 10;
        logoContainer.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-10px)`;
        logoImg.style.transform = `scale(1.1) translateX(${-x}px) translateY(${y}px)`;
    });

    logoContainer.addEventListener('mouseleave', () => {
        logoContainer.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        logoImg.style.transform = `scale(1) translateX(0) translateY(0)`;
    });
}

// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Formulario de WhatsApp
const whatsappForm = document.getElementById('whatsapp-form');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('form-name').value;
        const servicio = document.getElementById('form-service').value;
        const mensaje = document.getElementById('form-message').value;
        const telefono = "56934191842";
        const textoChat = `Hola WebYa! Mi nombre es *${nombre}*.%0AEstoy interesado en: *${servicio}*.%0A%0AMensaje: ${mensaje}`;
        window.open(`https://wa.me/${telefono}?text=${textoChat}`, '_blank');
        whatsappForm.reset();
    });
}

// --- PRODUCT MODAL LOGIC ---
const productData = {
    streetfood: {
        title: "StreetFood OS",
        badge: "SaaS Gastronómico",
        badgeClass: "saas",
        desc: "Plataforma integral para la gestión de food trucks y restaurantes. Optimiza desde la toma de pedidos hasta el control de inventario con una interfaz intuitiva.",
        features: [
            "Dashboard Real-time: Ventas, Pedidos y Ticket Promedio.",
            "KDS (Kitchen Display System): Monitor de cocina.",
            "Inventario Inteligente: Deducción automática.",
            "Sistema de Fidelización: Tarjeta digital.",
            "Mapeador de Mesas: Editor visual de zonas.",
            "Impresión Térmica: Bluetooth ESC/POS nativo."
        ],
        tech: "Next.js 15 • React 19 • MongoDB • Supabase"
    },
    eventos: {
        title: "Eventos Pro",
        badge: "Gestión Eventos",
        badgeClass: "event",
        desc: "Solución completa para la venta de entradas y gestión de accesos a eventos masivos, diseñada para alta concurrencia.",
        features: [
            "Mapa de Asientos Interactivo.",
            "Validación QR en Puerta.",
            "Integración MercadoPago.",
            "Sistema de Reseñas verificado.",
            "Reportes Financieros Exportables.",
            "Gestión de Cupones."
        ],
        tech: "Node.js • Express • MercadoPago SDK • Socket.io"
    },
    propiedades: {
        title: "Propiedades Plus",
        badge: "Inmobiliaria",
        badgeClass: "realestate",
        desc: "CMS especializado para corredoras de propiedades. Publicación automática en portales y gestión avanzada de leads inmobiliarios.",
        features: [
            "Geolocalización con mapas.",
            "CRM Inmobiliario de leads.",
            "Tours 360° y galerías HD.",
            "Filtros Avanzados (UF/CLP).",
            "Perfiles de Agentes.",
            "SEO Automático."
        ],
        tech: "React • Google Maps API • Node.js • AWS S3"
    },
    shop: {
        title: "Shop V2 Premium",
        badge: "E-Commerce",
        badgeClass: "ecommerce",
        desc: "Tienda online de alto rendimiento diseñada para maximizar conversiones. Velocidad extrema y diseño centrado en el usuario.",
        features: [
            "Checkout en una página.",
            "Cálculo de Envíos auto.",
            "Recuperación de Carrito.",
            "Gestión de Stock por variantes.",
            "Facturación Automática.",
            "Wishlist."
        ],
        tech: "MERN Stack • Redux • Stripe • SendGrid"
    },
    landing: {
        title: "Corporate Landing",
        badge: "Identidad",
        badgeClass: "branding",
        desc: "Sitios web corporativos que impactan. Animaciones fluidas, SEO técnico y una presentación impecable de tu marca.",
        features: [
            "Diseño Glassmorphism Premium.",
            "Animaciones 3D y Parallax.",
            "Performance Top (Lighthouse 90+).",
            "SEO Técnico Semántico.",
            "Integración CRM/WhatsApp.",
            "Modo Oscuro/Claro Nativo."
        ],
        tech: "HTML5 • CSS3 • Vanilla JS • GSAP Animations"
    }
};

const modalOverlay = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');

// Función global para abrir modal
window.openModal = (productId) => {
    const data = productData[productId];
    if (!data) {
        console.error('Producto no encontrado:', productId);
        return;
    }

    const modalBody = document.getElementById('modal-body');
    const modalOverlay = document.getElementById('product-modal');

    if (!modalBody || !modalOverlay) {
        console.error('Elementos del modal no encontrados en el DOM');
        return;
    }

    // Generar HTML dinámico con TODOS los datos (Descripción, Features, Tech)
    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="p-badge ${data.badgeClass}">${data.badge}</span>
            <h2>${data.title}</h2>
        </div>
        <div class="modal-body-content">
            <p class="m-desc">${data.desc || ''}</p>
            
            <h3 style="color: var(--primary); margin-bottom: 15px;">Características Principales</h3>
            <ul>
                ${data.features && data.features.map(feat => `<li>${feat}</li>`).join('')}
            </ul>

            <div class="m-tech">
                <span>Tecnología:</span> ${data.tech || ''}
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeModal = () => {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});