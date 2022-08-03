import i18next from 'i18next';
import axios from 'axios';
import * as yup from 'yup';
import render from './view.js';
import resources from './locales/index.js';
import parse from './parse.js';
import getFeed from './getFeed.js';
import getPosts from './getPosts.js';

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
  };

  const state = {
    valid: false,
    processState: 'FILLING',
    error: null,
    channels: {
      feeds: [],
      posts: [],
    },
  };

  const watchedObject = render(state, elements, i18Instance);

  const validate = (linkRSS) => yupScheme
    .validate({ url: linkRSS }, { abortEarly: false })
    .then(({ url }) => {
      const isFind = state.channels.feeds.find((feed) => feed.url === url);

      if (isFind === undefined) {
        watchedObject.valid = true;
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
        watchedObject.valid = false; // ?

        axios({
          url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`,
        })
          .then((responce) => {
            const HTMLdocument = parse(responce);
            const feed = getFeed(HTMLdocument, url);
            const posts = getPosts(HTMLdocument, feed.id);

            watchedObject.channels.feeds.push(feed);
            watchedObject.channels.posts = [...watchedObject.channels.posts, ...posts];
          })
          .catch((err) => {
            console.dir(err);
            watchedObject.error = i18Instance.t(`errors.${err.name}`);
            throw err;
          });
        watchedObject.processState = 'SENDED';
      })
      .catch((err) => {
        watchedObject.valid = false;
        watchedObject.error = i18Instance.t(`errors.${err.name}`);
      });
  });
};

export default app;
