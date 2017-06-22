import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'wrangler',
  title: 'wrangler',
  indexRoute: IndexRoute(store)
});
