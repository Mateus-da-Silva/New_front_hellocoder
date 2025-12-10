// ======================================= //
// CONFIGURAÇÃO DA API
// ======================================= //
const API_URL = 'http://localhost:3000/api';

// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle submenu
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const header = item.querySelector('.menu-item-header');
        const submenu = item.querySelector('.submenu');
        const link = item.getAttribute('data-link');

        header.addEventListener('click', function(e) {
            console.log('Menu clicado:', item, 'Tem submenu:', !!submenu, 'Tem link:', !!link);

            // Se o item tem submenu, abre/fecha o submenu
            if (submenu) {
                e.preventDefault();
                e.stopPropagation();

                // Close other menu items
                menuItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                console.log('Item agora está:', item.classList.contains('active') ? 'ATIVO' : 'INATIVO');
            }
            // Se tem data-link, navega para a página
            else if (link) {
                window.location.href = link;
            }
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

    // Add button functionality - Abre modal de nova atividade
    const addBtn = document.querySelector('.add-btn');

    if (addBtn) {
        addBtn.addEventListener('click', function() {
            abrirModalNovaAtividade();
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

    // ======================================= //
    // MODAL DE NOVA ATIVIDADE
    // ======================================= //
    const createActivityBtn = document.getElementById('create-activity-btn');

    if (createActivityBtn) {
        createActivityBtn.addEventListener('click', () => abrirModalNovaAtividade());
    }
});

// ======================================= //
// FUNÇÕES DO MODAL DE ATIVIDADES
// ======================================= //

function abrirModalNovaAtividade() {
    const modalOverlay = document.getElementById('modal-overlay');

    // Se o modal já existe, apenas mostra
    const modalExistente = document.querySelector('.modal-box');
    if (modalExistente) {
        modalOverlay.classList.add('visible');
        return;
    }

    // Criar o modal
    criarModalNovaAtividade();
}

function criarModalNovaAtividade() {
    const modalHTML = `
        <div class="modal-box">
            <div class="modal-header">
                <h2>Nova Atividade</h2>
                <button class="modal-close-btn" id="modal-close-btn">&times;</button>
            </div>
            <form id="form-nova-atividade" class="modal-form">
                <div class="form-group">
                    <label>Título:</label>
                    <input type="text" name="titulo" required placeholder="Ex: Trabalho de SQL">
                </div>
                <div class="form-group">
                    <label>Matéria:</label>
                    <input type="text" name="materia" required placeholder="Ex: BANCO DE DADOS II">
                </div>
                <div class="form-group">
                    <label>Descrição:</label>
                    <textarea name="descricao" rows="3" placeholder="Descrição da atividade (opcional)"></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Data de Entrega:</label>
                        <input type="date" name="data_entrega" required>
                    </div>
                    <div class="form-group">
                        <label>Hora:</label>
                        <input type="time" name="hora_entrega">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Tempo Estimado:</label>
                        <input type="text" name="tempo_estimado" placeholder="Ex: 1hr, 30min">
                    </div>
                    <div class="form-group">
                        <label>Prioridade:</label>
                        <select name="prioridade">
                            <option value="baixa">Baixa</option>
                            <option value="media" selected>Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-cancelar" id="btn-cancelar">Cancelar</button>
                    <button type="submit" class="btn-salvar">Salvar Atividade</button>
                </div>
            </form>
        </div>
    `;

    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.innerHTML = modalHTML;
    modalOverlay.classList.add('visible');

    // Event listeners do modal
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('btn-cancelar');
    const form = document.getElementById('form-nova-atividade');

    closeBtn.addEventListener('click', () => fecharModal());
    cancelBtn.addEventListener('click', () => fecharModal());
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) fecharModal();
    });

    form.addEventListener('submit', salvarNovaAtividade);
}

function fecharModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.remove('visible');
}

async function salvarNovaAtividade(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Obter usuário logado (se houver sistema de autenticação)
    const usuario = getUsuarioLogado ? getUsuarioLogado() : { id: 1 };

    const novaAtividade = {
        titulo: formData.get('titulo'),
        materia: formData.get('materia'),
        descricao: formData.get('descricao'),
        data_entrega: formData.get('data_entrega'),
        hora_entrega: formData.get('hora_entrega') || null,
        tempo_estimado: formData.get('tempo_estimado'),
        prioridade: formData.get('prioridade'),
        status: 'pendente',
        usuario_id: usuario.id
    };

    try {
        const resposta = await fetch(`${API_URL}/atividades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaAtividade)
        });

        const dados = await resposta.json();

        if (dados.success) {
            alert('Atividade criada com sucesso! Você pode visualizá-la no menu Atividades.');
            fecharModal();
            form.reset();

            // Opcional: Redirecionar para a página de atividades
            // window.location.href = '../Atividades/index.html';
        } else {
            alert('Erro ao criar atividade: ' + dados.error);
        }
    } catch (error) {
        console.error('Erro ao salvar atividade:', error);
        alert('Erro ao conectar com o servidor. Certifique-se de que o backend está rodando.');
    }
}

// Função auxiliar para obter usuário logado
function getUsuarioLogado() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
        try {
            return JSON.parse(usuarioStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}