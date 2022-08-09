import htmlStructure from './htmlStructure.js';

const createButton = (post, i18Instance) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.setAttribute('data-id', post.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.textContent = i18Instance.t('button');
  return button;
};

export default (elements, posts, i18Instance) => {
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
    a.classList.add(post.weight);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('data-id', post.id);
    a.href = post.url;
    a.textContent = post.title;

    const button = createButton(post, i18Instance);
    li.replaceChildren(a, button);
    return li;
  });

  elements.containerPosts.replaceChildren(htmlStructure(i18Instance.t('titles.posts'), lists));
};
