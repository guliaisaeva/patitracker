// 'use client';

// // import {
// //   UserGroupIcon,
// //   HomeIcon,
// //   DocumentDuplicateIcon,
// //   UserIcon,
// //   DeviceTabletIcon,DevicePhoneMobileIcon,
// //   ChevronDownIcon
// // } from '@heroicons/react/24/outline';
// import {
//   AdminPanelSettings,
//   DeviceHub,
//   Group,
//   Home,
//   Pets,
//   SimCard,
//   ArrowDropDown,
//   Grain,
//   Apps,
//   Campaign
// } from '@mui/icons-material';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';
// import { useState } from 'react';

// // Map of links to display in the side navigation.
// // Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: 'Panel', href: '/dashboard', icon: Home },
//   {
//     name: 'Yöneticiler',
//     href: '/dashboard/managers',
//     icon:   AdminPanelSettings
//     ,
//   },
//   { name: 'Kullanıcılar', href: '/dashboard/customers', icon: Group },
//   { name: 'Cihazlar', href: '/dashboard/devices', icon: DeviceHub},
//   { name: 'Sim Kartlar', href: '/dashboard/simcards', icon: SimCard },
//   {
//     name: 'Evcil Hayvan Yönetimi ',
//     href: '#',
//     icon: Pets,
//     submenu: [
//       { name: 'Evcil Hayvan Türü', href: '/dashboard/pets/petType',icon: Grain},
//       { name: 'Evcil Hayvan Cinsi', href: '/dashboard/pets/petBreed',icon:Apps },
//     ],
//   },
//   { name: 'Duyurular', href: '/dashboard/announcements', icon: Campaign },

// ];

// export default function NavLinks() {
//   const pathname = usePathname();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;

//         if (link.submenu) {
//           return (
//             <div key={link.name} className="relative flex-grow">
//               <button
//                 onClick={toggleDropdown}
//                 className={clsx(
//                   'flex items-center justify-start gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3 w-full', // Adjusted width here
//                   {
//                     'bg-sky-100 text-blue-600': link.submenu.some(submenuItem => pathname.startsWith(submenuItem.href)), // Check if any submenu item is active
//                   },
//                 )}
//               >
//                 <div  className="flex w-full justify-between">
//                 <div className="flex items-center gap-2">
//                   <LinkIcon className="w-6" />
//                   <p className="hidden md:block">{link.name}</p>
//                 </div>
//                 <ArrowDropDown className="w-5 ml-2 -mr-1" />
//                 </div>
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute mt-1 w-full origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   <div className="py-1">
//                     {link.submenu.map((submenuItem) => (
//                       <Link
//                         key={submenuItem.name}
//                         href={submenuItem.href}
//                         passHref
//                         className={clsx(
//                           'flex items-center justify-start gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3 w-full', // Adjusted width here
//                           {
//                             'bg-sky-100 text-blue-600': pathname === submenuItem.href,
//                           },
//                         )}                  >
//                       {submenuItem.icon && <submenuItem.icon className="w-6" />}

//                         {submenuItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         }

//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={clsx(
//               'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
//               {
//                 'bg-sky-100 text-blue-600': pathname === link.href,
//               },
//             )}
//             // className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
//           >
//             <LinkIcon className="w-6" />
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }

"use client";

import {
  AdminPanelSettings,
  DeviceHub,
  Group,
  Home,
  Pets,
  SimCard,
  ArrowDropDown,
  Grain,
  Apps,
  Campaign,
  QuestionMark,
} from "@mui/icons-material";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const links = [
  { name: "Panel", href: "/dashboard", icon: Home },
  {
    name: "Yöneticiler",
    href: "/dashboard/managers",
    icon: AdminPanelSettings,
  },
  { name: "Kullanıcılar", href: "/dashboard/customers", icon: Group },
  { name: "Cihazlar", href: "/dashboard/devices", icon: DeviceHub },
  { name: "Sim Kartlar", href: "/dashboard/simcards", icon: SimCard },
  {
    name: "Evcil Hayvan Yönetimi ",
    href: "#",
    icon: Pets,
    submenu: [
      {
        name: "Evcil Hayvan Türü",
        href: "/dashboard/pets/petType",
        icon: Grain,
      },
      {
        name: "Evcil Hayvan Cinsi",
        href: "/dashboard/pets/petBreed",
        icon: Apps,
      },
    ],
  },
  { name: "Duyurular", href: "/dashboard/announcements", icon: Campaign },
  { name: "Sık Sorulan Sorular", href: "/dashboard/faqs", icon: QuestionMark },
];

export default function NavLinks() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name: any) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        if (link.submenu) {
          return (
            <div key={link.name} className="relative">
              <button
                onClick={() => toggleDropdown(link.name)}
                className={clsx(
                  "flex items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 w-full",
                  {
                    "bg-sky-100 text-blue-600": link.submenu.some(
                      (submenuItem) => pathname.startsWith(submenuItem.href)
                    ), // Check if any submenu item is active
                  }
                )}
              >
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-6" />
                  <p className="hidden md:block">{link.name}</p>
                </div>
                <ArrowDropDown className="w-5 ml-2 -mr-1" />
              </button>

              {openDropdown === link.name && (
                <div className="relative mt-1 w-full bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {link.submenu.map((submenuItem) => (
                      <Link
                        key={submenuItem.name}
                        href={submenuItem.href}
                        passHref
                        className={clsx(
                          "flex items-center justify-start gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 w-full",
                          {
                            "bg-sky-100 text-blue-600":
                              pathname === submenuItem.href,
                          }
                        )}
                      >
                        {submenuItem.icon && (
                          <submenuItem.icon className="w-6" />
                        )}
                        {submenuItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 w-full md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
