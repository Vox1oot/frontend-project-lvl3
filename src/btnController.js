export default (buttons, watchedObject) => {
  const watcher = watchedObject;

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      watcher.modalID = id;

      const indexPost = watcher.channels.posts.findIndex(({ id: postID }) => postID === id);
      const currentPost = watcher.channels.posts[indexPost];
      currentPost.weight = 'fw-normal';

      const link = e.target.previousElementSibling;
      link.classList.remove('fw-bold');
      link.classList.remove('fw-normal');
    });
  });
};
