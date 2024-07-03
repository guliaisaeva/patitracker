import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export const getUsers = async () => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MTAwNDg4LCJleHAiOjE3NDk2MzY0ODgsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.BP7BpHkxIG1jLLy3BRdDxOMuYbDYor3imM9AQmXyDD4';

  const response = await fetch('http://185.46.55.50:50235/api/v1/User/GetAllUser', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Failed to fetch users: ${response.statusText} - ${errorDetail}`);
  }

  const data = await response.json();
  return data.data;
};

export const getUsersAsync = createAsyncThunk('users/getUsers', async () => {
  const usersData = await getUsers();
  return usersData;
});
interface User {
    userProfileId: number;
    profileImageUrl: string | null;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
  }

interface UserSliceState {
  users: User[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserSliceState = {
  users: [],
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

export default userSlice.reducer;