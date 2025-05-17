export interface ICreatePost {
	userId: string;
	content: string;
	location: string;
	isArchive: boolean;
	tags: string[];
	images: Blob[];
	feelingId: string;
	actionId: string;
	subActionId: string;
}

export type PostType = "text" | "image";

export type PostVisibility =
	| "private"
	| "public"
	| "friends only"
	| "friends except";

export type PostVisibilityOption = {
	visibility: PostVisibility;
	icon: string;
	title: string;
};
