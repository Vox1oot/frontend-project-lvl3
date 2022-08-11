export default (setID, posts) => {
  const currentVisitedID = [...setID.values()][setID.size - 1];
  const currentLink = document.querySelector(`[data-id="${currentVisitedID}"]`);
  currentLink.classList.toggle('fw-bold');
  currentLink.classList.toggle('fw-normal');

  const indexPost = posts.findIndex(({ id: postID }) => postID === currentVisitedID);
  const currentPost = posts[indexPost];
  currentPost.weight = 'fw-normal';
};
