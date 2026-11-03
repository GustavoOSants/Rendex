const capitalInicial = prompt("Qual valor inial do investimeto?");
const taxaBruta = prompt("Qual a taxa da aplicação?");
const taxa = taxaBruta / 100;
const tempo = prompt("Qual o tempo de aplicacação do investimento?");
const jurosParenteses = 1 + taxa;
const juros = jurosParenteses ** tempo;


const montante = capitalInicial * juros;
console.log(montante.toFixed(2))

for (let i = 1; i <= tempo; i++) {
    const jurosMes = jurosParenteses ** i
    const montanteMes = capitalInicial * jurosMes
    console.log(montanteMes.toFixed(2));
}