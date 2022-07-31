/* eslint-disable no-undef */
import i18next from 'i18next';
import axios from 'axios';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';
import resources from './locales/index.js';
import parse from './parse.js';

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
  };

  // model
  const state = onChange(
    {
      valid: true,
      processState: 'filling',
      error: null,
      url: null,
      feeds: [],
    },
    render(elements),
  );

  const validate = (linkRSS) => yupScheme
    .validate({ url: linkRSS }, { abortEarly: false })
    .then(({ url }) => {
      if (!state.feeds.includes(url)) {
        state.feeds.push(url);
        state.valid = true;
        state.url = url;
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
            parse(responce);
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
