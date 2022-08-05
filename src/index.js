import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import app from './application.js';

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

app(elements);
