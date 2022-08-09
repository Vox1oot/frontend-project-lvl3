import renderSuccess from './renderSuccess.js';
import renderDownloading from './renderDownloading.js';

export default (elements, currentValue, i18Instance) => {
  const { button, input } = elements;

  if (currentValue === 'SENDING') {
    renderDownloading(elements, i18Instance);
    button.disabled = true;
    input.disabled = true;
  }

  if (currentValue === 'SUCCESSFULLY') {
    renderSuccess(elements, i18Instance);
    button.disabled = false;
    input.disabled = false;
  }

  if (currentValue === 'FILLING') {
    button.disabled = false;
    input.disabled = false;
  }
};
