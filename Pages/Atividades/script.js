// ======================================= //
// CONFIGURAÇÃO DA API
// ======================================= //
const API_URL = 'http://localhost:3000/api';

// Espera o DOM (estrutura HTML) ser totalmente carregado
document.addEventListener('DOMContentLoaded', function() {

    // Carregar atividades ao abrir a página
    carregarAtividades();

    // ======================================= //
    // JS da Sidebar (Funciona em todas as páginas)
    // ======================================= //
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const header = item.querySelector('.menu-item-header');
        header.addEventListener('click', function() {
            if (!item.querySelector('.submenu')) {
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.classList.remove('open');
                    }
                });
                item.classList.add('active');
                return;
            }
            const isOpen = item.classList.contains('active');
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.classList.remove('open');
                }
            });
            if (!isOpen) {
                item.classList.add('active');
                item.classList.add('open');
            } else {
                item.classList.remove('active');
                item.classList.remove('open');
            }
        });
    });
    // Botão "+" da sidebar - Abre modal de nova atividade
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => abrirModalNovaAtividade());
    }
    // O toggleBtn foi removido do HTML, o JS vai lidar com isso (não vai achar e não vai dar erro)
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            submenuItems.forEach(subItem => subItem.classList.remove('active-sub'));
            this.classList.add('active-sub');
            console.log('Navegando para:', this.textContent);
            // Aqui você pode adicionar a lógica de navegação real,
            // por ex: window.location.href = 'pomodoro.html';
        });
    });
    
    // ======================================= //
    // LÓGICA DO POMODORO (Só funciona na pág. Pomodoro)
    // ======================================= //

    // --- Seleção de Elementos ---
    const pomodoroTabs = document.querySelectorAll('.pomodoro-tab');
    const tabPomodoro = document.getElementById('tab-pomodoro');
    const tabShortBreak = document.getElementById('tab-short-break');
    const tabLongBreak = document.getElementById('tab-long-break');
    
    const timerDisplay = document.getElementById('timer-display');
    const startStopBtn = document.getElementById('start-stop-btn');
    const alarmSound = document.getElementById('alarm-sound');

    // Se não achar os elementos (pq não estamos na pág. pomodoro), não faz nada
    if (!tabPomodoro || !timerDisplay) {
        return; 
    }

    // --- Variáveis de Estado ---
    let timerInterval = null; 
    let remainingTime = parseInt(tabPomodoro.dataset.time, 10); 
    let isRunning = false;
    
    let currentMode = 'pomodoro'; 
    let currentCycle = 0; 
    let cyclesUntilLongBreak = 4; 
    let autoStartTimers = false; 

    // --- FUNÇÕES ---
    function updateTimerDisplay(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function playAlarm() {
        if (alarmSound) {
            alarmSound.currentTime = 0; 
            alarmSound.play().catch(e => console.log("Erro ao tocar alarme:", e));
        }
    }

    function resetTimer() {
        clearInterval(timerInterval); 
        timerInterval = null;
        isRunning = false;
        startStopBtn.textContent = 'COMEÇAR';
        startStopBtn.classList.remove('running');
    }

    function switchMode(newMode) {
        resetTimer();
        currentMode = newMode;
        pomodoroTabs.forEach(t => t.classList.remove('active'));

        let newTime = 0;
        
        if (newMode === 'pomodoro') {
            tabPomodoro.classList.add('active');
            newTime = parseInt(tabPomodoro.dataset.time, 10);
        } else if (newMode === 'shortBreak') {
            tabShortBreak.classList.add('active');
            newTime = parseInt(tabShortBreak.dataset.time, 10);
        } else if (newMode === 'longBreak') {
            tabLongBreak.classList.add('active');
            newTime = parseInt(tabLongBreak.dataset.time, 10);
        }

        remainingTime = newTime;
        updateTimerDisplay(remainingTime);
    }

    function startTimer() {
        if (isRunning) return; 

        // "Acorda" o áudio para o navegador
        if(alarmSound) {
            alarmSound.play();
            alarmSound.pause();
        }

        isRunning = true;
        startStopBtn.textContent = 'PAUSAR';
        startStopBtn.classList.add('running');

        timerInterval = setInterval(() => {
            remainingTime--;
            updateTimerDisplay(remainingTime);

            if (remainingTime <= 0) {
                playAlarm(); 
                
                if (currentMode === 'pomodoro') {
                    currentCycle++;
                    if (currentCycle % cyclesUntilLongBreak === 0) {
                        switchMode('longBreak');
                    } else {
                        switchMode('shortBreak');
                    }
                } else {
                    switchMode('pomodoro');
                }

                if (autoStartTimers) {
                    startTimer();
                } else {
                    resetTimer(); 
                }
            }
        }, 1000); 
    }

    function pauseTimer() {
        if (!isRunning) return; 
        
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        startStopBtn.textContent = 'COMEÇAR';
        startStopBtn.classList.remove('running');
    }

    // --- EVENT LISTENERS ---
    pomodoroTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            let newMode = 'pomodoro';
            if (tab.id === 'tab-short-break') newMode = 'shortBreak';
            if (tab.id === 'tab-long-break') newMode = 'longBreak';
            
            switchMode(newMode);
            currentCycle = 0; 
        });
    });

    startStopBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    // ======================================= //
    // LÓGICA DO MODAL (Só funciona na pág. Pomodoro)
    // ======================================= //
    const settingsBtn = document.getElementById('settings-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if(settingsBtn) {
        const closeModalBtn = document.getElementById('modal-close-btn');
        const saveSettingsBtn = document.getElementById('modal-save-btn');
        const pomodoroInput = document.getElementById('pomodoro-input');
        const shortBreakInput = document.getElementById('short-break-input');
        const longBreakInput = document.getElementById('long-break-input');
        const cyclesInput = document.getElementById('cycles-input');
        const autoStartInput = document.getElementById('auto-start-input');

        settingsBtn.addEventListener('click', () => {
            pomodoroInput.value = parseInt(tabPomodoro.dataset.time, 10) / 60;
            shortBreakInput.value = parseInt(tabShortBreak.dataset.time, 10) / 60;
            longBreakInput.value = parseInt(tabLongBreak.dataset.time, 10) / 60;
            cyclesInput.value = cyclesUntilLongBreak;
            autoStartInput.checked = autoStartTimers;
            modalOverlay.classList.add('visible');
        });

        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('visible');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('visible');
            }
        });

        saveSettingsBtn.addEventListener('click', () => {
            tabPomodoro.dataset.time = pomodoroInput.value * 60;
            tabShortBreak.dataset.time = shortBreakInput.value * 60;
            tabLongBreak.dataset.time = longBreakInput.value * 60;
            cyclesUntilLongBreak = parseInt(cyclesInput.value, 10);
            autoStartTimers = autoStartInput.checked;
            modalOverlay.classList.remove('visible');
            resetTimer();
            switchMode(currentMode);
        });
    }

    // Define o valor inicial do timer ao carregar a página
    updateTimerDisplay(remainingTime);
});

// ======================================= //
// FUNÇÕES DE API - ATIVIDADES
// ======================================= //

async function carregarAtividades() {
    try {
        console.log('🔄 Carregando atividades...');

        // Obter usuário logado
        let usuario = getUsuarioLogado();
        console.log('👤 Usuário:', usuario);

        if (!usuario) {
            console.warn('⚠️ Usuário não encontrado, usando ID padrão 1');
            // Usar ID padrão se não houver usuário logado
            usuario = { id: 1 };
        }

        // Buscar atividades de hoje
        console.log('📅 Buscando atividades de hoje...');
        const respostaHoje = await fetch(`${API_URL}/atividades/hoje?usuario_id=${usuario.id}`);
        const dadosHoje = await respostaHoje.json();
        console.log('✅ Atividades de hoje:', dadosHoje);

        // Buscar atividades concluídas hoje
        console.log('✔️ Buscando atividades concluídas hoje...');
        const respostaConcluidasHoje = await fetch(`${API_URL}/atividades/concluidas-hoje?usuario_id=${usuario.id}`);
        const dadosConcluidasHoje = await respostaConcluidasHoje.json();
        console.log('✅ Atividades concluídas hoje:', dadosConcluidasHoje);

        // Buscar atividades de ontem
        console.log('📆 Buscando atividades de ontem...');
        const respostaOntem = await fetch(`${API_URL}/atividades/ontem?usuario_id=${usuario.id}`);
        const dadosOntem = await respostaOntem.json();
        console.log('✅ Atividades de ontem:', dadosOntem);

        // Renderizar as atividades
        renderizarAtividadesHoje(dadosHoje.data || []);
        renderizarAtividadesConcluidasHoje(dadosConcluidasHoje.data || []);
        renderizarAtividadesOntem(dadosOntem.data || []);

        // Atualizar data do header
        atualizarDataHeader();

        console.log('🎉 Atividades carregadas com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao carregar atividades:', error);
        alert('Erro ao conectar com o servidor. Certifique-se de que o backend está rodando em http://localhost:3000');
    }
}

function renderizarAtividadesHoje(atividades) {
    const container = document.querySelector('.activities-container');
    const primeiraRow = container.querySelector('.activity-row');
    primeiraRow.innerHTML = '';

    if (atividades.length === 0) {
        primeiraRow.innerHTML = '<p style="color: #fff; opacity: 0.7;">Nenhuma atividade agendada para hoje</p>';
        return;
    }

    atividades.forEach(atividade => {
        const card = criarCardAtividade(atividade);
        primeiraRow.appendChild(card);
    });
}

function renderizarAtividadesConcluidasHoje(atividades) {
    const rows = document.querySelectorAll('.activity-row');
    if (rows.length < 2) return;

    const segundaRow = rows[1];
    segundaRow.innerHTML = '';

    if (atividades.length === 0) {
        segundaRow.innerHTML = '<p style="color: #fff; opacity: 0.7;">Nenhuma atividade concluída hoje</p>';
        return;
    }

    atividades.forEach(atividade => {
        const card = criarCardAtividade(atividade, true);
        segundaRow.appendChild(card);
    });
}

function renderizarAtividadesOntem(atividades) {
    const rows = document.querySelectorAll('.activity-row');
    if (rows.length < 3) return;

    const terceiraRow = rows[2];
    terceiraRow.innerHTML = '';

    if (atividades.length === 0) {
        terceiraRow.innerHTML = '<p style="color: #fff; opacity: 0.7;">Nenhuma atividade concluída ontem</p>';
        return;
    }

    atividades.forEach(atividade => {
        const card = criarCardAtividade(atividade, true);
        terceiraRow.appendChild(card);
    });
}

function criarCardAtividade(atividade, concluida = false) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.dataset.id = atividade.id;

    const titulo = document.createElement('span');
    titulo.className = 'card-title';
    titulo.textContent = atividade.materia.toUpperCase();

    const icon = document.createElement('i');
    icon.className = 'fas fa-file-alt card-icon';

    card.appendChild(titulo);

    if (!concluida && atividade.tempo_estimado) {
        const info = document.createElement('div');
        info.className = 'card-info';
        info.innerHTML = `<i class="fas fa-clock"></i> ${atividade.tempo_estimado}`;
        card.appendChild(info);
    }

    card.appendChild(icon);

    // Adicionar evento de clique
    card.addEventListener('click', () => mostrarDetalhesAtividade(atividade));

    return card;
}

function atualizarDataHeader() {
    const headerDate = document.querySelector('.header-date span');
    if (headerDate) {
        const hoje = new Date();
        const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
        headerDate.textContent = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    }
}

function abrirModalNovaAtividade() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (!modalOverlay) {
        criarModalNovaAtividade();
    } else {
        modalOverlay.classList.add('visible');
    }
}

function criarModalNovaAtividade() {
    const modalHTML = `
        <div class="modal-overlay visible" id="modal-overlay">
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
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalOverlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('btn-cancelar');
    const form = document.getElementById('form-nova-atividade');

    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('visible'));
    cancelBtn.addEventListener('click', () => modalOverlay.classList.remove('visible'));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('visible');
    });

    form.addEventListener('submit', salvarNovaAtividade);
}

async function salvarNovaAtividade(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Obter usuário logado
    const usuario = getUsuarioLogado();
    if (!usuario) {
        alert('Você precisa estar logado para criar atividades.');
        window.location.href = '../Login/index.html';
        return;
    }

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
            alert('Atividade criada com sucesso!');
            document.getElementById('modal-overlay').classList.remove('visible');
            form.reset();
            carregarAtividades(); // Recarregar lista
        } else {
            alert('Erro ao criar atividade: ' + dados.error);
        }
    } catch (error) {
        console.error('Erro ao salvar atividade:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

function mostrarDetalhesAtividade(atividade) {
    const modalHTML = `
        <div class="modal-box modal-detalhes">
            <div class="modal-header">
                <h2>Detalhes da Atividade</h2>
                <button class="modal-close-btn" onclick="fecharModalDetalhes()">&times;</button>
            </div>
            <div class="modal-content-detalhes">
                <div class="detalhe-item">
                    <span class="detalhe-label">Matéria:</span>
                    <span class="detalhe-valor">${atividade.materia}</span>
                </div>
                <div class="detalhe-item">
                    <span class="detalhe-label">Título:</span>
                    <span class="detalhe-valor">${atividade.titulo}</span>
                </div>
                ${atividade.descricao ? `
                <div class="detalhe-item">
                    <span class="detalhe-label">Descrição:</span>
                    <span class="detalhe-valor">${atividade.descricao}</span>
                </div>
                ` : ''}
                <div class="detalhe-item">
                    <span class="detalhe-label">Data de Entrega:</span>
                    <span class="detalhe-valor">${formatarData(atividade.data_entrega)}</span>
                </div>
                ${atividade.hora_entrega ? `
                <div class="detalhe-item">
                    <span class="detalhe-label">Hora:</span>
                    <span class="detalhe-valor">${atividade.hora_entrega}</span>
                </div>
                ` : ''}
                ${atividade.tempo_estimado ? `
                <div class="detalhe-item">
                    <span class="detalhe-label">Tempo Estimado:</span>
                    <span class="detalhe-valor">${atividade.tempo_estimado}</span>
                </div>
                ` : ''}
                <div class="detalhe-item">
                    <span class="detalhe-label">Prioridade:</span>
                    <span class="detalhe-valor prioridade-${atividade.prioridade}">${atividade.prioridade ? atividade.prioridade.charAt(0).toUpperCase() + atividade.prioridade.slice(1) : 'Média'}</span>
                </div>
                <div class="detalhe-item">
                    <span class="detalhe-label">Status:</span>
                    <span class="detalhe-valor status-${atividade.status}">${atividade.status === 'pendente' ? 'Pendente' : 'Concluída'}</span>
                </div>
            </div>
            <div class="modal-actions">
                ${atividade.status === 'pendente' ? `
                <button class="btn-concluir" onclick="concluirAtividade(${atividade.id})">
                    <i class="fas fa-check"></i> Marcar como Concluída
                </button>
                ` : ''}
                <button class="btn-editar" onclick="editarAtividade(${atividade.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-deletar" onclick="deletarAtividade(${atividade.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `;

    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.innerHTML = modalHTML;
    modalOverlay.classList.add('visible');

    // Fechar ao clicar fora
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) fecharModalDetalhes();
    });
}

function fecharModalDetalhes() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.remove('visible');
    modalOverlay.innerHTML = '';
}

async function concluirAtividade(id) {
    if (!confirm('Deseja marcar esta atividade como concluída?')) return;

    try {
        const resposta = await fetch(`${API_URL}/atividades/${id}/concluir`, {
            method: 'PATCH'
        });

        const dados = await resposta.json();

        if (dados.success) {
            alert('Atividade marcada como concluída!');
            fecharModalDetalhes();
            carregarAtividades();
        } else {
            alert('Erro ao concluir atividade: ' + dados.error);
        }
    } catch (error) {
        console.error('Erro ao concluir atividade:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

async function deletarAtividade(id) {
    if (!confirm('Deseja realmente excluir esta atividade? Esta ação não pode ser desfeita.')) return;

    try {
        const resposta = await fetch(`${API_URL}/atividades/${id}`, {
            method: 'DELETE'
        });

        const dados = await resposta.json();

        if (dados.success) {
            alert('Atividade excluída com sucesso!');
            fecharModalDetalhes();
            carregarAtividades();
        } else {
            alert('Erro ao excluir atividade: ' + dados.error);
        }
    } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

function editarAtividade(id) {
    fecharModalDetalhes();
    abrirModalEdicaoAtividade(id);
}

async function abrirModalEdicaoAtividade(id) {
    try {
        // Buscar dados da atividade
        const resposta = await fetch(`${API_URL}/atividades/${id}`);
        const dados = await resposta.json();

        if (!dados.success) {
            alert('Erro ao carregar atividade');
            return;
        }

        const atividade = dados.data;

        const modalHTML = `
            <div class="modal-box">
                <div class="modal-header">
                    <h2>Editar Atividade</h2>
                    <button class="modal-close-btn" onclick="fecharModalDetalhes()">&times;</button>
                </div>
                <form id="form-editar-atividade" class="modal-form">
                    <input type="hidden" name="id" value="${atividade.id}">
                    <div class="form-group">
                        <label>Título:</label>
                        <input type="text" name="titulo" required placeholder="Ex: Trabalho de SQL" value="${atividade.titulo}">
                    </div>
                    <div class="form-group">
                        <label>Matéria:</label>
                        <input type="text" name="materia" required placeholder="Ex: BANCO DE DADOS II" value="${atividade.materia}">
                    </div>
                    <div class="form-group">
                        <label>Descrição:</label>
                        <textarea name="descricao" rows="3" placeholder="Descrição da atividade (opcional)">${atividade.descricao || ''}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Data de Entrega:</label>
                            <input type="date" name="data_entrega" required value="${atividade.data_entrega}">
                        </div>
                        <div class="form-group">
                            <label>Hora:</label>
                            <input type="time" name="hora_entrega" value="${atividade.hora_entrega || ''}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tempo Estimado:</label>
                            <input type="text" name="tempo_estimado" placeholder="Ex: 1hr, 30min" value="${atividade.tempo_estimado || ''}">
                        </div>
                        <div class="form-group">
                            <label>Prioridade:</label>
                            <select name="prioridade">
                                <option value="baixa" ${atividade.prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
                                <option value="media" ${atividade.prioridade === 'media' ? 'selected' : ''}>Média</option>
                                <option value="alta" ${atividade.prioridade === 'alta' ? 'selected' : ''}>Alta</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn-cancelar" onclick="fecharModalDetalhes()">Cancelar</button>
                        <button type="submit" class="btn-salvar">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        `;

        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.innerHTML = modalHTML;
        modalOverlay.classList.add('visible');

        // Event listener do formulário
        const form = document.getElementById('form-editar-atividade');
        form.addEventListener('submit', salvarEdicaoAtividade);

        // Fechar ao clicar fora
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) fecharModalDetalhes();
        });

    } catch (error) {
        console.error('Erro ao carregar atividade:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

async function salvarEdicaoAtividade(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const atividadeAtualizada = {
        titulo: formData.get('titulo'),
        materia: formData.get('materia'),
        descricao: formData.get('descricao'),
        data_entrega: formData.get('data_entrega'),
        hora_entrega: formData.get('hora_entrega') || null,
        tempo_estimado: formData.get('tempo_estimado'),
        prioridade: formData.get('prioridade')
    };

    const id = formData.get('id');

    try {
        const resposta = await fetch(`${API_URL}/atividades/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atividadeAtualizada)
        });

        const dados = await resposta.json();

        if (dados.success) {
            alert('Atividade atualizada com sucesso!');
            fecharModalDetalhes();
            carregarAtividades();
        } else {
            alert('Erro ao atualizar atividade: ' + dados.error);
        }
    } catch (error) {
        console.error('Erro ao salvar atividade:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

function formatarData(data) {
    const d = new Date(data + 'T00:00:00');
    return d.toLocaleDateString('pt-BR');
}