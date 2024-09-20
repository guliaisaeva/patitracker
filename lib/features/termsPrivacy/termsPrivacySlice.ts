import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { CONST } from "@/lib/const";
const token = process.env.NEXT_PUBLIC_API_TOKEN;

export interface PrivacyPolicy {
  id: number;
  title: string;
  detail: string;
  isActive: boolean;
}

interface PrivacyPolicyState {
  policies: PrivacyPolicy[];
  loading: boolean;
  error: string | null;
}

const initialState: PrivacyPolicyState = {
  policies: [],
  loading: false,
  error: null,
};

export const fetchPrivacyPolicies = createAsyncThunk(
  "privacyPolicies/fetchPrivacyPolicies",
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
          `Failed to fetch privacy policies: ${response.statusText} - ${errorDetail}`
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
      .addCase(fetchPrivacyPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPrivacyPolicies.fulfilled,
        (state, action: PayloadAction<PrivacyPolicy[]>) => {
          state.policies = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPrivacyPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPrivacyPolicies = (state: RootState) =>
  state.termsPrivacy.policies;

export const selectLoading = (state: { privacyPolicy: PrivacyPolicyState }) =>
  state.privacyPolicy.loading;
export const selectError = (state: { privacyPolicy: PrivacyPolicyState }) =>
  state.privacyPolicy.error;
export default termsPrivacySlice.reducer;
