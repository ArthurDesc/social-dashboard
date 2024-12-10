class Header extends HTMLElement {
    constructor() {
        super();
        this.isLoggedIn = false;
        this.user = null;
        this.isLoading = true;
        // Rendre un placeholder pendant le chargement
        this.innerHTML = `
            <nav class="navbar" style="visibility: hidden;">
                <div class="container navbar-content">
                    <div class="logo">
                        <a href="/" style="text-decoration: none; color: inherit;">Social Dashboard</a>
                    </div>
                </div>
            </nav>
        `;
    }

    async checkAuthStatus() {
        try {
            const response = await fetch('/auth/status');
            const data = await response.json();
            this.isLoggedIn = data.isAuthenticated;
            this.user = data.user;
        } catch (error) {
            console.error('Erreur lors de la vérification du statut de connexion:', error);
            this.isLoggedIn = false;
            this.user = null;
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    getNavLinks() {
        if (this.isLoggedIn && this.user) {
            return `
                <a href="/" class="${window.location.pathname === '/' ? 'active' : ''}">Dashboard</a>
                <a href="#analytics" class="${window.location.pathname === '/analytics' ? 'active' : ''}">Analytiques</a>
                <a href="#settings" class="${window.location.pathname === '/settings' ? 'active' : ''}">Paramètres</a>
                <span style="color: var(--primary-color); margin-right: 1rem;">
                    <i class="fas fa-user"></i> ${this.user.displayName || 'Utilisateur'}
                </span>
                <a href="/auth/logout" style="color: var(--danger-color);">
                    <i class="fas fa-sign-out-alt"></i> Déconnexion
                </a>
            `;
        } else {
            return `
                <a href="/auth/login" class="${window.location.pathname === '/auth/login' ? 'active' : ''}">Connexion</a>
            `;
        }
    }

    render() {
        const navbar = `
            <nav class="navbar" style="visibility: ${this.isLoading ? 'hidden' : 'visible'};">
                <div class="container navbar-content">
                    <div class="logo">
                        <a href="/" style="text-decoration: none; color: inherit;">Social Dashboard</a>
                    </div>
                    <div class="nav-links">
                        ${this.getNavLinks()}
                    </div>
                </div>
            </nav>
        `;
        
        // Utiliser une transition douce pour l'apparition
        this.innerHTML = navbar;
        if (!this.isLoading) {
            const navElement = this.querySelector('.navbar');
            navElement.style.opacity = '0';
            navElement.style.transition = 'opacity 0.3s ease-in-out';
            setTimeout(() => {
                navElement.style.opacity = '1';
            }, 0);
        }
    }

    connectedCallback() {
        this.checkAuthStatus();
    }
}

customElements.define('app-header', Header); 