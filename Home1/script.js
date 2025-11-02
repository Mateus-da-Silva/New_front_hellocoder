// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle submenu
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const header = item.querySelector('.menu-item-header');
        
        header.addEventListener('click', function() {
            // Close other menu items
            menuItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Start button functionality
    const startBtn = document.querySelector('.start-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            alert('Iniciando Semana 1!');
            // Aqui você pode adicionar a lógica para iniciar a semana
        });
    }

    // Week icons click functionality
    const weekIcons = document.querySelectorAll('.week-icon');
    
    weekIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            // Verifica a classe de status no ícone
            if (!icon.classList.contains('status-locked')) {
                console.log(`Semana ${index + 1} clicada`);
                // Aqui você pode adicionar a lógica para abrir detalhes da semana
            } else {
                alert('Esta semana está bloqueada!');
            }
        });
    });

    // Add button functionality
    const addBtn = document.querySelector('.add-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            alert('Adicionar novo item');
            // Aqui você pode adicionar a lógica para adicionar novos itens
        });
    }

    // Sidebar toggle functionality
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            // Aqui você pode adicionar animação de colapso da sidebar
        });
    }

    // Submenu items click
    const submenuItems = document.querySelectorAll('.submenu-item');
    
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all submenu items
            submenuItems.forEach(subItem => {
                subItem.classList.remove('active-sub');
            });
            
            // Add active class to clicked item
            this.classList.add('active-sub');
            
            console.log('Navegando para:', this.textContent);
            // Aqui você pode adicionar a lógica de navegação
        });
    });

    // Progress dots animation (opcional)
    const progressDots = document.querySelectorAll('.progress-dots');
    
    progressDots.forEach(dotGroup => {
        const dots = dotGroup.querySelectorAll('.dot');
        
        // Exemplo: animar dots aleatoriamente
        setInterval(() => {
            const randomDot = dots[Math.floor(Math.random() * dots.length)];
            randomDot.style.background = 'rgba(79, 209, 197, 0.8)';
            
            setTimeout(() => {
                randomDot.style.background = 'rgba(255, 255, 255, 0.3)';
            }, 500);
        }, 3000);
    });

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K para focar no menu
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const firstMenuItem = document.querySelector('.menu-item');
            if (firstMenuItem) {
                firstMenuItem.querySelector('.menu-item-header').focus();
            }
        }
        
        // ESC para fechar submenus
        if (e.key === 'Escape') {
            menuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Hover effects for week items
    const weekItems = document.querySelectorAll('.week-item'); // Alterado de .week-container
    
    weekItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const line = this.querySelector('.week-line');
            if (line) {
                line.style.background = 'rgba(79, 209, 197, 0.5)';
                line.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const line = this.querySelector('.week-line');
            if (line) {
                line.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        });
    });

    // Console welcome message
    console.log('%c HelloCoder Study System ', 'background: #4FD1C5; color: #1a1d3a; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Sistema de estudos carregado com sucesso! ', 'color: #4FD1C5; font-size: 14px;');
});