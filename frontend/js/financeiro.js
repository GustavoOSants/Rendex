function criarGastos(){
  const btnAdd = document.getElementById("btn-add");
  const containerGastos = document.getElementById("gastos");
  const containerRenda = document.querySelector(".ganhos");
  const limitGastos = 5
  const overlay = document.getElementById("overlay");
  const btnSalvar = document.getElementById("btn-salvar");
  const radioGasto = document.getElementById("radio-gasto");
  const radioRenda = document.getElementById("radio-renda");
  const descricaoGasto = document.getElementById("descricao-gasto");
  const descricaoRenda = document.getElementById("descricao-renda");
  
  btnAdd.addEventListener("click", () => {
    overlay.style.display = "flex";
  })
  
  btnSalvar.addEventListener("click", () => {
    const inputValue = document.getElementById("nova-info").value;
    const input = document.getElementById("nova-info");

    const rendasCriadas = containerRenda.querySelectorAll('input[data-renda-adicional="true"]').length;
    const gastosCriados = containerGastos.querySelectorAll('input[data-gasto-adicional="true"]').length;
    if (gastosCriados >= limitGastos) {
      alert(`Você atingiu o limite de ${limitGastos} gastos adicionais.`);
      return;
    }
    if (rendasCriadas >= limitGastos) {
      alert(`Você atingiu o limite de ${limitGastos} rendas adicionais.`);
      return;
    }

    const tipoCadastro = document.querySelector('input[name="tipo-cadastro"]:checked')?.value;

    if (tipoCadastro === "gasto"){
    const novoGasto = document.createElement("div");
    const idlengthGasto = containerGastos.querySelectorAll("input").length + 1
    const idGasto = `${inputValue}-${idlengthGasto}`;

    novoGasto.classList.add("gastos-adicional");
    novoGasto.innerHTML = `
      <label for="${idGasto}">${inputValue} (R$)</label>
      <input class="${inputValue}" type="number" data-gasto-adicional="true" id="${idGasto}" min="0" step="0.01" value="0" />
      <i
        class="fa-solid fa-trash btn-excluir-input"
        data-id="${idGasto}"
        role="button"
        tabindex="0"
        aria-label="Excluir gasto"
        title="Excluir gasto"
        style="position: relative; bottom: 3.2rem; left: 27.6rem;"
        >
      </i>
    `;
    containerGastos.appendChild(novoGasto);

    } else if (tipoCadastro === "renda"){
      const novaRenda = document.createElement("div");
      const idlengthRenda = containerRenda.querySelectorAll("input").length + 1
      const idRenda = `${inputValue}-${idlengthRenda}`;

      novaRenda.classList.add("ganho-adicional");
      novaRenda.innerHTML = `
      <label for="${idRenda}">${inputValue} (R$)</label>
      <input class="${inputValue}" type="number" data-renda-adicional="true" id="${idRenda}" min="0" step="0.01" value="0" />
      <i
        class="fa-solid fa-trash btn-excluir-input"
        data-id="${idRenda}"
        role="button"
        tabindex="0"
        aria-label="Excluir renda"
        title="Excluir renda"
        style="position: relative; bottom: 3.2rem; left: 27.6rem;"
        >
      </i>
    `;
      containerRenda.appendChild(novaRenda);
    }
    if(gastosCriados + 1 >= limitGastos) {
      radioGasto.disabled = true;
      descricaoGasto.style.display = "block";
      descricaoGasto.textContent = "Limite atingido";
    }
    if(rendasCriadas + 1 >= limitGastos) {
      radioRenda.disabled = true;
      descricaoRenda.style.display = "block";
      descricaoRenda.textContent = "Limite atingido";
    }
    overlay.style.display = "none";
    input.value = "";
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

function excluirInput(){
  document.addEventListener("click", (event) => {
    const botao = event.target.closest(".btn-excluir-input");
    if (!botao) return;

    const input = document.getElementById(botao.dataset.id);
    input?.closest(".gastos-adicional, .ganho-adicional")?.remove();
  });
}

criarGastos();
excluirInput();