// Espera o DOM (estrutura HTML) ser totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================= //
    // JS da Sidebar (Funciona em todas as páginas)
    // ======================================= //
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const header = item.querySelector('.menu-item-header');
        header.addEventListener('click', function() {
            // Se o item clicado não tem submenu
            if (!item.querySelector('.submenu')) {
                // Remove 'active' e 'open' de todos
                menuItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.classList.remove('open'); 
                });
                // Adiciona 'active' apenas ao item clicado
                item.classList.add('active');
                return;
            }

            // Lógica para quem TEM submenu (Página Inicial)
            const isOpen = item.classList.contains('active');
            
            // Fecha todos os outros (caso existissem)
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.classList.remove('open');
                }
            });
            
            // Abre ou fecha o item clicado
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
    
    // O toggleBtn foi removido do HTML, esta lógica não será executada
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
            // Lógica de navegação (ex: window.location.href = 'atividades.html')
        });
    });
    
    // ======================================= //
    // LÓGICA DO POMODORO (Ignorada nesta página)
    // ======================================= //

    const pomodoroTabs = document.querySelectorAll('.pomodoro-tab');
    const tabPomodoro = document.getElementById('tab-pomodoro');
    const tabShortBreak = document.getElementById('tab-short-break');
    const tabLongBreak = document.getElementById('tab-long-break');
    
    const timerDisplay = document.getElementById('timer-display');
    const startStopBtn = document.getElementById('start-stop-btn');
    const alarmSound = document.getElementById('alarm-sound');

    // Se não achar os elementos (pq não estamos na pág. pomodoro), para a execução
    if (!tabPomodoro || !timerDisplay || !startStopBtn) {
        // console.log("Página de Atividades ou Notificações: Lógica do Pomodoro não iniciada.");
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
    // LÓGICA DO MODAL (Ignorada nesta página)
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

    // Define o valor inicial do timer (só roda na pág. Pomodoro)
    updateTimerDisplay(remainingTime);
});