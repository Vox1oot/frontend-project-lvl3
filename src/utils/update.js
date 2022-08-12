/* eslint-disable no-param-reassign */
import uniqueId from 'lodash/uniqueId.js';
import axios from 'axios';
import parse from './parse.js';

const getNewPosts = (coll1, coll2) => coll1
  .filter(({ title: title1 }) => !coll2.some(({ title: title2 }) => title1 === title2));

const update = ({ url, feedID }, state, watchedObject, elements) => {
  const currentPosts = state.channels.posts;

  setTimeout(() => {
    axios(url)
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

        update({ url, feedID }, state, watchedObject, elements); // рекурсия
      });
  }, 5000);
};

export default update;
