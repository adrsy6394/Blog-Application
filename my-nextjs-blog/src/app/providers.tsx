"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "next-themes";
import { AuthInitializer } from "@/components/auth/AuthInitializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <AuthInitializer>
          {children}
        </AuthInitializer>
      </ThemeProvider>
    </Provider>
  );
}
