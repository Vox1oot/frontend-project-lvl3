export default (map) => {
  const currentLinkElement = [...map.values()][map.size - 1];
  currentLinkElement.classList.remove('fw-bold');
  currentLinkElement.classList.remove('fw-normal');
};
