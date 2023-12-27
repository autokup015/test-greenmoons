import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../model/auth.models";

interface StateModel {
  userDetail: UserModel;
  isLoading: Boolean;
}

const initialState: StateModel = {
  userDetail: {
    username: "",
    password: "",
    date: "",
    favorite: [],
  },

  isLoading: false,
};

export const MainState = createSlice({
  name: "main",
  initialState,
  reducers: {
    UPDATE_USERDATA: (state: StateModel, payload: any) => {
      state.userDetail = payload.payload;

      localStorage.setItem("auth", payload.payload.username);
    },
    UPDATE_FAVORITE_MOViE: (state: StateModel, payload: any) => {
      state.userDetail.favorite = payload.payload;

      let getUserData: any = localStorage.getItem("user_data");

      getUserData = JSON.parse(getUserData);

      const findUser = getUserData.find((x: any) => {
        return x.username === state.userDetail.username;
      });

      findUser.favorite = payload.payload;

      localStorage.setItem("user_data", JSON.stringify(getUserData));
    },
    UPDATE_LOADING: (state: StateModel, payload) => {
      state.isLoading = payload.payload;
    },
  },
});

export const { UPDATE_USERDATA, UPDATE_FAVORITE_MOViE, UPDATE_LOADING } =
  MainState.actions;

export default MainState.reducer;
