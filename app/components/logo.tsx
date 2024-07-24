import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/components/fonts";
import Image from "next/image";
import Logo from "@/public/logo/patitracker_logo.svg";

export default function TrackerLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src={Logo} alt="logo" width={138} height={162} />
    </div>
  );
}
