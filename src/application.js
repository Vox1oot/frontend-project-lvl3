import i18next from 'i18next';
import render from './view/index.js';
import resources from './locales/index.js';
import postsController from './controllers/postsController.js';
import formController from './controllers/formController.js';

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

  // controllers
  formController(elements, state, view, i18Instance);
  postsController(elements, view);
};

export default app;
