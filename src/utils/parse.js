export default (res) => {
  const { contents } = res.data;
  const parser = new DOMParser();
  const HTMLdocument = parser.parseFromString(contents, 'text/xml');
  console.log(HTMLdocument);
  return HTMLdocument;
};
