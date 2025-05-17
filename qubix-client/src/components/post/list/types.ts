import type { IUser } from "../../../interfaces/account";
import type { IAction, IFeeling, ISubAction } from "../../feelings/types";

interface IImage {
	id: string;
	imagePath: string;
}

export interface IPaginationResponse {
	totalCount: number;
	posts: IPost[];
}

export interface ILike {
	id: string;
	postId: string;
	userId: string;
}

export interface IPost {
	id: string;
	content: string;
	images: IImage[];
	location: string;
	tags: string[];
	createdAt: string;
	isArchive: boolean;
	userId: string;
	user: IUser;
	actionId: string;
	action: IAction;
	subActionId: string;
	subAction: ISubAction;
	feelingId: string;
	feeling: IFeeling;
	likes: ILike[];
}

export interface ICreateComment {
	message: string;
	postId: string;
}

export interface ICreateCommentReply {
	message: string;
	parentId: string;
}

export interface IComment {
	id: string;
	message: string;
	createdAt: string;
	userId: string;
	userEntity: IUser;
	parentCommentId: string | null;
	childComments: IComment[];
}
