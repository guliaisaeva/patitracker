import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  language: "en" | "tr";
}

const initialState: LanguageState = {
  language: "tr", // Default language is Turkish
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<"en" | "tr">) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state: { language: LanguageState }) =>
  state.language.language;

export default languageSlice.reducer;
