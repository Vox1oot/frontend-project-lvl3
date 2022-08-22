/* eslint-disable no-param-reassign */
import uniqueId from 'lodash/uniqueId.js';
import axios from 'axios';
import parse from './parse.js';
import proxify from './proxify.js';

const getNewPosts = (coll1, coll2) => coll1
  .filter(({ title: title1 }) => !coll2.some(({ title: title2 }) => title1 === title2));

const update = (state, watchedObject) => {
  const currentPosts = state.channels.posts;
  const { url, id: feedID } = state.channels.feeds[state.channels.feeds.length - 1];

  setTimeout(() => {
    axios({ url: proxify(url) })
      .then((responce) => {
        const dataFromParse = parse(responce);
        const { posts: updatedPosts } = dataFromParse;
        const newPosts = getNewPosts(updatedPosts, currentPosts);

        const newPostsFromFeed = newPosts.map((post) => {
          post.id = uniqueId();
          post.feedID = feedID;
          return post;
        });

        if (newPostsFromFeed.length !== 0) {
          watchedObject.channels.posts.unshift(...newPostsFromFeed);
        }
      })
      .finally(update(state, watchedObject));
  }, 5000);
};

export default update;
