// Alterna o submenu ao clicar no item
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.closest('.submenu')) return; // evita fechar ao clicar dentro do submenu

    const open = item.classList.contains('active');
    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
    if (!open) item.classList.add('active');
  });
});