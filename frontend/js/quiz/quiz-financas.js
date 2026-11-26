const LIMITE_PERGUNTAS = 5;

const todasPerguntas = Array.from(
  document.querySelectorAll(".question-item:not(#telaResultado)")
).slice(0, LIMITE_PERGUNTAS);

const telaResultado = document.getElementById("telaResultado");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");
const totalPerguntasFinal = document.getElementById("totalPerguntasFinal");
const mensagemOtima = document.getElementById("mensagemOtima");
const mensagemBoa = document.getElementById("mensagemBoa");

const contadorPergunta = document.querySelector(".question-counter");
const porcentagemProgresso = document.querySelector(".progress-percent");
const barraProgresso = document.querySelector(".progress-bar-fill");
const linhaAcoes = document.getElementById("actionsRow");
const botaoConfirmar = document.getElementById("confirmBtn");
const botaoProxima = document.getElementById("nextBtn");
const linkInicio = document.getElementById("linkInicio");

const rotuloProxima = botaoProxima.querySelector('[data-rotulo="proxima"]');
const rotuloResultado = botaoProxima.querySelector('[data-rotulo="resultado"]');

let perguntaAtual = 0;
let cartaoSelecionado = null;
let pontuacao = 0;
let jaRespondeu = false;

function formatarNumero(numero) {
  return String(numero).padStart(2, "0");
}

function definirRotuloBotao(tipo) {
  rotuloProxima.classList.toggle("hidden", tipo !== "proxima");
  rotuloResultado.classList.toggle("hidden", tipo !== "resultado");
}

function atualizarProgresso(indice) {
  const total = todasPerguntas.length;
  const percentual = Math.round(((indice + 1) / total) * 100);

  contadorPergunta.textContent = `PERGUNTA ${formatarNumero(indice + 1)} DE ${formatarNumero(total)}`;
  porcentagemProgresso.textContent = `${percentual}%`;
  barraProgresso.style.width = `${percentual}%`;
}

function prepararEventosDaPergunta(secaoPergunta) {
  const cartoes = secaoPergunta.querySelectorAll(".option-card");

  cartoes.forEach((cartao) => {
    cartao.addEventListener("click", () => {
      if (jaRespondeu) return;

      cartoes.forEach((item) => item.classList.remove("selected"));
      cartao.classList.add("selected");
      cartaoSelecionado = cartao;

      botaoConfirmar.disabled = false;
      botaoConfirmar.classList.remove("desativado");
    });
  });
}

function mostrarPergunta(indice) {
  jaRespondeu = false;
  cartaoSelecionado = null;

  todasPerguntas.forEach((secao, i) => {
    secao.classList.toggle("hidden", i !== indice);
    secao.querySelectorAll(".option-card").forEach((cartao) => {
      cartao.classList.remove("selected", "correct", "wrong", "locked");
    });
  });

  telaResultado.classList.add("hidden");
  mensagemOtima.classList.add("hidden");
  mensagemBoa.classList.add("hidden");

  atualizarProgresso(indice);

  linhaAcoes.classList.remove("answered");
  botaoConfirmar.classList.remove("hidden", "desativado");
  botaoConfirmar.disabled = true;

  botaoProxima.classList.add("hidden");
  linkInicio.classList.add("hidden");
  definirRotuloBotao(indice === todasPerguntas.length - 1 ? "resultado" : "proxima");
}

function confirmarResposta() {
  if (jaRespondeu || !cartaoSelecionado) return;
  jaRespondeu = true;

  const secaoAtual = todasPerguntas[perguntaAtual];
  const cartoes = secaoAtual.querySelectorAll(".option-card");
  const estaCorreta = cartaoSelecionado.dataset.correct === "true";

  cartoes.forEach((cartao) => {
    cartao.classList.add("locked");
  });

  if (estaCorreta) {
    pontuacao++;
    cartaoSelecionado.classList.add("correct");
  } else {
    cartaoSelecionado.classList.add("wrong");
  }

  botaoConfirmar.disabled = true;
  botaoConfirmar.classList.add("desativado");

  linhaAcoes.classList.add("answered");
  botaoProxima.classList.remove("hidden");
}

function mostrarResultadoFinal() {
  const total = todasPerguntas.length;

  todasPerguntas.forEach((secao) => secao.classList.add("hidden"));
  telaResultado.classList.remove("hidden");

  contadorPergunta.textContent = "Concluido";
  porcentagemProgresso.textContent = "100%";
  barraProgresso.style.width = "100%";

  pontuacaoFinal.textContent = pontuacao;
  totalPerguntasFinal.textContent = total;

  if (pontuacao >= 4) {
    mensagemOtima.classList.remove("hidden");
  } else {
    mensagemBoa.classList.remove("hidden");
  }

  linhaAcoes.classList.remove("answered");
  botaoConfirmar.classList.add("hidden");
  botaoProxima.classList.add("hidden");
  linkInicio.classList.remove("hidden");
}

todasPerguntas.forEach((secao) => prepararEventosDaPergunta(secao));

botaoConfirmar.addEventListener("click", confirmarResposta);

botaoProxima.addEventListener("click", () => {
  perguntaAtual++;
  if (perguntaAtual < todasPerguntas.length) {
    mostrarPergunta(perguntaAtual);
  } else {
    mostrarResultadoFinal();
  }
});

mostrarPergunta(0);