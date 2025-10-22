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

function signup() {
  const name = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !password || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulação de cadastro (pode substituir por lógica real)
  alert("Account created successfully!");
  
  // Redireciona para a tela de login dentro da pasta "Login"
  window.location.href = "../Login/index.html";
}