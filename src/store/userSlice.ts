import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// Types
import { UserData, UserState } from "@/types/types";

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      const { birthday, ...rest } = action.payload;
      const sanitizedUser = {
        ...rest,
        birthday: dayjs.isDayjs(birthday)
          ? birthday.format("YYYY-MM-DD")
          : birthday,
        editing: false,
      };
      state.users.push(sanitizedUser);
    },
    editUser: (state, action: PayloadAction<UserData>) => {
      const index = state.users.findIndex(
        (user) => user.key === action.payload.key
      );
      if (index !== -1) {
        const { birthday, ...rest } = action.payload;
        const sanitizedUser = {
          ...rest,
          birthday: dayjs.isDayjs(birthday)
            ? birthday.format("YYYY-MM-DD")
            : birthday,
        };
        state.users[index] = sanitizedUser;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.key !== action.payload
      );
    },
    deleteSelected: (state, action: PayloadAction<string[]>) => {
      state.users = state.users.filter(
        (user) => !action.payload.includes(user.key)
      );
    },
    clearEditingUser: (state) => {
      state.users.forEach((user) => {
        user.editing = false;
      });
    },
  },
});

export const {
  addUser,
  deleteUser,
  deleteSelected,
  editUser,
  clearEditingUser,
} = userSlice.actions;

export default userSlice.reducer;
