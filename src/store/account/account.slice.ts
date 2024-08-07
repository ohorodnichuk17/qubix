import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { addLocalStorage, deleteLocalStorage } from "../../utils/storage/localStorageUtils.ts";
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IAccountState } from "../../interfaces/account";
import { changeEmail, confirmEmail, forgotPassword, login, resetPassword, userRegister, userLogout } from "./account.actions.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
   return action.type.endsWith('/rejected');
}

const updateLoginUserState = (state: IAccountState, token: string): void => {
   const decodedToken: { [key: string]: string } = jwtDecode(token);

   const id = decodedToken["sub"];
   const email = decodedToken["email"];
   const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
   const firstName = decodedToken["given_name"];
   const lastName = decodedToken["family_name"];
   const birthday = new Date(decodedToken["birthdate"] || '1970-01-01');
   const gender = decodedToken["gender"] || '';
   const avatar = decodedToken["Avatar"];
   const userName = decodedToken["userName"] || '';

   state.user = {
      id: id,
      userName: userName,
      email: email,
      role: role,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      gender: gender,
      avatar: avatar,
      isOnline: false,
   };

   state.token = token;
   state.isLogin = true;

   addLocalStorage('authToken', token);
};


const initialState: IAccountState = {
   user: null,
   token: null,
   isLogin: false,
   status: Status.IDLE,
};

export const accountsSlice = createSlice({
   name: 'account',
   initialState,
   reducers: {
      autoLogin: (state, action: PayloadAction<string>) => {
         updateLoginUserState(state, action.payload);
      },
      logout: (state) => {
         deleteLocalStorage('authToken');
         state.user = null;
         state.token = null;
         state.isLogin = false;
      },
      updateAvatar: (state, action: PayloadAction<string>) => {
         if (state.user) {
            state.user.avatar = action.payload;
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(login.fulfilled, (state, action) => {
            updateLoginUserState(state, action.payload);
            state.status = Status.SUCCESS;
         })
         .addCase(login.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(userRegister.fulfilled, (state) => {
            state.status = Status.SUCCESS;
         })
         .addCase(userRegister.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(confirmEmail.fulfilled, (state, action) => {
            updateLoginUserState(state, action.payload);
            state.status = Status.SUCCESS;
         })
         .addCase(confirmEmail.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(forgotPassword.fulfilled, (state) => {
            state.status = Status.SUCCESS;
         })
         .addCase(forgotPassword.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(resetPassword.fulfilled, (state) => {
            state.status = Status.SUCCESS;
         })
         .addCase(resetPassword.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(changeEmail.fulfilled, (state) => {
            state.status = Status.SUCCESS;
         })
         .addCase(changeEmail.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(userLogout.fulfilled, (state) => {
            state.status = Status.SUCCESS;
            deleteLocalStorage('authToken');
            state.user = null;
            state.token = null;
            state.isLogin = false;
         })
         .addMatcher(isRejectedAction, (state) => {
            state.status = Status.ERROR;
         });
   }
});

export const { autoLogin, logout, updateAvatar } = accountsSlice.actions;
export default accountsSlice.reducer;
