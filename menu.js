const menuBarras = document.getElementById("menu-barras")
const listaMenu = document.getElementsByClassName("nav-links")

const breakpoint = window.matchMedia("(min-width: 48rem)");

menuBarras.addEventListener("click", function() {
    listaMenu.classList.toggle("aberto");

    const menuAberto = listaMenu.classList.contains("ativo");
    menuBarras.setAttribute()
})