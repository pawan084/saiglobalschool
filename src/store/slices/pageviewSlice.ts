import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export interface PageviewPayload {
  path: string;
  referrer?: string;
  device?: string;
}

interface PageviewState {
  loading: boolean;
  error: string | null;
}

const initialState: PageviewState = {
  loading: false,
  error: null,
};

export const trackPageview = createAsyncThunk(
  "pageview/track",
  async (payload: PageviewPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ success: boolean }>(
        "/intake/pageview",
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail ?? "Failed to track pageview"
      );
    }
  }
);

const pageviewSlice = createSlice({
  name: "pageview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(trackPageview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackPageview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(trackPageview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pageviewSlice.reducer;
