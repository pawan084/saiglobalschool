import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export type InquiryType = "GENERAL" | "TOUR" | "OPEN_HOUSE" | "RSVP" | "ADMISSION";

export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  grade_interest?: string;
  topic?: string;
  inquiry_type?: InquiryType;
  message?: string;
  source_url?: string;
}

interface InquiryState {
  loading: boolean;
  error: string | null;
  reference: string | null;
}

const initialState: InquiryState = {
  loading: false,
  error: null,
  reference: null,
};

export const submitInquiry = createAsyncThunk(
  "inquiry/submit",
  async (payload: InquiryPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ success: boolean; reference: string }>(
        "/intake/inquiry",
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail ?? "Failed to submit inquiry"
      );
    }
  }
);

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    resetInquiry(state) {
      state.loading = false;
      state.error = null;
      state.reference = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.reference = action.payload.reference;
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetInquiry } = inquirySlice.actions;
export default inquirySlice.reducer;
