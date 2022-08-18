export default (elements, currentError, prevError, i18Instance) => {
  const { pTextInfo, input } = elements;
  input.classList.add('is-invalid');

  pTextInfo.classList.remove('text-info', 'text-success');
  pTextInfo.classList.add('text-danger');

  pTextInfo.textContent = currentError !== null
    ? i18Instance.t(`errors.${currentError}`)
    : i18Instance.t(`errors.${prevError}`);
};
