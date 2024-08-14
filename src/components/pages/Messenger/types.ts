import type { IUser } from "../../../interfaces/account";

export interface IMessage {
	id: string;
	content: string;
	userId: string;
	createdAt: string;
}

export interface IChat {
	id: string;
	name: string;
	messages: IMessage[];
	user: IUser;
	chatUsers: IChatUser[];
}

export interface IChatUser {
	user: IUser;
}

export interface ISendMessage {
	fromUserEmail: string;
	toUserEmail: string;
	messageContent: string;
}
