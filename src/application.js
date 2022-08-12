import i18next from 'i18next';
import render from './view/index.js';
import resources from './locales/index.js';
import postsController from './controllers/postsController.js';
import formController from './controllers/formController.js';

const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('form input'),
  button: document.querySelector('[type="submit"]'),
  pTextInfo: document.querySelector('p.text-danger'),
  containerPosts: document.querySelector('div.posts'),
  containerFeeds: document.querySelector('div.feeds'),
  modal: {
    title: document.querySelector('.modal-title'),
    body: document.querySelector('.modal-body'),
    footer: document.querySelector('.modal-footer'),
  },
};

const app = () => {
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
    visitedLinksIDs: new Set(),
  };

  const view = render(state, elements, i18Instance);

  // controllers
  formController(elements, state, view, i18Instance);
  postsController(elements, view);
};

export default app;
