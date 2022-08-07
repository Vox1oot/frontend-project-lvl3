export default (elements, error) => {
  const { pTextDanger, input } = elements;
  input.classList.add('is-invalid');

  if (pTextDanger.classList.contains('text-success')) {
    pTextDanger.classList.remove('text-success');
    pTextDanger.classList.add('text-danger');
  }

  pTextDanger.textContent = error;
};
