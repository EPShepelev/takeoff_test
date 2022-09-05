import { AppDispatch } from "../store";
import axios from "axios";
import { IUser } from "../../types/IUser";
import { userSlice } from "./userSlice";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await axios.get<IUser[]>(" http://localhost:4000/users");
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
  } catch (e) {
    console.error(e);
  }
};

export const removeUserContact =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      dispatch(fetchUsers());
    } catch (e) {
      console.error(e);
    }
  };

export const addUserContact =
  (id: number, name: string, email: string, phone: string) =>
  async (dispatch: AppDispatch) => {
    try {
      await axios.post("http://localhost:4000/users", {
        id: id,
        name: name,
        email: email,
        phone: phone,
      });
      dispatch(fetchUsers());
    } catch (e) {
      console.error(e);
    }
  };

export const editUserContact =
  (id: number, name: string, email: string, phone: string) =>
  async (dispatch: AppDispatch) => {
    try {
      await axios.put(`http://localhost:4000/users/${id}`, {
        id,
        name,
        email,
        phone,
      });
      dispatch(fetchUsers());
    } catch (e) {
      console.error(e);
    }
  };

export const searchTextInContacts =
  (searchText: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users?q=${searchText}`
      );
      dispatch(userSlice.actions.usersFetchingSuccess(response.data));
    } catch (e) {
      console.error(e);
    }
  };

export const authUser = (login: string, password: string) => async () => {
  try {
    await axios.post("http://localhost:4000/auth", {
      login: login,
      password: password,
    });
  } catch (e) {
    console.error(e);
  }
};
