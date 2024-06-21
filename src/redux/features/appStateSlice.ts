import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  appState: string;
  lang: 'en' | 'id';
  chatActiveNo: string;
  ticketNumber: string;
};

const initialState: AppState = {
  appState: "",
  lang: 'en',
  chatActiveNo: "",
  ticketNumber: "",
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setLang: (state, action: PayloadAction<'en' | 'id'>) => {
      state.lang = action.payload;
    },
    setChatActiveNo: (state, action: PayloadAction<string>) => {
      state.chatActiveNo = action.payload;
    },
    setTicketNumber: (state, action: PayloadAction<string>) => {
      state.ticketNumber = action.payload;
    },
  },
});

export const {
  setAppState,
  setLang,
  setChatActiveNo,
  setTicketNumber,
} = appStateSlice.actions;

export default appStateSlice.reducer;