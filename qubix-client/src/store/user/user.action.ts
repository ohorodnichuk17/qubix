import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IChangePassword } from "../../interfaces/user";
import { apiClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/error";

export const changePassword = createAsyncThunk(
	"User/change-password",
	async (payload: IChangePassword, { rejectWithValue }) => {
		try {
			const response = await apiClient.post(
				"/api/authentication/change-password",
				payload,
			);
			return response.status;
		} catch (error) {
			return rejectWithValue(handleAxiosError(error, "Network error"));
		}
	},
);
