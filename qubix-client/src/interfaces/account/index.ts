import type { Status } from "../../utils/enum";

export interface IRegisterModel {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	birthday: Date;
	gender: string;
	avatar: File | undefined | null;
}

export interface IAccountState {
	user: IUser | null;
	token: string | null;
	isLogin: boolean;
	status: Status;
}

export interface IConfirmEmail {
	userId: string | undefined;
	token: string | undefined;
}

export interface IUser {
	id: string;
	email: string;
	role: string;
	userName: string;
	firstName: string;
	lastName: string;
	// phoneNumber: string | null,
	birthday: string;
	gender: string;
	avatar: string | null;
	isOnline: boolean;
}

export interface IErrorResponse {
	details: string;
	errors: IServerError[];
	status: number;
	title: string;
	type: string;
}

export interface IServerError {
	code: string;
	description: string;
	metadata: string | null;
	numericType: number;
	type: number;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IForgotPassword {
	email: string;
}

export interface IResetPassword {
	email: string;
	token: string;
	password: string;
	confirmPassword: string;
}

export interface IChangeEmail {
	email: string;
	token: string;
	userId: string;
}
