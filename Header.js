document.addEventListener('DOMContentLoaded', () => {
    // Este script assume que os objetos firebase e auth são inicializados no arquivo HTML antes que este script seja carregado.

    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.prepend(headerContainer);

    const logoHtml = `
        <a href="index.html" class="text-3xl font-black tracking-tighter text-gray-900">BBZ</a>
        ${window.location.pathname.includes('bbz_sports.html') ? '<a href="index.html" class="text-3x2 font-black tracking-tighter text-gray-900">Sports</a>' : ''}
    `;

    const navLinksHtml = `
        <a href="index.html" class="text-gray-700 hover:text-gray-900 font-semibold tracking-wide">Roupas</a>
        <a href="promocao.html" class="text-gray-700 hover:text-gray-900 font-semibold tracking-wide">Promoções</a>
        <a href="bbz_sports.html" class="text-gray-700 hover:text-gray-900 font-semibold tracking-wide">BBZ Sports</a>
        <a href="contato.html" class="text-gray-700 hover:text-gray-900 font-semibold tracking-wide">Contato</a>
        <a href="marcas.html" class="text-gray-700 hover:text-gray-900 font-semibold tracking-wide">Marcas</a>
    `;

    const mobileNavLinksHtml = `
        <a href="index.html" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Roupas</a>
        <a href="promocao.html" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Promoções</a>
        <a href="bbz_sports.html" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">BBZ Sports</a>
        <a href="contato.html" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Contato</a>
        <a href="marcas.html" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Marcas</a>
    `;

    const headerTemplate = `
    <header id="header" class="bg-white/70 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex-shrink-0">
                    ${logoHtml}
                </div>
                
                <div id="nav-menu-desktop" class="hidden lg:flex lg:items-center lg:space-x-6">
                    <!-- Conteúdo de navegação do desktop -->
                </div>

                <div class="flex items-center lg:hidden">
                    <button id="mobile-menu-button" class="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <span class="sr-only">Abrir menu</span>
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
        <div id="mobile-menu" class="lg:hidden hidden">
            <div id="nav-menu-mobile" class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-lg rounded-b-lg shadow-lg">
                <!-- Conteúdo de navegação móvel -->
            </div>
        </div>
    </header>
    `;

    headerContainer.innerHTML = headerTemplate;

    const navMenuDesktop = document.getElementById('nav-menu-desktop');
    const navMenuMobile = document.getElementById('nav-menu-mobile');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    auth.onAuthStateChanged(user => {
        if (user) {
            const isAdmin = user.email === 'bbzimports@gmail.com';
            const userEmail = user.email.length > 20 ? user.email.substring(0, 17) + '...' : user.email;
            
            // Link do Painel Admin apenas se for admin
            const adminLinkDesktop = isAdmin ? '<a href="cadastrobbz.html" class="text-indigo-600 hover:text-indigo-800 font-semibold tracking-wide">Painel Admin</a>' : '';
            const adminLinkMobile = isAdmin ? '<a href="cadastrobbz.html" class="text-indigo-600 hover:text-indigo-800 block px-3 py-2 rounded-md text-base font-medium">Painel Admin</a>' : '';

            navMenuDesktop.innerHTML = `
                ${navLinksHtml}
                ${adminLinkDesktop}
                <span class="text-gray-700 font-semibold" title="${user.email}">Bem-vindo, ${userEmail}</span>
                <button id="logoutBtnDesktop" class="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 font-semibold text-sm">Sair</button>
            `;
            
            navMenuMobile.innerHTML = `
                <span class="text-gray-700 block px-3 py-2 text-base font-medium" title="${user.email}">Bem-vindo, ${user.email}</span>
                ${mobileNavLinksHtml}
                ${adminLinkMobile}
                <button id="logoutBtnMobile" class="w-full text-left text-red-600 hover:text-red-800 block px-3 py-2 rounded-md text-base font-medium">Sair</button>
            `;
            
            document.getElementById('logoutBtnDesktop').addEventListener('click', () => auth.signOut());
            document.getElementById('logoutBtnMobile').addEventListener('click', () => auth.signOut());
        } else {
            navMenuDesktop.innerHTML = `
                ${navLinksHtml}
                <a href="login.html" class="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-semibold tracking-wide">Login</a>
            `;
            navMenuMobile.innerHTML = `
                ${mobileNavLinksHtml}
                <a href="login.html" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Login</a>
            `;
        }
    });
});
