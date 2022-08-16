/* eslint-disable no-param-reassign */
import validate from '../utils/validate.js';
import getRequest from '../utils/getRequest.js';

export default (elements, state, watchedState, i18Instance) => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputLink = formData.get(elements.input.name);

    validate(inputLink, state)
      .then((url) => {
        watchedState.valid = true;
        watchedState.processState = 'SENDING';
        getRequest(url, watchedState, state, i18Instance);
      })
      .catch((err) => {
        watchedState.valid = false;
        watchedState.error = i18Instance.t(`errors.${err.message}`);
      });
    watchedState.processState = 'FILLING';
  });
};
