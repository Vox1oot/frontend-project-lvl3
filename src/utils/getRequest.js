/* eslint-disable no-param-reassign */
import uniqueId from 'lodash/uniqueId.js';
import axios from 'axios';
import parse from './parse.js';
import useProxyTo from './useProxyTo.js';
import update from './update.js';

export default (url, watchedState, state) => (
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

      watchedState.channels.feeds.push(feed);
      watchedState.channels.posts.unshift(...postsFromFeed);
      watchedState.processState = 'SUCCESSFULLY';
      update(state, watchedState);
    })
    .catch((err) => {
      watchedState.error = err.name;
      watchedState.processState = 'FILLING';
    })
);
