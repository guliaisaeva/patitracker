import { lusitana } from "@/app/components/fonts";
import Image from "next/image";
import Logo from "@/public/logo/patitracker_logo.png";

interface TrackerLogoProps {
  className?: string;
  width?: number;
  height?: number;
}
export default function TrackerLogo({
  width,
  height,
  className,
}: TrackerLogoProps) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src={Logo}
        alt="logo"
        className={className}
        width={width}
        height={height}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </div>
  );
}
