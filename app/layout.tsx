import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Penny Pilot",
  icons: [
    { rel: "icon", url: "/assets/favicon/favicon.ico" },
    { rel: "icon", sizes: "16x16", url: "/assets/favicon-16x16.png" },
    { rel: "icon", sizes: "32x32", url: "/assets/favicon-32x32.png" },
    { rel: "icon", url: "/assets/android-chrome-192x192.png" },
    { rel: "icon", url: "/assets/android-chrome-512x512.png" },
    { rel: "apple-touch-icon", url: "/assets/apple-touch-icon.png" },
  ],
  manifest: "/assets/site.webmanifest",
  description:
    "Penny Pilot is your personal financial navigator, designed to effortlessly track your income and expenses. Whether you're an individual striving for financial freedom or an organization aiming to optimize its budget, Penny Pilot is your go-to solution.",
  openGraph: {
    type: "website",
    description:
      "Penny Pilot is your personal financial navigator, designed to effortlessly track your income and expenses. Whether you're an individual striving for financial freedom or an organization aiming to optimize its budget, Penny Pilot is your go-to solution.",
    title: "Penny Pilot",
  },
  twitter: {
    description:
      "Penny Pilot is your personal financial navigator, designed to effortlessly track your income and expenses. Whether you're an individual striving for financial freedom or an organization aiming to optimize its budget, Penny Pilot is your go-to solution.",
    title: "Penny Pilot",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen w-screen antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
