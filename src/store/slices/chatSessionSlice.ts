import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export interface ChatSessionPayload {
  session_id: string;
  first_message?: string;
}

interface ChatSessionState {
  loading: boolean;
  error: string | null;
}

const initialState: ChatSessionState = {
  loading: false,
  error: null,
};

export const trackChatSession = createAsyncThunk(
  "chatSession/track",
  async (payload: ChatSessionPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ success: boolean }>(
        "/intake/chat-session",
        payload
      );
      return data;
    } catch (err: unknown) {
      return rejectWithValue(
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ?? "Failed to track chat session"
      );
    }
  }
);

const chatSessionSlice = createSlice({
  name: "chatSession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(trackChatSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackChatSession.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(trackChatSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatSessionSlice.reducer;
