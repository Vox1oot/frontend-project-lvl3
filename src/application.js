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

  const view = render(state, elements, i18Instance);

  // controller
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputLink = formData.get(elements.input.name);

    validate(inputLink, state)
      .then((url) => {
        view.processState = 'SENDING';
        view.valid = true;

        getRequest(url, view, elements, state, i18Instance);
      })
      .catch((err) => {
        view.valid = false;
        view.error = i18Instance.t(`errors.${err.name}`);
      });
    view.processState = 'FILLING';
  });
};

export default app;
