const menuBotao = document.getElementById("menu-barras");
const menuLinks = document.querySelector(".nav-links");
const menuOptions = document.querySelectorAll('.user-menu-options');

if (menuBotao && menuLinks) {
  function alternarMenu() {
    const aberto = menuLinks.classList.toggle("aberto");

    menuBotao.textContent = aberto ? "close" : "menu";
    menuBotao.setAttribute("aria-expanded", aberto);
    menuBotao.setAttribute(
      "aria-label",
      aberto ? "Fechar menu" : "Abrir menu"
    );
  }

  menuBotao.addEventListener("click", alternarMenu);

  menuBotao.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      alternarMenu();
    }
  });

  menuLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuLinks.classList.remove("aberto");
      menuBotao.textContent = "menu";
      menuBotao.setAttribute("aria-expanded", "false");
      menuBotao.setAttribute("aria-label", "Abrir menu");
    });
  });
}

menuOptions.forEach((option) => {
  if (!localStorage.getItem("sessao")) return;

  option.innerHTML = `
    <a href="/frontend/pages/planos.html">Planos</a>
    <a href="#" id="logout">Sair</a>
  `;
  option.querySelector("#logout").addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("sessao");
    window.location.href = "/frontend/pages/login.html";
  });
})