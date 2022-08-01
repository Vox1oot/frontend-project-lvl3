export default (html, id) => {
  const items = html.querySelectorAll('item');

  const posts = Array
    .from(items)
    .reduce((acc, item) => {
      const title = item.querySelector('title').textContent.trim();
      const description = item.querySelector('description').textContent.trim();
      const url = item.querySelector('link').nextSibling.textContent.trim()

      const post = { title, description, url };
      acc.feedPosts.push(post);

      return acc;
    }, { feedID: id, feedPosts: [] });
  
  return posts;
};