// aos fuchiqueiros, principalmente gui
//observem o trabalho de uma diva king
//bibi rainha dos codigos
document.getElementById("btn-exportar-excel").addEventListener("click", async () => {
  try {
    if (typeof ExcelJS === "undefined") {
      alert("A biblioteca ExcelJS não foi carregada.");
      return;
    }

    const formulario = document.getElementById("form-financeiro");
    const campos = formulario.querySelectorAll('input[type="number"]');

    const registros = [];
    let totalRendas = 0;
    let totalGastos = 0;

    for (const campo of campos) {
      const valor = Number(campo.value || 0);

      if (!Number.isFinite(valor) || valor < 0) {
        alert("Confira os valores financeiros preenchidos.");
        return;
      }

      const rotulo = campo.labels?.[0]?.textContent?.trim() || campo.id;
      const tipo = campo.closest(".ganhos") ? "Renda" : "Gasto";

      registros.push({
        tipo,
        categoria: rotulo.replace(/\s*\(R\$\)/g, ""),
        valor
      });

      if (tipo === "Renda") {
        totalRendas += valor;
      } else {
        totalGastos += valor;
      }
    }

    const saldo = totalRendas - totalGastos;
    const comprometimento = totalRendas > 0
      ? totalGastos / totalRendas : 0;
    const disponivel = totalRendas > 0
      ? saldo / totalRendas : 0;

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Rendex";
    workbook.created = new Date();

    const resumo = workbook.addWorksheet("Resumo");
    const detalhes = workbook.addWorksheet("Detalhamento");

    const cores = {
      fundo: "0A1120",
      azul: "1B2A4D",
      verde: "1FD18B",
      branco: "FFFFFF",
      claro: "E9EEFC"
    };

    const moeda = '"R$" #,##0.00;[Red]("R$" #,##0.00)';

    function criarTitulo(aba, titulo, ultimaColuna) {
      aba.mergeCells(`A1:${ultimaColuna}2`);

      const celula = aba.getCell("A1");
      celula.value = titulo;
      celula.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF" + cores.fundo }
      };
      celula.font = {
        name: "Aptos",
        size: 17,
        bold: true,
        color: { argb: "FF" + cores.verde }
      };
      celula.alignment = {
        vertical: "middle",
        horizontal: "center"
      };

      //gui fuchiqueiro, saia daq
      aba.getRow(1).height = 24;
      aba.getRow(2).height = 20;
    }

    function criarCabecalho(linha) {
      linha.height = 26;

      linha.eachCell(celula => {
        celula.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF" + cores.azul }
        };
        celula.font = {
          bold: true,
          color: { argb: "FF" + cores.branco }
        };
        celula.alignment = { vertical: "middle" };
      });
    }

    function destacarLinha(linha, cor = cores.claro) {
      linha.eachCell(celula => {
        celula.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF" + cor }
        };
        celula.font = {
          bold: true,
          color: { argb: "FF" + cores.fundo }
        };
      });
    }

    resumo.columns = [
      { width: 36 },
      { width: 23 }
    ];

    criarTitulo(resumo, "RENDEX | RELATÓRIO FINANCEIRO", "B");

    resumo.getRow(4).values = ["Indicador", "Valor"];
    criarCabecalho(resumo.getRow(4));

    resumo.getRow(5).values = ["Total de rendas", totalRendas];
    resumo.getRow(6).values = ["Total de gastos", totalGastos];
    resumo.getRow(7).values = ["Saldo disponível", saldo];

    for (let linha = 5; linha <= 7; linha++) {
      resumo.getCell(`B${linha}`).numFmt = moeda;
    }

    destacarLinha(resumo.getRow(7));

    resumo.getRow(9).values = ["INDICADORES FINANCEIROS", ""];
    criarCabecalho(resumo.getRow(9));

    resumo.getRow(10).values = [
      "Comprometimento da renda", comprometimento
    ];
    resumo.getRow(11).values = [
      "Percentual disponível", disponivel
    ];

    resumo.getCell("B10").numFmt = "0.00%";
    resumo.getCell("B11").numFmt = "0.00%";

    detalhes.columns = [
      { width: 18 },
      { width: 38 },
      { width: 23 }
    ];

    criarTitulo(detalhes, "RENDEX | DETALHAMENTO", "C");

    detalhes.getRow(4).values = [
      "Tipo", "Categoria", "Valor (R$)"
    ];
    criarCabecalho(detalhes.getRow(4));

    registros.forEach((registro, indice) => {
      const numeroLinha = indice + 5;
      const linha = detalhes.getRow(numeroLinha);

      linha.values = [
        registro.tipo,
        registro.categoria,
        registro.valor
      ];

      detalhes.getCell(`C${numeroLinha}`).numFmt = moeda;

      if (indice % 2 === 0) {
        linha.eachCell(celula => {
          celula.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF1F5F9" }
          };
        });
      }
    });

    detalhes.autoFilter = {
      from: "A4",
      to: `C${Math.max(5, registros.length + 4)}`
    };

    detalhes.views = [
      { state: "frozen", ySplit: 4 }
    ];

    // GERAR E BAIXAR O ARQUIVO  dont modifiquie plsss
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const data = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `Rendex_Relatorio_${data}.xlsx`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

  } catch (erro) {
    console.error("Erro ao exportar Excel:", erro);
    alert("Não foi possível gerar o relatório financeiro.");
  }
});
