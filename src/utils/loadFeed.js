/* eslint-disable no-param-reassign */
import uniqueId from 'lodash/uniqueId.js';
import axios from 'axios';
import parse from './parse.js';
import proxify from './proxify.js';
import update from './update.js';

export default (url, watchedState, state) => (
  axios({ url: proxify(url) })
    .then((res) => {
      const { feed, posts } = parse(res);

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
