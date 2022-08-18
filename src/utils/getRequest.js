/* eslint-disable no-param-reassign */
import uniqueId from 'lodash/uniqueId.js';
import axios from 'axios';
import parse from './parse.js';
import useProxyTo from './useProxyTo.js';
import update from './update.js';

export default (url, watchedObject, state, i18Instance) => {
  axios({ url: useProxyTo(url) })
    .then((responce) => {
      const { feed, posts } = parse(responce);

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
      update(state, watchedObject);
    })
    .catch((err) => {
      watchedObject.error = i18Instance.t(`errors.${err.name}`);
      watchedObject.processState = 'FILLING';
      watchedObject.error = null;
      throw err;
    });
};
