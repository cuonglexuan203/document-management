import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./(main)/globals.css";
import ReduxProvider from "./(main)/_components/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Document Management",
  description: "A web app to manage documents for Goverment",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
