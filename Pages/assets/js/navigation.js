// Sistema de Navegação Global para o HelloCoder

document.addEventListener('DOMContentLoaded', function() {

    // Configurar navegação da sidebar
    setupSidebarNavigation();

    // Exibir nome do usuário se estiver logado
    displayUserInfo();
});

function setupSidebarNavigation() {
    // Mapear itens do menu para suas respectivas páginas
    const menuLinks = {
        'Atividades': '/Pages/Atividades/index.html',
        'Meu Usuário': '/Pages/Perfil_usu/index.html',
        'Pomodoro': '/Pages/Pomodoro/index.html',
        'Calendário': '/Pages/calendario/index.html',
        'Revisões': '/Pages/Revisoes/index.html',
        'Notificações': '/Pages/Notificacoes/index.html',
        'Página Inicial': '/Pages/Home1/index.html'
    };

    // Selecionar todos os itens de menu
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const header = item.querySelector('.menu-item-header');

        header.addEventListener('click', function(e) {
            const menuText = this.querySelector('span').textContent.trim();

            // Se o item tiver submenu, apenas expande/colapsa
            if (item.querySelector('.submenu')) {
                toggleSubmenu(item);
            } else if (menuLinks[menuText]) {
                // Se não tiver submenu, navega direto
                e.preventDefault();
                window.location.href = menuLinks[menuText];
            }
        });
    });

    // Configurar submenus
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(subItem => {
        subItem.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();

            if (menuLinks[text]) {
                window.location.href = menuLinks[text];
            }
        });
    });

    // Botão de adicionar atividade
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            window.location.href = '/Pages/Atividades/index.html';
        });
    }
}

function toggleSubmenu(item) {
    const isOpen = item.classList.contains('active');

    // Fechar outros menus
    document.querySelectorAll('.menu-item').forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.classList.remove('open');
        }
    });

    // Toggle no item atual
    if (!isOpen) {
        item.classList.add('active');
        item.classList.add('open');
    } else {
        item.classList.remove('active');
        item.classList.remove('open');
    }
}

function displayUserInfo() {
    const usuario = getUsuarioLogado();

    if (usuario) {
        // Você pode adicionar o nome do usuário em algum lugar da interface
        console.log(`Usuário logado: ${usuario.nome}`);

        // Criar botão de logout se não existir
        createLogoutButton();
    }
}

function createLogoutButton() {
    const sidebar = document.querySelector('.sidebar');

    if (!sidebar) return;

    // Verificar se já existe
    if (document.querySelector('.logout-btn')) return;

    const usuario = getUsuarioLogado();

    const logoutHTML = `
        <div class="user-info" style="padding: 15px; margin-top: auto; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #fff; font-size: 12px; margin-bottom: 8px; opacity: 0.8;">
                ${usuario ? usuario.nome : 'Usuário'}
            </p>
            <button class="logout-btn" onclick="logout()" style="
                width: 100%;
                padding: 8px;
                background: rgba(255, 59, 48, 0.2);
                border: 1px solid rgba(255, 59, 48, 0.5);
                color: #FF3B30;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.2s;
            " onmouseover="this.style.background='rgba(255, 59, 48, 0.3)'"
               onmouseout="this.style.background='rgba(255, 59, 48, 0.2)'">
                Sair
            </button>
        </div>
    `;

    sidebar.insertAdjacentHTML('beforeend', logoutHTML);
}
