const form = document.querySelector('#calculadora');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o recarregamento da página  
    const capitalInicial = document.getElementById('capitalInicial').value;
    const taxaBruta = document.getElementById('taxa').value;
    const tempo = document.getElementById('tempo').value;
    const taxa = taxaBruta / 100;
    const jurosParenteses = 1 + taxa;
    const juros = jurosParenteses ** tempo;
    const montante = capitalInicial * juros;
    console.log(montante.toFixed(2));
    
    for (let i = 1; i <= tempo; i++) {
        const jurosAno = jurosParenteses ** i;
        const montanteAno = capitalInicial * jurosAno;
        console.log(montanteAno.toFixed(2));
    }
});


