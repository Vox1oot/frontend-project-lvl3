export default (htmlElements, posts, modalID) => {
  const post = posts.find(({ id }) => modalID === id);

  const { modal } = htmlElements;
  modal.title.textContent = post.title;
  modal.body.textContent = post.description;
  modal.footer.firstElementChild.href = post.url;
};
