const cartoesModulos = document.querySelectorAll(".modulo-card");

cartoesModulos.forEach((cartao, indice) => {
  const numeroModulo = indice + 1;
  const foiConcluido = localStorage.getItem(`rendex_modulo_${numeroModulo}_concluido`) === "true";

  if (foiConcluido) {
    cartao.classList.add("modulo-concluido");
  }
});