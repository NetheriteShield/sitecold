document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const faqItems = document.querySelectorAll('.faq-item');
    const tabButtons = document.querySelectorAll('.tab-button');
    const productSections = document.querySelectorAll('.products-section');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            productCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || (categories && categories.includes(filter))) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });

            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.style.animation = 'pulse 2s infinite';
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }

        .product-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    function switchTab(tabId) {
        tabButtons.forEach(button => {
            if (button.dataset.tab === tabId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        productSections.forEach(section => {
            if (section.id === `${tabId}-section`) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });

    const quantityInput = document.querySelector('.quantity-input');
    const totalPrice = document.querySelector('.total-price');
    const pricePerRobux = 0.048; // R$ 0,05 por Robux

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function updateTotal() {
        const quantity = parseInt(quantityInput.value) || 0;
        const total = quantity * pricePerRobux;
        totalPrice.textContent = `Total: ${formatPrice(total)}`;
    }

    quantityInput?.addEventListener('input', updateTotal);

    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const isRobux = button.closest('.robux-card');
            let message = '';

            if (isRobux) {
                const quantity = parseInt(quantityInput.value) || 0;
                const total = formatPrice(quantity * pricePerRobux);
                message = `Pedido de Robux:\nQuantidade: ${quantity} Robux\nTotal: ${total}`;
            } else {
                const card = button.closest('.product-card');
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.price').textContent;
                message = `Gamepass selecionado:\n${productName}\n${productPrice}`;
            }

            alert(`${message}\n\nRedirecionando para o checkout...`);
        });
    });

    
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const contentId = tab.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });

    const robuxQuantityInput = document.getElementById('robuxQuantity');
    const robuxDisplay = document.getElementById('robuxDisplay');
    const priceDisplay = document.getElementById('priceDisplay');
    const ROBUX_RATE = 0.048;

    function formatPrice(price) {
        return price.toFixed(2).replace('.', ',');
    }

    function updateCalculator() {
        const quantity = parseInt(robuxQuantityInput.value) || 0;
        const price = quantity * ROBUX_RATE;
        
        robuxDisplay.textContent = quantity.toLocaleString('pt-BR');
        priceDisplay.textContent = formatPrice(price);
    }

    if (robuxQuantityInput) {
        robuxQuantityInput.addEventListener('input', updateCalculator);
    
        updateCalculator();
    }

    const typeButtons = document.querySelectorAll('.type-btn');
    const productContents = document.querySelectorAll('.product-content');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            productContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const type = button.dataset.type;
            document.querySelector(`.${type}-content`).classList.add('active');
        });
    });

    const cards = document.querySelectorAll('.product-card');
    
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        cardsObserver.observe(card);
    });

    const discordLinks = document.querySelectorAll('a[href*="discord.gg"]');
    discordLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const quantity = parseInt(robuxQuantityInput?.value) || 0;
            const price = quantity * ROBUX_RATE;
            
            let message = 'Você será redirecionado para nosso Discord para realizar a compra!';
            if (quantity > 0) {
                message = `Pedido de ${quantity.toLocaleString('pt-BR')} Robux\nTotal: R$ ${formatPrice(price)}\n\n${message}`;
            }
            
            alert(message);
            window.open(link.href, '_blank');
        });
    });

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

    window.addEventListener('themechange', (e) => {
        const theme = e.detail.theme;
        document.documentElement.style.setProperty('--btn-contrast-bg', theme === 'light' ? '#1a1a1a' : '#ffffff');
        document.documentElement.style.setProperty('--btn-contrast-text', theme === 'light' ? '#ffffff' : '#1a1a1a');
        document.documentElement.style.setProperty('--btn-contrast-hover-bg', theme === 'light' ? '#000000' : '#f0f0f0');
        document.documentElement.style.setProperty('--btn-contrast-hover-text', theme === 'light' ? '#ffffff' : '#000000');
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

function initializeCalculator() {
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

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        const currentTheme = htmlElement.getAttribute('data-theme');
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        updateThemeIcon();
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
} 