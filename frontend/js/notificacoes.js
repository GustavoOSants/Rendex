let temporizadorNotificacao;

function mostrarNotificacao(mensagem, tipo = "erro") {
  const notificacao = document.getElementById("notificacao");

  if (!notificacao) return;

  clearTimeout(temporizadorNotificacao);

  notificacao.classList.remove("visivel", "erro", "sucesso");
  notificacao.textContent = mensagem;
  notificacao.classList.add(tipo === "sucesso" ? "sucesso" : "erro");
  notificacao.hidden = false;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      notificacao.classList.add("visivel");
    });
  });

  temporizadorNotificacao = setTimeout(() => {
    notificacao.classList.remove("visivel");

    setTimeout(() => {
      if (!notificacao.classList.contains("visivel")) {
        notificacao.hidden = true;
      }
    }, 300);
  }, 4000);
}