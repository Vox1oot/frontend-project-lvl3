export default (elements, i18Instance) => {
  const { pTextInfo, input } = elements;
  input.classList.remove('is-invalid');
  input.value = '';

  pTextInfo.classList.toggle('text-danger', false);
  pTextInfo.classList.add('text-info');
  pTextInfo.textContent = i18Instance.t('downloading');

  input.focus();
};
