const menuBotao = document.getElementById("menu-barras");
const menuLinks = document.querySelector(".nav-links");

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