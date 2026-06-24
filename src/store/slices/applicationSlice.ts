import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export interface ApplicationPayload {
  tracking_ref?: string;
  parent_name: string;
  parent_email: string;
  parent_phone?: string;
  child_name: string;
  child_dob?: string;
  current_grade?: string;
  applying_for_grade?: string;
  current_school?: string;
  nationality?: string;
  raw_payload?: Record<string, unknown>;
}

interface ApplicationState {
  loading: boolean;
  error: string | null;
  tracking_ref: string | null;
}

const initialState: ApplicationState = {
  loading: false,
  error: null,
  tracking_ref: null,
};

export const submitApplication = createAsyncThunk(
  "application/submit",
  async (payload: ApplicationPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ success: boolean; tracking_ref: string }>(
        "/intake/application",
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail ?? "Failed to submit application"
      );
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    resetApplication(state) {
      state.loading = false;
      state.error = null;
      state.tracking_ref = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.tracking_ref = action.payload.tracking_ref;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
