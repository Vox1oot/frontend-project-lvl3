export default (name, lists) => {
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
