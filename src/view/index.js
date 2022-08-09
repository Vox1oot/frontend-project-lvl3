import onChange from 'on-change';
import renderErrors from './renderErrors.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';
import renderProcessing from './renderProcessing.js';
import renderVisitedLink from './renderVisitedLink.js';

const render = (state, elements, i18Instance) => {
  const htmlElements = elements;

  const watcher = onChange(state, (path, currentValue) => {
    switch (path) {
      case 'error':
        if (state.error !== null) {
          renderErrors(htmlElements, currentValue);
        }
        break;
      case 'channels.feeds':
        renderFeeds(htmlElements, state.channels.feeds, i18Instance);
        break;
      case 'channels.posts':
        renderPosts(htmlElements, state.channels.posts, i18Instance);
        break;
      case 'processState':
        renderProcessing(htmlElements, currentValue, i18Instance);
        break;
      case 'modalID':
        renderModal(htmlElements, state.channels.posts, currentValue);
        break;
      case 'visitedLinksElements':
        renderVisitedLink(currentValue);
        break;
      default:
        break;
    }
  });
  return watcher;
};

export default render;
