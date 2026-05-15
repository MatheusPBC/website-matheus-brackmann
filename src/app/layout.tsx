import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/lora/400.css";
import "@/styles/global.css";
import { type ReactNode } from "react";
import { ThemeScript } from "@/components/ThemeScript";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
