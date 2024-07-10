
//  "use client"
// import { useEffect } from 'react';
// import Image from 'next/image';
// import { lusitana } from '@/app/components/fonts';
// import Search from '@/app/components/search';
// import { FormattedCustomersTable } from '@/lib/definitions';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch} from '@/lib/store';
// import { getUsersAsync, selectUsers, selectUsersStatus, selectUsersError, selectSearchResults, searchUsersAsync } from '@/lib/features/users/usersSlice';
// import { UserInfo } from './buttons';
// import NoResultsMessage from '../noResultMessage';

// const ITEMS_PER_PAGE = 10;

// interface CustomersTableProps {
//   customers: FormattedCustomersTable[];
// }


// export default async function CustomerTable({
//   query,
//   currentPage,
// }: {
//   query: string;
//   currentPage: number;
// }) {  const dispatch = useDispatch<AppDispatch>();
//   const users = useSelector(selectUsers); 
//   const status = useSelector(selectUsersStatus); 
//   const error = useSelector(selectUsersError); 
//   const searchResults = useSelector(selectSearchResults); 

//   useEffect(() => {
//     dispatch(getUsersAsync());
//   }, [dispatch]);


//   // Display users based on search results if available, otherwise display all users
//   const filteredUsers = users?.filter(user =>
//     user.userName.toLowerCase().includes(query.toLowerCase()) ||
//     user.fullName.toLowerCase().includes(query.toLowerCase()) ||
//     user.email.toLowerCase().includes(query.toLowerCase()) ||
//     user.address.toLowerCase().includes(query.toLowerCase()) 
//   );

//     // Calculate pagination offsets
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const usersToShow = filteredUsers?.slice(startIndex, endIndex);
  
  
//   if (status === 'loading') {
//     return <div>Loading managers...</div>; // Show loading indicator while fetching users
//   }

//   if (status === 'failed') {
//     return <div>Error loading managers: {error}</div>; // Show error message if user fetching fails
//   }
//   if (!usersToShow ||usersToShow?.length === 0) {
//     return <NoResultsMessage />;

//   }

//   return (
//       <div className="mt-6 flow-root">
//         <div className="overflow-x-auto">
//           <div className="inline-block min-w-full align-middle">
//             <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
//               <div className="md:hidden">
//                 {usersToShow.map((user) => ( // Map through displayUsers to render user details
//                   <div
//                     key={user.userProfileId}
//                     className="mb-2 w-full rounded-md bg-white p-4"
//                   >
//                     <div className="flex items-center justify-between border-b pb-4">
//                       <div>
//                         <div className="mb-2 flex items-center">
//                           <div className="flex items-center gap-3">
//                             {user.profileImageUrl ? ( // Render profile image if available
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
//                             <p>{user.userName}</p> {/* Render username */}
//                           </div>
//                         </div>
//                         <p className="text-sm text-gray-500">
//                           {user.fullName} {/* Render full name */}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex w-full items-center justify-between border-b py-5">
//                       <div className="flex w-1/2 flex-col">
//                         <p className="text-xs">Email</p>
//                         <p className="font-medium">{user.email}</p> {/* Render email */}
//                       </div>
//                       <div className="flex w-1/2 flex-col">
//                         <p className="text-xs">Phone Number</p>
//                         <p className="font-medium">{user.phoneNumber}</p> {/* Render phone number */}
//                       </div>
//                     </div>
//                     <div className="pt-4 text-sm">

//                     </div>
            
//                     <div className="flex justify-between gap-3">
//                     <p>{user.address} </p> {/* Render address */}

//                           <UserInfo id={String(user.userProfileId)} /> {/* Component for user details */}
//                         </div>
//                   </div>
//                 ))}
//               </div>
//               <table className="hidden min-w-full rounded-md text-gray-900 md:table">
//                 <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
//                   <tr>
//                     <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
//                       Kullanıcı Resmi ve İsmi {/* User profile image and name */}
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       Tam İsmi {/* Full name */}
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       E-posta Adresi {/* Email address */}
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       Telefon Numarası {/* Phone number */}
//                     </th>
//                     <th scope="col" className="px-4 py-5 font-medium">
//                       Adresi {/* Address */}
//                     </th>
//                     <th scope="col" className="px-4 py-5 font-medium">
//                       Detay {/* Details */}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 text-gray-900">
//                   {usersToShow.map((user) => ( // Map through displayUsers to render table rows
//                     <tr key={user.userProfileId} className="group">
//                       <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
//                         <div className="flex items-center gap-3">
//                           {user.profileImageUrl ? ( // Render profile image if available
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
//                           <p>{user.userName}</p> {/* Render username */}
//                         </div>
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {user.fullName} {/* Render full name */}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {user.email} {/* Render email */}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {user.phoneNumber} {/* Render phone number */}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
//                         {user.address} {/* Render address */}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
//                         <div className="flex justify-end gap-3">
//                           <UserInfo id={String(user.userProfileId)} /> {/* Component for user details */}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { getUsersAsync, selectUsers, selectUsersStatus, selectUsersError } from '@/lib/features/users/usersSlice';
import { UserInfo } from './buttons';
import NoResultsMessage from '../noResultMessage';

const ITEMS_PER_PAGE = 10;

interface CustomerTableProps {
  query: string;
  currentPage: number;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ query, currentPage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);
  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(query.toLowerCase()) ||
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.address.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredUsers);
    }
  }, [users, query]);

  // Calculate pagination offsets
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const usersToShow = searchResults?.slice(startIndex, endIndex);

  if (status === 'loading') {
    return <div>Loading managers...</div>; // Show loading indicator while fetching users
  }

  if (status === 'failed') {
    return <div>Error loading managers: {error}</div>; // Show error message if user fetching fails
  }

  if (!usersToShow || usersToShow.length === 0) {
    return <NoResultsMessage />;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {usersToShow.map((user) => (
                <div key={user.userProfileId} className="mb-2 w-full rounded-md bg-white p-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          {user.profileImageUrl ? (
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
                          <p>{user.userName}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{user.fullName}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Phone Number</p>
                      <p className="font-medium">{user.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">{user.address}</div>
                  <div className="flex justify-between gap-3">
                    <UserInfo id={String(user.userProfileId)} />
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Kullanıcı Resmi ve İsmi
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Tam İsmi
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    E-posta Adresi
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Telefon Numarası
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Adresi
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Detay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-900">
                {usersToShow.map((user) => (
                  <tr key={user.userProfileId} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        {user.profileImageUrl ? (
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
                        <p>{user.userName}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {user.fullName}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {user.phoneNumber}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {user.address}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      <div className="flex justify-end gap-3">
                        <UserInfo id={String(user.userProfileId)} />
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
  );
};

export default CustomerTable;
