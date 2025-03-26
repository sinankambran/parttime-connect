import { createSlice } from "@reduxjs/toolkit";






const initialState = {
  users: [],
  searchUserByText: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSearchUserText: (state, action) => {
      state.searchUserByText = action.payload;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },

});

export const { setUsers, setSearchUserText, updateUser } = userSlice.actions;
export default userSlice.reducer;
