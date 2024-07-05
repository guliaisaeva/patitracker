// 'use client';

// import { CustomerField, InvoiceForm } from '@/lib/definitions';
// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { Button } from '@/app/components/button';
// import Image from 'next/image';
// import { selectSelectedUser ,getUserByIdAsync } from '@/lib/features/users/usersSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '@/lib/store';
// import { useEffect } from 'react';
// export default function CustomerInfoForm({
// }: {
// }) {
//   const dispatch = useDispatch<AppDispatch>();
//   const selectedUser = useSelector(selectSelectedUser);
//   useEffect(() => {
//     if (selectedUser?.userProfileId) {
//       dispatch(getUserByIdAsync(selectedUser?.userProfileId));
//     }
//   }, [dispatch, selectedUser]);

//   return (
//     <form onSubmit={(e) => {
//       e.preventDefault();
//       // Handle form submission logic here
//     }}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Customer Name */}
//         <div className="mb-4">
//         {selectedUser?.profileImageUrl ? (
//             <div className="relative w-10 h-10 rounded-full overflow-hidden">
//               <Image
//                 src={selectedUser.profileImageUrl}
//                 layout="fill"
//                 objectFit="cover"
//                 alt={`${selectedUser.fullName}'s profile picture`}
//               />
//             </div>
//           ) : (
//             <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
//               <span className="text-gray-600 text-lg">{selectedUser?.fullName.charAt(0)}</span>
//             </div>
//           )}        </div>
//         <div className="mb-4">
//           <label htmlFor="userName" className="mb-2 block text-sm font-medium">
// Kullanıcı Ismi      </label>
//           <div className="relative">
//           <input
//                 id="userName"
//                 name="userName"
//                 type="text"
//                 value={selectedUser?.userName || ''}
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 aria-describedby="amount-error"
//                 readOnly
//                 />
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//           <div id="customer-error" aria-live="polite" aria-atomic="true">
//             {/* {state.errors?.customerId &&
//               state.errors.customerId.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))} */}
//           </div>
//         </div>

//         {/* Invoice Amount */}
//         <div className="mb-4">
//           <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
// Kullanıcı Tam İsmi          </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                  id="fullName"
//             name="fullName"
//                 type="text"
//                 value={selectedUser?.fullName || ''}
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 aria-describedby="amount-error"
//                 readOnly

//               />
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>
//           <div id="amount-error" aria-live="polite" aria-atomic="true">
//             {/* {state.errors?.amount &&
//               state.errors.amount.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))} */}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="mb-2 block text-sm font-medium">
// Kullanıcı E-postası          </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="email"
//                 name="email"
//                 type="text"
//                 defaultValue={selectedUser?.email || ''}
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 aria-describedby="amount-error"
//               />
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>
//           <div id="amount-error" aria-live="polite" aria-atomic="true">
//             {/* {state.errors?.amount &&
//               state.errors.amount.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))} */}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium">
// Kullanıcı Telefon Numarası        </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="phone"
//                 defaultValue={selectedUser?.phoneNumber}
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 aria-describedby="amount-error"
//               />
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>
//           <div id="amount-error" aria-live="polite" aria-atomic="true">
//             {/* {state.errors?.amount &&
//               state.errors.amount.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))} */}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="address" className="mb-2 block text-sm font-medium">
// Kullanıcı Adresi        </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="address"
//                 name="address"
//                 type="text"
//                 defaultValue={selectedUser?.address}
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 aria-describedby="amount-error"
//               />
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>
//           <div id="amount-error" aria-live="polite" aria-atomic="true">
//             {/* {state.errors?.amount &&
//               state.errors.amount.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))} */}
//           </div>
//         </div>
       
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/invoices"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Edit Customer</Button>
//       </div>
//     </form>
//   );
// }

"use client"
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import Image from 'next/image';
import { selectSelectedUser, getUserByIdAsync } from '@/lib/features/users/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { useEffect } from 'react';

export default function CustomerInfoForm({ userId }: { userId: number} ) {

  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(selectSelectedUser);

  useEffect(() => {
    if ({userId}) {
      dispatch(getUserByIdAsync(userId));
    }
  }, [dispatch, userId]);
  if (!selectedUser) {
    return <div>Loading...</div>; 
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here if needed
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Display Profile Image */}
        <div className="mb-4 flex items-center justify-center">
          {selectedUser?.profileImageUrl ? (
            <div className="relative w-20 h-20 rounded-full  overflow-hidden">
              <Image
                src={selectedUser.profileImageUrl}
                layout="fill"
                objectFit="contain"
                alt={`${selectedUser.fullName}'s profile picture`}
              />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              <span className="text-gray-600 text-lg">{selectedUser?.fullName.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Display User Information */}
        <div className="mb-4">
          <label htmlFor="userName" className="mb-2 block text-sm font-medium">
            Kullanıcı Ismi
          </label>
          <div className="relative">
            <input
              id="userName"
              name="userName"
              type="text"
              value={selectedUser?.userName || ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="userName-error"
              readOnly
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="userName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
            Kullanıcı Tam İsmi
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={selectedUser?.fullName || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="fullName-error"
                readOnly
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="fullName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Kullanıcı E-postası
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                defaultValue={selectedUser?.email || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                readOnly
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium">
            Kullanıcı Telefon Numarası
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="phone"
                defaultValue={selectedUser?.phoneNumber || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="phoneNumber-error"
                readOnly
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="phoneNumber-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Kullanıcı Adresi
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={selectedUser?.address || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="address-error"
                readOnly
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="address-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
