// Espera o DOM (estrutura HTML) ser totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    
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
    // LÓGICA DO POMODORO (Ignorada se não for a pág. Pomodoro)
    // ======================================= //
    // ... (toda a lógica do pomodoro, modal e alarme vai aqui) ...
    // (Omitido para manter o foco, mas o teu código original fica aqui)

    // ======================================= //
    // LÓGICA DA PÁGINA "REVISÕES" (Ignorada se não for a pág. Revisões)
    // ======================================= //
    // ... (toda a lógica das revisões vai aqui) ...
    // (Omitido para manter o foco, mas o teu código original fica aqui)


    // ======================================= //
    // NOVO: LÓGICA DA PÁGINA "CALENDÁRIO"     //
    // ======================================= //

    // Seleciona os elementos do calendário
    const monthDisplay = document.getElementById('month-display');
    const yearDisplay = document.getElementById('year-display');
    const daysGrid = document.getElementById('calendar-days-grid');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const scheduleList = document.getElementById('schedule-list');
    
    // NOVO: Seleciona o container do relógio
    const clockContainer = document.querySelector('.time-list-container');

    // Só executa se estivermos na página do calendário
    if (monthDisplay) {
        
        // --- Simulação de Banco de Dados de Compromissos ---
        // ALTERADO: Movi os compromissos de Maio para Novembro (mês atual)
        // para que possas vê-los a funcionar com a data de hoje.
        const appointments = {
            "2025-11-04": [ // MUDADO DE 2025-05-04
                { title: "Reunião de Projeto", description: "Alinhar próximas sprints." },
                { title: "Estudar Álgebra Linear", description: "Capítulo 3." }
            ],
            "2025-11-08": [ // MUDADO DE 2025-05-08
                { title: "Consulta Médica", description: "Check-up anual." }
            ],
            "2025-11-15": [ // MUDADO DE 2025-05-15
                { title: "Entregar trabalho Banco de Dados II", description: "Fase 2 do projeto." }
            ]
        };

        // ALTERADO: Removemos a data forçada e usamos a data real
        const today = new Date(); // Esta é a data real de "hoje"
        
        // --- Estado do Calendário ---
        // ALTERADO: Inicia o calendário no mês e ano atuais
        let currentDate = new Date(today.getFullYear(), today.getMonth(), 1); 
        // ALTERADO: Inicia o dia selecionado como "hoje"
        let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); 

        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        // --- FUNÇÕES ---

        // Desenha os compromissos na barra lateral
        function renderAppointments(date) {
            scheduleList.innerHTML = ''; // Limpa a lista
            
            // Formata a data para "YYYY-MM-DD"
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            
            const dayAppointments = appointments[key];

            if (dayAppointments && dayAppointments.length > 0) {
                dayAppointments.forEach(app => {
                    const item = document.createElement('div');
                    item.className = 'schedule-item';
                    item.innerHTML = `
                        <i class="fas fa-bell"></i>
                        <div class="schedule-item-details">
                            <span class="schedule-item-title">${app.title}</span>
                            <span class="schedule-item-desc">${app.description}</span>
                        </div>
                    `;
                    scheduleList.appendChild(item);
                });
            } else {
                scheduleList.innerHTML = '<div class="schedule-item-details"><span class="schedule-item-desc">Nenhum compromisso para este dia.</span></div>';
            }
        }

        // Desenha o calendário
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            // Atualiza o display "May 2025"
            monthDisplay.textContent = monthNames[month];
            yearDisplay.textContent = year;

            daysGrid.innerHTML = ''; // Limpa o grid

            // Lógica para encontrar o primeiro dia e o total de dias
            const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Dom, 1=Seg,...
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Ajusta o 'firstDay' para começar na Segunda (M)
            const gridStartDate = (firstDayOfMonth === 0) ? 6 : (firstDayOfMonth - 1);

            // 1. Preenche os dias do mês anterior
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            for (let i = 0; i < gridStartDate; i++) {
                const day = daysInPrevMonth - gridStartDate + i + 1;
                const el = document.createElement('div');
                el.className = 'day other-month';
                el.textContent = day;
                daysGrid.appendChild(el);
            }

            // 2. Preenche os dias do mês atual
            for (let i = 1; i <= daysInMonth; i++) {
                const el = document.createElement('div');
                el.className = 'day';
                el.textContent = i;
                
                const dayDate = new Date(year, month, i);

                // ALTERADO: Marca o dia "Hoje" real
                if (dayDate.toDateString() === today.toDateString()) {
                    el.classList.add('today');
                }
                
                // Marca o dia "Selecionado"
                if (dayDate.toDateString() === selectedDate.toDateString()) {
                    el.classList.add('selected');
                }
                
                // Adiciona o evento de clique
                el.addEventListener('click', () => {
                    selectedDate = dayDate;
                    renderCalendar(); // Redesenha o calendário
                    renderAppointments(selectedDate); // Atualiza os compromissos
                });
                
                daysGrid.appendChild(el);
            }

            // 3. Preenche os dias do próximo mês
            const totalGridCells = 42; // 6 semanas * 7 dias
            const remainingCells = totalGridCells - (gridStartDate + daysInMonth);
            for (let i = 1; i <= remainingCells; i++) {
                const el = document.createElement('div');
                el.className = 'day other-month';
                el.textContent = i;
                daysGrid.appendChild(el);
            }
        }
        
        // NOVO: Função para o Relógio Digital
        function startDigitalClock() {
            if (clockContainer) {
                // Adiciona alguns estilos para o relógio ficar bonito
                // Fiz isto via JS para não precisares de mexer no CSS
                clockContainer.style.fontSize = '2.2rem';
                clockContainer.style.fontWeight = '700';
                clockContainer.style.textAlign = 'center';
                clockContainer.style.color = '#FFFFFF';
                clockContainer.style.padding = '10px 0'; // Ajusta o espaçamento
                clockContainer.style.lineHeight = '1.3';

                // Função que atualiza a hora
                function updateClock() {
                    const now = new Date();
                    let hours = now.getHours();
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');
                    
                    // Converte para formato 12h (AM/PM)
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // A hora 0 deve ser 12
                    const strHours = String(hours).padStart(2, '0');
                    
                    // Coloca no HTML
                    clockContainer.innerHTML = `${strHours}:${minutes}:${seconds} <span style="font-size: 1.5rem">${ampm}</span>`;
                }

                updateClock(); // Chama uma vez para não ficar vazio
                setInterval(updateClock, 1000); // Atualiza a cada segundo
            }
        }

        // --- Event Listeners dos Botões ---
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        // --- Inicialização ---
        renderCalendar();
        renderAppointments(selectedDate); // Mostra os compromissos do dia de HOJE
        startDigitalClock(); // NOVO: Inicia o relógio digital
    }

});