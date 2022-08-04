import i18next from 'i18next';
import axios from 'axios';
import * as yup from 'yup';
import render from './view.js';
import resources from './locales/index.js';
import parse from './parse.js';
import getFeed from './getFeed.js';
import getPosts from './getPosts.js';
import btnController from './btnController.js';

yup.setLocale({
  string: {
    url: 'Ссылка должна быть валидным URL',
  },
});

const yupScheme = yup.object({
  url: yup.string().url(),
});

const app = () => {
  const defaultLanguage = 'ru';

  const i18Instance = i18next.createInstance();
  i18Instance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });

  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('form input'),
    button: document.querySelector('[type="submit"]'),
    pTextDanger: document.querySelector('p.text-danger'),
    containerPosts: document.querySelector('div.posts'),
    containerFeeds: document.querySelector('div.feeds'),
    modal: {
      title: document.querySelector('.modal-title'),
      body: document.querySelector('.modal-body'),
      footer: document.querySelector('.modal-footer'),
    },
  };

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

  const validate = (linkRSS) => yupScheme
    .validate({ url: linkRSS }, { abortEarly: false })
    .then(({ url }) => {
      const isFind = state.channels.feeds.find((feed) => feed.url === url);

      if (isFind === undefined) {
        /* watchedObject.valid = true; */
        return Promise.resolve(url);
      }

      const err = new Error();
      err.name = 'RSSExist';
      throw err;
    })
    .catch((err) => {
      state.error = null;
      throw err;
    });

  // controller
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const linkRSS = formData.get(elements.input.name);

    validate(linkRSS)
      .then((url) => {
        watchedObject.processState = 'SENDING';
        watchedObject.valid = true;

        axios({
          url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`,
        })
          .then((responce) => {
            const HTMLdocument = parse(responce);
            const feed = getFeed(HTMLdocument, url);
            const posts = getPosts(HTMLdocument, feed.id);

            watchedObject.channels.feeds.push(feed);
            watchedObject.channels.posts = [...watchedObject.channels.posts, ...posts];
            watchedObject.processState = 'SUCCESSFULLY';

            const buttons = elements.containerPosts.querySelectorAll('button');
            btnController(buttons, watchedObject);
          })
          .catch((err) => {
            watchedObject.error = i18Instance.t(`errors.${err.name}`);
            watchedObject.error = null;
            watchedObject.processState = 'FILLING';
            throw err;
          });
      })
      .catch((err) => {
        watchedObject.valid = false;
        watchedObject.error = i18Instance.t(`errors.${err.name}`);
      });
    watchedObject.processState = 'FILLING';
  });
};

export default app;
