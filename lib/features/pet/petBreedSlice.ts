import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { CONST } from "@/lib/const";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export const getAllPetBreeds = createAsyncThunk(
  "pets/getAllPetBreeds",
  async (petTypeId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${CONST.getAllPetBreedURL}?petTypeId=${petTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch pet breeds: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPetBreedDetail = createAsyncThunk(
  "pets/getPetBreedDetail",
  async (petBreedId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${CONST.getPetBreedDetailURL}?petBreedId=${petBreedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch pet detail: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPetBreed = createAsyncThunk(
  "petBreeds/addPetBreed",
  async (newPetBreed: PetBreedRequest, { rejectWithValue }) => {
    try {
      const response = await fetch(CONST.addPetBreedURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPetBreed),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to add pet breed: ${response.statusText} - ${errorDetail}`
        );
      }
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePetBreed = createAsyncThunk(
  "petBreeds/updatePetBreed",
  async (updatedPetBreed: PetBreedUpdate, { rejectWithValue }) => {
    console.log("Updating breed with payload:", updatedPetBreed);

    try {
      const response = await fetch(CONST.updatePetBreedURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPetBreed),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to update pet breed: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      console.log("Server Response:", data);
      return data.data;
    } catch (error: any) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
// export const updatePetBreed = createAsyncThunk(
//   "petBreeds/updatePetBreed",
//   async (updatedPetBreed: PetBreedUpdate, { rejectWithValue }) => {
//     try {
//       // Filter out duplicate localized entries
//       const uniqueBreedsLocalized = updatedPetBreed.petBreedsLocalized.reduce(
//         (acc, curr) => {
//           if (!acc.some((item) => item.languageId === curr.languageId)) {
//             acc.push(curr);
//           }
//           return acc;
//         },
//         [] as PetBreedUpdate["petBreedsLocalized"]
//       );

//       // Prepare cleaned payload
//       const cleanedPayload = {
//         ...updatedPetBreed,
//         petBreedsLocalized: uniqueBreedsLocalized,
//       };

//       console.log("Cleaned Payload:", cleanedPayload);

//       // Perform the API request
//       const response = await fetch(CONST.updatePetBreedURL, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cleanedPayload),
//       });

//       // Check if the response is okay
//       if (!response.ok) {
//         const errorDetail = await response.text();
//         throw new Error(
//           `Failed to update pet breed: ${response.statusText} - ${errorDetail}`
//         );
//       }

//       // Parse the response data
//       const data = await response.json();
//       console.log("Response Data:", data);

//       // Check if `data` contains `data` field
//       if (data && data.data) {
//         return data.data;
//       } else {
//         // Handle cases where the data field is null or undefined
//         console.warn("Update successful but no data returned.");
//         return null; // Or handle it in a way that fits your use case
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const updatePetBreed = createAsyncThunk(
//   "petBreeds/updatePetBreed",
//   async (updatedPetBreed: PetBreedUpdate, { rejectWithValue }) => {
//     try {
//       // Prepare the cleaned payload
//       const cleanedPayload = {
//         ...updatedPetBreed,
//         petBreedsLocalized: updatedPetBreed.petBreedsLocalized.reduce(
//           (acc, curr) => {
//             if (!acc.some((item) => item.languageId === curr.languageId)) {
//               acc.push(curr);
//             }
//             return acc;
//           },
//           [] as PetBreedUpdate["petBreedsLocalized"]
//         ),
//       };

//       // Perform the API request
//       const response = await fetch(CONST.updatePetBreedURL, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cleanedPayload),
//       });

//       if (!response.ok) {
//         const errorDetail = await response.text();
//         throw new Error(
//           `Failed to update pet breed: ${response.statusText} - ${errorDetail}`
//         );
//       }

//       const data = await response.json();

//       if (data && data.data) {
//         return data.data;
//       } else {
//         console.error("Update successful but no data returned.");
//         return null;
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const deletePetBreed = createAsyncThunk(
  "petBreed/deletePetBreed",
  async (petBreedId: number, { rejectWithValue }) => {
    const response = await fetch(
      `${CONST.deletePetBreedURL}?petId=${petBreedId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(
        `Failed to delete Pet Breed: ${response.statusText} - ${errorDetail}`
      );
    }
    return petBreedId;
  }
);

interface PetBreed {
  breedId?: number | null;
  petTypeId: number | null;
  languageId: number;
  breedName: string;
}

interface PetBreedDetail {
  breedId: number | null;
  petTypeId: number | null;
  breedName: string;
  languages: {
    id: number;
    text: string;
  }[];
}
export interface PetBreedRequest {
  petTypeId: number | null;
  breedName: string;
  petBreedsLocalized: {
    languageId: number;
    breedName: string;
  }[];
}
interface PetBreedUpdate {
  breedId: number | null;
  petTypeId: number | null;
  breedName: string;
  petBreedsLocalized: {
    languageId: number;
    breedName: string;
  }[];
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
  petBreeds: PetBreed[];
  addPetType: AddPetType[];
  PetBreedRequest: PetBreedRequest[];
  breedDetail: PetBreedDetail | null;
  languages: Language[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
  success: boolean;
  simCardAdd: AddPetType[];
  PetBreedUpdate: PetBreedUpdate[];
}

const initialState: PetBreedSliceState = {
  petBreeds: [],
  simCardAdd: [],
  addPetType: [],
  PetBreedRequest: [],
  breedDetail: null,
  languages: [],
  loading: false,
  success: false,
  status: "idle",
  error: null,
  PetBreedUpdate: [],
};

export const petBreedSlice = createSlice({
  name: "petBreeds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPetBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPetBreeds.fulfilled,
        (state, action: PayloadAction<PetBreed[]>) => {
          state.loading = false;
          state.petBreeds = action.payload;
        }
      )
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
        state.petBreeds.push(action.payload);
      })
      .addCase(addPetBreed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(updatePetBreed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePetBreed.fulfilled,
        (state, action: PayloadAction<PetBreedUpdate | null>) => {
          state.loading = false;
          if (action.payload) {
            state.petBreeds = state.petBreeds.map((breed) =>
              breed?.breedId === action.payload?.breedId
                ? { ...breed, ...action.payload }
                : breed
            );
          } else {
            console.log("Action payload:", action.payload);
            console.error("Update successful but no data returned.");
          }
        }
      )
      .addCase(updatePetBreed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(
        getPetBreedDetail.fulfilled,
        (state, action: PayloadAction<PetBreedDetail>) => {
          state.loading = false;
          state.breedDetail = action.payload;
        }
      )
      .addCase(getPetBreedDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePetBreed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deletePetBreed.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.petBreeds = state.petBreeds.filter(
            (petBreed) => petBreed.breedId !== action.payload
          );
        }
      )
      .addCase(deletePetBreed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const selectPetBreeds = (state: RootState) => state.petBreeds.petBreeds;
export const selectLoading = (state: RootState) => state.petBreeds.loading;
export const selectError = (state: RootState) => state.petBreeds.error;
export const selectSuccess = (state: RootState) => state.petBreeds.success;
export const selectBreedDetail = (state: RootState) =>
  state.petBreeds.breedDetail;

export const selectPetBreedsByPetType = createSelector(
  [selectPetBreeds, (_, petTypeId: number) => petTypeId],
  (petBreeds, petTypeId) =>
    petBreeds.filter((breed) => breed.petTypeId === petTypeId)
);

export const {} = petBreedSlice.actions;

export default petBreedSlice.reducer;
