import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'wrangler',
  indexRoute: IndexRoute(store)
});
