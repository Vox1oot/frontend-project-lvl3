import uniqueId from 'lodash/uniqueId.js';

export default (html, url) => {
  try {
    const feed = {
      id: uniqueId(),
      title: html.querySelector('channel > title').textContent.trim(),
      description: html
        .querySelector('channel > description')
        .textContent.trim(),
      url,
    };
    return feed;
  } catch (err) {
    err.name = 'RSSError';
    throw err;
  }
};
