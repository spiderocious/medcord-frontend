import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppProvider } from '@app/app.provider';

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

export function AppEntrypoint() {
  return (
    <AppProvider>
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </AppProvider>
  );
}
