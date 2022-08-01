import onChange from 'on-change';

// view
const renderValid = (elements) => {
  const { pTextDanger, input } = elements;
  input.classList.remove('is-invalid');
  input.value = '';
  input.focus();
  pTextDanger.textContent = '';
};

const renderErrors = (elements, error) => {
  const { pTextDanger, input } = elements;
  input.classList.add('is-invalid');
  pTextDanger.textContent = error;
};

const renderFeeds = (elements, feeds) => {
  const divBorder = document.createElement('div');
  const divBody = document.createElement('div');
  const ul = document.createElement('ul');
  const elementH2 = document.createElement('h2');

  divBorder.classList.add('card', 'border-0');
  divBody.classList.add('card-body');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  elementH2.classList.add('card-title', 'h4');

  elementH2.textContent = 'Фиды';

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

  ul.replaceChildren(...lists);
  divBody.replaceChildren(elementH2);
  divBorder.replaceChildren(divBody, ul);
  elements.containerFeeds.replaceChildren(divBorder);
};

const render = (state, elements) => {
  const watchedObject = onChange(state, (path, currentValue) => {
    switch (path) {
      case 'error':
        renderErrors(elements, currentValue);
        break;
      case 'valid':
        renderValid(elements);
        break;
      case 'channels.feeds':
          renderFeeds(elements, state.channels.feeds);
      default:
        break;
    }
  });
  return watchedObject;
};

export default render;
