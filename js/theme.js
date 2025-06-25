class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.htmlElement = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.transitionDuration = 300; // ms
        
        this.init();
    }

    init() {
        // Previne flash de conteúdo
        this.htmlElement.style.visibility = 'hidden';
        
        // Aplica o tema antes de qualquer renderização
        this.applyTheme(this.currentTheme, false);
        
        // Mostra o conteúdo após aplicar o tema
        requestAnimationFrame(() => {
            this.htmlElement.style.visibility = 'visible';
            this.htmlElement.classList.add('theme-transition');
        });
        
        // Configura os event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Toggle de tema
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Sincronização entre abas
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                this.applyTheme(e.newValue || 'dark', true);
            }
        });

        // Preferência do sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light', true);
            }
        });

        // Aplica preferência do sistema se não houver tema salvo
        if (!localStorage.getItem('theme')) {
            const prefersDark = mediaQuery.matches;
            this.applyTheme(prefersDark ? 'dark' : 'light', true);
        }

        // Atualiza tema quando a página é carregada
        document.addEventListener('DOMContentLoaded', () => {
            this.updateIcon();
        });
    }

    applyTheme(theme, withTransition = true) {
        // Valida o tema
        if (theme !== 'light' && theme !== 'dark') {
            theme = 'dark';
        }

        // Aplica o tema
        this.currentTheme = theme;
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Atualiza o ícone
        this.updateIcon();
        
        // Gerencia transições
        if (withTransition) {
            this.htmlElement.classList.add('theme-transition');
            setTimeout(() => {
                this.htmlElement.classList.remove('theme-transition');
            }, this.transitionDuration);
        }

        // Dispara evento de mudança de tema
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: theme }
        }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme, true);
    }

    updateIcon() {
        const icon = this.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Inicializa o gerenciador de temas
const themeManager = new ThemeManager(); 