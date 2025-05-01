import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//Types
import { UserData, UserState } from "@/types/types";

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.key !== action.payload);
    },
    deleteSelected: (state, action: PayloadAction<string[]>) => {
      state.users = state.users.filter(
        (user) => !action.payload.includes(user.key)
      );
    },
    editUser: (state, action: PayloadAction<UserData>) => {
      const index = state.users.findIndex((user) => user.key === action.payload.key);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    }
  },
});

export const { addUser, deleteUser, deleteSelected, editUser } = userSlice.actions;
export default userSlice.reducer;
