/* eslint-disable no-undef */
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';

const yupScheme = yup.object({
  url: yup.string().url('Ссылка должна быть валидным URL'),
});

const app = () => {
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
        state.url = url;
      })
      .catch((err) => {
        state.valid = false;
        state.error = err.message;
      });
  });
};

export default app;
