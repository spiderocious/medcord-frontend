import { type RouteObject } from 'react-router-dom';
import { AppEntrypoint } from '@app/app.entrypoint';
import { designSystemPreviewRoutes } from '@features/design-system-preview/design-system-preview.routes';
import { entrypointRoutes } from '@features/entrypoint/entrypoint.routes';
import { ROUTES } from '@shared/constants/routes';

export const routes: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    Component: AppEntrypoint,
    children: [entrypointRoutes, designSystemPreviewRoutes],
  },
];
