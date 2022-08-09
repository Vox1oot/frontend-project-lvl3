export default (elements, error) => {
  const { pTextInfo, input } = elements;
  input.classList.add('is-invalid');

  pTextInfo.classList.remove('text-info', 'text-success');
  pTextInfo.classList.add('text-danger');

  pTextInfo.textContent = error;
};
