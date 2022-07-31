/* eslint-disable no-undef */
import i18next from 'i18next';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';
import resources from './locales/index.js';

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
  const state = onChange({
    valid: true,
    processState: 'filling',
    error: null,
    url: null,
  }, render(elements));

  // controller
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const linkRSS = formData.get(elements.input.name);

    yupScheme.validate({ url: linkRSS }, { abortEarly: false })
      .then(({ url }) => {
        if (state.url !== url) {
          state.url = url;
          state.valid = true;
        } else {
          throw new Error(i18Instance.t('errors.rssExist'));
        }
      })
      .catch((err) => {
        state.valid = false;
        state.error = err.message;
      });
  });
};

export default app;
