document.addEventListener('DOMContentLoaded', () => {
    // Este script cria e gerencia um cabeçalho moderno e responsivo para o site.
    // Ele é projetado para ser a única fonte do cabeçalho, injetando-o dinamicamente em todas as páginas
    // e carregando suas próprias dependências do Firebase, se necessário.

    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.prepend(headerContainer);

    // --- DEFINIÇÃO DOS ÍCONES SVG ---
    const ICONS = {
        chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform duration-200"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>`,
        user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
        menu: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`,
        close: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`
    };

    // --- TEMPLATE HTML DO CABEÇALHO ---
    // A estrutura do cabeçalho é inserida primeiro, para que os elementos existam no DOM.
    const headerTemplate = `
        <header id="main-header" class="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <div class="flex-shrink-0">
                        <a href="index.html" class="text-3xl font-black tracking-tighter text-gray-900">BBZ</a>
                    </div>
                    <div class="hidden lg:flex lg:items-center lg:space-x-8">
                        <a href="index.html" class="text-gray-600 hover:text-gray-900 font-semibold tracking-wide transition-colors">Início</a>
                        <div class="relative" id="loja-dropdown-container">
                            <button id="loja-dropdown-button" class="flex items-center text-gray-600 hover:text-gray-900 font-semibold tracking-wide transition-colors">
                                <span>Loja</span>
                                <span id="loja-chevron">${ICONS.chevronDown}</span>
                            </button>
                            <div id="loja-dropdown-menu" class="hidden absolute mt-3 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-0 scale-95 transition-all duration-200 origin-top-right">
                                <div class="py-1">
                                    <a href="index.html#collection" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Roupas</a>
                                    <a href="promocao.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Promoções</a>
                                    <a href="bbz_sports.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">BBZ Sports</a>
                                </div>
                            </div>
                        </div>
                        <a href="marcas.html" class="text-gray-600 hover:text-gray-900 font-semibold tracking-wide transition-colors">Marcas</a>
                        <a href="contato.html" class="text-gray-600 hover:text-gray-900 font-semibold tracking-wide transition-colors">Contato</a>
                    </div>
                    <div class="hidden lg:flex items-center space-x-4" id="desktop-user-area">
                        <!-- Conteúdo de login/usuário será injetado aqui -->
                    </div>
                    <div class="flex items-center lg:hidden">
                        <button id="mobile-menu-button" class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
                            <span id="mobile-menu-icon">${ICONS.menu}</span>
                        </button>
                    </div>
                </div>
            </nav>
            <div id="mobile-menu" class="hidden lg:hidden">
                <div id="mobile-nav-links" class="px-2 pt-2 pb-4 space-y-2 sm:px-3 bg-white/95 backdrop-blur-lg rounded-b-lg shadow-lg">
                    <!-- Links do menu mobile serão injetados aqui -->
                </div>
            </div>
        </header>
    `;
    headerContainer.innerHTML = headerTemplate;


    // --- FUNÇÃO PRINCIPAL PARA CONFIGURAR O CABEÇALHO ---
    // Esta função assíncrona garante que o Firebase seja carregado antes de qualquer lógica que dependa dele.
    async function setupHeader() {
        
        // Função para carregar scripts dinamicamente e de forma assíncrona.
        function loadScript(src) {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    return resolve(); // Resolve imediatamente se o script já existir.
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = () => reject(new Error(`Falha ao carregar o script: ${src}`));
                document.head.appendChild(script);
            });
        }

        // Função para obter a instância de autenticação do Firebase, carregando os SDKs se necessário.
        async function getAuthInstance() {
            // Verifica se o objeto 'firebase' global já existe.
            if (typeof firebase === 'undefined') {
                try {
                    await loadScript('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
                    await loadScript('https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js');
                } catch (error) {
                    console.error("Header.js: Não foi possível carregar os scripts do Firebase.", error);
                    return null;
                }
            }

            // Configuração do Firebase
            const firebaseConfig = {
                apiKey: "AIzaSyBk1cV2SQEhEToTdDxqDBTYOHjyogHaOAE",
                authDomain: "bbz-imports.firebaseapp.com",
                databaseURL: "https://bbz-imports-default-rtdb.firebaseio.com",
                projectId: "bbz-imports",
                storageBucket: "bbz-imports.appspot.com",
                messagingSenderId: "184315339952",
                appId: "1:184315339952:web:d8bab53b3a7fae2e6e4775",
                measurementId: "G-QBNJP7HHQB"
            };

            // Garante que o Firebase seja inicializado apenas uma vez.
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            
            return firebase.auth(); // Retorna a instância de autenticação.
        }

        const auth = await getAuthInstance();

        // --- SELEÇÃO DOS ELEMENTOS DO DOM (após a renderização do template) ---
        const lojaDropdownContainer = document.getElementById('loja-dropdown-container');
        const lojaDropdownButton = document.getElementById('loja-dropdown-button');
        const lojaDropdownMenu = document.getElementById('loja-dropdown-menu');
        const lojaChevron = document.getElementById('loja-chevron');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuIcon = document.getElementById('mobile-menu-icon');
        const desktopUserArea = document.getElementById('desktop-user-area');
        const mobileNavLinks = document.getElementById('mobile-nav-links');

        // --- LÓGICA DE INTERAÇÃO (EVENT LISTENERS) ---
        lojaDropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = lojaDropdownMenu.classList.contains('hidden');
            closeAllDropdowns();
            if (isHidden) {
                lojaDropdownMenu.classList.remove('hidden', 'opacity-0', 'scale-95');
                lojaChevron.firstElementChild.style.transform = 'rotate(180deg)';
            }
        });

        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuIcon.innerHTML = isHidden ? ICONS.close : ICONS.menu;
        });
        
        const closeAllDropdowns = () => {
            lojaDropdownMenu.classList.add('hidden', 'opacity-0', 'scale-95');
            lojaChevron.firstElementChild.style.transform = 'rotate(0deg)';
            const userDropdownMenu = document.getElementById('user-dropdown-menu');
            if (userDropdownMenu) {
                userDropdownMenu.classList.add('hidden', 'opacity-0', 'scale-95');
            }
        };

        window.addEventListener('click', (e) => {
            if (!lojaDropdownContainer.contains(e.target)) {
                const userDropdownContainer = document.getElementById('user-dropdown-container');
                if (!userDropdownContainer || !userDropdownContainer.contains(e.target)) {
                    closeAllDropdowns();
                }
            }
        });
        
        // --- LÓGICA DE AUTENTICAÇÃO E RENDERIZAÇÃO DINÂMICA ---
        const renderLoggedOutState = () => {
            desktopUserArea.innerHTML = `
                <a href="login.html" title="Login / Criar Conta" class="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                    ${ICONS.user}
                </a>
                <a href="login.html" class="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 font-semibold tracking-wide text-sm transition-colors">
                    Entrar
                </a>
            `;
            mobileNavLinks.innerHTML = `
                <a href="index.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Início</a>
                <a href="index.html#collection" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Roupas</a>
                <a href="promocao.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Promoções</a>
                <a href="bbz_sports.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">BBZ Sports</a>
                <a href="marcas.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Marcas</a>
                <a href="contato.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Contato</a>
                <div class="border-t my-2"></div>
                <a href="login.html" class="block w-full text-center bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 font-semibold tracking-wide text-base transition-colors">
                    Login / Criar Conta
                </a>
            `;
        };

        if (auth) {
            auth.onAuthStateChanged(user => {
                const isAdmin = user && user.email === 'bbzimports@gmail.com';
                if (user) {
                    const userEmailShort = user.email.length > 15 ? user.email.substring(0, 12) + '...' : user.email;
                    desktopUserArea.innerHTML = `
                        <div class="relative" id="user-dropdown-container">
                            <button id="user-dropdown-button" class="flex items-center p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                                ${ICONS.user}
                            </button>
                            <div id="user-dropdown-menu" class="hidden absolute right-0 mt-3 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-0 scale-95 transition-all duration-200 origin-top-right">
                                <div class="py-1">
                                    <div class="px-4 py-2 text-sm text-gray-500 border-b">
                                        <p class="font-semibold text-gray-800">Olá!</p>
                                        <p class="truncate" title="${user.email}">${user.email}</p>
                                    </div>
                                    <a href="perfil.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">Meu Perfil</a>
                                    ${isAdmin ? `<a href="cadastrobbz.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium text-indigo-600">Painel Admin</a>` : ''}
                                    <a href="#" id="logoutBtnDesktop" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium">Sair</a>
                                </div>
                            </div>
                        </div>
                    `;
                    mobileNavLinks.innerHTML = `
                        <a href="index.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Início</a>
                        <a href="index.html#collection" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Roupas</a>
                        <a href="promocao.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Promoções</a>
                        <a href="bbz_sports.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">BBZ Sports</a>
                        <a href="marcas.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Marcas</a>
                        <a href="contato.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Contato</a>
                        <div class="border-t my-2"></div>
                        <div class="px-3 py-2 text-base font-medium text-gray-500" title="${user.email}">Logado como <span class="font-semibold text-gray-800">${userEmailShort}</span></div>
                        <a href="perfil.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Meu Perfil</a>
                        ${isAdmin ? `<a href="cadastrobbz.html" class="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-gray-100">Painel Admin</a>` : ''}
                        <a href="#" id="logoutBtnMobile" class="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100">Sair</a>
                    `;

                    document.getElementById('user-dropdown-button').addEventListener('click', (e) => {
                        e.stopPropagation();
                        const userDropdownMenu = document.getElementById('user-dropdown-menu');
                        const isHidden = userDropdownMenu.classList.contains('hidden');
                        closeAllDropdowns();
                        if (isHidden) {
                           userDropdownMenu.classList.remove('hidden', 'opacity-0', 'scale-95');
                        }
                    });
                    document.getElementById('logoutBtnDesktop').addEventListener('click', () => auth.signOut());
                    document.getElementById('logoutBtnMobile').addEventListener('click', () => auth.signOut());
                } else {
                    renderLoggedOutState();
                }
            });
        } else {
            // Se o Firebase falhar ao carregar, renderiza o estado de deslogado como fallback.
            renderLoggedOutState();
        }
    }

    // Inicia a configuração do cabeçalho.
    setupHeader();
});
