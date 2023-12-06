import NotFoundView from "@/app/_components/views/not-found-view";

import AuthProviders from "./providers";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <AuthProviders>
      <NotFoundView />
    </AuthProviders>
  );
}
