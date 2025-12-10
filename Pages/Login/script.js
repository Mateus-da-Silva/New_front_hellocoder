const API_URL = 'http://localhost:3000/api';

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.add("open");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("open");
  }
}

async function login() {
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('password').value;

  if (!email || !senha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        senha
      })
    });

    const dados = await resposta.json();

    if (dados.success) {
      // Salvar dados do usuário no localStorage
      localStorage.setItem('usuario', JSON.stringify(dados.data));

      alert(`Bem-vindo(a), ${dados.data.nome}!`);

      // Redirecionar para a página inicial (Home)
      window.location.href = "../Home1/index.html";
    } else {
      alert("Erro ao fazer login: " + dados.error);
    }

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert("Erro ao conectar com o servidor. Certifique-se de que o backend está rodando.");
  }
}
