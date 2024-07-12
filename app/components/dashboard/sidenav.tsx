import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import AcmeLogo from '@/app/components/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
    <div className="w-32 h-full text-white flex items-center justify-center md:w-40">
    <Image src="/logo/patitracker_logo.png"              
 alt='logo' width={100 * (138 / 162)} height={100}  
 className="w-16 h-16 md:w-24 md:h-24"/>

        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            // await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>


    </div>
  );
}
