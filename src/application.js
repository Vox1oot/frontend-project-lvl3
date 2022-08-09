import i18next from 'i18next';
import validate from './utils/validate.js';
import render from './view/index.js';
import resources from './locales/index.js';
import getRequest from './utils/getRequest.js';
import postsController from './controllers/postsController.js';

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
    visitedLinksElements: new Map(),
  };

  const view = render(state, elements, i18Instance);

  // controller
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputLink = formData.get(elements.input.name);

    validate(inputLink, state)
      .then((url) => {
        view.valid = true;
        view.processState = 'SENDING';

        getRequest(url, view, elements, state, i18Instance);
      })
      .catch((err) => {
        view.valid = false;
        view.error = i18Instance.t(`errors.${err.name}`);
      });
    view.processState = 'FILLING';
  });

  postsController(elements, view);
};

export default app;
