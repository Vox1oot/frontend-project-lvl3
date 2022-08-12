import * as yup from 'yup';

export default (linkRSS, state) => {
  yup.setLocale({
    string: {
      url: 'ValidationError',
    },
  });

  const yupScheme = yup.object({
    url: yup.string().url().notOneOf(state.channels.feeds.map((feed) => feed.url), 'RSSExist'),
  });

  return yupScheme
    .validate({ url: linkRSS }, { abortEarly: false })
    .then(({ url }) => Promise.resolve(url))
    .catch((err) => {
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      throw err;
    });
};
