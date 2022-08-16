export default (elements, currentError, prevError) => {
  const { pTextInfo, input } = elements;
  input.classList.add('is-invalid');

  pTextInfo.classList.remove('text-info', 'text-success');
  pTextInfo.classList.add('text-danger');

  pTextInfo.textContent = currentError ?? prevError;
};
