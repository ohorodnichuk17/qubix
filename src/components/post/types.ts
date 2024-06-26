export interface ICreatePost {
		userId: string;
		content: string;
		location: string;
		isArchive: boolean;
		tags: string[];
		images: Blob;
	}
