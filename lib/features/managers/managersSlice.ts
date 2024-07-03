import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';


export const getManagers =  async (): Promise<Managers[]> =>{
    const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MTAwNDg4LCJleHAiOjE3NDk2MzY0ODgsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.BP7BpHkxIG1jLLy3BRdDxOMuYbDYor3imM9AQmXyDD4';

    const response = await fetch('http://185.46.55.50:50235/api/v1/SuperAdmin/GetAllAdmin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Failed to fetch users: ${response.statusText} - ${errorDetail}`);
  }
  return await response.json();

}

export const getManagersAsync = createAsyncThunk('managers/getManagers', async () => {
    const managersData = await getManagers();
    return managersData;
  });

  interface Managers {
    userProfileId: number;
    profileImageUrl: string | null;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
  }

  interface  ManagerSliceState {
    managers: Managers[]; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  const initialState: ManagerSliceState = {
    managers: [],
    status: 'idle',
    error: null,
  };

  export const managerSlice = createSlice({
    name: 'managers',
    initialState,
    reducers: {
      // Additional reducers can be added here if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getManagersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getManagersAsync.fulfilled, (state, action: PayloadAction<Managers[]>) => {
            state.status = 'succeeded';
            state.managers = action.payload;
          })
        .addCase(getManagersAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Unknown error';
        });
    },
  });
  
  export const selectManagers= (state: RootState) => state.managers.managers;
  export const selectManagersStatus = (state: RootState) => state.managers.status;
  export const selectManagersError = (state: RootState) => state.managers.error;
  
  export default managerSlice.reducer;