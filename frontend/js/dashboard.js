const dialogGastos = document.getElementById('card-gastos');
const btnAdicionar = document.getElementById('btn-add');
const btnFecharDialog = document.getElementById('btn-fechar');
const btnSalvar = document.getElementById('btn-salvar');
const info = document.getElementById('nova-info');
const errorMessage = document.querySelector('.error-message');

btnAdicionar.addEventListener('click', () => {
  if (!dialogGastos.open) dialogGastos.showModal();
});

btnFecharDialog.addEventListener('click', () => {
  dialogGastos.close();
});

btnSalvar.addEventListener('click', () => {
  dialogGastos.close();
  if (!info || !info.value.trim()) {
    errorMessage.textContent = 'Digite o nome da categoria';
    return;
  }
});

dialogGastos.addEventListener('click', (event) => {
  if (event.target === dialogGastos) dialogGastos.close();
});

