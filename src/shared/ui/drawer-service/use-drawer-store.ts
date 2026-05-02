import { useSyncExternalStore } from 'react';

import { drawerStore } from './store';

const getModals = () => drawerStore.getModals();
const getToasts = () => drawerStore.getToasts();

export function useDrawerModals() {
  return useSyncExternalStore((l) => drawerStore.subscribe(l), getModals, getModals);
}

export function useDrawerToasts() {
  return useSyncExternalStore((l) => drawerStore.subscribe(l), getToasts, getToasts);
}
