// Sistema de Autenticação Global

// Verificar se o usuário está logado
function verificarAutenticacao() {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) {
    // Redirecionar para login se não estiver autenticado
    window.location.href = '/Pages/Login/index.html';
    return null;
  }

  return JSON.parse(usuario);
}

// Obter dados do usuário logado
function getUsuarioLogado() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

// Fazer logout
function logout() {
  if (confirm('Deseja realmente sair?')) {
    localStorage.removeItem('usuario');
    window.location.href = '/Pages/Login/index.html';
  }
}

// Verificar se está na página de login ou cadastro
function isPublicPage() {
  const path = window.location.pathname;
  return path.includes('/Login/') || path.includes('/Cadastro/');
}

// Auto-executar verificação em páginas protegidas
if (!isPublicPage()) {
  verificarAutenticacao();
}
