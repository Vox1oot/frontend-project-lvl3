import i18next from 'i18next';
import axios from 'axios';
import validate from './validate.js';
import render from './view.js';
import resources from './locales/index.js';
import parse from './parse.js';
import getFeed from './getFeed.js';
import getPosts from './getPosts.js';
import btnController from './btnController.js';

const getNewPosts = (coll1, coll2) => coll1
  .filter(({ title: title1 }) => !coll2.some(({ title: title2 }) => title1 === title2));

const update = ({ id, url }, posts, watchedObject) => {
  const watcher = watchedObject;

  setTimeout(() => {
    axios(url)
      .then((responce) => {
        const updatedPosts = getPosts(parse(responce), id);
        const newPosts = getNewPosts(updatedPosts, posts);
        watcher.channels.posts = [...watchedObject.channels.posts, ...newPosts];
      });
    update({ id, url }, posts, watchedObject); // рекурсия
  }, 5000);
};

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
    const linkRSS = formData.get(elements.input.name);

    validate(linkRSS, state)
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

            const buttons = elements.containerPosts.querySelectorAll('button');
            btnController(buttons, watchedObject);
            return Promise.resolve({ url: allOrigin, id: feed.id }); // for update
          })
          .then((response) => {
            update(response, state.channels.posts, watchedObject);
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
