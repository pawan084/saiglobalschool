import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export interface NewsletterPayload {
  email: string;
  source?: string;
}

interface NewsletterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: NewsletterState = {
  loading: false,
  error: null,
  success: false,
};

export const unsubscribeNewsletter = createAsyncThunk(
  "newsletter/unsubscribe",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ success: boolean }>(
        "/intake/newsletter/unsubscribe",
        { email }
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail ?? "Failed to unsubscribe"
      );
    }
  }
);

export const submitNewsletter = createAsyncThunk(
  "newsletter/submit",
  async (payload: NewsletterPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ success: boolean; already_subscribed: boolean }>(
        "/intake/newsletter",
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail ?? "Failed to subscribe"
      );
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    resetNewsletter(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitNewsletter.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetNewsletter } = newsletterSlice.actions;
export default newsletterSlice.reducer;
