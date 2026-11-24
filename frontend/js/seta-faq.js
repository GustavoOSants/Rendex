const detalhes = document.querySelectorAll("details");

detalhes.forEach((item) => {
    const seta = item.querySelector("summary svg");

    if (!seta) return;

    const atualizarSeta = () => {
        const aberto = item.open;

        seta.setAttribute("aria-expanded", aberto);
        seta.setAttribute(
            "aria-label",
            aberto ? "Fechar conteúdo" : "Abrir conteúdo"
        );

        seta.style.transform = aberto ? "rotate(90deg)" : "rotate(0deg)";
    };

    item.addEventListener("toggle", atualizarSeta);

    atualizarSeta();
});