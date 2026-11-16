const total = document.getElementById("montante");

const form = document.querySelector("#calculadora");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o recarregamento da página
  const capitalInicial = document.getElementById("capitalInicial").value;
  const taxaBruta = document.getElementById("taxa").value;
  const tempo = document.getElementById("tempo").value;
  const mensalidade = document.getElementById("mensalidade").value;
  const taxa = taxaBruta / 100;
  const taxaMensal = (1 + taxa) ** (1 / 12) - 1;
  const tempoMes = tempo * 12;

  const montante =
    capitalInicial * (1 + taxaMensal) ** tempoMes +
    mensalidade * (((1 + taxaMensal) ** tempoMes - 1) / taxaMensal);

  total.textContent = montante.toFixed(2);

  let montanteMes = capitalInicial


  for (let i = 1; i <= tempoMes; i++) {

      let jurosMes = montanteMes * taxaMensal;

    montanteMes =
      capitalInicial * (1 + taxaMensal) ** i +
      mensalidade * (((1 + taxaMensal) ** i - 1) / taxaMensal);


    let jurosTotal = montanteMes - capitalInicial - (mensalidade*i);

    const tabela = document.getElementById("tabela");
    
    const linha = document.createElement("tr");

    const celulaMes = document.createElement("td");
    celulaMes.textContent = i;

    const celulaJuros = document.createElement("td");
    celulaJuros.textContent = jurosMes.toFixed(2);

    const celulaJurosTotal = document.createElement("td");
    celulaJurosTotal.textContent = jurosTotal.toFixed(2);

    const celulaMontanteMes = document.createElement("td");
    celulaMontanteMes.textContent = montanteMes.toFixed(2);

    linha.appendChild(celulaMes);
    linha.appendChild(celulaJuros);
    linha.appendChild(celulaJurosTotal);
    linha.appendChild(celulaMontanteMes);

    tabela.appendChild(linha);

  }
  return montante;
});
