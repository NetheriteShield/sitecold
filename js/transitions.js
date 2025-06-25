document.addEventListener('DOMContentLoaded', function() {
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.style.opacity = '0';
        setTimeout(() => {
            pageContent.style.opacity = '1';
            pageContent.classList.add('page-entering');
        }, 100);
    }

    const navLinks = document.querySelectorAll('a[href]');
    navLinks.forEach(link => {
        if (link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
            link.addEventListener('click', handleNavigation);
        }
    });

    function handleNavigation(e) {
        const targetHref = e.currentTarget.href;
        
        if (targetHref === window.location.href) {
            return;
        }

        e.preventDefault();

        if (pageContent) {
            pageContent.classList.add('page-leaving');
            
            setTimeout(() => {
                window.location.href = targetHref;
            }, 500);
        } else {
            window.location.href = targetHref;
        }
    }

    // Configura o Intersection Observer para animações de scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observa todos os elementos com a classe scroll-reveal
    document.querySelectorAll('.scroll-reveal:not(.site-title)').forEach((element) => {
        observer.observe(element);
    });

    // Garante que o título principal sempre esteja visível
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
        siteTitle.style.opacity = '1';
        siteTitle.style.transform = 'translateY(0)';
    }
}); 