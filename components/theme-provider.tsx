"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({
  children,
  ...props
}: ProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="portfolio-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;

