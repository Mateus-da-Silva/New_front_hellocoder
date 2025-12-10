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

async function signup() {
  const nome = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value;
  const telefone = document.getElementById("phone").value.trim();

  // Validação
  if (!nome || !email || !senha) {
    alert("Por favor, preencha todos os campos obrigatórios (Nome, Email e Senha).");
    return;
  }

  // Validar email
  if (!email.includes('@')) {
    alert("Por favor, insira um email válido.");
    return;
  }

  // Validar senha (mínimo 6 caracteres)
  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/usuarios/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
        telefone
      })
    });

    const dados = await resposta.json();

    if (dados.success) {
      alert("Conta criada com sucesso! Faça login para continuar.");
      window.location.href = "../Login/index.html";
    } else {
      alert("Erro ao criar conta: " + dados.error);
    }

  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    alert("Erro ao conectar com o servidor. Certifique-se de que o backend está rodando.");
  }
}
