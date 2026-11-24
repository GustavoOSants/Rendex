const newsDataApi = "pub_f96377fcf3de4fe7b50b0ff3457194c0"; // <-- Certifique-se de colocar sua chave real

async function getNews(request, response) {
  if (!newsDataApi || newsDataApi === "SUA_CHAVE_AQUI") {
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
      q: "economia OR investimentos OR bolsa OR selic OR dolar",
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
      console.error("NewsData retornou erro:", newResponse.status, result);
      return response.status(502).json({
        error: "A fonte de notícia não respondeu agora, tente novamente.",
      });
    }

    const rawResults = Array.isArray(result.results) ? result.results : [];

    const seenTitles = new Set();
    const articles = rawResults
      .filter((article) => {
        if (!article.title || !article.link) return false;
        const normalizedTitle = article.title.trim().toLowerCase();
        if (seenTitles.has(normalizedTitle)) return false;
        seenTitles.add(normalizedTitle);
        return true;
      })
      .slice(0, 9)
      .map((article) => ({
        title: String(article.title).slice(0, 180),
        description: String(article.description || "").slice(0, 240),
        link: String(article.link),
        imageUrl:
          typeof article.image_url === "string" ? article.image_url : "",
        source: String(
          article.source_name || article.source_id || "Mercado",
        ),
      }));

    return response.status(200).json({ articles });
  } catch (error) {
    console.error("Falha ao consultar notícias:", error.message);
    return response.status(502).json({
      error: "Não foi possível buscar notícias agora",
    });
  }
}

module.exports = { getNews };