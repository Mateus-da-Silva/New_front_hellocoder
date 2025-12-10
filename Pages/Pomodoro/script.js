// Espera o DOM (estrutura HTML) ser totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================= //
    // JS da Sidebar (de ontem)
    // ======================================= //
    // (O código da sidebar permanece o mesmo de antes)
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
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => alert('Adicionar novo item'));
    }
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
        });
    });
    
    // ======================================= //
    // LÓGICA DO POMODORO (ATUALIZADA)
    // ======================================= //

    // --- Seleção de Elementos ---
    const pomodoroTabs = document.querySelectorAll('.pomodoro-tab');
    const tabPomodoro = document.getElementById('tab-pomodoro');
    const tabShortBreak = document.getElementById('tab-short-break');
    const tabLongBreak = document.getElementById('tab-long-break');
    
    const timerDisplay = document.getElementById('timer-display');
    const startStopBtn = document.getElementById('start-stop-btn');
    const alarmSound = document.getElementById('alarm-sound');

    // --- Variáveis de Estado ---
    let timerInterval = null; 
    let remainingTime = parseInt(tabPomodoro.dataset.time, 10); 
    let isRunning = false;
    
    // --- NOVAS Variáveis de Ciclo ---
    let currentMode = 'pomodoro'; // 'pomodoro', 'shortBreak', 'longBreak'
    let currentCycle = 0; // Quantos pomodoros completamos
    let cyclesUntilLongBreak = 4; // Padrão
    let autoStartTimers = false; // Padrão

    // --- FUNÇÕES ---

    // Atualiza o visor do timer (ex: 1800 -> 30:00)
    function updateTimerDisplay(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // NOVO: Toca o alarme
    function playAlarm() {
        if (alarmSound) {
            alarmSound.currentTime = 0; // Reinicia o áudio
            alarmSound.play();
        }
    }

    // Para e reseta o timer
    function resetTimer() {
        clearInterval(timerInterval); 
        timerInterval = null;
        isRunning = false;
        startStopBtn.textContent = 'COMEÇAR';
        startStopBtn.classList.remove('running');
    }

    // NOVO: Função que troca o modo
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

    // Inicia o timer
    function startTimer() {
        if (isRunning) return; 

        isRunning = true;
        startStopBtn.textContent = 'PAUSAR';
        startStopBtn.classList.add('running');

        timerInterval = setInterval(() => {
            remainingTime--;
            updateTimerDisplay(remainingTime);

            // --- LÓGICA DE TÉRMINO (ATUALIZADA) ---
            if (remainingTime <= 0) {
                playAlarm(); // Toca o alarme
                
                // Decide qual modo é o próximo
                if (currentMode === 'pomodoro') {
                    currentCycle++;
                    if (currentCycle % cyclesUntilLongBreak === 0) {
                        switchMode('longBreak');
                    } else {
                        switchMode('shortBreak');
                    }
                } else {
                    // Se terminou uma pausa (pequena ou longa), volta pro pomodoro
                    switchMode('pomodoro');
                }

                // Inicia o próximo timer automaticamente se a opção estiver marcada
                if (autoStartTimers) {
                    startTimer();
                } else {
                    resetTimer(); // Apenas para, mas já com o modo/tempo trocado
                }
            }
        }, 1000); 
    }

    // Pausa o timer
    function pauseTimer() {
        if (!isRunning) return; 
        
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        startStopBtn.textContent = 'COMEÇAR';
        startStopBtn.classList.remove('running');
    }

    // --- EVENT LISTENERS ---

    // Lógica para clicar nas abas (manual)
    pomodoroTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Define o modo com base no ID da aba clicada
            let newMode = 'pomodoro';
            if (tab.id === 'tab-short-break') newMode = 'shortBreak';
            if (tab.id === 'tab-long-break') newMode = 'longBreak';
            
            switchMode(newMode);
            currentCycle = 0; // Reseta a contagem de ciclo se trocar manual
        });
    });

    // Lógica para o botão "COMEÇAR/PAUSAR"
    startStopBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    // ======================================= //
    // LÓGICA DO MODAL (ATUALIZADA)
    // ======================================= //

    const settingsBtn = document.getElementById('settings-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const saveSettingsBtn = document.getElementById('modal-save-btn');
    
    // Inputs de tempo
    const pomodoroInput = document.getElementById('pomodoro-input');
    const shortBreakInput = document.getElementById('short-break-input');
    const longBreakInput = document.getElementById('long-break-input');
    
    // NOVOS Inputs de ciclo
    const cyclesInput = document.getElementById('cycles-input');
    const autoStartInput = document.getElementById('auto-start-input');

    // Abre o modal
    settingsBtn.addEventListener('click', () => {
        // Carrega os valores atuais nos inputs
        pomodoroInput.value = parseInt(tabPomodoro.dataset.time, 10) / 60;
        shortBreakInput.value = parseInt(tabShortBreak.dataset.time, 10) / 60;
        longBreakInput.value = parseInt(tabLongBreak.dataset.time, 10) / 60;
        
        cyclesInput.value = cyclesUntilLongBreak;
        autoStartInput.checked = autoStartTimers;
        
        modalOverlay.classList.add('visible');
    });

    // Fecha o modal (botão X)
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('visible');
    });

    // Fecha o modal (clique fora)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('visible');
        }
    });

    // Salva as configurações
    saveSettingsBtn.addEventListener('click', () => {
        // Salva os novos tempos (em segundos) nos atributos data-time
        tabPomodoro.dataset.time = pomodoroInput.value * 60;
        tabShortBreak.dataset.time = shortBreakInput.value * 60;
        tabLongBreak.dataset.time = longBreakInput.value * 60;

        // Salva as novas configurações de ciclo
        cyclesUntilLongBreak = parseInt(cyclesInput.value, 10);
        autoStartTimers = autoStartInput.checked;

        // Fecha o modal
        modalOverlay.classList.remove('visible');

        // Reseta o timer e atualiza o visor com o novo valor do modo ATUAL
        resetTimer();
        // Não reseta o currentCycle aqui
        switchMode(currentMode); // Re-aplica o tempo do modo atual
    });

    // Define o valor inicial do timer ao carregar a página
    updateTimerDisplay(remainingTime);
});