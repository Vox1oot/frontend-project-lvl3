export default (elements, i18Instance) => {
  const { pTextDanger, input } = elements;
  input.classList.remove('is-invalid');
  input.value = '';

  pTextDanger.classList.remove('text-danger');
  pTextDanger.classList.add('text-success');
  pTextDanger.textContent = i18Instance.t('success');

  input.focus();
};
