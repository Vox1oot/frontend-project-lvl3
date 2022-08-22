/* eslint-disable no-param-reassign */
export default (elements, watchedState) => {
  elements.containerPosts.addEventListener('click', (e) => {
    if (Object.hasOwn(e.target.dataset, 'id')) {
      const { id } = e.target.dataset;
      watchedState.modalID = id;
      watchedState.uiState.visitedLinksIDs.add(id);
    }
  });
};
