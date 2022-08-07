import axios from 'axios';
import parse from './parse.js';
import getFeed from './getFeed.js';
import getPosts from './getPosts.js';
import btnController from './btnController.js';
import getButtons from './getButtons.js';
import update from './update.js';

export default (url, watchedObject, elements, state, i18Instance) => {
  const watcher = watchedObject;
  const allOrigin = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

  axios({ url: allOrigin })
    .then((responce) => {
      const HTMLdocument = parse(responce);
      const feed = getFeed(HTMLdocument, url);
      const posts = getPosts(HTMLdocument, feed.id);

      watcher.channels.feeds.push(feed);
      watcher.channels.posts = [...watcher.channels.posts, ...posts];
      watcher.processState = 'SUCCESSFULLY';

      btnController(getButtons(elements), watcher);
      return Promise.resolve({ url: allOrigin, id: feed.id }); // for update
    })
    .then((response) => {
      update(response, state, watcher, elements);
    })
    .catch((err) => {
      watcher.error = i18Instance.t(`errors.${err.name}`);
      watcher.error = null;
      watcher.processState = 'FILLING';
      throw err;
    });
};
