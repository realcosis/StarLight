import { Router } from '@remix-run/router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginView } from './views/guest/loginView';
import { StarLight } from './views/StarLight';
import { Error } from './views/Error';
import { storeTexts } from './core/hooks/localization/storeTexts';
import { loadSession } from './core/hooks/session/loadSession';
import { storeSettings } from './core/hooks/settings/storeSettings';
import { getCSRF } from './core/hooks/csrf/getCSRF';
import { HomeView } from './views/pages/homeView';
import { NitroView } from './views/client/nitroView';

const router: Router = createBrowserRouter([
    {
        path: '/',
        element: <StarLight />,
        errorElement: <Error />,
        loader: async () => {
            await storeSettings();
            await storeTexts();
            await getCSRF();
            await loadSession();
            return null;
        },
        children: [
            {
                path: 'login',
                element: <LoginView />
            },
            {
                path: 'home',
                element: <HomeView />
            },
            {
                path: 'game/nitro',
                element: <NitroView />
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(<StrictMode>
    <RouterProvider router={ router } />
</StrictMode>);