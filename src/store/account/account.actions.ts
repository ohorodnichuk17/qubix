import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/error";
import {
   IRegisterModel,
   ILogin,
} from "../../interfaces/account";

export const userRegister = createAsyncThunk(
   'Authentication/register',
   async (payload: IRegisterModel, { rejectWithValue }) => {
      try {
         const response = await apiClient.post('/api/authentication/register', payload);
         return response.status;
      } catch (error) {
         return rejectWithValue(handleAxiosError(error, "Network error"));
      }
   },
);

export const login = createAsyncThunk(
   'authentication/login',
   async (payload: ILogin, { rejectWithValue }) => {
      try {
         const response = await apiClient.post('/api/authentication/login', payload);
         console.log("response.data in login thunk: ", response.data);

         return response.data.token;
      } catch (error) {
         return rejectWithValue(handleAxiosError(error, 'Error'));
      }
   },
);

export const userLogout = createAsyncThunk(
   'authentication/logout',
   async (_, { rejectWithValue }) => {
      try {
         const response = await apiClient.post('/api/authentication/logout');
         return response.data;
      } catch (error) {
         return rejectWithValue(handleAxiosError(error, 'Logout failed'));
      }
   }
);