export default (elements, watchedObject) => {
  const watcher = watchedObject;

  elements.containerPosts.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    watcher.modalID = id;
    watcher.visitedLinksIDs.add(id);
  });
};
