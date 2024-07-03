"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';

import { selectUsers,selectUsersStatus, selectUsersError, getUsersAsync  } from '@/lib/features/users/usersSlice';
export default function VerifyPage() {
  
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // Dispatch the getUsersAsync thunk action creator directly
    dispatch(getUsersAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading users...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading users: {error}</div>;
  }

  return (
    <>
      <h1>Verify page</h1>
      <p>
        This page is intended to verify that Redux state is persisted across
        page navigations.
      </p>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user: { userProfileId: React.Key | null | undefined; userName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;fullName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
          <div>
<li key={user.userProfileId}>
{user.userName} </li>  
<li  key={user.userProfileId}>
{user.fullName} </li>
          </div>  
          
          ))}
        </ul>      )}
    </>
  );
}
