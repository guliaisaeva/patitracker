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

export const getUserById = async (userId: number) => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';

  const response = await fetch(`http://185.46.55.50:50235/api/v1/User/GetUser?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Failed to fetch user: ${response.statusText} - ${errorDetail}`);
  }

  const data = await response.json();
  return data.data;
};
export const getUserByIdAsync = createAsyncThunk(
  'users/getUserById',
  async (userId: number) => {
    const userData = await getUserById(userId);
    return userData;
  }
);

export const searchUsers = async (searchWord: string) => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';

  const response = await fetch('http://185.46.55.50:50235/api/v1/User/SearchUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ searchWord }),
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Failed to search users: ${response.statusText} - ${errorDetail}`);
  }

  const data = await response.json();
  return data.data;
};

export const searchUsersAsync = createAsyncThunk(
  'users/searchUsers',
  async (searchWord: string) => {
    const searchData = await searchUsers(searchWord);
    return searchData;
  }
);

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
  selectedUser: User | null;
  searchResults: User[]; // Add searchResults state
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Add searchStatus state
  searchError: string | null; // Add searchError state
}

const initialState: UserSliceState = {
  users: [],
  status: 'idle',
  error: null,
  selectedUser: null,
  searchResults: [], // Initialize searchResults state
  searchStatus: 'idle', // Initialize searchStatus state
  searchError: null, // Initialize searchError state
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },  },
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
      })
      .addCase(getUserByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(getUserByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(searchUsersAsync.pending, (state) => {
        state.searchStatus = 'loading';
        state.searchResults = [];
        state.searchError = null;

      })
      .addCase(searchUsersAsync.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchUsersAsync.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message ?? 'Unknown error';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectSelectedUser = (state: RootState) => state.users.selectedUser; 
export const selectSearchResults = (state: RootState) => state.users.searchResults; // Selector for searchResults
export const selectSearchStatus = (state: RootState) => state.users.searchStatus; // Selector for searchStatus
export const selectSearchError = (state: RootState) => state.users.searchError; // Selector for searchError

export const { clearSelectedUser } = userSlice.actions;


export default userSlice.reducer;