import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/components/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src="/logo/patitracker_logo.svg" alt='logo' width={138} height={162} />
      </div>
  );
}
