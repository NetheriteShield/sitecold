document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuMobile = document.querySelector('.menu-mobile');
    let isMenuOpen = false;

    initializeTheme();
    initializeMenu(menuToggle, navLinks);
    initializeTestimonials();

    const pagePositions = {
        'index.html': 0,
        'produtos/index.html': 1,
        'sobre/index.html': 2,
        'contato/index.html': 3,
        'login/index.html': 4
    };

    function getAnimationDirection(currentPage, targetPage) {
        const currentPos = pagePositions[currentPage.split('/').pop()];
        const targetPos = pagePositions[targetPage];
        return currentPos < targetPos ? 'right' : 'left';
    }

    function createTransitionElement() {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        return transition;
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const targetPage = link.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop();
            
            if (targetPage === currentPage) return;

            const direction = getAnimationDirection(currentPage, targetPage);
            const transition = createTransitionElement();

            document.body.classList.add(`slide-out-${direction}`);
            
            await new Promise(resolve => setTimeout(resolve, 500));

            window.location.href = targetPage;
        });
    });

    if (document.referrer) {
        const previousPage = document.referrer.split('/').pop();
        const currentPage = window.location.pathname.split('/').pop();
        const direction = getAnimationDirection(previousPage, currentPage);
        
        document.body.classList.add(`slide-in-${direction === 'right' ? 'left' : 'right'}`);
        
        setTimeout(() => {
            document.body.classList.remove(`slide-in-${direction === 'right' ? 'left' : 'right'}`);
        }, 500);
    }

    if (menuMobile) {
        menuMobile.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--card-background)';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                menuMobile.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                navLinks.style.display = 'none';
                menuMobile.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const stars = card.querySelectorAll('.stars i');
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2)';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', () => {
            const stars = card.querySelectorAll('.stars i');
            stars.forEach(star => {
                star.style.transform = 'scale(1)';
            });
        });
    });

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        document.body.classList.add('touch-device');

        const cards = document.querySelectorAll('.feature-card, .testimonial-card, .product-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = 'var(--nav-bg)';
                    navbar.style.boxShadow = 'var(--card-shadow)';
                } else {
                    navbar.style.backgroundColor = 'transparent';
                    navbar.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;
            
            alert(`Produto selecionado:\n${productName}\n${productPrice}\n\nRedirecionando para o checkout...`);
        });
    });

    const randomEmails = [
        "gamer_pro123@gmail.com",
        "roblox_master@hotmail.com",
        "ninja_player@outlook.com",
        "cool_gamer456@gmail.com",
        "pro_builder@yahoo.com",
        "speed_runner@gmail.com",
        "diamond_collector@hotmail.com",
        "star_player123@gmail.com",
        "block_master@outlook.com",
        "game_explorer@yahoo.com",
        "pixel_warrior@gmail.com",
        "virtual_hero@hotmail.com",
        "adventure_seeker@gmail.com",
        "creative_builder@outlook.com",
        "epic_gamer789@yahoo.com"
    ];

    const emailElements = document.querySelectorAll('.user-email');
    emailElements.forEach(element => {
        const randomEmail = randomEmails[Math.floor(Math.random() * randomEmails.length)];
        element.textContent = randomEmail;
    });

    const postTimeElements = document.querySelectorAll('.post-time');
    postTimeElements.forEach(element => {
        const randomHours = Math.floor(Math.random() * 12) + 1;
        element.textContent = `Há ${randomHours} horas atrás`;
    });

    const robuxQuantityInput = document.getElementById('robuxQuantity');
    const robuxDisplay = document.getElementById('robuxDisplay');
    const priceDisplay = document.getElementById('priceDisplay');
    const ROBUX_PRICE_PER_UNIT = 0.048;

    function updateRobuxIcons(quantity) {
        const container = robuxDisplay.parentElement;
        const existingIcons = container.querySelectorAll('.robux-icon');
        existingIcons.forEach(icon => icon.remove());

        let iconHTML = '';
        if (quantity <= 100) {
            iconHTML = '<i class="fas fa-gem robux-icon small"></i>';
        } else if (quantity <= 500) {
            iconHTML = '<i class="fas fa-gem robux-icon small"></i>'.repeat(2);
        } else if (quantity <= 1000) {
            iconHTML = '<i class="fas fa-gem robux-icon small"></i>'.repeat(3);
        } else {
            iconHTML = '<i class="fas fa-gem robux-icon golden"></i>';
        }
        
        container.insertAdjacentHTML('afterbegin', iconHTML);
    }

    function updatePrice() {
        if (!robuxQuantityInput || !robuxDisplay || !priceDisplay) return;

        let quantity = parseInt(robuxQuantityInput.value) || 0;
        const totalPrice = (quantity * ROBUX_PRICE_PER_UNIT).toFixed(2);
        
        robuxDisplay.textContent = quantity.toLocaleString('pt-BR');
        priceDisplay.textContent = totalPrice;
        updateRobuxIcons(quantity);

        const calculatorCard = document.querySelector('.product-card.wide-card');
        if (calculatorCard) {
            calculatorCard.className = 'product-card wide-card';
            if (quantity > 1000) {
                calculatorCard.classList.add('premium');
            } else if (quantity > 500) {
                calculatorCard.classList.add('high');
            } else if (quantity > 100) {
                calculatorCard.classList.add('medium');
            }
        }
    }

    if (robuxQuantityInput) {
        robuxQuantityInput.addEventListener('input', updatePrice);
        robuxQuantityInput.addEventListener('change', updatePrice);
        updatePrice();
    }

    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
});

function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = `<i class="fas fa-${currentTheme === 'dark' ? 'sun' : 'moon'}"></i>`;

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = `<i class="fas fa-${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
    });
}

function initializeMenu(menuToggle, navLinks) {
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
}

function initializeTestimonials() {
    const testimonialTimes = document.querySelectorAll('.post-time');
    testimonialTimes.forEach(time => {
        const randomMinutes = Math.floor(Math.random() * 59);
        const randomHours = Math.floor(Math.random() * 23);
        time.textContent = `${randomHours.toString().padStart(2, '0')}:${randomMinutes.toString().padStart(2, '0')}`;
    });
} 