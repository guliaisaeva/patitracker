import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/lib/store";
import { CONST } from "@/lib/const";
import { useDispatch } from "react-redux";
const token = process.env.NEXT_PUBLIC_API_TOKEN;

export interface TermsOfUse {
  id: number;
  title: string;
  languageId: number;
  detail: string;
}

interface PrivacyPolicyState {
  terms: TermsOfUse[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PrivacyPolicyState = {
  terms: [],
  loading: false,
  error: null,
  status: "idle",
};

export const fetchTermsOfUse = createAsyncThunk(
  "termsOfUse/fetchTermsOfUse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(CONST.getAllTermsOfUse, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log(response);
      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch terms of use: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTermsOfUse = createAsyncThunk(
  "termsOfUse/updateTermsOfUse",
  async (termsOfUse: TermsOfUse, { rejectWithValue }) => {
    try {
      const response = await fetch(CONST.updateTermsOfUse, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([termsOfUse]),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to update terms of use: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const termsPrivacySlice = createSlice({
  name: "termsPrivacy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTermsOfUse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTermsOfUse.fulfilled,
        (state, action: PayloadAction<TermsOfUse[]>) => {
          state.terms = action.payload;
          state.loading = false;
          state.status = "succeeded";
        }
      )
      .addCase(fetchTermsOfUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateTermsOfUse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTermsOfUse.fulfilled,
        (state, action: PayloadAction<TermsOfUse>) => {
          const index = state?.terms.findIndex(
            (term) => term?.id === action.payload?.id
          );
          if (index !== -1) {
            state.terms[index] = action.payload;
          }
          state.loading = false;
          state.status = "succeeded";
        }
      )
      .addCase(updateTermsOfUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPrivacyPoliciesByLanguage = (
  state: RootState,
  languageId: number
) =>
  state?.termsPrivacy?.terms.filter((term) => term.languageId === languageId);
export const selectLoading = (state: { privacyPolicy: PrivacyPolicyState }) =>
  state?.privacyPolicy?.loading;
export const selectError = (state: { privacyPolicy: PrivacyPolicyState }) =>
  state?.privacyPolicy?.error;
export default termsPrivacySlice.reducer;
