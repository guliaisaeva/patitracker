import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';


export const getAllPetBreeds = createAsyncThunk(
    'pets/getAllPetTypes',
    async (_, { rejectWithValue }) => {
      const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzE4MjA0MDE5LCJleHAiOjE3NDk3NDAwMTksImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.GMxVmEzjHTCO9O2fiz11MbIVHknFD_-ghPw2ghE_yS8'; // Your token
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Pet/GetAllPetType', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to fetch pet types: ${response.statusText} - ${errorDetail}`);
        }
  
        const data = await response.json();
        return data.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const getPetDetail = createAsyncThunk(
    'pets/getPetDetail',
    async (petTypeId: number, { rejectWithValue }) => {
      const token = 'eyJhbGciOiJeyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9odHRwOi8vd3d3LnczLm9y...'; // Your token
  
      try {
        const response = await fetch(`http://185.46.55.50:50235/api/v1/Pet/GetPetType?petTypeId=${petTypeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to fetch pet detail: ${response.statusText} - ${errorDetail}`);
        }
  
        const data = await response.json();
        return data.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );



  export const addPetType = createAsyncThunk(
    'pets/addPetType',
    async (newPetType: AddPetType, { rejectWithValue }) => {
      const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9'; 
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Pet/AddPetType', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([newPetType]),
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to add pet type: ${response.statusText} - ${errorDetail}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchLanguages = createAsyncThunk(
    'languages/fetchLanguages',
    async (_, { rejectWithValue }) => {
      const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M'; // Replace with your token
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Information/GetAllMobileLanguage', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to fetch languages: ${response.statusText} - ${errorDetail}`);
        }
  
        const data = await response.json();
        return data.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

export const deletePetType = createAsyncThunk(
    'petTypes/deletePetType',
    async (petTypeId: number, { rejectWithValue }) => {
        const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9'; // Replace with your JWT token

    const response = await fetch(`http://185.46.55.50:50235/api/v1/Pet/DeletePetType?petTypeId=${petTypeId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`Failed to delete SIM card: ${response.statusText} - ${errorDetail}`);
    }
    return petTypeId;
  }
);

export const updatePetType = createAsyncThunk(
    'petTypes/updatePetType',
    async (updatedPetType: PetType, { rejectWithValue }) => {
      const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9';
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Pet/UpdatePetType', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPetType),
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to update pet type: ${response.statusText} - ${errorDetail}`);
        }
  
        const data = await response.json();
        return data.data; // Assuming the API returns the updated PetType object
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
export interface PetType {
    typeId: number;
    typeName: string;
    languageId: number;
  }
  interface PetDetail {
    typeId: number;
    typeName: string;
    languageId: number;
  }

  export interface AddPetType {
    petType: string;
    languageId: number;
  }

  interface Language {
    languageId: number;
    languageName: string;
    languageAbbreviation: string;
  }


interface PetTypeSliceState {
  petTypes: PetType[]; 
  petDetail: PetDetail | null;
  addPetType:AddPetType[],
  languages: Language[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
  success: boolean;
  simCardAdd: AddPetType[]; 

}


const initialState: PetTypeSliceState = {
    petTypes: [],
    petDetail: null,
    simCardAdd: [],
    addPetType:[],
    languages: [],
    loading: false,
    success: false,
  status: 'idle',
  error: null,
};

export const petTypeSlice = createSlice({
  name: 'petTypes',
  initialState,
  reducers: {
    },
  extraReducers: (builder) => {
    builder
    builder
    .addCase(getAllPetBreeds.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllPetBreeds.fulfilled, (state, action: PayloadAction<PetType[]>) => {
      state.loading = false;
      state.petTypes = action.payload;
    })
    .addCase(getAllPetBreeds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })  .addCase(getPetDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPetDetail.fulfilled, (state, action: PayloadAction<PetDetail>) => {
        state.loading = false;
        state.petDetail = action.payload;
      })
      .addCase(getPetDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })  .addCase(addPetType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addPetType.fulfilled, (state, action: PayloadAction<AddPetType>) => {
        state.loading = false;
        state.addPetType.push(action.payload);
        state.success = true;
      })
      .addCase(addPetType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      }) .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action: PayloadAction<Language[]>) => {
        state.loading = false;
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePetType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePetType.fulfilled, (state, action: PayloadAction<number | string>) => {
        state.loading = true;
        state.petTypes = state.petTypes.filter(petType => petType.typeId !== action.payload);
        state.loading = false;       })
      .addCase(deletePetType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      }).addCase(updatePetType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePetType.fulfilled, (state, action: PayloadAction<PetType>) => {
        state.status = 'succeeded';
        const index = state.petTypes.findIndex(petType => petType.typeId === action.payload.typeId);
        if (index !== -1) {
          state.petTypes[index] = action.payload;
        }
      })
      .addCase(updatePetType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
     
  }
});

export const selectPetTypes = (state: RootState) => state.petTypes.petTypes;
export const selectPetTypesStatus = (state: RootState) => state.petTypes.status;
export const selectPetTypesError = (state: RootState) => state.petTypes.error;
export const selectLoading = (state: RootState) => state.petTypes.loading;
export const selectPetDetail = (state: RootState) => state.petTypes.petDetail;
export const selectAddPetType = (state: RootState) => state.petTypes.addPetType;
export const selectLanguages = (state: RootState) => state.petTypes.languages;


export const {  } = petTypeSlice.actions;


export default petTypeSlice.reducer;