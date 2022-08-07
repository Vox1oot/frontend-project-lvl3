import axios from 'axios';
import getPosts from './getPosts.js';
import parse from './parse.js';
import btnController from './btnController.js';
import getButtons from './getButtons.js';

const getNewPosts = (coll1, coll2) => coll1
  .filter(({ title: title1 }) => !coll2.some(({ title: title2 }) => title1 === title2));

const update = ({ id, url }, state, watchedObject, elements) => {
  const currentPosts = state.channels.posts;
  const watcher = watchedObject;

  setTimeout(() => {
    axios(url)
      .then((responce) => {
        const updatedPosts = getPosts(parse(responce), id);
        const newPosts = getNewPosts(updatedPosts, currentPosts);

        if (newPosts.length !== 0) {
          watcher.channels.posts.push(...newPosts);
        }

        btnController(getButtons(elements), watchedObject);
        update({ id, url }, state, watchedObject, elements); // рекурсия
      });
  }, 5000);
};

export default update;
