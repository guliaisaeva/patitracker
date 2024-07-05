import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';


export const getAllDevices =  async (): Promise<Devices[]> =>{
    const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MjA0MDE5LCJleHAiOjE3NDk3NDAwMTksImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.GMxVmEzjHTCO9O2fiz11MbIVHknFD_-ghPw2ghE_yS8';

    const response = await fetch('http://185.46.55.50:50235/api/v1/Device/GetAllDevices', {
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

export const getDevicesAsync = createAsyncThunk('devices/getDevices', async () => {
    const devicesData = await getAllDevices();
    return devicesData;
  });


  export const deleteDeviceAsync = createAsyncThunk(
    'devices/deleteDevice',
    async (deviceId: number | string, { rejectWithValue }) => {
      const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MjA0MDE5LCJleHAiOjE3NDk3NDAwMTksImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.GMxVmEzjHTCO9O2fiz11MbIVHknFD_-ghPw2ghE_yS8';
  
      try {
        const response = await fetch(`http://185.46.55.50:50235/api/v1/Device/DeleteDevice?deviceId=${deviceId}`, {
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
        return deviceId;
  
      } catch (error:any) {
        // Use rejectWithValue to propagate the error back to the action creator
        return rejectWithValue(error.message);
      }
    }
  );

  export const addDeviceAsync = createAsyncThunk(
    'devices/addDevice',
    async (deviceToAdd: DeviceToAdd, { rejectWithValue }) => {
      const token = 'YOUR_TOKEN_HERE';
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Device/AddDevice', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([deviceToAdd]),
        });
  
        if (!response.ok) {
          const errorDetail = await response.json();
          console.error('Failed to add device:', errorDetail);
          throw new Error(`Failed to add device: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('Device added successfully:', data);
        return data.data[0]; // Assuming API returns the added device in an array
  
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const getDeviceDetails = async (deviceId: string) => {
    const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';

    const response = await fetch(`http://185.46.55.50:50235/api/v1/Device/GetDeviceDetail?Id=${deviceId}`, {
     
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`Failed to fetch device details: ${response.statusText} - ${errorDetail}`);
    }
  
    const data = await response.json();
    return data.data;
  };
  
  export const getDeviceDetailsAsync = createAsyncThunk('devices/getDeviceDetails', async (deviceId: string) => {
    const deviceData = await getDeviceDetails(deviceId);
    return deviceData;
  });

interface Devices {
  id: number;
  simCardId: number | null;
  simNumber: string;
  deviceNumber: string;
  deviceModel: string;
  registerDate: string; 
  isActive: boolean;
  isFault: boolean;
}
interface DeviceDetail {
  deviceId: string;
  simNumber: string | null;
  activityState: boolean;
  memberShipStartDate: string | null;
  memberShipEndDate: string | null;
  userName: string | null;
  userImageUrl: string | null;
  email: string | null;
  petName: string | null;
  petImageUrl: string | null;
}
export interface DeviceToAdd {
    deviceNumber: string;
    deviceModel: string;
    isDeviceToSim: boolean;
    simCardId: string;
  }
  

  interface  DeviceSliceState {
    devices: Devices[] | null; 
    deviceDetails: DeviceDetail  | null;

    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  const initialState: DeviceSliceState = {
    devices: [] ,
    deviceDetails: null,
    status: 'idle',
    error: null,
  };

  export const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
      clearDeviceDetails: (state) => {
        state.deviceDetails = null;
      },    },
    extraReducers: (builder) => {
      builder
        .addCase(getDevicesAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getDevicesAsync.fulfilled, (state, action: PayloadAction<Devices[]>) => {
            state.status = 'succeeded';
            state.devices = action.payload;
          })
        .addCase(getDevicesAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Unknown error';
        })  
        .addCase(deleteDeviceAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteDeviceAsync.fulfilled, (state, action: PayloadAction<number | string>) => {
            state.status = 'succeeded';
          })
          .addCase(deleteDeviceAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Unknown error';
          })
          .addCase(getDeviceDetailsAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getDeviceDetailsAsync.fulfilled, (state, action: PayloadAction<DeviceDetail>) => {
            state.status = 'succeeded';
            state.deviceDetails = action.payload;
          })
          .addCase(getDeviceDetailsAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Unknown error';
          });
        
    },
  });
  export const { clearDeviceDetails } = devicesSlice.actions;

  
  export const selectDevices= (state: RootState) => state.devices.devices;
  export const selectDevicesStatus = (state: RootState) => state.devices.status;
  export const selectDevicesError = (state: RootState) => state.devices.error;
  export const selectDeviceDetails = (state: RootState) => state.devices.deviceDetails;

  
  export default devicesSlice.reducer;