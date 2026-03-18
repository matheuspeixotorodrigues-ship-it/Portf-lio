// =========================================
//  SWUP (TRANSIÇÃO)
// =========================================
const swup = new Swup({
    cache: false, 
    plugins: [new SwupScrollPlugin({
        animateScroll: true, 
        scrollFriction: 0.3,
        scrollAcceleration: 0.04,
        offset: 100
    })]
});

// Configuração de Scroll
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; 
}

// =========================================
// MENUS E IDIOMAS
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
// ANIMAÇÕES E EFEITOS
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
// INTEGRAÇÃO DAS ANIMAÇÕES SWUP
// =========================================
swup.hooks.on('page:view', () => {
    initAnimations();
});

// ==========================================
// SISTEMA DE IDIOMAS (DICIONÁRIO JSON E SWAP)
// ==========================================

const allLanguages = [
    { code: 'pt', label: 'PT', mobileLabel: 'Português (PT)' },
    { code: 'en', label: 'EN', mobileLabel: 'English (EN)' },
    { code: 'es', label: 'ES', mobileLabel: 'Español (ES)' }
];

const dict = {
    pt: {
        "nav-servicos": "Serviços",
        "nav-processo": "Processo",
        "nav-sobre": "Sobre",
        "nav-contato": "Contato",
        "nav-idioma": "Idioma (PT)",
        "hero-desc": "Design e desenvolvimento pensados para o crescimento do seu negócio",
        "hero-btn": "Ver Serviços",
        "srv1-desc": "Design moderno, atraente e funcional. Layouts que chamam a atenção e conectam a essência da sua marca com o que o seu cliente realmente procura.",
        "srv1-link": "Sobre Web Design",
        "srv2-desc": "Desenvolvimento web feito sob medida para o seu projeto. Código limpo, alta performance e uma experiência de usuário impecável para quem acessar a sua página.",
        "srv2-link": "Sobre Web development",
        "proc-sub": "PROCESSO",
        "proc-tit1": "Seu site em",
        "proc-tit2": "5 etapas",
        "proc-desc": "Feito sob medida para você",
        "p1-sub": "VAMOS CONVERSAR?",
        "p1-tit": "Descoberta e Objetivos",
        "p1-desc": "Entendo sua ideia, seu público e os objetivos do projeto para definir a melhor direção",
        "p2-sub": "A BASE",
        "p2-tit": "Estrutura e Estratégia",
        "p2-desc": "Defino a estrutura do site e organizo as informações para uma navegação clara, intuitiva e eficiente",
        "p3-sub": "DIREÇÃO VISUAL",
        "p3-tit": "Design Estratégico",
        "p3-desc": "Crio um visual alinhado com a identidade da sua marca, focado em clareza, estética e experiência do usuário",
        "p4-sub": "EXECUÇÃO",
        "p4-tit": "Desenvolvimento",
        "p4-desc": "Transformo o design em um site rápido, otimizado e responsivo, com código limpo e foco em performance",
        "p5-sub": "ENTREGA",
        "p5-tit": "Lançamento e Suporte",
        "p5-desc": "Publico o site e realizo a entrega completa, com suporte para garantir sua segurança e autonomia",
        "ab-tit1": "Design que impressiona",
        "ab-tit2": "Performance impecável",
        "ab-desc": "Olá, sou o Matheus, web designer e desenvolvedor. Crio sites modernos, rápidos e pensados para transformar visitantes em clientes. Se você busca resultado de verdade, vamos conversar.",
        "marquee-txt": "VAMOS CONVERSAR &nbsp;&nbsp;+++&nbsp;&nbsp; VAMOS CONVERSAR &nbsp;&nbsp;+++&nbsp;&nbsp; VAMOS CONVERSAR &nbsp;&nbsp;+++&nbsp;&nbsp; VAMOS CONVERSAR &nbsp;&nbsp;+++&nbsp;&nbsp; VAMOS CONVERSAR &nbsp;&nbsp;+++&nbsp;&nbsp; VAMOS CONVERSAR &nbsp;&nbsp;+++&nbsp;&nbsp;",
        "ft-sub": "Algum projeto em mente?",
        "ft-tit1": "Vamos tirar sua ideia",
        "ft-tit2": "Do papel",
        "ft-nav-tit": "Páginas",
        "ft-copy": "© 2026 Matheus Peixoto. Todos os direitos reservados.",
        "srv-hero-desc": "Soluções digitais exclusivas para quem busca impacto visual e escala no mercado",
        "srv-wd-tit1": "Design estratégico para destacar a",
        "srv-wd-tit2": "autoridade da sua marca",
        "srv-wd-b1-tit": "CONCEITO",
        "srv-wd-b1-desc": "Analiso o perfil do seu negócio e público para criar um conceito sob medida. Estruturo a base do site para que design e funcionalidades funcionem perfeitamente.",
        "srv-wd-b2-desc": "Crio interfaces intuitivas e visualmente marcantes, pensadas para engajar seu público e alcançar os objetivos da sua marca.",
        "srv-wd-b3-tit": "PROTOTIPAGEM",
        "srv-wd-b3-desc": "Desenvolvo protótipos interativos para testar o site antes do lançamento, garantindo uma experiência otimizada para o seu cliente.",
        "srv-dev-tit1": "Desenvolvendo sites de",
        "srv-dev-tit2": "alta performance",
        "srv-dev-b1-tit": "CÓDIGO",
        "srv-dev-b1-desc": "Transformo o design em um site funcional, rápido e seguro, com total fluidez em qualquer dispositivo.",
        "srv-dev-b2-tit": "INTEGRAÇÃO DE CMS",
        "srv-dev-b2-desc": "Instalo um sistema fácil de usar, permitindo que você atualize textos e imagens do seu site sem depender de ninguém.",
        "srv-dev-b3-tit": "ESTRUTURA",
        "srv-dev-b3-desc": "Crio uma estrutura consistente para que todas as páginas sigam o mesmo padrão visual, deixando o site profissional e fácil de expandir.",
        "hero-slogan": "Sites e soluções digitais que unem design e performance para fortalecer sua presença online",
        "sob-tit1": "Da ideia à execução com",
        "sob-tit2": "atenção aos detalhes",
        "sob-p1": "Como web designer e desenvolvedor, eu uno o lado criativo com a precisão técnica. Acredito que a base de um site excelente é a disciplina e a atenção aos mínimos detalhes. Construir um projeto do zero não depende só de inspiração, mas de testar, refinar e ter um total cuidado com cada linha de código e cada pixel da tela.",
        "sob-p2": "Acredito que os melhores projetos nascem de uma boa comunicação. Por isso, trabalho lado a lado com você, para entender a fundo os seus objetivos e entregar uma solução que fuja do óbvio e realmente traga resultados."
    },
    en: {
        "nav-servicos": "Services",
        "nav-processo": "Process",
        "nav-sobre": "About",
        "nav-contato": "Contact",
        "nav-idioma": "Language (EN)",
        "hero-desc": "Design and development tailored for your business growth",
        "hero-btn": "View Services",
        "srv1-desc": "Modern, attractive, and functional design. Layouts that catch the eye and connect your brand's essence with what your client is truly looking for.",
        "srv1-link": "About Web Design",
        "srv2-desc": "Custom web development for your project. Clean code, high performance, and a flawless user experience for anyone visiting your page.",
        "srv2-link": "About Web Development",
        "proc-sub": "PROCESS",
        "proc-tit1": "Your website in",
        "proc-tit2": "5 steps",
        "proc-desc": "Tailor-made for you",
        "p1-sub": "LET'S TALK?",
        "p1-tit": "Discovery & Goals",
        "p1-desc": "I understand your idea, audience, and project goals to set the best direction.",
        "p2-sub": "THE FOUNDATION",
        "p2-tit": "Structure & Strategy",
        "p2-desc": "I define the site's structure and organize information for clear, intuitive, and efficient navigation.",
        "p3-sub": "VISUAL DIRECTION",
        "p3-tit": "Strategic Design",
        "p3-desc": "I create visuals aligned with your brand identity, focusing on clarity, aesthetics, and user experience.",
        "p4-sub": "EXECUTION",
        "p4-tit": "Development",
        "p4-desc": "I turn the design into a fast, optimized, and responsive website, with clean code and a focus on performance.",
        "p5-sub": "DELIVERY",
        "p5-tit": "Launch & Support",
        "p5-desc": "I publish the site and deliver the final product, providing support to ensure security and autonomy.",
        "ab-tit1": "Striking Design",
        "ab-tit2": "Flawless Performance",
        "ab-desc": "Hi, I'm Matheus, a web designer and developer. I build modern, fast websites designed to turn visitors into clients. If you're looking for real results, let's talk.",
       "marquee-txt": "LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp; LET'S TALK &nbsp;&nbsp;+++&nbsp;&nbsp;",
        "ft-sub": "Have a project in mind?",
        "ft-tit1": "Let's bring your idea",
        "ft-tit2": "To life",
        "ft-nav-tit": "Pages",
        "ft-copy": "© 2026 Matheus Peixoto. All rights reserved.",
        "srv-hero-desc": "Exclusive digital solutions for those seeking visual impact and market scale.",
        "srv-wd-tit1": "Strategic design to highlight your",
        "srv-wd-tit2": "brand's authority",
        "srv-wd-b1-tit": "CONCEPT",
        "srv-wd-b1-desc": "I analyze your business profile and audience to create a tailored concept. I build the website's foundation so design and functionality work perfectly together.",
        "srv-wd-b2-desc": "I create intuitive and visually striking interfaces, designed to engage your audience and achieve your brand's goals.",
        "srv-wd-b3-tit": "PROTOTYPING",
        "srv-wd-b3-desc": "I develop interactive prototypes to test the site before launch, ensuring an optimized experience for your client.",
        "srv-dev-tit1": "Developing websites with",
        "srv-dev-tit2": "high performance",
        "srv-dev-b1-tit": "CODE",
        "srv-dev-b1-desc": "I turn the design into a functional, fast, and secure website, with total fluidity on any device.",
        "srv-dev-b2-tit": "CMS INTEGRATION",
        "srv-dev-b2-desc": "I install an easy-to-use system, allowing you to update text and images on your website without depending on anyone.",
        "srv-dev-b3-tit": "STRUCTURE",
        "srv-dev-b3-desc": "I create a consistent structure so all pages follow the same visual standard, making the site professional and easy to expand.",
        "hero-slogan": "Websites and digital solutions that blend design and performance to strengthen your online presence.",
        "sob-tit1": "From idea to execution with",
        "sob-tit2": "attention to detail",
        "sob-p1": "As a web designer and developer, I combine the creative side with technical precision. I believe the foundation of an excellent website is discipline and attention to the smallest details. Building a project from scratch isn't just about inspiration; it's about testing, refining, and taking absolute care with every line of code and every pixel on the screen.",
        "sob-p2": "I believe the best projects are born from good communication. That's why I work side by side with you, to deeply understand your goals and deliver a solution that goes beyond the obvious and truly brings results."
    },
    es: {
        "nav-servicos": "Servicios",
        "nav-processo": "Proceso",
        "nav-sobre": "Sobre mí",
        "nav-contato": "Contacto",
        "nav-idioma": "Idioma (ES)",
        "hero-desc": "Diseño y desarrollo pensados para el crecimiento de tu negocio",
        "hero-btn": "Ver Servicios",
        "srv1-desc": "Diseño moderno, atractivo y funcional. Layouts que llaman la atención y conectan la esencia de tu marca con lo que tu cliente realmente busca.",
        "srv1-link": "Sobre Web Design",
        "srv2-desc": "Desarrollo web a medida para tu proyecto. Código limpio, alto rendimiento y una experiencia de usuario impecable.",
        "srv2-link": "Sobre Web Development",
        "proc-sub": "PROCESO",
        "proc-tit1": "Tu sitio web en",
        "proc-tit2": "5 pasos",
        "proc-desc": "Hecho a tu medida",
        "p1-sub": "¿HABLAMOS?",
        "p1-tit": "Descubrimiento y Objetivos",
        "p1-desc": "Entiendo tu idea, público y objetivos del proyecto para definir la mejor dirección.",
        "p2-sub": "LA BASE",
        "p2-tit": "Estructura y Estrategia",
        "p2-desc": "Defino la estructura del sitio y organizo la información para una navegación clara e intuitiva.",
        "p3-sub": "DIRECCIÓN VISUAL",
        "p3-tit": "Diseño Estratégico",
        "p3-desc": "Creo visuales alineados con la identidad de tu marca, enfocados en claridad y experiencia del usuario.",
        "p4-sub": "EJECUCIÓN",
        "p4-tit": "Desarrollo",
        "p4-desc": "Transformo el diseño en un sitio rápido y optimizado, con código limpio y enfoque en rendimiento.",
        "p5-sub": "ENTREGA",
        "p5-tit": "Lanzamiento y Soporte",
        "p5-desc": "Publico el sitio y realizo la entrega final, brindando soporte para garantizar tu autonomía.",
        "ab-tit1": "Diseño que impresiona",
        "ab-tit2": "Rendimiento impecable",
        "ab-desc": "Hola, soy Matheus, diseñador y desarrollador web. Creo sitios modernos y rápidos pensados para convertir visitantes en clientes. Si buscas resultados reales, hablemos.",
       "marquee-txt": "HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp; HABLEMOS &nbsp;&nbsp;+++&nbsp;&nbsp;",
        "ft-sub": "¿Tienes un proyecto en mente?",
        "ft-tit1": "Hagamos tu idea",
        "ft-tit2": "Realidad",
        "ft-nav-tit": "Páginas",
        "ft-copy": "© 2026 Matheus Peixoto. Todos los derechos reservados.",
        "srv-hero-desc": "Soluciones digitales exclusivas para quienes buscan impacto visual y escala en el mercado.",
        "srv-wd-tit1": "Diseño estratégico para destacar la",
        "srv-wd-tit2": "autoridad de tu marca",
        "srv-wd-b1-tit": "CONCEPTO",
        "srv-wd-b1-desc": "Analizo el perfil de tu negocio y público para crear un concepto a medida. Estructuro la base del sitio para que diseño y funcionalidades trabajen perfectamente.",
        "srv-wd-b2-desc": "Creo interfaces intuitivas y visualmente atractivas, pensadas para conectar con tu audiencia y alcanzar los objetivos de tu marca.",
        "srv-wd-b3-tit": "PROTOTIPADO",
        "srv-wd-b3-desc": "Desarrollo prototipos interactivos para probar el sitio antes del lanzamiento, asegurando una experiencia óptima para tu cliente.",
        "srv-dev-tit1": "Desarrollando sitios de",
        "srv-dev-tit2": "alto rendimiento",
        "srv-dev-b1-tit": "CÓDIGO",
        "srv-dev-b1-desc": "Transformo el diseño en un sitio funcional, rápido y seguro, con total fluidez en cualquier dispositivo.",
        "srv-dev-b2-tit": "INTEGRACIÓN DE CMS",
        "srv-dev-b2-desc": "Instalo un sistema fácil de usar, permitiendo que actualices textos e imágenes de tu sitio sin depender de nadie.",
        "srv-dev-b3-tit": "ESTRUCTURA",
        "srv-dev-b3-desc": "Creo una estructura consistente para que todas las páginas sigan el mismo estándar visual, haciendo el sitio profesional y fácil de escalar.",
        "hero-slogan": "Sitios web y soluciones digitales que combinan diseño y rendimiento para fortalecer tu presencia en línea.",
        "sob-tit1": "De la idea a la ejecución con",
        "sob-tit2": "atención a los detalles",
        "sob-p1": "Como diseñador web y desarrollador, uno el lado creativo con la precisión técnica. Creo que la base de un sitio excelente es la disciplina y la atención a los detalles más pequeños. Construir un proyecto desde cero no depende solo de la inspiración, sino de probar, refinar y tener un cuidado absoluto con cada línea de código y cada píxel en la pantalla.",
        "sob-p2": "Creo que los mejores proyectos nacen de una buena comunicación. Por eso, trabajo codo a codo contigo para entender a fondo tus objetivos y entregar una solución que escape de lo obvio y realmente brinde resultados."
    }
};

// listas de botões
function updateLanguageSwitchers(currentLangCode) {
    const desktopDropdown = document.getElementById('langDropdown');
    const mobileDropdown = document.getElementById('mobileLangList');
    const desktopCurrent = document.getElementById('currentLangDesktop');
    const mobileCurrent = document.getElementById('currentLangMobile');
    
    // Pega as infos do idioma atual
    const currentLangObj = allLanguages.find(l => l.code === currentLangCode);
    
    // Atualiza os textos principais
    if(desktopCurrent) desktopCurrent.textContent = currentLangObj.label;
  

    // Gera os itens da lista para os idiomas restantes
    const availableLangs = allLanguages.filter(l => l.code !== currentLangCode);
    
    // Atualiza o HTML da lista PC
    if(desktopDropdown) {
        desktopDropdown.innerHTML = availableLangs.map(lang => 
            `<li><a href="#" onclick="changeLanguage('${lang.code}'); return false;">${lang.label}</a></li>`
        ).join('');
    }
    
    // Atualiza o HTML da lista Mobile
    if(mobileDropdown) {
        mobileDropdown.innerHTML = availableLangs.map(lang => 
            `<a href="#" onclick="changeLanguage('${lang.code}'); return false;">${lang.mobileLabel}</a>`
        ).join('');
    }
}

// Função principal - troca de textos
function changeLanguage(lang) {
    // 1. Salva a escolha
    localStorage.setItem('meuSiteLang', lang);

    // 2. Faz o Swap nos botões
    updateLanguageSwitchers(lang);

    // 3. Traduz os textos marcados com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[lang] && dict[lang][key]) {
            el.innerHTML = dict[lang][key]; 
        }
    });

    // 4. Esconde os menus após clicar se estiverem abertos
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown && langDropdown.classList.contains('show')) langDropdown.classList.remove('show');
    
    const mobileLangList = document.getElementById('mobileLangList');
    if (mobileLangList && mobileLangList.classList.contains('show')) mobileLangList.classList.remove('show');
}

// Quando a página carrega pela primeira vez
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('meuSiteLang') || 'pt';
    changeLanguage(savedLang);
});

// Integração com o Swup para manter o idioma nas trocas de página
if (typeof swup !== 'undefined') {
    swup.hooks.on('page:view', () => {
        const savedLang = localStorage.getItem('meuSiteLang') || 'pt';
        changeLanguage(savedLang);
    });
}