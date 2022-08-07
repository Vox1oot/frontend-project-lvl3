import i18next from 'i18next';
import validate from './utils/validate.js';
import render from './view/index.js';
import resources from './locales/index.js';
import getRequest from './utils/getRequest.js';

const app = (elements) => {
  const i18Instance = i18next.createInstance();
  i18Instance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const state = {
    valid: false,
    processState: 'FILLING',
    error: null,
    channels: {
      feeds: [],
      posts: [],
    },
    modalID: null,
  };

  const watchedObject = render(state, elements, i18Instance);

  // controller
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputLink = formData.get(elements.input.name);

    validate(inputLink, state)
      .then((url) => {
        watchedObject.processState = 'SENDING';
        watchedObject.valid = true;

        getRequest(url, watchedObject, elements, state, i18Instance);
      })
      .catch((err) => {
        watchedObject.valid = false;
        watchedObject.error = i18Instance.t(`errors.${err.name}`);
      });
    watchedObject.processState = 'FILLING';
  });
};

export default app;
