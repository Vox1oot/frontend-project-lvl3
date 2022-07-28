// view
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
    default:
      break;
  }
};

export default render;
