import { configureStore } from "@reduxjs/toolkit";
import inquiryReducer from "./slices/inquirySlice";
import applicationReducer from "./slices/applicationSlice";
import newsletterReducer from "./slices/newsletterSlice";
import chatSessionReducer from "./slices/chatSessionSlice";
import pageviewReducer from "./slices/pageviewSlice";

export const store = configureStore({
  reducer: {
    inquiry: inquiryReducer,
    application: applicationReducer,
    newsletter: newsletterReducer,
    chatSession: chatSessionReducer,
    pageview: pageviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
