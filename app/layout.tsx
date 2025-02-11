import type { Metadata } from "next";
import "./globals.css";
import { inter, jakarta } from "@/styles/fonts";
import { Theme } from "@radix-ui/themes";
import { ToastContextProvider } from "@/context/ToastContext";
import { UserContextProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Supabase Compliance Checker",
  description:
    "Check your Supabase project for compliance with the latest security standards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className={`antialiased`} id="rootElement">
        <Theme accentColor="blue" grayColor="gray">
          <ToastContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </ToastContextProvider>
        </Theme>
      </body>
    </html>
  );
}
