// // "use client"
// // import { useEffect } from 'react';
// // import Image from 'next/image';
// // import { lusitana } from '@/app/components/fonts';
// // import Search from '@/app/components/search';
// // import {
// //   CustomersTableType,
// //   FormattedCustomersTable,
// // } from '@/lib/definitions';
// // import { selectUsers,selectUsersStatus, selectUsersError, getUsersAsync  } from '@/lib/features/users/usersSlice';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { AppDispatch, RootState } from '@/lib/store';


// // export default async function CustomersTable({
// //   customers,
// // }: {
// //   customers: FormattedCustomersTable[];
// // }) {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const users = useSelector(selectUsers);
// //   const status = useSelector(selectUsersStatus);
// //   const error = useSelector(selectUsersError);

// //   useEffect(() => {
// //     dispatch(getUsersAsync());
// //   }, [dispatch]);

// //   if (status === 'loading') {
// //     return <div>Loading managers...</div>;
// //   }

// //   if (status === 'failed') {
// //     return <div>Error loading managers:{error}</div>;
// //   }

// //   return (
// //     <div className="w-full">
// //       <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
// //         Customers
// //       </h1>
// //       <Search placeholder="Search customers..." />
// //       <div className="mt-6 flow-root">
// //         <div className="overflow-x-auto">
// //           <div className="inline-block min-w-full align-middle">
// //             <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
// //               <div className="md:hidden">
// //                 {users?.map((user) => (
// //                   <div
// //                     key={user.userProfileId}
// //                     className="mb-2 w-full rounded-md bg-white p-4"
// //                   >
// //                     <div className="flex items-center justify-between border-b pb-4">
// //                       <div>
// //                         <div className="mb-2 flex items-center">
// //                           <div className="flex items-center gap-3">
// //                           {user.profileImageUrl ? (
// //     <Image
// //       src={user.profileImageUrl}
// //       className="mr-2 rounded-full"
// //       width={28}
// //       height={28}
// //       alt={`${user.fullName}'s profile picture`}
// //     />
// //   ) : (
// //     <img
// //       src="https://via.placeholder.com/28" // Placeholder image URL
// //       className="mr-2 rounded-full"
// //       width={28}
// //       height={28}
// //       alt={`${user.fullName}'s profile picture`}
// //     />
// //   )}   
// //                             <p>{user.userName}</p>
// //                           </div>
// //                         </div>
// //                         <p className="text-sm text-gray-500">
// //                           {user.fullName}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <div className="flex w-full items-center justify-between border-b py-5">
// //                       <div className="flex w-1/2 flex-col">
// //                         <p className="text-xs">Email</p>
// //                         <p className="font-medium">{user.email}</p>
// //                       </div>
// //                       <div className="flex w-1/2 flex-col">
// //                         <p className="text-xs">Phone Number</p>
// //                         <p className="font-medium">{user.phoneNumber}</p>
// //                       </div>
// //                     </div>
// //                     <div className="pt-4 text-sm">
// //                       <p>{user.address} invoices</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //               <table className="hidden min-w-full rounded-md text-gray-900 md:table">
// //                 <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
// //                   <tr>
// //                     <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
// //                       Kullanıcı Resmi ve İsmi
// //                     </th>
// //                     <th scope="col" className="px-3 py-5 font-medium">
// // Tam İsmi                    </th>
// //                     <th scope="col" className="px-3 py-5 font-medium">
// // E-posta Adresi                    </th>
// //                     <th scope="col" className="px-3 py-5 font-medium">
// // Telefon Numarası                    </th>
// //                     <th scope="col" className="px-4 py-5 font-medium">
// // Adresi                    </th>
// //                   </tr>
// //                 </thead>

// //                 <tbody className="divide-y divide-gray-200 text-gray-900">
// //                   {users.map((user) => (
// //                     <tr key={user.userProfileId} className="group">
// //                       <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
// //                         <div className="flex items-center gap-3">
// //                         {user.profileImageUrl ? (
// //     <Image
// //       src={user.profileImageUrl}
// //       className="mr-2 rounded-full"
// //       width={28}
// //       height={28}
// //       alt={`${user.fullName}'s profile picture`}
// //     />
// //   ) : (
// //     <img
// //       src="https://via.placeholder.com/28" // Placeholder image URL
// //       className="mr-2 rounded-full"
// //       width={28}
// //       height={28}
// //       alt={`${user.fullName}'s profile picture`}
// //     />
// //   )}   
// //                           <p>{user.userName}</p>
// //                         </div>
// //                       </td>
// //                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
// //                         {user.fullName}

// //                       </td>
// //                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
// //                       {user.email}
// //                       </td>
// //                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
// //                         {user.phoneNumber}
// //                       </td>
// //                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
// //                         {user.address}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client"
// import { useEffect } from 'react';
// import Image from 'next/image';
// import { lusitana } from '@/app/components/fonts';
// import Search from '@/app/components/search';
// import { FormattedCustomersTable } from '@/lib/definitions';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '@/lib/store';
// import { getUsersAsync, selectUsers, selectUsersStatus, selectUsersError } from '@/lib/features/users/usersSlice';
// import { UserInfo } from './buttons';
// import { selectSearchResults } from '@/lib/features/users/usersSlice';

// interface CustomersTableProps {
//   customers: FormattedCustomersTable[];
// }

// const CustomersTable = ({ customers }: CustomersTableProps) => {
//   const dispatch = useDispatch<AppDispatch>();
// const users = useSelector(selectUsers);
//   const status = useSelector(selectUsersStatus);
//   const error = useSelector(selectUsersError);
//   const searchResults = useSelector(selectSearchResults);


//   useEffect(() => {
//     dispatch(getUsersAsync());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div>Loading managers...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading managers: {error}</div>;
//   }
//   const displayUsers = searchResults.length > 0 ? searchResults : users;

//   return (
//     <div className="w-full">
//       <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
//         Customers
//       </h1>
//       <Search placeholder="Search customers..." />
//       <div className="mt-6 flow-root">
//         <div className="overflow-x-auto">
//           <div className="inline-block min-w-full align-middle">
//             <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
//               <div className="md:hidden">
//                 {displayUsers?.map((user) => (
//                   <div
//                     key={user.userProfileId}
//                     className="mb-2 w-full rounded-md bg-white p-4"
//                   >
//                     <div className="flex items-center justify-between border-b pb-4">
//                       <div>
//                         <div className="mb-2 flex items-center">
//                           <div className="flex items-center gap-3">
//                             {user.profileImageUrl ? (
//                               <Image
//                                 src={user.profileImageUrl}
//                                 className="mr-2 rounded-full"
//                                 width={28}
//                                 height={28}
//                                 alt={`${user.fullName}'s profile picture`}
//                               />
//                             ) : (
//                               <img
//                                 src="https://via.placeholder.com/28"
//                                 className="mr-2 rounded-full"
//                                 width={28}
//                                 height={28}
//                                 alt={`${user.fullName}'s profile picture`}
//                               />
//                             )}
//                             <p>{user.userName}</p>
//                           </div>
//                         </div>
//                         <p className="text-sm text-gray-500">
//                           {user.fullName}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex w-full items-center justify-between border-b py-5">
//                       <div className="flex w-1/2 flex-col">
//                         <p className="text-xs">Email</p>
//                         <p className="font-medium">{user.email}</p>
//                       </div>
//                       <div className="flex w-1/2 flex-col">
//                         <p className="text-xs">Phone Number</p>
//                         <p className="font-medium">{user.phoneNumber}</p>
//                       </div>
//                     </div>
//                     <div className="pt-4 text-sm">
//                       <p>{user.address} invoices</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <table className="hidden min-w-full rounded-md text-gray-900 md:table">
//                 <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
//                   <tr>
//                     <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
//                       Kullanıcı Resmi ve İsmi
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       Tam İsmi
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       E-posta Adresi
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       Telefon Numarası
//                     </th>
//                     <th scope="col" className="px-4 py-5 font-medium">
//                       Adresi
//                     </th>
//                     <th scope="col" className="px-4 py-5 font-medium">
//                       Detay
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 text-gray-900">
//                   {displayUsers.map((user) => (
//                     <tr key={user.userProfileId} className="group">
//                       <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
//                         <div className="flex items-center gap-3">
//                           {user.profileImageUrl ? (
//                             <Image
//                               src={user.profileImageUrl}
//                               className="mr-2 rounded-full"
//                               width={28}
//                               height={28}
//                               alt={`${user.fullName}'s profile picture`}
//                             />
//                           ) : (
//                             <img
//                               src="https://via.placeholder.com/28"
//                               className="mr-2 rounded-full"
//                               width={28}
//                               height={28}
//                               alt={`${user.fullName}'s profile picture`}
//                             />
//                           )}
//                           <p>{user.userName}</p>
//                         </div>
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {user.fullName}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {user.email}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {user.phoneNumber}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
//                         {user.address}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
//                     <div className="flex justify-end gap-3">
//                     <UserInfo id={String(user.userProfileId)} />
//                     </div>
//                   </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomersTable;




 "use client"
import { useEffect } from 'react';
import Image from 'next/image';
import { lusitana } from '@/app/components/fonts';
import Search from '@/app/components/search';
import { FormattedCustomersTable } from '@/lib/definitions';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { getUsersAsync, selectUsers, selectUsersStatus, selectUsersError, selectSearchResults, searchUsersAsync } from '@/lib/features/users/usersSlice';
import { UserInfo } from './buttons';

interface CustomersTableProps {
  customers: FormattedCustomersTable[];
}

const CustomersTable = ({ customers }: CustomersTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers); // Select all users from Redux store
  const status = useSelector(selectUsersStatus); // Select status of user fetching
  const error = useSelector(selectUsersError); // Select error status, if any
  const searchResults = useSelector(selectSearchResults); // Select search results from Redux store

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);


  // Display users based on search results if available, otherwise display all users
  const displayUsers = searchResults.length > 0 ? searchResults : users;

  if (status === 'loading') {
    return <div>Loading managers...</div>; // Show loading indicator while fetching users
  }

  if (status === 'failed') {
    return <div>Error loading managers: {error}</div>; // Show error message if user fetching fails
  }

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..."  /> {/* Search component to filter users */}
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {displayUsers.map((user) => ( // Map through displayUsers to render user details
                  <div
                    key={user.userProfileId}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            {user.profileImageUrl ? ( // Render profile image if available
                              <Image
                                src={user.profileImageUrl}
                                className="mr-2 rounded-full"
                                width={28}
                                height={28}
                                alt={`${user.fullName}'s profile picture`}
                              />
                            ) : (
                              <img
                                src="https://via.placeholder.com/28"
                                className="mr-2 rounded-full"
                                width={28}
                                height={28}
                                alt={`${user.fullName}'s profile picture`}
                              />
                            )}
                            <p>{user.userName}</p> {/* Render username */}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {user.fullName} {/* Render full name */}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Email</p>
                        <p className="font-medium">{user.email}</p> {/* Render email */}
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Phone Number</p>
                        <p className="font-medium">{user.phoneNumber}</p> {/* Render phone number */}
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{user.address} invoices</p> {/* Render address */}
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Kullanıcı Resmi ve İsmi {/* User profile image and name */}
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Tam İsmi {/* Full name */}
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      E-posta Adresi {/* Email address */}
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Telefon Numarası {/* Phone number */}
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Adresi {/* Address */}
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Detay {/* Details */}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {displayUsers.map((user) => ( // Map through displayUsers to render table rows
                    <tr key={user.userProfileId} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          {user.profileImageUrl ? ( // Render profile image if available
                            <Image
                              src={user.profileImageUrl}
                              className="mr-2 rounded-full"
                              width={28}
                              height={28}
                              alt={`${user.fullName}'s profile picture`}
                            />
                          ) : (
                            <img
                              src="https://via.placeholder.com/28"
                              className="mr-2 rounded-full"
                              width={28}
                              height={28}
                              alt={`${user.fullName}'s profile picture`}
                            />
                          )}
                          <p>{user.userName}</p> {/* Render username */}
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.fullName} {/* Render full name */}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.email} {/* Render email */}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.phoneNumber} {/* Render phone number */}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {user.address} {/* Render address */}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        <div className="flex justify-end gap-3">
                          <UserInfo id={String(user.userProfileId)} /> {/* Component for user details */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
