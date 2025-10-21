import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { Grid } from './pages/Grid';
import { Photo } from './pages/Photo';
import { NotFound } from './pages/NotFound';

import './index.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('There is no root element!');
}

const router = createBrowserRouter([
	{
		index: true,
		Component: Grid,
	},
	{
		path: '/photo/:photoId',
		Component: Photo,
	},
	{
		path: '*',
		Component: NotFound,
	},
]);

createRoot(root).render(<RouterProvider router={router} />);
