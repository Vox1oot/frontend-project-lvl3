/* eslint-disable no-undef */
import i18next from 'i18next';
import axios from 'axios';
import * as yup from 'yup';
import onChange from 'on-change';
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
    pTextDanger: document.querySelector('p.text-danger'),
    containerPosts: document.querySelector('div.posts'),
    containerFeeds: document.querySelector('div.feeds'),
  };

  console.log(elements);

const state = {
  valid: false,
  processState: 'filling',
  error: null,
  channels: {
    feeds: [],
    posts: [],
  }
};

const watchedObject = render(state, elements); 

  const validate = (linkRSS) => yupScheme
    .validate({ url: linkRSS }, { abortEarly: false })
    .then(({ url }) => {
      const isFind = state.channels.feeds.find((feed) => feed.url === url) ? true : false;

      if (!isFind) {
        watchedObject.valid = true;
        return Promise.resolve(url);
      }
      throw new Error(i18Instance.t('errors.rssExist'));
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
        axios({
          url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`,
        })
          .then((responce) => {
            const HTMLdocument = parse(responce);
            const feed = getFeed(HTMLdocument, url);
            const posts = getPosts(HTMLdocument, feed.id);

            watchedObject.channels.feeds.push(feed);
            watchedObject.channels.posts.push(posts);
          })
          .catch((err) => {
            watchedObject.error = i18Instance.t('errors.network');
            throw err;
          });
      })
      .catch((err) => {
        watchedObject.valid = false;
        watchedObject.error = err.message;
      });
  });
};

export default app;
