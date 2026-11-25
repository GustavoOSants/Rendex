const form = document.getElementById("form-login");

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

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const senha = document.getElementById("password").value;

  const usuarios = obterUsuarios();
  const usuario = usuarios.find((user) => user.email === email);

  if (!usuario) {
    alert("E-mail ou senha incorretos.");
    return;
  }

  const hash = await gerarHash(usuario.salt + senha);

  if (hash !== usuario.senhaHash) {
    alert("E-mail ou senha incorretos.");
    return;
  }

  localStorage.setItem(
    "sessao",
    JSON.stringify({ nome: usuario.nome, email: usuario.email })
  );

  window.location.href = "/frontend/pages/dashboard.html";
});