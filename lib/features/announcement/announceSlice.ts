import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNAYS5jb20iLCJGaXJzdE5hbWUiOiJTdXBlckFkbWluIiwiTGFzdE5hbWUiOiJTdXBlckFkbWluIiwiQXNwVXNlcklkIjoiYzI3MzZkNzktODkxNi00NmY1LTgxODEtMzFmZWJlNTU4OTA5IiwiUm9sZXMiOiJTdXBlckFkbWluIiwibmJmIjoxNzIwMDk0MjA3LCJleHAiOjE3NTE2MzAyMDcsImlzcyI6Imh0dHBzOi8vd3d3LnBhdGl0cmFja2VyLmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5wYXRpdHJhY2tlci5jb20vIn0.t399sVvHN2IGtPsLG7YH9oRkVhSbGAcr00ecFpMiF3M';

export const getAllAnnouncement = createAsyncThunk(
    'announcement/getAllAnnouncement',
    async (_, { rejectWithValue }) => {
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Information/GetAllAnnouncementWeb', {
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
  export const getAnnouncementDetail = createAsyncThunk(
    'announcement/getAnnouncementDetail',
    async (id: number, { rejectWithValue }) => {
  
      try {
        const response = await fetch(`http://185.46.55.50:50235/api/v1/Information/GetAnnouncementDetailWebAsync?announcementId=${id}`, {
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

  export const deleteAnnouncement = createAsyncThunk(
    'announcement/deleteAnnouncement',
    async (announcementId: number, { rejectWithValue }) => {
  
      try {
        const response = await fetch(`http://185.46.55.50:50235/api/v1/Information/DeleteAnnouncement?announcementId=${announcementId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to delete announcement: ${response.statusText} - ${errorDetail}`);
        }
  
        return announcementId; 
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const addAnnouncement = createAsyncThunk(
    'announcement/addAnnouncement',
    async (newAnnouncement: NewAnnouncement, { rejectWithValue }) => {
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Information/AddAnnouncement', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAnnouncement),
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to add announcement: ${response.statusText} - ${errorDetail}`);
        }
  
        const data = await response.json();
        return data.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const updateAnnouncement = createAsyncThunk(
    'announcement/updateAnnouncement',

    async (updateAnnouncement: UpdateAnnouncement, { rejectWithValue }) => {
  
      try {
        const response = await fetch('http://185.46.55.50:50235/api/v1/Information/UpdateAnnouncement', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateAnnouncement),
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Failed to update pet type: ${response.statusText} - ${errorDetail}`);
        }
  
        const data = await response.json();
        return data.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
export interface Announcement {
    id: number;
    title: string;
    detail: string;
    isRead: boolean;
  }
interface AnnouncementDetail{
   id: number;
    title: string;
    detail: string;
    typeId:number;
    isRead: boolean;
    userProfileId: number;
    mobileLanguageId: number;
}
  interface NewAnnouncement {
    title: string;
    detail: string;
    announcementTypeId: number;
    mobileLanguageId: number;
    userProfileId: number[];
  }
  export interface UpdateAnnouncement {
    id: number;
    mobileLanguageId: number;
    title: string;
    detail: string;
  }
interface AnnouncementSliceState {
  announcement: Announcement[]; 
  announcementDetail: AnnouncementDetail | null;

  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
  success: boolean;

}

const initialState: AnnouncementSliceState = {
    announcement: [],
    announcementDetail:null,
    loading: false,
    success: false,
    status: 'idle',
    error: null,
};

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    },
  extraReducers: (builder) => {
    builder
    .addCase(getAllAnnouncement.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllAnnouncement.fulfilled, (state, action: PayloadAction<Announcement[]>) => {
        state.status = 'succeeded';
        state.announcement = action.payload;
      })
    .addCase(getAllAnnouncement.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Unknown error';
    })  
    .addCase(addAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
        state.status = 'succeeded';
        state.announcement.push(action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
        state.loading = false;
        state.success = false;
      })
   .addCase(updateAnnouncement.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action: PayloadAction<UpdateAnnouncement>) => {
        state.status = 'succeeded';
        const index = state.announcement.findIndex((announce) => announce.id === action.payload.id);
        if (index !== -1) {
            state.announcement[index] = { ...state.announcement[index], ...action.payload };
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
        state.success = false;
      })
      .addCase(getAnnouncementDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnnouncementDetail.fulfilled, (state, action: PayloadAction<AnnouncementDetail>) => {
        state.loading = false;
        state.announcementDetail = action.payload;
    })
      .addCase(getAnnouncementDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.announcement = state.announcement.filter(
          (announce) => announce.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
      });
  }
});

export const selectAnnouncements = (state: RootState) => state.announcement.announcement;
export const selectAnnouncementDetail = (state: RootState) => state.announcement.announcementDetail;



export default announcementSlice.reducer;