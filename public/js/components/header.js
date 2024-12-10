class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav>
                    <h1><a href="/" class="nav-link">Social Dashboard</a></h1>
                    <ul>
                        <li><a href="/auth/login" class="nav-link">Connexion</a></li>
                    </ul>
                </nav>
            </header>
        `;

        // Ajoute la classe active au lien correspondant à la page courante
        const currentPath = window.location.pathname;
        this.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('app-header', Header); 