import type { IUser } from "../../../interfaces/account";

export interface IUserProfileEditModel {
	userId: string;
	biography: string | null;
	avatar: File | undefined | null;
	coverPhoto: File | undefined | null;
	pronouns: string;
	country: string | null;
	region: string | null;
	userName: string | null;
}

export interface IUserProfile {
	id: string;
	userId: string;
	biography: string;
	coverPhoto: string | null;
	pronouns: string;
	country: string;
	region: string;
	isProfilePublic: boolean;
	userEntity: IUser;
}

export interface IUploadedFile {
	lastModified: number;
	lastModifiedDate: Date;
	name: string;
	originFileObj: File;
	percent: number;
	size: number;
	thumbUrl: string;
	type: string;
	uid: string;
}
