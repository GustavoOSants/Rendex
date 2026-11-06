function obterValorCampo(id) {
  const campo = document.getElementById(id);

  if (!campo) {
    return "";
  }

  return String(campo.value ?? campo.textContent ?? "").trim();
}

async function gerarRaioX() {
  const campoDescricao = document.getElementById("resultado-ia");
  const resultadoRenda = obterValorCampo("resultado-renda");
  const resultadoDespesas = obterValorCampo("resultado-despesas");

  if (!resultadoRenda || !resultadoDespesas) {
    console.error("Preencha os campos de renda e despesas antes de gerar a descrição.");
    return;
  }
  campoDescricao.value = "";
  campoDescricao.disabled = true;

  try {
    const resposta = await fetch("/api/ia/descricao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        renda: resultadoRenda,
        despesas: resultadoDespesas,
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      // Mantém visível o código HTTP retornado pelo backend.
      // Ex.: 429 quando a cota do Gemini for atingida.
      console.error(dados.mensagem || `Erro ${resposta.status} — não foi possível gerar a descrição.`);
      return;
    }

    // A resposta da IA passa diretamente para o campo descrição.
    campoDescricao.value = dados.descricao;

  } catch (erro) {
    console.error(erro);
    console.error("Não foi possível conectar ao serviço de IA.");
  } finally {
    campoDescricao.disabled = false;
  }
}