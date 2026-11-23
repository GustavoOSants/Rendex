let montante = 0;

const btnCalcular = document.querySelector("#calcular");
const btnComparar = document.querySelector("#comparar");

let acumulado = [];

let graficoAtual = null;

let acumuladoComparar = [];

let compararOn = false;

let total = document.getElementById("montante");


btnCalcular.addEventListener("click", function () {
  const tabela = document.getElementById("tabela");

  tabela.innerHTML = "";
  acumulado = [];

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

  total.textContent = `R$ ${montante.toFixed(2)}`;

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

    if (i % 12 === 0) {
      acumulado.push(Number(montanteMes.toFixed(2)));
    }
  }

  // Área do grafico

  const anos = acumulado.map((_, index) => `Ano ${index + 1}`);

  if (graficoAtual !== null) {
    graficoAtual.destroy();
  }

  const ctx = document.getElementById("myChart");


  if (compararOn){
    graficoAtual = new Chart(ctx, {
  type: 'bar', // No tipo 'bar', as barras de cada array aparecem lado a lado em cada ano
  data: {
    labels: anos, // Eixo X (ex: ["Ano 1", "Ano 2", "Ano 3"])
    datasets: [
      {
        label: 'Investimento 1',
        data: acumulado, // 1º array
        backgroundColor: '#22345D',
        borderWidth: 1
      },
      {
        label: 'Investimento 2',
        data: acumuladoComparar, // 2º array
        backgroundColor: '#536A9D',
        borderWidth: 1
      },
    ]
  },
  options: {
      responsive: true,
    maintainAspectRatio: false,
    }
});

  total.textContent = `R$ ${montante.toFixed(2)}, R$ ${acumuladoComparar[acumuladoComparar.length -1]}`;

    
  } else {


  graficoAtual = new Chart(ctx, {
    type: "bar",
    data: {
      labels: anos,
      datasets: [
        {
          label: "Montante",
          data: acumulado,
          borderWidth: 1,
          backgroundColor: '#22345D',
        },
      ],
    },
    options: {
      responsive: true,
    maintainAspectRatio: false,
    }
  });}
});


btnComparar.addEventListener("click", function () {
  if (montante === 0) {
    alert("Calcule um investimento antes de comparar");
  } else {
    graficoAtual.destroy();
    acumuladoComparar = [];
    compararOn = true;

    const capitalInicial = document.getElementById("capitalInicial").value;
    const taxaBruta = document.getElementById("taxa").value;
    const tempo = document.getElementById("tempo").value;
    const mensalidade = document.getElementById("mensalidade").value;

    const sectionTabelas = document.getElementById("tabela-section");

    let div = document.querySelector(".tabela-container2");

    if (!div) {
      // 2. Se NÃO existe (primeiro clique), cria a div e adiciona na section
      div = document.createElement("div");
      div.className = "tabela-container2";
      sectionTabelas.appendChild(div);
    } else {
      // 3. Se JÁ existe (cliques seguintes), apenas limpa o conteúdo interno
      div.innerHTML = "";
    }

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

      if (i % 12 === 0) {
        // acumuladoComparar.push(Number(acumulado[(i/12) - 1]))
        acumuladoComparar.push(Number(montanteMes.toFixed(2)));
      }
    }

    table.appendChild(tbody);

    div.appendChild(table);

    sectionTabelas.appendChild(div);

    const ctx = document.getElementById("myChart");

    const anos = [];

    // for (i = 0 ; i < acumuladoComparar.length/2; i++){
    //   anos.push(`Acumulado no ivestimento 1 no ano ${i + 1}`);
    //   anos.push(`Acumulado no ivestimento 2 no ano ${i + 1}`);
    // }

    if (acumulado.length > acumuladoComparar) {
      for (i = 0; i < acumulado.length; i ++){
        anos.push(`Ano ${i+1}`);
      } }else {
        for (i = 0; i < acumuladoComparar.length; i ++){
        anos.push(`Ano ${i+1}`);
      }
      }
    
  total.textContent = `R$ ${montante.toFixed(2)}, R$ ${acumuladoComparar[acumuladoComparar.length -1]}`;


    graficoAtual = new Chart(ctx, {
  type: 'bar', // No tipo 'bar', as barras de cada array aparecem lado a lado em cada ano
  data: {
    labels: anos, // Eixo X (ex: ["Ano 1", "Ano 2", "Ano 3"])
    datasets: [
      {
        label: 'Investimento 1',
        data: acumulado, // 1º array
        backgroundColor: '#22345D',
        borderWidth: 1
      },
      {
        label: 'Investimento 2',
        data: acumuladoComparar, // 2º array
        backgroundColor: '#536A9D',
        borderWidth: 1
      },
    ]
  },
  options: {
      responsive: true,
    maintainAspectRatio: false,
    }
});;
  }
});
