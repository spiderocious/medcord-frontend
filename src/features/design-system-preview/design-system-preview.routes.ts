import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { ROUTES } from '@shared/constants/routes';

import { getScreenForLeaf } from './screen/preview-screen-map';
import { PREVIEW_LEAVES, PREVIEW_PARTS } from './types/preview-toc';

const DesignSystemPreviewScreen = lazy(() =>
  import('./screen/design-system-preview-screen').then((module) => ({
    default: module.DesignSystemPreviewScreen,
  })),
);

const WelcomePreviewScreen = lazy(() =>
  import('./screen/welcome-preview-screen').then((module) => ({
    default: module.WelcomePreviewScreen,
  })),
);

const partLandingRoutes: RouteObject[] = PREVIEW_PARTS.map((part) => {
  const Screen = getScreenForLeaf({
    partId: part.id,
    partTitle: part.title,
    partPath: part.path,
    name: `${part.title} — overview`,
    path: '',
    reference: `Part ${part.id}`,
    absPath: `/design-system/${part.path}`,
  });
  return { path: part.path, Component: Screen };
});

const leafRoutes: RouteObject[] = PREVIEW_LEAVES.filter((leaf) => leaf.path).map((leaf) => ({
  path: `${leaf.partPath}/${leaf.path}`,
  Component: getScreenForLeaf(leaf),
}));

export const designSystemPreviewRoutes: RouteObject = {
  path: ROUTES.DESIGN_SYSTEM.relativePath,
  Component: DesignSystemPreviewScreen,
  children: [{ index: true, Component: WelcomePreviewScreen }, ...partLandingRoutes, ...leafRoutes],
};
