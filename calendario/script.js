/* Interactive calendar + time pickers
   - month navigation
   - select day (active)
   - quick date buttons (3 days window)
   - hour/minute/ampm selects
   - time buttons toggle
*/

(function(){
  // DOM
  const calendarGrid = document.getElementById('calendarGrid');
  const monthNameEl = document.getElementById('monthName');
  const yearNumberEl = document.getElementById('yearNumber');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');
  const quickDatesEl = document.getElementById('quickDates');
  const hourSelect = document.getElementById('hourSelect');
  const minuteSelect = document.getElementById('minuteSelect');
  const ampmSelect = document.getElementById('ampmSelect');
  const timeButtons = document.getElementById('timeButtons');

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // Initialize selects
  function populateTimeSelects(){
    hourSelect.innerHTML = '';
    for(let h=1; h<=12; h++){
      const opt = document.createElement('option');
      opt.value = h;
      opt.textContent = h.toString().padStart(2,'0');
      if (h === 11) opt.selected = true;
      hourSelect.appendChild(opt);
    }
    minuteSelect.innerHTML = '';
    ['00','15','30','45'].forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      minuteSelect.appendChild(opt);
    });
  }

  // Render calendar for currentMonth/currentYear
  function renderCalendar(month, year){
    calendarGrid.innerHTML = '';
    monthNameEl.textContent = monthNames[month];
    yearNumberEl.textContent = year;

    // 1st day of month (0=Sun..6=Sat)
    const firstDay = new Date(year, month, 1).getDay();
    // adapt so week starts Monday (M,T,W,T,F,S,S) like your print
    // JS getDay: 0=Sun. We'll map Monday=0 slot by shifting.
    const shift = (firstDay === 0) ? 6 : firstDay - 1;

    const daysInMonth = new Date(year, month+1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();

    // fill leading (previous month) days
    for(let i = 0; i < shift; i++){
      const d = document.createElement('div');
      d.className = 'day inactive';
      d.textContent = prevDays - shift + 1 + i;
      calendarGrid.appendChild(d);
    }

    // current month days
    for(let d=1; d<=daysInMonth; d++){
      const cell = document.createElement('div');
      cell.className = 'day';
      cell.textContent = d;
      // check if selected
      if (selectedDate.getDate() === d &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year) {
        cell.classList.add('active');
      }
      // highlight today's actual day
      if (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year) {
        cell.classList.add('highlight');
      }

      // click to select
      cell.addEventListener('click', () => {
        if (cell.classList.contains('inactive')) return;
        // remove previous actives
        document.querySelectorAll('.calendar-grid .day.active').forEach(n => n.classList.remove('active'));
        cell.classList.add('active');
        selectedDate = new Date(year, month, d);
        updateQuickDates(selectedDate);
      });

      calendarGrid.appendChild(cell);
    }

    // trailing next-month days to fill grid (optional)
    const totalCells = calendarGrid.children.length;
    const remainder = totalCells % 7;
    if(remainder !== 0){
      const need = 7 - remainder;
      for(let i=1;i<=need;i++){
        const d = document.createElement('div');
        d.className = 'day inactive';
        d.textContent = i;
        calendarGrid.appendChild(d);
      }
    }
  }

  // Quick date buttons (Sun 4, Mon 5, Tue 6)
  function updateQuickDates(baseDate){
    quickDatesEl.innerHTML = '';
    // show baseDate and next two days
    for(let i=0;i<3;i++){
      const dt = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + i);
      const btn = document.createElement('button');
      btn.className = (i===0 ? 'active' : '');
      const weekday = dt.toLocaleDateString('en-US',{weekday:'short'}); // Sun, Mon
      btn.textContent = `${weekday} ${dt.getDate()}`;
      btn.addEventListener('click', () => {
        // toggle active
        quickDatesEl.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        // set selectedDate to this dt and re-render calendar activation
        selectedDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        renderCalendar(selectedDate.getMonth(), selectedDate.getFullYear());
      });
      quickDatesEl.appendChild(btn);
    }
  }

  // Month navigation
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if(currentMonth < 0){ currentMonth = 11; currentYear--;}
    renderCalendar(currentMonth, currentYear);
  });
  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if(currentMonth > 11){ currentMonth = 0; currentYear++;}
    renderCalendar(currentMonth, currentYear);
  });

  // time buttons click handler
  function initTimeButtons(){
    timeButtons.querySelectorAll('.time-btn').forEach(btn=>{
      btn.addEventListener('click', () => {
        timeButtons.querySelectorAll('.time-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        // parse text into selects
        const txt = btn.textContent.trim(); // "11.00 AM"
        const [hm, ampm] = txt.split(' ');
        const [h] = hm.split('.');
        hourSelect.value = parseInt(h,10);
        minuteSelect.value = '00';
        ampmSelect.value = ampm;
      });
    });
  }

  // when selects change, reflect in time buttons (deselect)
  function hookupSelects(){
    [hourSelect, minuteSelect, ampmSelect].forEach(s => {
      s.addEventListener('change', () => {
        timeButtons.querySelectorAll('.time-btn').forEach(b=>b.classList.remove('active'));
      });
    });
  }

  // init
  function init(){
    populateTimeSelects();
    hookupSelects();
    initTimeButtons();
    // set selectedDate default to today and render
    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    currentMonth = selectedDate.getMonth();
    currentYear = selectedDate.getFullYear();
    renderCalendar(currentMonth,currentYear);
    updateQuickDates(selectedDate);

    // click outside to hide possible tooltips (not essential but keeps things tidy)
    document.addEventListener('click', (e)=>{
      // keep it simple — nothing to hide here
    });
  }

  init();
})();