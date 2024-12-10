class Header extends HTMLElement {
    connectedCallback() {
        fetch('/auth/status')
            .then(response => response.json())
            .then(data => {
                this.innerHTML = `
                    <header>
                        <nav>
                            <h1><a href="/" class="nav-link">Social Dashboard</a></h1>
                            <ul>
                                ${data.isAuthenticated ? `
                                    <li><span>${data.user.displayName}</span></li>
                                    <li><a href="/auth/logout" class="nav-link">Déconnexion</a></li>
                                ` : `
                                    <li><a href="/auth/login" class="nav-link">Connexion</a></li>
                                `}
                            </ul>
                        </nav>
                    </header>
                `;
            });
    }
}

customElements.define('app-header', Header); 