document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Estado do menu
    let isOpen = false;

    // Prevenir scroll quando menu estiver aberto
    function toggleScroll(disable) {
        document.body.style.overflow = disable ? 'hidden' : '';
        document.body.style.touchAction = disable ? 'none' : '';
    }

    // Função para abrir o menu
    function openMenu() {
        isOpen = true;
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        navLinks.classList.add('nav-active');
        nav.classList.add('nav-open');
        toggleScroll(true);
    }

    // Função para fechar o menu
    function closeMenu() {
        isOpen = false;
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        navLinks.classList.remove('nav-active');
        nav.classList.remove('nav-open');
        toggleScroll(false);
    }

    // Toggle do menu com tratamento de eventos touch
    menuBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fechar menu ao clicar em um link
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
        });
    });

    // Fechar menu ao clicar/tocar fora
    document.addEventListener('click', (e) => {
        if (isOpen && !nav.contains(e.target)) {
            closeMenu();
        }
    });

    // Suporte a eventos touch
    document.addEventListener('touchstart', (e) => {
        if (isOpen && !nav.contains(e.target)) {
            closeMenu();
        }
    }, { passive: true });

    // Ajustar navbar ao rolar com debounce para performance
    let lastScroll = 0;
    let scrollTimeout;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    }, { passive: true });

    // Ajustar altura em mudanças de orientação
    window.addEventListener('resize', () => {
        if (isOpen) {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    });

    // Definir altura inicial
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}); 