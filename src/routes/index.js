// We only need to import the modules necessary for initial render
import BaseLayout from '../layouts/BaseLayout';
import HomeRoute from './HomeRoute';
import WPSWranglerDemoRoute from './WPSWranglerDemoRoute';
import BasketRoute from './BasketRoute';
import UploadFileRoute from './UploadFileRoute';
import AccountRoute from './AccountRoute';
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: BaseLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    WPSWranglerDemoRoute(),
    UploadFileRoute(store),
    BasketRoute(),
    AccountRoute()
  ]
});

export default createRoutes;
