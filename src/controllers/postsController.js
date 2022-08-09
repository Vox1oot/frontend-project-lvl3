const changeWeightLink = (id, watcher) => {
  const indexPost = watcher.channels.posts.findIndex(({ id: postID }) => postID === id);
  const currentPost = watcher.channels.posts[indexPost];
  currentPost.weight = 'fw-normal';
};

export default (elements, watchedObject) => {
  const watcher = watchedObject;

  const isVisitedLink = (id) => watcher.visitedLinksElements.has(id);

  elements.containerPosts.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    const elementName = e.target.localName;

    switch (elementName) {
      case 'a':
        if (!isVisitedLink(id)) {
          watcher.visitedLinksElements.set(id, e.target);
          changeWeightLink(id, watcher);
        }
        break;
      case 'button':
        watcher.modalID = id;

        if (!isVisitedLink(id)) {
          watcher.visitedLinksElements.set(id, e.target.previousElementSibling);
          changeWeightLink(id, watcher);
        }
        break;
      default:
        break;
    }
  });
};
