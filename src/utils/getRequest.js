/* eslint-disable no-param-reassign */
import uniqueId from 'lodash/uniqueId.js';
import axios from 'axios';
import parse from './parse.js';
import update from './update.js';

export default (url, watchedObject, elements, state, i18Instance) => {
  const currentURL = new URL('https://allorigins.hexlet.app');
  currentURL.pathname = '/get';
  const rssLink = encodeURIComponent(url);
  currentURL.search = `disableCache=true&url=${rssLink}`;

  axios({ url: currentURL.href })
    .then((responce) => {
      const dataFromParse = parse(responce);

      const { feed } = dataFromParse;
      const { posts } = dataFromParse;

      feed.id = uniqueId();
      feed.url = url;

      const postsFromFeed = posts.map((post) => {
        post.id = uniqueId();
        post.feedID = feed.id;
        return post;
      });

      watchedObject.channels.feeds.push(feed);
      watchedObject.channels.posts.unshift(...postsFromFeed);
      watchedObject.processState = 'SUCCESSFULLY';

      return Promise.resolve({ url: currentURL.href, feedID: feed.id }); // for update
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
};
