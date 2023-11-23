import { AppProvider } from "@/app/providers";

import WatchLayout from "./_components/shared/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <WatchLayout>{children}</WatchLayout>
    </AppProvider>
  );
}
