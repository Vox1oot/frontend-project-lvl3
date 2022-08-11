import axios from 'axios';
import parse from './parse.js';
import getFeed from './getFeed.js';
import getPosts from './getPosts.js';
import update from './update.js';

export default (url, watchedObject, elements, state, i18Instance) => {
  const watcher = watchedObject;

  const currentURL = new URL('https://allorigins.hexlet.app');
  currentURL.pathname = '/get';
  const rssLink = encodeURIComponent(url);
  currentURL.search = `disableCache=true&url=${rssLink}`;

  axios({ url: currentURL.href })
    .then((responce) => {
      const HTMLdocument = parse(responce);
      const feed = getFeed(HTMLdocument, url);
      const posts = getPosts(HTMLdocument, feed.id);

      watcher.channels.feeds.push(feed);
      watcher.channels.posts = [...watcher.channels.posts, ...posts];
      watcher.processState = 'SUCCESSFULLY';

      return Promise.resolve({ url: currentURL.href, id: feed.id }); // for update
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
