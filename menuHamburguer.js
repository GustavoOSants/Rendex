(() => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");

  if (!navbar || !navLinks) return;

  // Evita criar o botão mais de uma vez
  if (document.querySelector(".menu-toggle")) return;

  const menuToggle = document.createElement("button");

  menuToggle.className = "menu-toggle";
  menuToggle.type = "button";
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-controls", "navLinks");

  menuToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  navbar.insertBefore(menuToggle, navLinks);

  function fecharMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  menuToggle.addEventListener("click", () => {
    const aberto = menuToggle.getAttribute("aria-expanded") === "true";

    navLinks.classList.toggle("open", !aberto);
    menuToggle.classList.toggle("open", !aberto);

    menuToggle.setAttribute("aria-expanded", String(!aberto));
    menuToggle.setAttribute(
      "aria-label",
      aberto ? "Abrir menu" : "Fechar menu",
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".navbar")) {
      fecharMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") fecharMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) fecharMenu();
  });
})();
