import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { CONST } from "@/lib/const";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export const getAllQuestions = createAsyncThunk(
  "questions/getAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(CONST.getAllQuestionURL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch pet types: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// export const getQuestionDetail = createAsyncThunk(
//   "questions/getQuestionDetail",
//   async (
//     { questionId, languageId }: { questionId: number; languageId?: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const url = new URL(`${CONST.getQuestionDetailURL}`);
//       url.searchParams.append("questionId", questionId.toString());
//       if (languageId) {
//         url.searchParams.append("languageId", languageId.toString());
//       }
//       const response = await fetch(url.toString(), {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorDetail = await response.text();
//         throw new Error(
//           `Failed to fetch question detail: ${response.statusText} - ${errorDetail}`
//         );
//       }

//       const data = await response.json();

//       const latestLanguages: {
//         [key: number]: { languageId: number; title: string; detail: string };
//       } = {};
//       data.data.frequentlyAskedQuestionsLocalized.forEach(
//         (localized: { languageId: number; title: string; detail: string }) => {
//           latestLanguages[localized.languageId] = localized; // Overwrite duplicate ids with the latest entry
//         }
//       );
//       // Convert the object back to an array
//       data.data.frequentlyAskedQuestionsLocalized =
//         Object.values(latestLanguages);
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const getQuestionDetail = createAsyncThunk<
//   QuestionDetail,
//   { questionId: number; languageId?: number }
// >(
//   "questions/getQuestionDetail",
//   async ({ questionId, languageId }, { rejectWithValue }) => {
//     try {
//       const url = new URL(`${CONST.getQuestionDetailURL}`);
//       url.searchParams.append("questionId", questionId.toString());
//       if (languageId) {
//         url.searchParams.append("languageId", languageId.toString());
//       }
//       const response = await fetch(url.toString(), {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorDetail = await response.text();
//         throw new Error(
//           `Failed to fetch question detail: ${response.statusText} - ${errorDetail}`
//         );
//       }

//       const data = await response.json();

//       // Extracting the first question from the data array
//       const questionDetail = data.data[0];
//       if (!questionDetail || !questionDetail.languages) {
//         throw new Error("No question detail found");
//       }

//       // Ensure we only get the latest localized data for each languageId
//       const latestLanguages: {
//         [key: number]: { languageId: number; title: string; detail: string };
//       } = {};
//       questionDetail.languages.forEach((localized: any) => {
//         latestLanguages[localized.languageId] = localized;
//       });

//       // Convert the object back to an array
//       questionDetail.languages = Object.values(latestLanguages);

//       return questionDetail; // Return the question detail with updated languages
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const getQuestionDetail = createAsyncThunk<
  QuestionDetail,
  { questionId: number; languageId?: number }
>(
  "questions/getQuestionDetail",
  async ({ questionId, languageId }, { rejectWithValue }) => {
    try {
      const url = new URL(`${CONST.getQuestionDetailURL}`);
      url.searchParams.append("questionId", questionId.toString());
      if (languageId) {
        url.searchParams.append("languageId", languageId.toString());
      }
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Failed to fetch question detail: ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      const questionDetail = data.data[0]; // Assuming data.data is an array
      if (!questionDetail || !questionDetail.languages) {
        throw new Error("No question detail found");
      }

      // Ensure we only get the latest localized data for each languageId
      const latestLanguages: {
        [key: number]: { languageId: number; title: string; detail: string };
      } = {};
      questionDetail.languages.forEach((localized: any) => {
        latestLanguages[localized.languageId] = localized;
      });

      // Convert the object back to an array
      questionDetail.languages = Object.values(latestLanguages);
      return questionDetail; // Return the question detail with updated languages
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
        `${CONST.deleteQuestionURL}?questionsId=${questionId}`,
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
  async (newQuestion: FrequentlyAskedQuestionAdd, { rejectWithValue }) => {
    try {
      const response = await fetch(CONST.addQuestionURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

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

// export const updateQuestion = createAsyncThunk(
//   "questions/updateQuestion",

//   async (
//     updatedQuestion: FrequentlyAskedQuestionUpdate,
//     { rejectWithValue }
//   ) => {
//     try {
//       const uniqueLocalized =
//         updatedQuestion.frequentlyAskedQuestionsLocalized.reduce(
//           (acc, curr) => {
//             const existingIndex = acc.findIndex(
//               (item) => item.languageId === curr.languageId
//             );
//             if (existingIndex === -1) {
//               acc.push(curr);
//             } else {
//               acc[existingIndex] = curr; // Update with the latest entry
//             }
//             return acc;
//           },
//           [] as FrequentlyAskedQuestionUpdate["frequentlyAskedQuestionsLocalized"]
//         );

//       // Prepare the cleaned payload
//       const cleanedPayload = {
//         ...updatedQuestion,
//         frequentlyAskedQuestionsLocalized: uniqueLocalized,
//       };

//       const response = await fetch(CONST.updateQuestionURL, {
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
//           `Failed to update question: ${response.statusText} - ${errorDetail}`
//         );
//       }

//       const data = await response.json();
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateQuestion = createAsyncThunk(
//   "questions/updateQuestion",
//   async (
//     updatedQuestion: FrequentlyAskedQuestionUpdate,
//     { rejectWithValue }
//   ) => {
//     try {
//       const uniqueLocalized =
//         updatedQuestion.frequentlyAskedQuestionsLocalized.reduce(
//           (acc, curr) => {
//             const existingIndex = acc.findIndex(
//               (item) => item.languageId === curr.languageId
//             );
//             if (existingIndex === -1) {
//               acc.push(curr);
//             } else {
//               acc[existingIndex] = curr; // Update with the latest entry
//             }
//             return acc;
//           },
//           [] as FrequentlyAskedQuestionUpdate["frequentlyAskedQuestionsLocalized"]
//         );

//       const cleanedPayload = {
//         ...updatedQuestion,
//         frequentlyAskedQuestionsLocalized: uniqueLocalized,
//       };

//       console.log(
//         "Payload to be sent:",
//         JSON.stringify(cleanedPayload, null, 2)
//       );

//       const response = await fetch(CONST.updateQuestionURL, {
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
//           `Failed to update question: ${response.statusText} - ${errorDetail}`
//         );
//       }

//       const data = await response.json();
//       console.log("Updated question data:", data.data); // Log the returned data
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateQuestion = createAsyncThunk(
//   "questions/updateQuestion",
//   async (
//     updatedQuestion: FrequentlyAskedQuestionUpdate,
//     { rejectWithValue, dispatch }
//   ) => {
//     try {
//       const uniqueLocalized =
//         updatedQuestion.frequentlyAskedQuestionsLocalized.reduce(
//           (acc, curr) => {
//             const existingIndex = acc.findIndex(
//               (item) => item.languageId === curr.languageId
//             );
//             if (existingIndex === -1) {
//               acc.push(curr);
//             } else {
//               acc[existingIndex] = curr;
//             }
//             return acc;
//           },
//           [] as FrequentlyAskedQuestionUpdate["frequentlyAskedQuestionsLocalized"]
//         );

//       const cleanedPayload = {
//         ...updatedQuestion,
//         frequentlyAskedQuestionsLocalized: uniqueLocalized,
//       };

//       const response = await fetch(CONST.updateQuestionURL, {
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
//         throw new Error(`Failed to update question: ${errorDetail}`);
//       }
//       const data = await response.json();

//       return (
//         data.data ??
//         (await dispatch(
//           getQuestionDetail({ questionId: updatedQuestion.id ?? 0 })
//         ).unwrap())
//       );
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (
    updatedQuestion: FrequentlyAskedQuestionUpdate,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const uniqueLocalized =
        updatedQuestion.frequentlyAskedQuestionsLocalized.reduce(
          (acc, curr) => {
            const existingIndex = acc.findIndex(
              (item) => item.languageId === curr.languageId
            );
            if (existingIndex === -1) {
              acc.push(curr);
            } else {
              acc[existingIndex] = curr; // Update with the latest entry
            }
            return acc;
          },
          [] as FrequentlyAskedQuestionUpdate["frequentlyAskedQuestionsLocalized"]
        );

      const cleanedPayload = {
        ...updatedQuestion,
        frequentlyAskedQuestionsLocalized: uniqueLocalized,
      };

      const response = await fetch(CONST.updateQuestionURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedPayload),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Failed to update question: ${errorDetail}`);
      }

      const data = await response.json();
      return data.data; // Return the updated question data
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
export interface QuestionDetail {
  id: number;
  mobileLanguageId: number;
  title: string;
  detail: string;
  languages: {
    languageId: number;
    title: string;
    detail: string;
  }[];
}
export interface FrequentlyAskedQuestionAdd {
  question: string;
  detail: string;
  frequentlyAskedQuestionsLocalized: {
    languageId: number;
    question: string;
    detail: string;
  }[];
}

export interface FrequentlyAskedQuestionUpdate {
  id: number;
  question: string;
  detail: string;
  frequentlyAskedQuestionsLocalized: {
    languageId: number;
    question: string;
    detail: string;
  }[];
}

interface QuestionSliceState {
  question: Question[];
  questionDetail: QuestionDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
  success: boolean;
  frequentlyAskedQuestionAdd: FrequentlyAskedQuestionAdd[];
}
const initialState: QuestionSliceState = {
  question: [],
  questionDetail: null,
  loading: false,
  success: false,
  status: "idle",
  error: null,
  frequentlyAskedQuestionAdd: [],
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
        state.loading = false;
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
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          const index = state.question.findIndex(
            (faq) => faq.id === action.payload.id
          );
          if (index !== -1) {
            state.question[index] = {
              ...state.question[index],
              ...action.payload,
            };
          } else {
            console.error(`Question with ID ${action.payload.id} not found.`);
          }
        } else {
          console.error("No payload received.");
        }
      })

      // .addCase(updateQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
      //   state.status = "succeeded";
      //   // Update the existing question in the state
      //   const index = state.question.findIndex((q) => q.id === action.payload.id);
      //   if (index !== -1) {
      //     state.question[index] = action.payload;
      //   }
      //   state.loading = false; // Set loading to false
      // })
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
        (state, action: PayloadAction<QuestionDetail>) => {
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
          state.loading = false;
          state.question = state.question.filter(
            (faq) => faq.id !== action.payload
          );
          state.success = true;
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
