// const http = require("node:http");
// const fs = require("node:fs");
// const path = require("node:path");
// const crypto = require("node:crypto");
// const { log } = require("node:console");
const newsDataApi = "pub_f96377fcf3de4fe7b50b0ff3457194c0";

async function getNews(request, response) {
  if (!newsDataApi) {
    console.error("API não foi configurada");
    return response.status(503).json({
      error: "Configure a API no servidor para carregar as notícias",
    });
  }

  try {
    const params = new URLSearchParams({
      apiKey: newsDataApi,
      country: "br",
      language: "pt",
      category: "business",
      q: "Investimentos OR Investimento OR Ações OR Bolsa OR Renda Fixa",
      size: "10",
    });

    const newResponse = await fetch(
      `https://newsdata.io/api/1/latest?${params}`,
      {
        signal: AbortSignal.timeout(10_000),
      },
    );

    const result = await newResponse.json();
    if (!newResponse.ok || result.status === "error") {
      console.error("NewsData retornou erro", {
        status: newResponse.status,
        message: result.message || "erro sem mensagem",
      });
      return response.status(502).json({
        error: "A fonte de notícia não respondeu agora, tente novamente.",
      });
    }

    const investmentWords = [
      "investimento",
      "investimentos",
      "ações",
      "bolsa",
      "renda fixa",
      "renda variável",
      "fundos",
      "mercado financeiro",
      "dividendos",
      "bitcoin",
      "cripto",
    ];

    const articles = (Array.isArray(result.results) ? result.results : [])
      .filter((article) => {
        const text =
          `${article.title || ""} ${article.description || ""}`.toLowerCase();
        return investmentWords.some((word) => text.includes(word));
      })
      .filter((article) => article.title && article.link)
      .slice(0, 6)
      .map((article) => ({
        title: String(article.title).slice(0, 180),
        description: String(article.description || "").slice(0, 240),
        link: String(article.link),
        imageUrl:
          typeof article.image_url === "string" ? article.image_url : "",
        source: String(
          article.source_name || article.source_id || "NewsData.io",
        ),
      }));

    return response.status(200).json({ articles });
  } catch (error) {
    console.error("Falha ao consultar notícias", {
      message: error.message,
    });
    return response.status(502).json({
      error: "Não foi possível buscar notícias agora",
    });
  }
}

module.exports = { getNews };
