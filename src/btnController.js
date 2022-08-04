export default (buttons, watchedObject) => {
  const watcher = watchedObject;

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      watcher.modalID = id;
    });
  });
};
