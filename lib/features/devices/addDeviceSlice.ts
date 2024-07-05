import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

  export const addDeviceAsync = createAsyncThunk(
    'devices/addDevice',
    async (deviceToAdd: DeviceToAdd, { rejectWithValue }) => {
        const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M'; // Replace with your actual token
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Device/AddDevice', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify([deviceToAdd]),
        });
  
        if (!response.ok) {
            const errorDetail = await response.json();
            console.error('Failed to add device:', errorDetail);
            throw new Error(`Failed to add device: ${response.statusText}`);
        }
  
        const data = await response.json();
        if (!data || !data.data || !data.data[0]) {
          throw new Error('Invalid response format');
        }
  
        console.log('Device added successfully:', data);
        return data.data[0];   } catch (error:any) {
        console.error('Error adding device:', error);
        throw error;      }
    }
  );


export interface DeviceToAdd {
    deviceNumber: string;
    deviceModel: string;
    isDeviceToSim: boolean;
    simCardId: string;
  }
  

  interface  AddDeviceSliceState {
    devicesAdd: DeviceToAdd[]; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  const initialState: AddDeviceSliceState = {
    devicesAdd: [],
    status: 'idle',
    error: null,
  };

  export const addDeviceSlice = createSlice({
    name: 'devicesAdd',
    initialState,
    reducers: {
      // Additional reducers can be added here if needed
    },
    extraReducers: (builder) => {
      builder
      
        .addCase(addDeviceAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(addDeviceAsync.fulfilled, (state, action: PayloadAction<DeviceToAdd>) => {
            state.status = 'succeeded';
            state.devicesAdd.push(action.payload); 
            state.error = null; 
          })
          .addCase(addDeviceAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          });
        
    },
  });
  
  export const selectDevices= (state: RootState) => state.devicesAdd.devicesAdd;
  export const selectDevicesStatus = (state: RootState) => state.devicesAdd.status;
  export const selectDevicesError = (state: RootState) => state.devicesAdd.error;
  
  export default addDeviceSlice.reducer;