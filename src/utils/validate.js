import * as yup from 'yup';

yup.setLocale({
  string: {
    url: 'Ссылка должна быть валидным URL',
  },
});

const yupScheme = yup.object({
  url: yup.string().url(),
});

export default (linkRSS, state) => {
  const currentState = state;

  return yupScheme
    .validate({ url: linkRSS }, { abortEarly: false })
    .then(({ url }) => {
      const isFind = currentState.channels.feeds.find((feed) => feed.url === url);

      if (isFind === undefined) {
        return Promise.resolve(url);
      }

      const err = new Error();
      err.name = 'RSSExist';
      throw err;
    })
    .catch((err) => {
      currentState.error = null;
      throw err;
    });
};
