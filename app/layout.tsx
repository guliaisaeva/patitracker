import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";
import { inter } from "@/app/components/fonts";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { LanguageProvider } from "@/app/LanguageProvider";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <LanguageProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
      </LanguageProvider>
    </StoreProvider>
  );
}
