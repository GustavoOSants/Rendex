let graficoDespesas = null;

const formulario = document.getElementById("form-financeiro");

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const dados = {
    renda: document.getElementById("renda").value,
    rendaExtra: document.getElementById("rendaExtra").value,
    moradia: document.getElementById("moradia").value,
    alimentacao: document.getElementById("alimentacao").value,
    transporte: document.getElementById("transporte").value,
    contas: document.getElementById("contas").value,
    lazer: document.getElementById("lazer").value,
    dividas: document.getElementById("dividas").value,
    reserva: document.getElementById("reserva").value,
  };

  try {
    const resultado = analisarFinancas(dados);

    document.getElementById("resultado-renda").textContent = formatarMoeda(resultado.rendaTotal);

    document.getElementById("resultado-despesas").textContent = formatarMoeda(resultado.despesasTotais);

    document.getElementById("resultado-saldo").textContent = formatarMoeda(resultado.saldo);

    document.getElementById("resultado-percentual").textContent =
      resultado.percentualComprometido === null ? "Não calculável" : resultado.percentualComprometido.toFixed(1) + "%";

    const saldoElemento = document.getElementById("resultado-saldo");

    saldoElemento.classList.toggle("valor-negativo", resultado.saldo < 0);

    const percentualElemento = document.getElementById("resultado-percentual");

    percentualElemento.classList.toggle(
      "valor-negativo",
      resultado.percentualComprometido !== null && resultado.percentualComprometido > 100,
    );

    console.log("Diagnóstico Rendex:", resultado);

    document.getElementById("resultado-reserva").textContent = formatarMoeda(resultado.reservaAtual);

    document.getElementById("resultado-meses").textContent =
      resultado.mesesReserva === null
        ? "Não calculável"
        : resultado.mesesReserva.toFixed(1) + (resultado.mesesReserva.toFixed(1) === "1.0" ? " mês" : " meses");

    const coberturaElemento = document.getElementById("resultado-meses");

    coberturaElemento.classList.remove("reserva-vermelha", "reserva-amarela", "reserva-verde", "reserva-indefinida");

    if (resultado.mesesReserva === null) {
      coberturaElemento.classList.add("reserva-indefinida");
    } else if (resultado.mesesReserva < 1) {
      coberturaElemento.classList.add("reserva-vermelha");
    } else if (resultado.mesesReserva < 3) {
      coberturaElemento.classList.add("reserva-amarela");
    } else {
      coberturaElemento.classList.add("reserva-verde");
    }

    const categorias = ["Moradia", "Alimentação", "Transporte", "Contas", "Lazer", "Dívidas"];

    const valores = [
      Number(dados.moradia),
      Number(dados.alimentacao),
      Number(dados.transporte),
      Number(dados.contas),
      Number(dados.lazer),
      Number(dados.dividas),
    ];

    const contexto = document.getElementById("grafico-despesas").getContext("2d");

    if (graficoDespesas) {
      graficoDespesas.destroy();
    }

    graficoDespesas = new Chart(contexto, {
      type: "doughnut",

      data: {
        labels: categorias,
        datasets: [
          {
            data: valores,
            backgroundColor: ["#1FD18B", "#7FA6FF", "#FF6A4D", "#A78BFA", "#FBBF24", "#38BDF8"],
            borderColor: "#131D33",
            borderWidth: 3,
            hoverOffset: 8,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "68%",

        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#E9EEFC",
              padding: 18,
              usePointStyle: true,
            },
          },

          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + formatarMoeda(context.parsed);
              },
            },
          },
        },
      },
    });
  } catch (erro) {
    alert("Verifique os valores informados: " + erro.message);
  }
});
