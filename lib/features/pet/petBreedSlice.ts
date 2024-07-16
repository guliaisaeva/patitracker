import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';


export const getAllPetBreeds = createAsyncThunk(
  'pets/getAllPetBreeds',
  async (petTypeId: string, { rejectWithValue }) => {
    try {
    
      const response = await fetch(`http://185.46.55.50:50235/api/v1/Pet/GetAllPetBreed?petTypeId=${petTypeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Failed to fetch pet breeds: ${response.statusText} - ${errorDetail}`);
      }

      const data = await response.json();
      return data.data; // Adjust this based on your API response structure
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPetBreed = createAsyncThunk(
  'petBreeds/addPetBreed',
  async (newPetBreed: PetBreed, { rejectWithValue }) => {
    try {
      const response = await fetch('http://185.46.55.50:50235/api/v1/Pet/AddPetBreed', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([newPetBreed]),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Failed to add pet breed: ${response.statusText} - ${errorDetail}`);
      }

      const data = await response.json();
      return data.data; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



  interface PetBreed {
    breedId?: number;
    petTypeId: number;
    languageId: number;
    breedName: string;
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


interface PetBreedSliceState {
  petBreeds:PetBreed[];
  addPetType:AddPetType[],
  languages: Language[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
  success: boolean;
  simCardAdd: AddPetType[]; 

}


const initialState: PetBreedSliceState = {
    petBreeds:[],
    simCardAdd: [],
    addPetType:[],
    languages: [],
    loading: false,
    success: false,
  status: 'idle',
  error: null,
};

export const petBreedSlice = createSlice({
  name: 'petBreeds',
  initialState,
  reducers: {
    },
  extraReducers: (builder) => {
    builder
    .addCase(getAllPetBreeds.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllPetBreeds.fulfilled, (state, action: PayloadAction<PetBreed[]>) => {
      state.loading = false;
      state.petBreeds = action.payload;
    })
    .addCase(getAllPetBreeds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    }) 
    .addCase(addPetBreed.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addPetBreed.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true; 
    })
    .addCase(addPetBreed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false; 
    });

     
  }
});

export const selectPetBreeds = (state: RootState) => state.petBreeds.petBreeds;
export const selectLoading = (state: RootState) => state.petBreeds.loading;
export const selectError = (state: RootState) => state.petBreeds.error;
export const selectSuccess = (state: RootState) => state.petBreeds.success;

export const selectPetBreedsByPetType = createSelector(
  [selectPetBreeds, (_, petTypeId: number) => petTypeId],
  (petBreeds, petTypeId) => petBreeds.filter(breed => breed.petTypeId === petTypeId)
);

export const {  } = petBreedSlice.actions;

export default petBreedSlice.reducer;