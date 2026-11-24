const newsContainer = document.querySelector("#news-container");
let newsStatus = document.querySelector(".news-status");

if (!newsStatus) {
  newsStatus = document.createElement("span");
  newsStatus.className = "news-status";
}

function renderNews(articles) {
  newsContainer.replaceChildren();

  if (!articles.length) {
    newsStatus.textContent = "Nenhuma notícia encontrada.";
    newsContainer.append(newsStatus);
    return;
  }

  articles.forEach((article) => {
    const card = document.createElement("article");
    card.className = "news-card";

    const content = document.createElement("div");
    content.className = "news-card-content";

    const source = document.createElement("span");
    source.className = "tag";
    source.textContent = article.source || "Mercado";

    const title = document.createElement("h2");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent =
      article.description || "Leia a notícia completa para saber mais.";

    content.append(source, title, description);

    const link = document.createElement("a");
    link.href = article.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "read-more";
    link.textContent = "Ler no portal original ";

    const arrow = document.createElement("span");
    arrow.className = "arrow-icon";
    arrow.textContent = "↗";
    link.append(arrow);

    card.append(content, link);
    newsContainer.append(card);
  });
}

async function loadNews() {
  newsStatus.textContent = "Carregando notícias...";
  newsContainer.replaceChildren(newsStatus);

  try {
    const response = await fetch("http://localhost:3000/api/news");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Não foi possível carregar as notícias");
    }

    renderNews(Array.isArray(data.articles) ? data.articles : []);
  } catch (error) {
    console.error("Falha ao carregar as notícias:", error);
    newsStatus.textContent = `Erro: ${error.message}`;
    newsContainer.replaceChildren(newsStatus);
  }
}

loadNews();