function criarGastos(){
  const btnGastos = document.getElementById("btn-add-gastos");
  const containerGastos = document.getElementById("gastos");
  const limitGastos = 5
  const overlay = document.getElementById("overlay");
  const btnSalvarGasto = document.getElementById("btn-salvar-gasto");
  
  if (!btnGastos || !containerGastos) return;
  
  btnGastos.addEventListener("click", () => {
    overlay.style.display = "flex";
  })
  
  btnSalvarGasto.addEventListener("click", () => {
    const inputGasto = document.getElementById("novo-gasto").value;
    const input = document.getElementById("novo-gasto");
    input.focus();
    input.addEventListener('input', () => {
      this.value = this.value.replace(/[0-9]/g, '');
    });

    const gastosCriados = containerGastos.querySelectorAll('input[data-gasto-adicional="true"]').length;
    if (gastosCriados >= limitGastos) {
      alert(`Você atingiu o limite de ${limitGastos} gastos adicionais.`);
      return;
    }

    const novoGasto = document.createElement("div");
    const idGasto = `${inputGasto}-${containerGastos.children.length + 1}`;

    novoGasto.classList.add("gastos");
    novoGasto.innerHTML = `
      <label for="${idGasto}">${inputGasto} (R$)</label>
      <input class="${inputGasto}" type="number" data-gasto-adicional="true" id="${idGasto}" min="0" step="0.01" value="0" />
    `;
    containerGastos.appendChild(novoGasto);

    if(gastosCriados + 1 >= limitGastos) {
      btnGastos.disabled = true;
      btnGastos.textContent = "Limite atingido";
      btnGastos.style.cursor = "not-allowed";
    }
    overlay.style.display = "none";
  });
}


function analisarFinancas(dados) {
  const campos = [
    "renda", "moradia", "transporte","lazer"
  ];

  const valores = {};

  for (const campo of campos) {
    const valor = Number(dados[campo] ?? 0);

    if (!Number.isFinite(valor) || valor < 0) {
      throw new Error(`Valor inválido: ${campo}`);
    }

    valores[campo] = valor;
  }

  const rendaTotal =
    valores.renda + valores.rendaExtra;

  const despesasEssenciais =
    valores.moradia +
    valores.alimentacao +
    valores.transporte +
    valores.contas;

  const despesasNaoEssenciais = valores.lazer;

  const parcelasDividas = valores.dividas;

  const despesasTotais =
    despesasEssenciais +
    despesasNaoEssenciais +
    parcelasDividas;

  const saldo = rendaTotal - despesasTotais;

  const percentualComprometido =
    rendaTotal > 0
      ? (despesasTotais / rendaTotal) * 100
      : null;

  const custoBasico =
    despesasEssenciais + parcelasDividas;

  const mesesReserva =
    custoBasico > 0
      ? valores.reserva / custoBasico
      : null;

  return {
    rendaTotal,
    despesasEssenciais,
    despesasNaoEssenciais,
    parcelasDividas,
    despesasTotais,
    saldo,
    percentualComprometido,
    reservaAtual: valores.reserva,
    mesesReserva
  };
}

criarGastos();