import uniqueId from 'lodash/uniqueId.js';

export default (html, url) => {
  const feed = {
    id: uniqueId(),
    title: html.querySelector('channel > title').textContent.trim(),
    description: html.querySelector('channel > description').textContent.trim(),
    url,
  };

  return feed;
};

