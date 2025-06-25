document.addEventListener('DOMContentLoaded', () => {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (!statNumber.dataset.animated) {
                    statNumber.dataset.animated = true;
                    const finalNumber = parseInt(statNumber.textContent.replace(/\D/g, ''));
                    animateNumber(statNumber, finalNumber);
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

    function animateNumber(element, finalNumber) {
        const duration = 2000;
        const steps = duration / 16;
        const increment = finalNumber / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }, 16);
    }

    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.stat-card, .team-card');
    cards.forEach(card => cardsObserver.observe(card));

    const style = document.createElement('style');
    style.textContent = `
        .stat-card,
        .team-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s var(--transition-timing);
        }

        .stat-card.visible,
        .team-card.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .stat-card i,
        .team-card i {
            transition: transform 0.3s var(--transition-timing);
        }

        .stat-card:hover i,
        .team-card:hover i {
            transform: scale(1.1) rotate(5deg);
        }

        @media (prefers-reduced-motion: reduce) {
            .stat-card,
            .team-card {
                transition: none;
            }

            .stat-card i,
            .team-card i {
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('themechange', (e) => {    
        const theme = e.detail.theme;
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
    });
}); 