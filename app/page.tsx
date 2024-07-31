"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/styles/home.module.css";
import { lusitana } from "@/app/components/fonts";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import TrackerLogo from "./components/logo";
import { useEffect, useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import DogImage from "@/public/images/dog.png";

export default function Page() {
  const { t } = useTranslation();
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
  const [iconSize, setIconSize] = useState({ width: 48, height: 48 });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setLogoSize({ width: 50, height: 50 });
        setIconSize({
          width: 24,
          height: 24,
        });
      } else {
        setLogoSize({ width: 128, height: 128 });
        setIconSize({
          width: 48,
          height: 48,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div
        className="flex h-20 items-center justify-center rounded-lg  p-4 md:h-52"
        style={{
          backgroundColor: "rgba(249, 250, 251,0.2)",
        }}
      >
        <TrackerLogo
          style={{ width: "auto", height: "auto" }}
          width={logoSize?.width}
          height={logoSize?.height}
        />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div
          style={{
            backgroundColor: "rgba(249, 250, 251,0.2)",
          }}
          className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20"
        >
          <PetsIcon
            style={{
              width: `${iconSize.width}px`,
              height: `${iconSize.height}px`,
            }}
          />
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>{t("welcome")}</strong>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-400 md:text-base"
          >
            <span>{t("login.login")}</span>{" "}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src={DogImage}
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
            priority
            style={{
              width: "auto",
              height: "auto",
              border: "5px dotted #008e2a",
              borderRadius: "50%",
            }}
          />
          {/* <Image
            src="/dog.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          /> */}
        </div>
      </div>
    </main>
  );
}
