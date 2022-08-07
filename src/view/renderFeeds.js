import htmlStructure from './htmlStructure.js';

export default (elements, feeds, i18Instance) => {
  const lists = feeds.map((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;

    li.replaceChildren(h3, p);
    return li;
  });

  elements.containerFeeds.replaceChildren(htmlStructure(i18Instance.t('titles.feeds'), lists));
};
