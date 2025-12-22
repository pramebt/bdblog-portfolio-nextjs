import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from '@/components/ui/session-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-thai",
  display: 'swap',
});

export const metadata = {
  title: "personal ",
  description: "Personal blog and project showcase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansThai.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
