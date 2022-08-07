import i18next from 'i18next';
import axios from 'axios';
import validate from './utils/validate.js';
import render from './view/index.js';
import resources from './locales/index.js';
import parse from './utils/parse.js';
import getFeed from './utils/getFeed.js';
import getPosts from './utils/getPosts.js';
import btnController from './utils/btnController.js';
import getButtons from './utils/getButtons.js';
import update from './utils/update.js';

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
  };

  const watchedObject = render(state, elements, i18Instance);

  // controller
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputLink = formData.get(elements.input.name);

    validate(inputLink, state)
      .then((url) => {
        watchedObject.processState = 'SENDING';
        watchedObject.valid = true;
        const allOrigin = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
        axios({ url: allOrigin })
          .then((responce) => {
            const HTMLdocument = parse(responce);
            const feed = getFeed(HTMLdocument, url);
            const posts = getPosts(HTMLdocument, feed.id);

            watchedObject.channels.feeds.push(feed);
            watchedObject.channels.posts = [...watchedObject.channels.posts, ...posts];
            watchedObject.processState = 'SUCCESSFULLY';

            btnController(getButtons(elements), watchedObject);
            return Promise.resolve({ url: allOrigin, id: feed.id }); // for update
          })
          .then((response) => {
            update(response, state, watchedObject, elements);
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
