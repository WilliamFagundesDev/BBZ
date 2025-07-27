document.addEventListener('DOMContentLoaded', () => {
    // Este script cria e gerencia um cabeçalho moderno e responsivo,
    // agora incluindo um sistema de carrinho de compras funcional.
    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.prepend(headerContainer);

    // --- DEFINIÇÃO DOS ÍCONES SVG ---
    const ICONS = {
        chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform duration-200"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>`,
        user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
        menu: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`,
        close: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`,
        cart: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.44a1.125 1.125 0 0 0-.142-1.095L19.5 3h-12.75M16.5 21a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>`,
        trash: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>`
    };

    // --- TEMPLATE HTML DO CABEÇALHO E CARRINHO ---
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
                    <div class="hidden lg:flex items-center space-x-4">
                         <!-- Cart Icon -->
                        <button id="cart-button" class="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                            ${ICONS.cart}
                            <span id="cart-item-count" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                        </button>
                        <div id="desktop-user-area" class="contents">
                            <!-- Conteúdo de login/usuário será injetado aqui -->
                        </div>
                    </div>
                    <div class="flex items-center lg:hidden">
                        <!-- Mobile Cart Icon -->
                        <button id="mobile-cart-button" class="relative p-2 rounded-md text-gray-700 hover:bg-gray-100">
                            ${ICONS.cart}
                            <span id="mobile-cart-item-count" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                        </button>
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

        <!-- Cart Sidebar -->
        <div id="cart-sidebar" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[100] transform translate-x-full transition-transform duration-300 ease-in-out">
            <div class="flex flex-col h-full">
                <div class="flex items-center justify-between p-5 border-b">
                    <h2 class="text-2xl font-bold text-gray-800">Meu Carrinho</h2>
                    <button id="close-cart-button" class="p-2 text-gray-500 hover:text-gray-900">
                        ${ICONS.close}
                    </button>
                </div>
                <div id="cart-items-container" class="flex-grow p-5 overflow-y-auto">
                    <!-- Itens do carrinho serão injetados aqui -->
                    <p id="empty-cart-message" class="text-center text-gray-500 mt-10">Seu carrinho está vazio.</p>
                </div>
                <div id="cart-footer" class="p-5 border-t bg-gray-50 hidden">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-medium text-gray-700">Subtotal:</span>
                        <span id="cart-subtotal" class="text-xl font-bold text-gray-900">R$ 0,00</span>
                    </div>
                    <button id="checkout-button" class="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
        <div id="cart-overlay" class="fixed inset-0 bg-black/40 z-[99] hidden"></div>
    `;
    headerContainer.innerHTML = headerTemplate;

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
            try {
                // Garante que o script principal do Firebase (app) esteja carregado.
                if (typeof firebase === 'undefined') {
                    await loadScript('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
                }
                // Garante que o script de autenticação do Firebase esteja carregado.
                if (typeof firebase.auth === 'undefined') {
                    await loadScript('https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js');
                }
            } catch (error) {
                console.error("Header.js: Não foi possível carregar os scripts do Firebase.", error);
                return null;
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

        // --- SELEÇÃO DOS ELEMENTOS DO DOM ---
        const lojaDropdownButton = document.getElementById('loja-dropdown-button');
        const lojaDropdownMenu = document.getElementById('loja-dropdown-menu');
        const lojaChevron = document.getElementById('loja-chevron');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuIcon = document.getElementById('mobile-menu-icon');
        const desktopUserArea = document.getElementById('desktop-user-area');
        const mobileNavLinks = document.getElementById('mobile-nav-links');
        
        // --- ELEMENTOS DO CARRINHO ---
        const cartButton = document.getElementById('cart-button');
        const mobileCartButton = document.getElementById('mobile-cart-button');
        const cartSidebar = document.getElementById('cart-sidebar');
        const closeCartButton = document.getElementById('close-cart-button');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartItemCount = document.getElementById('cart-item-count');
        const mobileCartItemCount = document.getElementById('mobile-cart-item-count');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartFooter = document.getElementById('cart-footer');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const checkoutButton = document.getElementById('checkout-button');


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
            mobileMenu.classList.toggle('hidden');
            mobileMenuIcon.innerHTML = mobileMenu.classList.contains('hidden') ? ICONS.menu : ICONS.close;
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
            const lojaDropdownContainer = document.getElementById('loja-dropdown-container');
            if (lojaDropdownContainer && !lojaDropdownContainer.contains(e.target)) {
                const userDropdownContainer = document.getElementById('user-dropdown-container');
                if (!userDropdownContainer || !userDropdownContainer.contains(e.target)) {
                    closeAllDropdowns();
                }
            }
        });

        // --- LÓGICA DO CARRINHO ---
        const getCart = () => JSON.parse(localStorage.getItem('bbzCart')) || [];
        const saveCart = (cart) => localStorage.setItem('bbzCart', JSON.stringify(cart));

        const openCart = () => {
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        const closeCart = () => {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        };

        const updateCartDisplay = () => {
            const cart = getCart();
            cartItemsContainer.innerHTML = ''; // Limpa os itens atuais
            
            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

            if (cart.length === 0) {
                cartItemCount.classList.add('hidden');
                mobileCartItemCount.classList.add('hidden');
                cartItemsContainer.innerHTML = `<p id="empty-cart-message" class="text-center text-gray-500 mt-10">Seu carrinho está vazio.</p>`;
                cartFooter.classList.add('hidden');
                return;
            }

            cartFooter.classList.remove('hidden');
            cartItemCount.textContent = totalQuantity;
            mobileCartItemCount.textContent = totalQuantity;
            cartItemCount.classList.remove('hidden');
            mobileCartItemCount.classList.remove('hidden');
            
            let subtotal = 0;

            cart.forEach((item, index) => {
                const itemPrice = parseFloat(item.price);
                const itemTotal = itemPrice * item.quantity;
                subtotal += itemTotal;

                const itemElement = document.createElement('div');
                itemElement.className = 'flex items-center gap-4 py-4 border-b';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded-md">
                    <div class="flex-grow">
                        <h4 class="font-bold text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-500">Tamanho: ${item.size}</p>
                        <p class="text-md font-semibold text-gray-900 mt-1">R$ ${itemPrice.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <div class="flex items-center border rounded-md">
                            <button data-index="${index}" class="quantity-change-btn p-1.5 text-gray-600 hover:bg-gray-100" data-amount="-1">-</button>
                            <span class="px-3 font-medium">${item.quantity}</span>
                            <button data-index="${index}" class="quantity-change-btn p-1.5 text-gray-600 hover:bg-gray-100" data-amount="1">+</button>
                        </div>
                        <button data-index="${index}" class="remove-item-btn text-red-500 hover:text-red-700 p-1">
                            ${ICONS.trash}
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        };

        const addToCart = (product) => {
            const cart = getCart();
            const cartItemId = `${product.id}-${product.size}`;
            const existingItem = cart.find(item => item.cartId === cartItemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1, cartId: cartItemId });
            }
            saveCart(cart);
            updateCartDisplay();
            openCart();
        };
        
        window.addToCart = addToCart;

        const changeQuantity = (index, amount) => {
            const cart = getCart();
            if (cart[index]) {
                cart[index].quantity += amount;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }
                saveCart(cart);
                updateCartDisplay();
            }
        };

        const removeItem = (index) => {
            const cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            updateCartDisplay();
        };
        
        cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const index = parseInt(target.dataset.index, 10);

            if (target.classList.contains('quantity-change-btn')) {
                const amount = parseInt(target.dataset.amount, 10);
                changeQuantity(index, amount);
            } else if (target.classList.contains('remove-item-btn')) {
                removeItem(index);
            }
        });

        checkoutButton.addEventListener('click', () => {
            window.location.href = 'comprar.html';
        });

        cartButton.addEventListener('click', openCart);
        mobileCartButton.addEventListener('click', openCart);
        closeCartButton.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
        
        updateCartDisplay();

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
                const isAdmin = user && user.email === 'importsbbz@gmail.com';
                if (user) {
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
                        <div class="px-3 py-2 text-base font-medium text-gray-500" title="${user.email}">Logado como <span class="font-semibold text-gray-800">${user.email.substring(0, 12)}...</span></div>
                        <a href="perfil.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Meu Perfil</a>
                        ${isAdmin ? `<a href="cadastrobbz.html" class="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-gray-100">Painel Admin</a>` : ''}
                        <a href="#" id="logoutBtnMobile" class="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100">Sair</a>
                    `;

                    const userDropdownButton = document.getElementById('user-dropdown-button');
                    const userDropdownMenu = document.getElementById('user-dropdown-menu');
                    if(userDropdownButton && userDropdownMenu) {
                        userDropdownButton.addEventListener('click', (e) => {
                            e.stopPropagation();
                            userDropdownMenu.classList.toggle('hidden');
                            userDropdownMenu.classList.toggle('opacity-0');
                            userDropdownMenu.classList.toggle('scale-95');
                        });
                    }
                    
                    const logoutBtnDesktop = document.getElementById('logoutBtnDesktop');
                    if(logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', () => auth.signOut());

                    const logoutBtnMobile = document.getElementById('logoutBtnMobile');
                    if(logoutBtnMobile) logoutBtnMobile.addEventListener('click', () => auth.signOut());

                } else {
                    renderLoggedOutState();
                }
            });
        } else {
            renderLoggedOutState();
        }
    }

    setupHeader();
});
