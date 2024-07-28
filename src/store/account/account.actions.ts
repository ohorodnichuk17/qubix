import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/error";
import {
   IRegisterModel,
   IConfirmEmail,
   ILogin,
   IChangeEmail,
   IForgotPassword,
   IResetPassword
} from "../../interfaces/account";
import { AxiosRequestConfig } from "axios";

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

export const confirmEmail = createAsyncThunk(
   'Authentication/confirm-email',
   async (payload: IConfirmEmail, { rejectWithValue }) => {
      const config: AxiosRequestConfig = {
         params: payload,
      };

      try {
         const response = await apiClient.get('/api/authentication/confirm-email', config);
         return response.data;
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

export const changeEmail = createAsyncThunk(
   'Authentication/change-email',
   async (payload: IChangeEmail, { rejectWithValue }) => {
      try {
         console.log("payload ", payload)

         const response = await apiClient.post('/api/authentication/change-email', payload);

         console.log("response ", response)

         return response.status;
      } catch (error) {
         console.log("error ", error)

         return rejectWithValue(handleAxiosError(error, "Network error"));
      }
   },
);

export const forgotPassword = createAsyncThunk(
   'Authentication/forgot-password',
   async (payload: IForgotPassword, { rejectWithValue }) => {
      try {
         const response = await apiClient.post('/api/authentication/forgot-password', payload);

         return response.data;
      } catch (error) {
         return rejectWithValue(handleAxiosError(error, "Network error"));
      }
   },
);

export const resetPassword = createAsyncThunk(
   'Authentication/reset-password',
   async (payload: IResetPassword, { rejectWithValue }) => {
      try {
         const response = await apiClient.post('/api/authentication/reset-password', payload);

         return response.data;
      } catch (error) {
         return rejectWithValue(handleAxiosError(error, "Network error"));
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