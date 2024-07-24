"use client";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { inter } from "@/app/components/fonts";

import "./styles/globals.css";
import { LanguageProvider } from "@/app/LanguageProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

interface Props {
  readonly children: ReactNode;
}
import React, { useEffect, useState } from "react";

const SafeHydrate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default function RootLayout({ children }: Props) {
  return (
    <SafeHydrate>
      <StoreProvider>
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>
            <html lang="en">
              <body className={`${inter.className} antialiased`}>
                {children}
              </body>
            </html>
          </LanguageProvider>
        </I18nextProvider>
      </StoreProvider>
    </SafeHydrate>
  );
}
