import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { CONST } from "@/lib/const";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export const getManagers = async (): Promise<Managers[]> => {
  const response = await fetch(CONST.getAllManagerURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Failed to fetch users: ${response.statusText} - ${errorDetail}`
    );
  }

  const data = await response.json();
  return data.data;
};

export const getManagersAsync = createAsyncThunk(
  "managers/getManagers",
  async () => {
    const managersData = await getManagers();
    return managersData;
  }
);

export const deleteManagerAsync = createAsyncThunk(
  "managers/deleteManager",
  async (adminId: number | string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${CONST.deleteManagerURL}?adminId=${adminId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to delete manager: ${response.statusText} - ${errorDetail}`
        );
      }

      // Optionally, return some data if needed upon successful deletion
      // const data = await response.json();
      // return data.data;
      return adminId;
    } catch (error: any) {
      // Use rejectWithValue to propagate the error back to the action creator
      return rejectWithValue(error.message);
    }
  }
);

export const getManagerByIdAsync = createAsyncThunk(
  "managers/getManagerById",
  async (adminId: number | string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${CONST.getManagerDetailURL}?adminId=${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch manager: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllCitiesAsync = createAsyncThunk(
  "managers/getCities",
  async (): Promise<GetCities[]> => {
    try {
      const response = await fetch(CONST.getAllCitiesURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch manager: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return error.message;
    }
  }
);
export const getAllDistrictsAsync = createAsyncThunk(
  "managers/getDistrict",
  async (cityId: number, { rejectWithValue }): Promise<GetDistricts[]> => {
    try {
      const response = await fetch(
        `${CONST.getAllDistrictsURL}?cityId=${cityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch manager: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return error.message;
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
interface ManagerById {
  userProfileId: number;
  profileImageUrl: string | null;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userAddressModel: {
    cityId: string;
    cityName: string;
    districtId: string;
    districtName: string;
    description: string;
    direction: string;
    zipCode: string;
    countryPhoneCodeId: number;
    phoneCode: string;
    phoneNumber: string;
  };
}

interface GetCities {
  cityId: number;
  cityName: string;
}
interface GetDistricts {
  districtId: number;
  districtName: string;
}
interface ManagerSliceState {
  managers: Managers[];
  managerByİd: ManagerById | null;
  cities: GetCities[];
  districts: GetDistricts[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ManagerSliceState = {
  managers: [],
  managerByİd: null,
  cities: [],
  districts: [],
  status: "idle",
  error: null,
};

export const managerSlice = createSlice({
  name: "managers",
  initialState,
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManagersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getManagersAsync.fulfilled,
        (state, action: PayloadAction<Managers[]>) => {
          state.status = "succeeded";
          state.managers = action.payload;
        }
      )
      .addCase(getManagersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(getManagerByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getManagerByIdAsync.fulfilled,
        (state, action: PayloadAction<ManagerById>) => {
          state.status = "succeeded";
          // Update managers array or single manager as needed
          state.managerByİd = action.payload;
        }
      )
      .addCase(getManagerByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(getAllCitiesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllCitiesAsync.fulfilled,
        (state, action: PayloadAction<GetCities[]>) => {
          state.status = "succeeded";
          state.cities = action.payload;
        }
      )
      .addCase(getAllCitiesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(getAllDistrictsAsync.pending, (state) => {
        // Handle pending state for fetching districts
        state.status = "loading";
      })
      .addCase(
        getAllDistrictsAsync.fulfilled,
        (state, action: PayloadAction<GetDistricts[]>) => {
          // Handle fulfilled state for fetching districts
          state.status = "succeeded";
          state.districts = action.payload;
        }
      )
      .addCase(getAllDistrictsAsync.rejected, (state, action) => {
        // Handle rejected state for fetching districts
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const selectManagers = (state: RootState) => state.managers.managers;
export const selectManagersStatus = (state: RootState) => state.managers.status;
export const selectManagersError = (state: RootState) => state.managers.error;
export const selectManagerById = (state: RootState) =>
  state.managers.managerByİd;
export const selectCities = (state: RootState) => state.managers.cities;
export const selectDistricts = (state: RootState) => state.managers.districts;

export default managerSlice.reducer;
