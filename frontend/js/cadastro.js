const form = document.getElementById("form-cadastro");

// Gera o hash SHA-256 de um texto (Web Crypto API)
async function gerarHash(texto) {
  const dados = new TextEncoder().encode(texto);
  const buffer = await crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function obterUsuarios() {
  try {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  } catch {
    return [];
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const senha = document.getElementById("password").value;
  const confirmSenha = document.getElementById("confirm_password").value;

  if (senha !== confirmSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  const usuarios = obterUsuarios();

  if (usuarios.some((user) => user.email === email)) {
    alert("Este e-mail já está cadastrado.");
    return;
  }

  const salt = crypto.randomUUID();
  const senhaHash = await gerarHash(salt + senha);

  usuarios.push({ nome, email, salt, senhaHash });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  window.location.href = "/frontend/pages/login.html";
});