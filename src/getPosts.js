import uniqueId from 'lodash/uniqueId.js';

export default (html, id) => {
  const items = html.querySelectorAll('item');

  const posts = Array
    .from(items)
    .reduce((acc, item) => {
      const title = item.querySelector('title').textContent.trim();
      const description = item.querySelector('description').textContent.trim();
      const url = item.querySelector('link').textContent.trim();

      const post = {
        id: uniqueId(), feedID: id, title, description, url,
      };

      return [...acc, post];
    }, []);
  return posts;
};
