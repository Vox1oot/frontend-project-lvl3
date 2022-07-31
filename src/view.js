// view
const renderValid = (elements) => {
  const { pTextDanger, input } = elements;
  input.classList.remove('is-invalid');
  input.value = '';
  input.focus();
  pTextDanger.textContent = '';
};

const renderErrors = (elements, error) => {
  const { pTextDanger, input } = elements;
  input.classList.add('is-invalid');
  pTextDanger.textContent = error;
};

const render = (elements) => (path, currentValue) => {
  switch (path) {
    case 'error':
      renderErrors(elements, currentValue);
      break;
    case 'url':
      renderValid(elements);
      break;
    default:
      break;
  }
};

export default render;
