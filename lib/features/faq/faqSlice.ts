import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

const token =
  "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M";

export const getAllQuestions = createAsyncThunk(
  "questions/getAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://185.46.55.50:50235/api/v1/Information/GetAllFrequentlyAskedQuestion",
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
          `Failed to fetch pet types: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getQuestionDetail = createAsyncThunk(
  "questions/getQuestionDetail",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://185.46.55.50:50235/api/v1/Information/GetFrequentlyAskedQuestionDetail?questionId=${id}`,
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
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://185.46.55.50:50235/api/v1/Information/DeleteFrequentlyAskedQuestion?questionsId=${questionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to delete announcement: ${response.statusText} - ${errorDetail}`
        );
      }

      return questionId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (newQuestion: NewQuestion, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://185.46.55.50:50235/api/v1/Information/AddFrequentlyAskedQuestion",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([newQuestion]),
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to add announcement: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",

  async (updatedQuestion: UpdateQuestion, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://185.46.55.50:50235/api/v1/Information/UpdateFrequentlyAskedQuestion",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedQuestion),
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to update question: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export interface Question {
  id: number;
  mobileLanguageId: number;
  title: string;
  detail: string;
}

interface NewQuestion {
  title: string;
  detail: string;
  mobileLanguageId: number;
}
export interface UpdateQuestion {
  id: number;
  mobileLanguageId: number;
  title: string;
  detail: string;
}
interface QuestionSliceState {
  question: Question[];
  questionDetail: Question | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: QuestionSliceState = {
  question: [],
  questionDetail: null,
  loading: false,
  success: false,
  status: "idle",
  error: null,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllQuestions.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.status = "succeeded";
          state.question = action.payload;
        }
      )
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addQuestion.fulfilled,
        (state, action: PayloadAction<Question>) => {
          state.status = "succeeded";
          state.question.push(action.payload);
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(addQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
        state.loading = false;
        state.success = false;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateQuestion.fulfilled,
        (state, action: PayloadAction<UpdateQuestion | null>) => {
          state.status = "succeeded";
          const index = state.question.findIndex(
            (faq) => faq?.id === action.payload?.id
          );
          if (index !== -1) {
            state.question[index] = {
              ...state.question[index],
              ...action.payload,
            };
          }
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(updateQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.loading = false;
        state.success = false;
      })
      .addCase(getQuestionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuestionDetail.fulfilled,
        (state, action: PayloadAction<UpdateQuestion>) => {
          state.loading = false;
          state.questionDetail = action.payload;
        }
      )
      .addCase(getQuestionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteQuestion.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.question = state.question.filter(
            (faq) => faq.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const selectQuestions = (state: RootState) => state.question.question;
export const selectQuestionDetail = (state: RootState) =>
  state.question.questionDetail;
export const selectQuestionsStatus = (state: RootState) =>
  state.question.status;
export const selectQuestionsError = (state: RootState) => state.question.error;

export default questionSlice.reducer;
