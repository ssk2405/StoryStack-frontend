import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: "user" },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role; // Corrected this line
    },
  },
});

export const authActions = authSlice.actions; // Corrected the export name
export default authSlice.reducer;
