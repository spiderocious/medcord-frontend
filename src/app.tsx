import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '@app/app.routes';

const router = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={router} />;
}
