import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern Notes",
  description: "Create, edit, and manage notes with a modern, Ocean Professional UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="app-shell">
        {children}
        <div id="toast-root" />
      </body>
    </html>
  );
}
