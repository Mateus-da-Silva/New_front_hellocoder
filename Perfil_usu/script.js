// Mostrar/ocultar submenu
document.getElementById('menuToggle').addEventListener('click', () => {
  const submenu = document.querySelector('.submenu');
  submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
});

// Tornar dias da semana interativos
document.querySelectorAll('.day').forEach(day => {
  day.addEventListener('click', () => {
    if (day.classList.contains('active')) {
      day.classList.remove('active');
      day.classList.add('missed');
    } else if (day.classList.contains('missed')) {
      day.classList.remove('missed');
    } else {
      day.classList.add('active');
    }
  });
});

// Editar nome do usuário
document.getElementById('editProfile').addEventListener('click', () => {
  const nome = prompt('Digite o novo nome do usuário:');
  if (nome) document.getElementById('nomeUsuario').textContent = nome;
});