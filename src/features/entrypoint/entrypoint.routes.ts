import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const EntrypointScreen = lazy(() =>
  import('./screen/entrypoint-screen').then((module) => ({
    default: module.EntrypointScreen,
  })),
);

export const entrypointRoutes: RouteObject = {
  index: true,
  Component: EntrypointScreen,
};
