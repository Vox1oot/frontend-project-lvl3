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
    containerPosts: document.querySelector('container-xxl posts'),
    containerFeeds: document.querySelector('container-xxl feeds'),
  };

  // model
  const state = onChange(
    {
      valid: null,
      processState: 'filling',
      error: null,
      channels: {
        feeds: [],
        posts: [],
      }
    },
    render(elements),
  );

  const validate = (linkRSS) => yupScheme
    .validate({ url: linkRSS }, { abortEarly: false })
    .then(({ url }) => {
      const isFind = state.channels.feeds.find((feed) => feed.url === url) ? true : false;

      if (!isFind) {
        state.valid = true;
        return Promise.resolve(url);
      }
      throw new Error(i18Instance.t('errors.rssExist'));
    })
    .catch((err) => {
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
            /* console.log(HTMLdocument); */
            const feed = getFeed(HTMLdocument, url);
            const posts = getPosts(HTMLdocument, feed.id);

            state.channels.feeds.push(feed);
            state.channels.posts.push(posts);

          })
          .catch((err) => {
            state.error = i18Instance.t('errors.network');
            throw err;
          });
      })
      .catch((err) => {
        state.valid = false;
        state.error = err.message;
      });
  });
};

export default app;
