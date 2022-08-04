import onChange from 'on-change';

const renderErrors = (elements, error) => {
  const { pTextDanger, input } = elements;
  input.classList.add('is-invalid');

  if (pTextDanger.classList.contains('text-success')) {
    pTextDanger.classList.remove('text-success');
    pTextDanger.classList.add('text-danger');
  }

  pTextDanger.textContent = error;
};

const renderSuccess = (elements, i18Instance) => {
  const { pTextDanger, input } = elements;
  input.classList.remove('is-invalid');
  input.value = '';

  pTextDanger.classList.remove('text-danger');
  pTextDanger.classList.add('text-success');
  pTextDanger.textContent = i18Instance.t('success');

  input.focus();
};

const htmlStructure = (name, lists) => {
  const divBorder = document.createElement('div');
  divBorder.classList.add('card', 'border-0');

  const divBody = document.createElement('div');
  divBody.classList.add('card-body');

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const elementH2 = document.createElement('h2');
  elementH2.classList.add('card-title', 'h4');
  elementH2.textContent = name;

  ul.replaceChildren(...lists);
  divBody.replaceChildren(elementH2);
  divBorder.replaceChildren(divBody, ul);

  return divBorder;
};

const renderFeeds = (elements, feeds, i18Instance) => {
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

const renderPosts = (elements, posts, i18Instance) => {
  const lists = posts.map((post) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'border-0',
      'border-end-0',
      'd-flex',
      'justify-content-between',
      'align-items-start',
    );

    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.href = post.url;
    a.textContent = post.title;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = 'Просмотр';

    li.replaceChildren(a, button);
    return li;
  });

  elements.containerPosts.replaceChildren(htmlStructure(i18Instance.t('titles.posts'), lists));
};

const renderModal = (posts, modalID, htmlElements) => {
  const [post] = posts.filter(({ id }) => modalID === id);

  const { modal } = htmlElements;
  modal.title.textContent = post.title;
  modal.body.textContent = post.description;
  modal.footer.firstElementChild.href = post.url;
};

const render = (state, elements, i18Instance) => {
  const htmlElements = elements;

  const watchedObject = onChange(state, (path, currentValue) => {
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
        if (state.processState === 'SENDING') {
          htmlElements.button.disabled = true;
          htmlElements.input.disabled = true;
        }

        if (state.processState === 'SUCCESSFULLY') {
          renderSuccess(htmlElements, i18Instance);
        }

        htmlElements.button.disabled = false;
        htmlElements.input.disabled = false;
        break;
      case 'modalID':
        renderModal(state.channels.posts, currentValue, htmlElements);
        break;
      default:
        break;
    }
  });
  return watchedObject;
};

export default render;
