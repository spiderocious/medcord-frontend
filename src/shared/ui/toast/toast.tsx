import { type ReactNode } from 'react';

/**
 * Legacy `<ToastProvider>` shim. Earlier versions of the app mounted this
 * provider and exposed a context-driven `useToast()`. Toast rendering is now
 * owned by `<ToastHost>` from `@ui/drawer-service`, mounted in the global
 * app provider — this component is a pass-through so older composition
 * sites don't need to be edited yet.
 *
 * Prefer `DrawerService.toast(...)` from `@ui/drawer-service` for new code.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
