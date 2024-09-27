import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { CONST } from "@/lib/const";
import DOMPurify from "dompurify";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export interface TermsOfUse {
  id: number;
  title: string;
  detail: string;
  languageId: number;
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
  async (languageId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await fetch(CONST.getAllTermsOfUse, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        console.error("Backend Error Response:", errorDetail);
        return rejectWithValue(
          `Failed to update terms of use: ${
            errorDetail.message || response.statusText
          }`
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
      const sanitizedTermsOfUse = {
        ...termsOfUse,
        title: DOMPurify.sanitize(termsOfUse.title, {
          ALLOWED_TAGS: ["h2", "strong", "u", "em", "a"], // Customize as needed
          ALLOWED_ATTR: ["href", "rel", "target"], // Customize as needed
        }),
        detail: DOMPurify.sanitize(termsOfUse.detail, {
          ALLOWED_TAGS: ["p", "strong", "u", "em", "a", "ul", "ol", "li"], // Customize as needed
          ALLOWED_ATTR: ["href", "rel", "target"], // Customize as needed
        }),
      };

      const response = await fetch(CONST.updateTermsOfUse, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([sanitizedTermsOfUse]),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to update terms of use: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      console.log("Updated data:", data);
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
      .addCase(updateTermsOfUse.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && Array.isArray(action.payload)) {
          action.payload.forEach((updatedTerm) => {
            const index = state.terms.findIndex(
              (term) => term.id === updatedTerm.id
            );
            if (index !== -1) {
              state.terms[index] = updatedTerm;
            }
          });
        }
      })
      .addCase(updateTermsOfUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPrivacyPoliciesByLanguage = createSelector(
  (state: RootState) => state.termsPrivacy.terms,
  (state: RootState, languageId: number) => languageId,
  (terms, languageId) => terms.filter((term) => term.languageId === languageId)
);
export const selectAllTerms = (state: RootState) => state.termsPrivacy.terms;
export const selectLoading = (state: { privacyPolicy: PrivacyPolicyState }) =>
  state?.privacyPolicy?.loading;
export const selectError = (state: { privacyPolicy: PrivacyPolicyState }) =>
  state?.privacyPolicy?.error;
export default termsPrivacySlice.reducer;
