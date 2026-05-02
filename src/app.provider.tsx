import { QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';

import { createQueryClient } from '@shared/api/query-client';
import { ModalHost, ToastHost } from '@ui/drawer-service';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ModalHost />
      <ToastHost />
    </QueryClientProvider>
  );
}
