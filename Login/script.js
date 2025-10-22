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

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Exemplo de redirecionamento após login
  window.location.href = "../Cadastro/index.html";
}