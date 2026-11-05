
function analisarFinancas(dados) {
  const campos = [
    "renda", "rendaExtra", "moradia",
    "alimentacao", "transporte", "contas",
    "lazer", "dividas", "reserva"
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
