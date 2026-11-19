const newsGrid = document.querySelector(".news-grid");
const newsList = document.querySelector(".news-list");
const newsStatus = document.querySelector(".news-status");

function renderNews(articles) {
    newsCard.replaceChildren() 
    if (!articles.length){
        newsStatus.textContent = "Nenhuma notícia encontrada"
        newsCard.append(newsStatus)
        return
    }
    articles.forEach(article => {
        const card = document.createElement("article");
        card.className = "newsCard";

        const content = document.createElement("div");
        content.className = "news-card-content";

        const source = document.createElement("span");
        source.className = "news-source";
        source.textContent = article.source || "newsData";

        const title = document.createElement("h3");
        title.textContent = article.title;
        
        const description = document.createElement("p");
        description.textContent = article.description || "Leia a notícia completa para saber mais";

        const link = document.createElement("a")
        link.href = article.link;
        link.target = "_blank";
        link.rel = "noopener noreferer";
        link.textContent = "Leia a Notícia";
        content.append(source, title, description, link);
        card.append(content);
        newsList.append(card);
    });
}

async function loadNews() {
    newsStatus.textContent = "Carregando notícias";
    newsList.replaceChildren(newsStatus);
    try {
      const response = await fetch ("http://localhost:3000/api/news");
      const data = await response.json;
      if(!response.ok){
        throw new Error(data.error || "Não foi possível carregar as notícias")
      };
    renderNews(Array.isArray(data.articles) ?data.articles: [])
    } catch (error) {
        console.error("Falha ao carregar as notícias", error);
        newsStatus.textContent = error.message;
        newsList.replaceChildren(newsStatus);
    }
}

loadNews();