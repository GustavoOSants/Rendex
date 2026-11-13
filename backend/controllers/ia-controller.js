const { GoogleGenAI } = require("@google/genai");

async function gerarDescricao(req, res){

  try {
    const { renda, despesas, valoresDetalhados } = req.body;

    if(!renda || !despesas){
      return res.status(400).json({ mensagem: "Renda e despesas são obrigatórios." });
    }

    if(!process.env.GEMINI_API_KEY){
      return res.status(500).json({ mensagem: "Chave de API do Gemini não configurada." });
    }

    const ia = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `
    Gere uma descrição curta, objetiva e personalizada de análise financeira com base na renda de ${renda} e despesas de ${despesas}.
    Gere formas de otimizar os gastos, economizar dinheiro e melhorar a saúde financeira do usuário e quais são os investimentos recomendados por você.
    
    Analise estes dados financeiros sem alterar nenhum valor:
    Renda mensal: R$ ${renda}
    Total de despesas: R$ ${despesas}
    Despesas detalhadas: ${JSON.stringify(valoresDetalhados)}
    
    Use exatamente os valores fornecidos.
    Não invente nem substitua valores.
    Não use Markdown, asteriscos ou formatação especial.
    Retorne apenas texto simples, claro e objetivo.
    Coloque no máximo 3 parágrafos, cada um com no máximo 40 palavras.
    Não inclua informações de contato, links ou referências externas. A descrição deve ser clara, concisa e útil para o usuário. Não invente informações, apenas utilize os dados fornecidos.
    `;

    const resposta = await ia.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const descricao = resposta.text?.trim();
    
    if(!descricao){
      return res.status(502).json({ mensagem: "A IA não retornou uma descrição." });
    }
    res.status(200).json({ mensagem: descricao });
  } catch (error){
    const status = error?.status || error?.statusCode || error?.code;
    const textError = `${error.message || error?.name || "Erro desconhecido"}`;

    if(Number(status) === 429 || /429|RESOURCE_EXHAUSTED|queta/i.test(textError)){
      return res.status(429).json({ 
        codigo: 429,
        mensagem: "Cota do Gemini atingida. Tente novamente mais tarde."  
      });
    };
    return res.status(500).json({ 
      codigo: 500,
      mensagem: "Erro ao gerar descrição com a IA." 
    });
  }
}

module.exports = { gerarDescricao };