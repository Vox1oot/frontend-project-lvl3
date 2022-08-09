import validate from '../utils/validate.js';
import getRequest from '../utils/getRequest.js';

export default (elements, state, view, i18Instance) => {
  const watcher = view;

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputLink = formData.get(elements.input.name);

    validate(inputLink, state)
      .then((url) => {
        watcher.valid = true;
        watcher.processState = 'SENDING';

        getRequest(url, watcher, elements, state, i18Instance);
      })
      .catch((err) => {
        watcher.valid = false;
        watcher.error = i18Instance.t(`errors.${err.name}`);
      });
    watcher.processState = 'FILLING';
  });
};
