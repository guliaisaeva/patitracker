"use client"
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

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
          </html>
        </LanguageProvider>
      </I18nextProvider>
    </StoreProvider>
  );
}

