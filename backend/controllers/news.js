// const http = require("node:http");
// const fs = require("node:fs");
// const path = require("node:path");
// const crypto = require("node:crypto");
// const { log } = require("node:console");
const newsDataApi = "pub_f96377fcf3de4fe7b50b0ff3457194c0";

function sendJson(response, status, body) {
  const headers = { "Content-Type": "application/json; charset=utf-8" };
  if (process.env.NODE_ENV !== "production") {
    headers["Access-Control-Allow-Origin"] = "*";
  }
  response.writeHead(status, headers);
  response.end(JSON.stringify(body));
}

async function getNews(response) {
  if (!newsDataApi) {
    log("API não foi configurada");
    sendJson(response, 503, {
      error: "Configure a API no servidor para carregar as notícias",
    });
  
}

try {
  const params = new UrlSearchParams({
    apiKey: newsDataApi,
    country: "br",
    language: "pt",
    category: "business",
    q: "Investimentos OR Investimento OR Ações OR Bolsa OR Renda Fixa",
    size: "20",
  });

  const newResponse = await fetch(
    `https://newsdata.io/api/1/latest?${params}`,
    {
      signal: AbortSignal.timeOut(10_000),
    },
  );

  const result = await newResponse.json();
  if (!newResponse.ok || results.status === "error") {
    log("newsData retornou erro", {
      status: newResponse.status,
      message: result.results?.message || resultMessage || "erro sem mensagem",
    });
    sendJson(response, 502, {
      error: "A fonte de notícia não respondeu agora, tente novamente.",
    });
    return;
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

  const articles = (Array.isArray(result.results) ? results.results : [])
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
      imageUrl: typeof article.image_url === "string" ? article.image_url : "",
      source: String(article.source_name || article.source_id || "NewsData.io"),
    }));

  sendJson(response, 200, { articles });
} catch (error) {
  log("Falha ao consultar", { message: error.message });
  sendJson(response, 502, { error: "Não foi possível buscar notícias agora" });
}}

module.exports = { getNews };
