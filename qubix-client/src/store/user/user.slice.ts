import { type AnyAction, createSlice } from "@reduxjs/toolkit";
import type { IUserState } from "../../interfaces/user";
import { Status } from "../../utils/enum";
import type { RejectedAction } from "../../utils/types";
import { changePassword } from "./user.action.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
	return action.type.endsWith("/rejected");
}

const initialState: IUserState = {
	status: Status.IDLE,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(changePassword.fulfilled, (state) => {
				state.status = Status.SUCCESS;
			})
			.addCase(changePassword.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addMatcher(isRejectedAction, (state) => {
				state.status = Status.ERROR;
			});
	},
});

export default userSlice.reducer;
