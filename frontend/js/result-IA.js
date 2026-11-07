function calcularDespesas() {
  const camposDespesas = document.querySelectorAll(".gastos input[type='number']");
  let totalDespesas = 0;
  
  camposDespesas.forEach((campo) => {
    const valor = parseFloat(campo.value);
    if (!isNaN(valor)) {
      totalDespesas += valor;
    }
  });
  
  return totalDespesas;
}

async function gerarSituacao() {
  const campoDescricao = document.getElementById("resposta-ia");
  const campoRenda = document.getElementById("renda");
  const resultadoDespesas = calcularDespesas();
  const resultadoRenda = Number(campoRenda?.value);

  if (!campoDescricao || !Number.isFinite(resultadoRenda) || resultadoRenda < 0) {
    console.error("Preencha os campos de renda e despesas antes de gerar a descrição.");
    return;
  }
  campoDescricao.value = "";
  campoDescricao.disabled = true;

  try {
    const resposta = await fetch("http://localhost:3000/api/ia/gerar-descricao", {
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
      console.error(dados.mensagem || `Erro ${resposta.status} — não foi possível gerar a descrição.`);
      return;
    }

    campoDescricao.value = dados.mensagem;

  } catch (erro) {
    console.error(erro);
    console.error("Não foi possível conectar ao serviço de IA.");
  } finally {
    campoDescricao.disabled = false;
  }
}

document.getElementById("form-financeiro").addEventListener("submit", (event) => {
    event.preventDefault();
    gerarSituacao();
  });