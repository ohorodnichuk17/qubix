import type { IUser } from "../../../interfaces/account";

export interface IStory {
	id: string;
	content: string;
	image: string;
	createdAt: string;
	user: IUser;
}
