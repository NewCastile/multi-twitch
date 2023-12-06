import AuthProviders from "@/app/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProviders>{children}</AuthProviders>;
}
