import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export const getAllSims = async () => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MTAwNDg4LCJleHAiOjE3NDk2MzY0ODgsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.BP7BpHkxIG1jLLy3BRdDxOMuYbDYor3imM9AQmXyDD4';

  const response = await fetch('http://185.46.55.50:50235/api/v1/SimCard/GetAllSimCards', {
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

export const getAllSimsAsync = createAsyncThunk('simcards/getSimcards', async () => {
  const usersData = await getAllSims();
  return usersData;
});

export const getSimsDetail = async (simCardId: number) => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';

  const response = await fetch(`http://185.46.55.50:50235/api/v1/SimCard/GetSimCardsDetail?simCardId=${simCardId}`, {
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
export const getSimDetailsAsync = createAsyncThunk(
  'simcards/getSimcardsById',
  async (simcarId: number) => {
    const userData = await getSimsDetail(simcarId);
    return userData;
  }
);

export const deleteSimCardAsync = createAsyncThunk(
  'simcards/deleteSimcard',
  async (simCardId: number) => {
    const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9'; // Replace with your JWT token

    const response = await fetch(`http://185.46.55.50:50235/api/v1/SimCard/DeleteSimCard?simCardId=${simCardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`Failed to delete SIM card: ${response.statusText} - ${errorDetail}`);
    }

    return simCardId;
  }
);


export const addSimCardAsync = createAsyncThunk(
  'simcards/addSimcard',
  async (simCardData: AddSimCard) => {
    const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9'; // Replace with your JWT token

    const response = await fetch('http://185.46.55.50:50235/api/v1/SimCard/AddSimCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify([simCardData]), // Assuming simCardData is an array of objects as in your example
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`Failed to add SIM card: ${response.statusText} - ${errorDetail}`);
    }

    const data = await response.json();
    return data;
  }
);

export const getAllSimsForConnectDevice = async (): Promise<SimWithDevice[]> => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';

  const response = await fetch('http://185.46.55.50:50235/api/v1/SimCard/GetAllSimForConnectDevice', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Failed to fetch devices: ${response.statusText} - ${errorDetail}`);
  }

  const data = await response.json();
  return data.data;
}

export const getAllSimsForConnectDeviceAsync = createAsyncThunk('sims/getSimForConnectDevices', async () => {
  const simData = await getAllSimsForConnectDevice();
  return simData;
});

export const GetAllPhoneCode = async (): Promise<CountryPhoneCode[]> => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';

  const response = await fetch('http://185.46.55.50:50235/api/v1/Information/GetAllPhoneCode', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Failed to fetch devices: ${response.statusText} - ${errorDetail}`);
  }

  const data = await response.json();
  return data.data;
}

export const GetAllPhoneCodeAsync = createAsyncThunk('sims/getCountryCodes', async () => {
  const phoneCodeData = await GetAllPhoneCode();
  return phoneCodeData;
});


interface SimCard {
    id:number;
    deviceId: number;
    countryPhoneCodeId: number;
    companyName: string;
    phoneNumber: string;
    apn: string;
    dataSize: string;
    registerDate: string;
    expirationDate: string;
    isActive: boolean;
    isDeleted: boolean;
  }
 export  interface AddSimCard {
    countryPhoneCodeId: number;
    companyName: string;
    phoneNumber: string;
    apn: string;
    dataSize: string;
    registerDate: string;
    expirationDate: string;
    isSimToDevice: boolean;
    deviceId: number;
  }

  interface SimWithDevice{
    simCardId: number;
    simCardNumber: string;
  }
  interface CountryPhoneCode{
    countryPhoneId: number,
    phoneCode:string
  }

interface SimCardSliceState {
  sims: SimCard[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedSim: SimCard | null;
  simCardAdd: AddSimCard[]; 
  simWithDevices:SimWithDevice[] | null;
  countryPhoneCode:CountryPhoneCode[] | null;

}


const initialState: SimCardSliceState = {
    sims: [],
    simCardAdd: [],
  status: 'idle',
  error: null,
  selectedSim: null,
  simWithDevices:[],
  countryPhoneCode:[]


};

export const simsSlice = createSlice({
  name: 'sims',
  initialState,
  reducers: {
    clearSelectedSim: (state) => {
      state.selectedSim = null;
    },  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSimsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllSimsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sims = action.payload;
      })
      .addCase(getAllSimsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(getSimDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSimDetailsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedSim = action.payload;
      })
      .addCase(getSimDetailsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(deleteSimCardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSimCardAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted SIM card from the sims array
        state.sims = state.sims.filter(sim => sim.id !== action.payload);
      })
      .addCase(deleteSimCardAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })   .addCase(addSimCardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSimCardAsync.fulfilled, (state, action: PayloadAction<AddSimCard>) => {
        state.status = 'succeeded';
        state.simCardAdd.push(action.payload); 
        state.error = null; 
      })
      .addCase(addSimCardAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })         
      .addCase(getAllSimsForConnectDeviceAsync.fulfilled, (state, action: PayloadAction<SimWithDevice[]>) => {
        state.status = 'succeeded';
        state.simWithDevices = action.payload;
      })
      .addCase(getAllSimsForConnectDeviceAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(GetAllPhoneCodeAsync.fulfilled, (state, action: PayloadAction<CountryPhoneCode[]>) => {
        state.status = 'succeeded';
        state.countryPhoneCode = action.payload;
      })
      .addCase(GetAllPhoneCodeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
     
  }
});

export const selectSims = (state: RootState) => state.sims.sims;
export const selectSimsStatus = (state: RootState) => state.sims.status;
export const selectSimsError = (state: RootState) => state.sims.error;
export const selectSelectedSim = (state: RootState) => state.sims.selectedSim; 
export const addSimCard= (state: RootState) => state.sims.simCardAdd;
export const selectSimWithDevice = (state: RootState) => state.sims.simWithDevices;
export const selectCountryPhoneCode = (state: RootState) => state.sims.countryPhoneCode;


export const { clearSelectedSim } = simsSlice.actions;


export default simsSlice.reducer;