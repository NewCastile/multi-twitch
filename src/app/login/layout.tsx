import AuthProviders, { ChakraProviders } from "@/app/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProviders>
      <ChakraProviders>{children}</ChakraProviders>
    </AuthProviders>
  );
}
