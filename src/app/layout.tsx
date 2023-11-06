import AuthProviders, { ChakraProviders, ReduxProvider } from "@/app/providers";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProviders>
          <ChakraProviders>
            <ReduxProvider>
              <main>{children}</main>
            </ReduxProvider>
          </ChakraProviders>
        </AuthProviders>
      </body>
    </html>
  );
}
