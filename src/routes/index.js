import routesConfig from '~/configs/routes';
// Layouts
import { HeaderOnlyLayout } from '~/components/Layout/';
// Pages
import Home from '~/pages/Homes';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// Public routes
const publicRoutes = [
    { path: routesConfig.home, components: Home },
    { path: routesConfig.following, components: Following },
    { path: routesConfig.profile, components: Profile },
    { path: routesConfig.upload, components: Upload, layout: HeaderOnlyLayout },
    { path: routesConfig.search, components: Search, layout: null },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
