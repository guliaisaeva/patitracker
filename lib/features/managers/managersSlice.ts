import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';


export const getManagers =  async (): Promise<Managers[]> =>{
    const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MjA0MDE5LCJleHAiOjE3NDk3NDAwMTksImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.GMxVmEzjHTCO9O2fiz11MbIVHknFD_-ghPw2ghE_yS8';

    const response = await fetch('http://185.46.55.50:50235/api/v1/SuperAdmin/GetAllAdmin', {
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

}

export const getManagersAsync = createAsyncThunk('managers/getManagers', async () => {
    const managersData = await getManagers();
    return managersData;
  });


  export const deleteManagerAsync = createAsyncThunk(
    'managers/deleteManager',
    async (adminId: number | string, { rejectWithValue }) => {
      const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MjA0MDE5LCJleHAiOjE3NDk3NDAwMTksImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.GMxVmEzjHTCO9O2fiz11MbIVHknFD_-ghPw2ghE_yS8';
  
      try {
        const response = await fetch(`http://185.46.55.50:50235/api/v1/SuperAdmin/DeleteAdmin?adminId=${adminId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to delete manager: ${response.statusText} - ${errorDetail}`);
        }
  
        // Optionally, return some data if needed upon successful deletion
        // const data = await response.json();
        // return data.data;
        return adminId;
  
      } catch (error:any) {
        // Use rejectWithValue to propagate the error back to the action creator
        return rejectWithValue(error.message);
      }
    }
  );
  interface Managers {
    userProfileId: number | string;
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