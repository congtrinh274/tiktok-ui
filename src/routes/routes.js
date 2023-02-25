import config from '~/config';
// Layouts
import { HeaderOnlyLayout } from '~/layouts/';
// Pages
import Home from '~/pages/Homes';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// Public routes
const publicRoutes = [
    { path: config.routes.home, components: Home },
    { path: config.routes.following, components: Following },
    { path: config.routes.profile, components: Profile },
    { path: config.routes.upload, components: Upload, layout: HeaderOnlyLayout },
    { path: config.routes.search, components: Search, layout: null },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
