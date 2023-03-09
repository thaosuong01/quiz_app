import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    result: [],
    newAnswer: null,
  },

  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },

    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload;
      state.result.fill(checked, trace, trace + 1);
    },

    resetResultAction: () => {
      return {
        userId: null,
        result: [],
      };
    },

    setNewAnswer: (state, action) => {
      state.newAnswer = action.payload;
    },
  },
});

export const {
  setUserId,
  pushResultAction,
  resetResultAction,
  updateResultAction,
  setNewAnswer,
} = resultReducer.actions;

export default resultReducer.reducer;
