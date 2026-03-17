// =========================================
// 1. INICIALIZAR O SWUP (O MOTOR DA TRANSIÇÃO)
// =========================================
const swup = new Swup({
    cache: false, 
    plugins: [new SwupScrollPlugin({
        animateScroll: true, 
        scrollFriction: 0.3,
        scrollAcceleration: 0.04,
        offset: 100 // COMPENSA O SEU CABEÇALHO PARA NÃO PARAR ACIMA DO TÍTULO!
    })]
});

// Configuração de Scroll (Apenas UMA VEZ)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; 
}

// =========================================
// 2. MENUS E IDIOMAS
// =========================================

function toggleLangMenu() {
    const dropdown = document.getElementById('langDropdown');
    const icon = document.getElementById('langIcon');
    if (dropdown && icon) {
        dropdown.classList.toggle('active');
        icon.classList.toggle('rotated');
    }
}

function toggleMobileLang() {
    const list = document.getElementById('mobileLangList');
    const icon = document.getElementById('mobileLangIcon');
    const arrow = document.querySelector('.arrow-indicator');
    
    if (list && icon && arrow) {
        list.classList.toggle('active');
        icon.classList.toggle('rotated');
        arrow.classList.toggle('rotated');
    }
}

window.addEventListener('click', function(e) {
    const langContainer = document.querySelector('.lang-container');
    if (langContainer && !langContainer.contains(e.target)) {
        const drop = document.getElementById('langDropdown');
        const ic = document.getElementById('langIcon');
        if(drop) drop.classList.remove('active');
        if(ic) ic.classList.remove('rotated');
    }
});

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    
    if (menu && btn) {
        menu.classList.toggle('active');
        btn.classList.toggle('active');
    }
}


// =========================================
// 3. ANIMAÇÕES E EFEITOS
// =========================================

let parallaxText;

function updateParallax() {
    if (!parallaxText) return;
    window.requestAnimationFrame(() => {
        let scrollPosition = window.pageYOffset;
        parallaxText.style.transform = 'translateY(' + (scrollPosition * -0.15) + 'px)';
    });
}

window.addEventListener('scroll', updateParallax);

function initAnimations() {
    
    parallaxText = document.querySelector('.parallax-text');
    updateParallax();

    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px" });

    reveals.forEach(element => {
        revealOnScroll.observe(element);
    });

    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        btn.classList.remove('active');
    }
}

document.addEventListener("DOMContentLoaded", initAnimations);

function updateAboutName() {
    const textLeft = document.getElementById('nomeEsquerda');
    const textRight = document.getElementById('nomeDireita');
    if (!textLeft || !textRight) return;

    window.requestAnimationFrame(() => {
        const rect = textLeft.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        let inicioAnimacao = windowHeight * 0.95; 
        let fimAnimacao = windowHeight * 0.40; 
        let progress = (inicioAnimacao - rect.top) / (inicioAnimacao - fimAnimacao);
        
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1; 

        const isMobile = window.innerWidth <= 768;
        const forcaDoMovimento = isMobile ? 200 : 200; 
        const distancia = forcaDoMovimento * (1 - progress);
        
        textLeft.style.transform = `translateY(-50%) translateX(${ -distancia }px)`;
        textRight.style.transform = `translateY(-50%) translateX(${ distancia }px)`;
        
        let opacidadeBase = 0.02 + (0.13 * progress);
        if (opacidadeBase > 0.15) opacidadeBase = 0.15;
        textLeft.style.opacity = opacidadeBase;
        textRight.style.opacity = opacidadeBase;
    });
}
window.addEventListener('scroll', updateAboutName);

// =========================================
// 6. INTEGRAÇÃO DAS ANIMAÇÕES COM O SWUP
// =========================================
swup.hooks.on('page:view', () => {
    initAnimations();
});