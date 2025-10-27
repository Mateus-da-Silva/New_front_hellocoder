// Mostra/oculta submenu lateral
document.getElementById('menuToggle').addEventListener('click', () => {
  const submenu = document.querySelector('.submenu');
  submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
});

// Define data atual dinamicamente
const dataAtual = new Date();
const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
document.getElementById('dataAtual').textContent =
  dataAtual.toLocaleDateString('pt-BR', opcoes).replace(/^./, str => str.toUpperCase());

// Animação de hover nos cards
document.querySelectorAll('.task-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('ativo');
  });
});