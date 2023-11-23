import NotFoundView from "@/app/_components/views/not-found-view";

import AuthProviders, { ChakraProviders } from "./providers";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <ChakraProviders>
      <AuthProviders>
        <NotFoundView />
      </AuthProviders>
    </ChakraProviders>
  );
}
