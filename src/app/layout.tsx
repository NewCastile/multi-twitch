import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
