let montante = 0;

let qtdTabelas = 1;



const btnCalcular = document.querySelector("#calcular");
const btnComparar = document.querySelector("#comparar");

btnCalcular.addEventListener("click", function () {
  const tabela = document.getElementById("tabela");

  tabela.innerHTML = "";

  const capitalInicial = document.getElementById("capitalInicial").value;
const taxaBruta = document.getElementById("taxa").value;
const tempo = document.getElementById("tempo").value;
const mensalidade = document.getElementById("mensalidade").value;

  const taxa = taxaBruta / 100;
  const taxaMensal = (1 + taxa) ** (1 / 12) - 1;
  const tempoMes = tempo * 12;

  montante =
    capitalInicial * (1 + taxaMensal) ** tempoMes +
    mensalidade * (((1 + taxaMensal) ** tempoMes - 1) / taxaMensal);
  const total = document.getElementById("montante");

  total.textContent = montante.toFixed(2);

  let montanteMes = capitalInicial;

  for (let i = 1; i <= tempoMes; i++) {
    let jurosMes = montanteMes * taxaMensal;

    montanteMes =
      capitalInicial * (1 + taxaMensal) ** i +
      mensalidade * (((1 + taxaMensal) ** i - 1) / taxaMensal);

    let jurosTotal = montanteMes - capitalInicial - mensalidade * i;

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
});

btnComparar.addEventListener("click", function () {
  if (montante === 0) {
    alert("Calcule um investimento antes de comparar");
  } else if (qtdTabelas === 2){
    alert("Você atingiu o limite de tabelas");
  } 
  else {
    const capitalInicial = document.getElementById("capitalInicial").value;
const taxaBruta = document.getElementById("taxa").value;
const tempo = document.getElementById("tempo").value;
const mensalidade = document.getElementById("mensalidade").value;
    qtdTabelas++;
    const sectionTabelas = document.getElementById("tabela-section");
    const div = document.createElement("div");
    div.className = "tabela-container2";

    const titulo = document.createElement("h3");
    titulo.textContent = "Investimeto 2";
    div.appendChild(titulo);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    const thMes = document.createElement("th");
    thMes.textContent = "Mês";

    const thJuros = document.createElement("th");
    thJuros.textContent = "Juros";

    const thJurosTotal = document.createElement("th");
    thJurosTotal.textContent = "Juros total";

    const thTotal = document.createElement("th");
    thTotal.textContent = "Total acumulado";

    tr.appendChild(thMes);
    tr.appendChild(thJuros);
    tr.appendChild(thJurosTotal);
    tr.appendChild(thTotal);

    thead.appendChild(tr);

    table.appendChild(thead);

    div.appendChild(table);

    const taxa = taxaBruta / 100;
    const taxaMensal = (1 + taxa) ** (1 / 12) - 1;
    const tempoMes = tempo * 12;


    let montanteMes = capitalInicial;

    const tbody = document.createElement("tbody");


  for (let i = 1; i <= tempoMes; i++) {
    let jurosMes = montanteMes * taxaMensal;

    montanteMes =
      capitalInicial * (1 + taxaMensal) ** i +
      mensalidade * (((1 + taxaMensal) ** i - 1) / taxaMensal);

    let jurosTotal = montanteMes - capitalInicial - mensalidade * i;

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

    tbody.appendChild(linha);
  }

    table.appendChild(tbody);

    div.appendChild(table);

    sectionTabelas.appendChild(div);
  }
});
