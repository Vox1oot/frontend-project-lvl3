export default (elements, i18Instance) => {
  const { pTextInfo, input } = elements;
  input.classList.remove('is-invalid');
  input.value = '';

  pTextInfo.classList.remove('text-danger', 'text-info');
  pTextInfo.classList.add('text-success');
  pTextInfo.textContent = i18Instance.t('success');

  input.focus();
};
