import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppProvider } from '@app/app.provider';

function RouteFallback() {
  return (
    <div className="text-muted-foreground flex min-h-screen items-center justify-center text-sm">
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
