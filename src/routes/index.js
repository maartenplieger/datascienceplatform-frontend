// We only need to import the modules necessary for initial render
import BaseLayout from '../layouts/BaseLayout';
import HomeRoute from './HomeRoute';
import WPSWranglerDemoRoute from './WPSWranglerDemoRoute';
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: BaseLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    WPSWranglerDemoRoute()
  ]
});

export default createRoutes;
