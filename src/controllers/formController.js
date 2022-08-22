/* eslint-disable no-param-reassign */
import validate from '../utils/validate.js';
import loadFeed from '../utils/loadFeed.js';

export default (elements, state, watchedState) => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputLink = formData.get(elements.input.name);

    validate(inputLink, state)
      .then((url) => {
        watchedState.valid = true;
        watchedState.processState = 'SENDING';
        loadFeed(url, watchedState, state)
          .then(() => {
            watchedState.error = null;
          });
      })
      .catch((err) => {
        watchedState.valid = false;
        watchedState.error = err.message;
      });
  });
};
